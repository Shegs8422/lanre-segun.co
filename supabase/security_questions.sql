-- Security Questions Table (Single Admin Version)
-- CRITICAL: This version DROPS the old table to fix the "user_id" error.
-- Run this SQL in your Supabase SQL Editor.

DROP TABLE IF EXISTS security_questions CASCADE;

CREATE TABLE security_questions (
  id UUID DEFAULT '00000000-0000-0000-0000-000000000000'::UUID PRIMARY KEY,
  question_1 TEXT NOT NULL,
  answer_1_hash TEXT NOT NULL,
  question_2 TEXT NOT NULL,
  answer_2_hash TEXT NOT NULL,
  question_3 TEXT NOT NULL,
  answer_3_hash TEXT NOT NULL,
  password_override TEXT, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE security_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access for verification
DROP POLICY IF EXISTS "Allow public read for verification" ON security_questions;
CREATE POLICY "Allow public read for verification" 
  ON security_questions 
  FOR SELECT 
  USING (true);

-- Policy: Allow full management
DROP POLICY IF EXISTS "Full access" ON security_questions;
CREATE POLICY "Full access" 
  ON security_questions 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_security_questions_modtime ON security_questions;
CREATE TRIGGER update_security_questions_modtime
  BEFORE UPDATE ON security_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();
