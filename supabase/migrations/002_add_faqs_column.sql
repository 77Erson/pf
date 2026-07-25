-- ===========================================
-- MIGRATION: Add `faqs` column to blogs table
-- ===========================================
-- Run this in Supabase SQL Editor if you already have the `blogs` table:
-- Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ===========================================

ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]';
