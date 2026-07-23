-- ====================================================
-- COMPLETE SUPABASE SQL SCHEMA (With Brand Showcase Field)
-- ====================================================
-- Copy and run this ENTIRE block in your Supabase SQL Editor:
-- Supabase Dashboard -> SQL Editor -> New Query -> Run

-- 1. Create Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  excerpt     TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category    TEXT NOT NULL,
  date        TEXT NOT NULL,
  read_time   TEXT DEFAULT '5 min read',
  views       TEXT DEFAULT '0 views',
  likes       TEXT DEFAULT '0 likes',
  author      JSONB NOT NULL DEFAULT '{"name": "Erson", "role": "Brand Content Strategist", "avatar": "/image/cg-communications.webp"}',
  brand       JSONB DEFAULT NULL,
  tags        JSONB DEFAULT '[]',
  content     JSONB NOT NULL DEFAULT '{"introduction": "", "sections": [], "conclusion": ""}',
  video_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies
DROP POLICY IF EXISTS "Allow public read access" ON public.blogs;
CREATE POLICY "Allow public read access" ON public.blogs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.blogs;
CREATE POLICY "Allow public insert" ON public.blogs
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON public.blogs;
CREATE POLICY "Allow public update" ON public.blogs
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete" ON public.blogs;
CREATE POLICY "Allow public delete" ON public.blogs
  FOR DELETE USING (true);
