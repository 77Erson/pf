-- ===========================================
-- MIGRATION: Add `brand` column to blogs table
-- ===========================================
-- Run this in Supabase SQL Editor if you already have the `blogs` table
-- and just need to add the new brand JSONB column.
--
-- The `brand` column stores:
-- {
--   "name": "CG Communications",
--   "socialLink": "https://instagram.com/cgcommunications",
--   "stats": "10M+ Views & 85% Retention"
-- }
-- ===========================================

-- Add the brand column (JSONB, nullable)
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS brand JSONB DEFAULT NULL;

-- Add updated_at column if missing
ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
