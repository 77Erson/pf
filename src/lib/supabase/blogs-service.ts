import { supabase, isSupabaseConfigured } from "./client";
import { blogsData, type BlogPost } from "@/data/blogs";

/**
 * Format database raw blog record to frontend BlogPost structure
 */

interface DBBlogRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  category: string;
  date: string;
  read_time: string;
  views?: string;
  likes?: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  brand?: {
    name?: string;
    socialLink?: string;
    social_link?: string;
    stats?: string;
  };
  tags: string[];
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      keyTakeaway?: string;
      imageUrl?: string;
      videoUrl?: string;
    }[];
    conclusion: string;
  };
  video_url?: string;
  created_at?: string;
}

export function formatDBBlogToBlogPost(row: DBBlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverImage: row.cover_image,
    category: row.category,
    date: row.date,
    readTime: row.read_time,
    views: row.views || "0 views",
    likes: row.likes || "0 likes",
    author: row.author || {
      name: "Erson",
      role: "Brand Content Strategist",
      avatar: "/image/cg-communications.webp",
    },
    brand: row.brand
      ? {
          name: row.brand.name || "",
          socialLink: row.brand.socialLink || row.brand.social_link || "",
          stats: row.brand.stats || "",
        }
      : undefined,
    tags: row.tags || [],
    content: row.content || {
      introduction: "",
      sections: [],
      conclusion: "",
    },
    videoUrl: row.video_url || undefined,
  };
}

/**
 * Fetch all blogs (from Supabase DB if available, fallback to static mock data)
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase is not configured. Falling back to local blogs data.");
    return blogsData;
  }

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs from Supabase:", error.message);
      return blogsData;
    }

    if (!data || data.length === 0) {
      return blogsData;
    }

    return data.map((item) => formatDBBlogToBlogPost(item as DBBlogRow));
  } catch (err) {
    console.error("Unexpected error in getAllBlogs:", err);
    return blogsData;
  }
}

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    const localPost = blogsData.find((b) => b.slug === slug);
    return localPost || null;
  }

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const localPost = blogsData.find((b) => b.slug === slug);
      return localPost || null;
    }

    return formatDBBlogToBlogPost(data as DBBlogRow);
  } catch {
    const localPost = blogsData.find((b) => b.slug === slug);
    return localPost || null;
  }
}

/**
 * Fetch a single blog by ID
 */
export async function getBlogById(id: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    const localPost = blogsData.find((b) => b.id === id);
    return localPost || null;
  }

  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const localPost = blogsData.find((b) => b.id === id);
      return localPost || null;
    }

    return formatDBBlogToBlogPost(data as DBBlogRow);
  } catch {
    const localPost = blogsData.find((b) => b.id === id);
    return localPost || null;
  }
}

/**
 * Create a new blog post in Supabase DB
 */
export async function createBlog(blog: Omit<BlogPost, "id">): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase environment variables are missing. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    };
  }

  const payload = {
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    cover_image: blog.coverImage,
    category: blog.category,
    date: blog.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    read_time: blog.readTime,
    views: blog.views || "0 views",
    likes: blog.likes || "0 likes",
    author: blog.author,
    brand: blog.brand || null,
    tags: blog.tags,
    content: blog.content,
    video_url: blog.videoUrl || null,
  };

  const { data, error } = await supabase.from("blogs").insert([payload]).select().single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: formatDBBlogToBlogPost(data as DBBlogRow) };
}

/**
 * Update an existing blog post in Supabase DB
 */
export async function updateBlog(id: string, blog: Partial<BlogPost>): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase environment variables are missing.",
    };
  }

  const payload: Partial<DBBlogRow> = {};
  if (blog.slug !== undefined) payload.slug = blog.slug;
  if (blog.title !== undefined) payload.title = blog.title;
  if (blog.excerpt !== undefined) payload.excerpt = blog.excerpt;
  if (blog.coverImage !== undefined) payload.cover_image = blog.coverImage;
  if (blog.category !== undefined) payload.category = blog.category;
  if (blog.date !== undefined) payload.date = blog.date;
  if (blog.readTime !== undefined) payload.read_time = blog.readTime;
  if (blog.author !== undefined) payload.author = blog.author;
  if (blog.brand !== undefined) payload.brand = blog.brand;
  if (blog.tags !== undefined) payload.tags = blog.tags;
  if (blog.content !== undefined) payload.content = blog.content;
  if (blog.videoUrl !== undefined) payload.video_url = blog.videoUrl;

  const { data, error } = await supabase.from("blogs").update(payload).eq("id", id).select().single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: formatDBBlogToBlogPost(data as DBBlogRow) };
}

/**
 * Delete a blog post from Supabase DB
 */
export async function deleteBlog(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase environment variables are missing.",
    };
  }

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Upload image or video file to Supabase Storage bucket ('blog-media')
 */
export async function uploadMedia(file: File, folder = "uploads"): Promise<{ url: string | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return {
      url: null,
      error: "Supabase is not configured. Please set up NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-media")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage.from("blog-media").getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to upload media file";
    return { url: null, error: msg };
  }
}
