"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  LogOut,
  Sparkles,
  FileText,
  Eye,
  Heart,
  Database,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { getAllBlogs, deleteBlog } from "@/lib/supabase/blogs-service";
import type { BlogPost } from "@/data/blogs";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [configured, setConfigured] = useState(true);

  // Check auth session
  useEffect(() => {
    setConfigured(isSupabaseConfigured());

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // If not authenticated, redirect to login
        router.push("/admin/login");
      } else {
        setUserEmail(session.user.email || "Admin");
      }
    });

    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await getAllBlogs();
    setBlogs(data);
    setFilteredBlogs(data);
    setLoading(false);
  };

  // Filter handler
  useEffect(() => {
    let result = blogs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((b) => b.category === categoryFilter);
    }

    setFilteredBlogs(result);
  }, [searchQuery, categoryFilter, blogs]);

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Delete post handler
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);

    const res = await deleteBlog(deleteId);
    setDeleting(false);
    setDeleteId(null);

    if (res.success) {
      fetchBlogs();
    } else {
      alert(`Delete failed: ${res.error}`);
    }
  };

  const categories = ["all", ...Array.from(new Set(blogs.map((b) => b.category)))];

  return (
    <div className="min-h-screen bg-black text-foreground pb-20">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center font-bold text-white shadow-lg shadow-red-600/30">
              E
            </div>
            <div>
              <span className="font-bold text-white tracking-tight flex items-center gap-1.5 text-sm sm:text-base">
                Erson Admin Panel <Sparkles className="w-4 h-4 text-amber-400" />
              </span>
              <span className="text-[11px] text-neutral-500 block -mt-0.5">
                Logged in as {userEmail || "Admin"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blogs"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
            >
              <span>View Public Blog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 border border-red-900/50 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Banner Alert for Supabase status */}
        {!configured ? (
          <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-200 text-sm">Supabase Connection Pending</h4>
                <p className="text-xs text-neutral-300 mt-0.5">
                  Showing local fallback posts. Add your <code className="bg-black/50 px-1 py-0.5 rounded border border-amber-500/20 text-amber-300">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-black/50 px-1 py-0.5 rounded border border-amber-500/20 text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable live database persistence.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Connected to Supabase DB & Storage</span>
            </div>
            <button
              onClick={fetchBlogs}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
            </button>
          </div>
        )}

        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Blog Posts Manager
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Manage articles, video strategy playbooks, and media uploads
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold text-sm shadow-lg shadow-red-600/25 transition-all group shrink-0"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
            <span>Create New Blog</span>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total Articles</span>
              <FileText className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-white">{blogs.length}</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Storage & DB</span>
              <Database className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-sm font-semibold text-emerald-400">
              {configured ? "Supabase Live" : "Local Mock"}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Categories</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Active Auth</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs font-medium text-neutral-300 truncate">{userEmail}</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/50 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? "bg-red-600 text-white"
                    : "bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Table / Grid */}
        {loading ? (
          <div className="py-20 text-center text-neutral-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent mb-3" />
            <p className="text-sm">Loading blogs from database...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-400">
            <FileText className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No Blog Posts Found</h3>
            <p className="text-sm text-neutral-500 mb-6">
              Try adjusting your search criteria or create a new blog post.
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Create Blog Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 font-medium">
                        {blog.category}
                      </span>
                      <span className="text-neutral-500">• {blog.date}</span>
                      <span className="text-neutral-500">• {blog.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-1 mt-1">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-neutral-500 mt-2">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {blog.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {blog.likes}
                      </span>
                      {blog.videoUrl && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                          Includes Video
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    target="_blank"
                    className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-medium transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => setDeleteId(blog.id)}
                    className="p-2.5 rounded-xl bg-red-950/30 hover:bg-red-950/60 border border-red-900/50 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Blog Post?</h3>
            <p className="text-xs text-neutral-400 mb-6">
              This action cannot be undone. The post will be permanently deleted from the database.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
