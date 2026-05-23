-- ============================================================
-- GO TOUR — Messages System Migration
-- Run this in your Supabase project: Dashboard → SQL Editor
-- ============================================================

-- 1. Conversations (direct message threads)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  last_message TEXT,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Participants (who is in each conversation)
CREATE TABLE IF NOT EXISTS conversation_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  last_read_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);

-- 3. Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
DROP POLICY IF EXISTS "Users see own participations" ON conversation_participants;
CREATE POLICY "Users see own participations" ON conversation_participants
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users see their conversations" ON conversations;
CREATE POLICY "Users see their conversations" ON conversations
  FOR SELECT USING (
    id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Anyone can create conversation" ON conversations;
CREATE POLICY "Anyone can create conversation" ON conversations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update conversation last message" ON conversations;
CREATE POLICY "Anyone can update conversation last message" ON conversations
  FOR UPDATE USING (
    id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users see messages in their convos" ON messages;
CREATE POLICY "Users see messages in their convos" ON messages
  FOR SELECT USING (
    conversation_id IN (SELECT conversation_id FROM conversation_participants WHERE user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can send messages" ON messages;
CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 6. Helper RPC: create_direct_conversation
-- This SECURITY DEFINER function creates a conversation + adds BOTH participants
-- bypassing RLS restrictions for the "other user" participant insert.
CREATE OR REPLACE FUNCTION create_direct_conversation(other_user_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  conv_id UUID;
  existing_conv_id UUID;
BEGIN
  -- Check if a direct conversation already exists between these two users
  SELECT cp1.conversation_id INTO existing_conv_id
  FROM conversation_participants cp1
  JOIN conversation_participants cp2
    ON cp1.conversation_id = cp2.conversation_id
  WHERE cp1.user_id = auth.uid()
    AND cp2.user_id = other_user_id
  LIMIT 1;

  IF existing_conv_id IS NOT NULL THEN
    RETURN existing_conv_id;
  END IF;

  -- Create new conversation
  INSERT INTO conversations (last_message, last_message_at)
  VALUES (NULL, now())
  RETURNING id INTO conv_id;

  -- Add both participants
  INSERT INTO conversation_participants (conversation_id, user_id) VALUES
    (conv_id, auth.uid()),
    (conv_id, other_user_id);

  RETURN conv_id;
END;
$$;

-- 7. Enable Realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE conversation_participants;

-- Done!
-- After running this, the GoTour messaging system will work fully.
