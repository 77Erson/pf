"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { supabase } from "@/lib/supabase/client";

export default function NewBlogPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setAuthenticated(true);
      }
      setChecking(false);
    });
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500 text-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent mb-3" />
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <main className="min-h-screen bg-black pt-6 pb-20">
      <BlogForm />
    </main>
  );
}
