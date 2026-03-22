-- ============================================
-- GoTour: Profiles Table Migration
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/acfzjkqvdakwhnhqfcxz/sql/new
-- ============================================

-- Create profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  nationality TEXT,
  phone TEXT,
  date_of_birth DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- RPC: Check if a user is REGISTERED (OTP-confirmed)
-- A user is only considered registered after completing OTP verification.
-- Users who started signup but abandoned before OTP are NOT counted.
-- ============================================
CREATE OR REPLACE FUNCTION check_user_exists(user_email TEXT) RETURNS BOOLEAN
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE email = user_email
    AND email_confirmed_at IS NOT NULL
  );
END;
$$;
