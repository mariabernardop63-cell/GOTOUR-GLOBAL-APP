import { supabase } from './supabase';

async function tryCreateNotification({ userId, actorId, type, title, body, entityId }) {
    try {
        await supabase.from('notifications').insert({
            user_id: userId,
            actor_id: actorId,
            type,
            title,
            body,
            entity_id: entityId || null,
            is_read: false,
        });
    } catch {
        // non-critical
    }
}

export const messagesService = {

    async getOrCreateConversation(otherUserId) {
        const { data, error } = await supabase
            .rpc('create_direct_conversation', { other_user_id: otherUserId });
        if (error) throw error;
        return data;
    },

    async getConversations(userId) {
        const { data: participations, error: pErr } = await supabase
            .from('conversation_participants')
            .select('conversation_id, last_read_at')
            .eq('user_id', userId);
        if (pErr) throw pErr;
        if (!participations?.length) return [];

        const convIds = participations.map(p => p.conversation_id);

        const [{ data: others }, { data: conversations }] = await Promise.all([
            supabase
                .from('conversation_participants')
                .select(`conversation_id, profile:profiles!conversation_participants_user_id_fkey(id, name, username, avatar_url)`)
                .neq('user_id', userId)
                .in('conversation_id', convIds),
            supabase
                .from('conversations')
                .select('id, last_message, last_message_at')
                .in('id', convIds)
                .order('last_message_at', { ascending: false }),
        ]);

        return (conversations || []).map(conv => {
            const myPart = participations.find(p => p.conversation_id === conv.id);
            const other = (others || []).find(o => o.conversation_id === conv.id);
            return {
                id: conv.id,
                lastMessage: conv.last_message,
                lastMessageAt: conv.last_message_at,
                partner: other?.profile || null,
                lastReadAt: myPart?.last_read_at,
            };
        });
    },

    async getMessages(conversationId, limit = 60) {
        const { data, error } = await supabase
            .from('messages')
            .select(`id, conversation_id, sender_id, content, type, created_at,
                sender:profiles!messages_sender_id_fkey(id, name, username, avatar_url)`)
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) throw error;
        return (data || []).reverse();
    },

    async sendMessage(conversationId, senderId, content, type = 'text') {
        const { data, error } = await supabase
            .from('messages')
            .insert({ conversation_id: conversationId, sender_id: senderId, content, type })
            .select(`id, conversation_id, sender_id, content, type, created_at`)
            .single();
        if (error) throw error;
        await supabase.from('conversations').update({
            last_message: content.substring(0, 120),
            last_message_at: new Date().toISOString(),
        }).eq('id', conversationId);
        return data;
    },

    async markAsRead(conversationId, userId) {
        await supabase.from('conversation_participants')
            .update({ last_read_at: new Date().toISOString() })
            .eq('conversation_id', conversationId)
            .eq('user_id', userId);
    },

    async getUnreadCount(userId) {
        const { data: participations } = await supabase
            .from('conversation_participants')
            .select('conversation_id, last_read_at')
            .eq('user_id', userId);
        if (!participations?.length) return 0;
        let total = 0;
        await Promise.all(participations.map(async (p) => {
            const { count } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('conversation_id', p.conversation_id)
                .neq('sender_id', userId)
                .gt('created_at', p.last_read_at || '1970-01-01T00:00:00Z');
            total += count || 0;
        }));
        return total;
    },

    subscribeToMessages(conversationId, currentUserId, onNewMessage) {
        const channel = supabase
            .channel(`messages-${conversationId}-${Date.now()}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `conversation_id=eq.${conversationId}`,
            }, async (payload) => {
                const newMsg = payload.new;
                let sender = null;
                if (newMsg.sender_id !== currentUserId) {
                    const { data } = await supabase
                        .from('profiles')
                        .select('id, name, username, avatar_url')
                        .eq('id', newMsg.sender_id)
                        .single();
                    sender = data;
                    await tryCreateNotification({
                        userId: currentUserId,
                        actorId: newMsg.sender_id,
                        type: 'message_individual',
                        title: 'Nova mensagem',
                        body: `${sender?.name || 'Alguém'}: ${newMsg.content.substring(0, 80)}`,
                        entityId: conversationId,
                    });
                }
                onNewMessage({ ...newMsg, sender });
            })
            .subscribe();
        return channel;
    },

    subscribeToPresence(conversationId, userId, onPresenceChange) {
        const channel = supabase.channel(`presence-${conversationId}`, {
            config: { presence: { key: userId } },
        });
        channel.on('presence', { event: 'sync' }, () => {
            const state = channel.presenceState();
            const others = Object.entries(state)
                .filter(([k]) => k !== userId)
                .flatMap(([, v]) => v);
            onPresenceChange({
                isOnline: others.length > 0,
                isTyping: others.some(o => o?.typing === true),
            });
        });
        channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                await channel.track({ typing: false, online_at: new Date().toISOString() });
            }
        });
        return channel;
    },
};
