"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { supabase } from "@/lib/supabase/client";
import { getBlogById } from "@/lib/supabase/blogs-service";
import type { BlogPost } from "@/data/blogs";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
        return;
      }

      // Fetch existing blog
      getBlogById(resolvedParams.id).then((data) => {
        if (!data) {
          setErrorMsg("Blog post not found.");
        } else {
          setBlog(data);
        }
        setLoading(false);
      });
    });
  }, [resolvedParams.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neutral-500 text-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent mb-3" />
        <p>Loading blog data...</p>
      </div>
    );
  }

  if (errorMsg || !blog) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-neutral-400 p-4">
        <h2 className="text-xl font-bold text-white mb-2">Error Loading Blog</h2>
        <p className="text-sm text-neutral-500 mb-6">{errorMsg || "Blog not found"}</p>
        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white"
        >
          Return to Admin Dashboard
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-6 pb-20">
      <BlogForm initialData={blog} isEditing={true} />
    </main>
  );
}
