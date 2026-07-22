"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
  Eye,
  X,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
  Tag,
  Clock,
  User,
  Film,
} from "lucide-react";
import type { BlogPost } from "@/data/blogs";
import { createBlog, updateBlog, uploadMedia } from "@/lib/supabase/blogs-service";

interface BlogFormProps {
  initialData?: BlogPost;
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Content Strategy");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") || "Video Editing, Content Strategy");
  
  // Author
  const [authorName, setAuthorName] = useState(initialData?.author?.name || "Erson");
  const [authorRole, setAuthorRole] = useState(initialData?.author?.role || "Brand Content Strategist");
  const [authorAvatar, setAuthorAvatar] = useState(initialData?.author?.avatar || "/image/cg-communications.webp");

  // Video
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");

  // Content JSON
  const [introduction, setIntroduction] = useState(
    initialData?.content?.introduction || ""
  );
  const [conclusion, setConclusion] = useState(
    initialData?.content?.conclusion || ""
  );
  const [sections, setSections] = useState<
    { heading: string; body: string; keyTakeaway?: string; imageUrl?: string; videoUrl?: string }[]
  >(
    initialData?.content?.sections || [
      {
        heading: "1. Key Visual Framework",
        body: "Detailed section explanation...",
        keyTakeaway: "Core key takeaway for the audience.",
      },
    ]
  );

  // UI States
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [sectionUploadState, setSectionUploadState] = useState<{ [key: number]: boolean }>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    const s = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(s);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    if (!isEditing && !slug) {
      generateSlug(value);
    }
  };

  // Upload Cover Image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCover(true);
    setErrorMsg(null);

    const res = await uploadMedia(file, "covers");
    setUploadingCover(false);

    if (res.error) {
      setErrorMsg(`Cover image upload failed: ${res.error}`);
    } else if (res.url) {
      setCoverImage(res.url);
    }
  };

  // Upload Avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setErrorMsg(null);

    const res = await uploadMedia(file, "avatars");
    setUploadingAvatar(false);

    if (res.error) {
      setErrorMsg(`Avatar upload failed: ${res.error}`);
    } else if (res.url) {
      setAuthorAvatar(res.url);
    }
  };

  // Upload Video File
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingVideo(true);
    setErrorMsg(null);

    const res = await uploadMedia(file, "videos");
    setUploadingVideo(false);

    if (res.error) {
      setErrorMsg(`Video upload failed: ${res.error}`);
    } else if (res.url) {
      setVideoUrl(res.url);
    }
  };

  // Upload Section Image / Video
  const handleSectionMediaUpload = async (
    index: number,
    file: File,
    type: "image" | "video"
  ) => {
    setSectionUploadState((prev) => ({ ...prev, [index]: true }));
    setErrorMsg(null);

    const res = await uploadMedia(file, `sections-${type}s`);
    setSectionUploadState((prev) => ({ ...prev, [index]: false }));

    if (res.error) {
      setErrorMsg(`Section ${type} upload failed: ${res.error}`);
    } else if (res.url) {
      const updated = [...sections];
      if (type === "image") updated[index].imageUrl = res.url;
      else updated[index].videoUrl = res.url;
      setSections(updated);
    }
  };

  // Add section
  const addSection = () => {
    setSections([
      ...sections,
      {
        heading: `${sections.length + 1}. New Strategic Point`,
        body: "",
        keyTakeaway: "",
      },
    ]);
  };

  // Remove section
  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // Section field changes
  const updateSectionField = (
    index: number,
    field: "heading" | "body" | "keyTakeaway" | "imageUrl" | "videoUrl",
    value: string
  ) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title || !slug || !excerpt || !coverImage) {
      setErrorMsg("Please complete all required fields (Title, Slug, Excerpt, Cover Image).");
      return;
    }

    setLoading(true);

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const blogPayload = {
      title,
      slug,
      category,
      excerpt,
      coverImage,
      readTime,
      views: initialData?.views || "0 views",
      likes: initialData?.likes || "0 likes",
      date: initialData?.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: {
        name: authorName,
        role: authorRole,
        avatar: authorAvatar,
      },
      tags: tagsArray,
      content: {
        introduction,
        sections,
        conclusion,
      },
      videoUrl: videoUrl || undefined,
    };

    let result;
    if (isEditing && initialData?.id) {
      result = await updateBlog(initialData.id, blogPayload);
    } else {
      result = await createBlog(blogPayload);
    }

    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || "Failed to save blog post.");
    } else {
      setSuccessMsg(isEditing ? "Blog updated successfully!" : "Blog created successfully!");
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 text-foreground">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h1>
            <p className="text-sm text-neutral-400">
              Publish rich text, custom photos, and video media to your blog.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 text-sm font-medium transition-colors"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? "Hide Live Preview" : "Live Preview"}
        </button>
      </div>

      {/* Error & Success Messages */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <FileText className="w-5 h-5 text-red-500" /> General Meta Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. How to Turn Raw Footage into 10M+ Views"
                required
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => generateSlug(title)}
                  className="text-xs text-red-400 hover:text-red-300 underline"
                >
                  Generate from Title
                </button>
              </div>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. how-to-turn-raw-footage-into-10m-views"
                required
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="Content Strategy">Content Strategy</option>
                <option value="Retention Editing">Retention Editing</option>
                <option value="Editing Tools">Editing Tools</option>
                <option value="Brand Building">Brand Building</option>
                <option value="Post Production">Post Production</option>
                <option value="Video Marketing">Video Marketing</option>
              </select>
            </div>

            {/* Read Time */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Estimated Read Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 6 min read"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Tags (Comma-separated)
              </label>
              <div className="relative">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Video Editing, Retention, Strategy"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Blog Excerpt / Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="A high-retention summary of the article displayed on blog cards..."
                required
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Media Attachments (Cover Photo & Highlight Video) */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <ImageIcon className="w-5 h-5 text-amber-500" /> Media Attachments (Photos & Videos)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cover Image Upload / Input */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Cover Photo <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="/image/cg-communications.webp or Supabase URL"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
                <label className="shrink-0 cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-xs font-medium text-white transition-colors">
                  {uploadingCover ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Upload className="w-4 h-4 text-amber-400" />
                  )}
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={uploadingCover}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Cover Preview */}
              {coverImage && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 mt-2">
                  <Image
                    src={coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] text-neutral-300">
                    Cover Preview
                  </div>
                </div>
              )}
            </div>

            {/* Video File / Embed URL */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Film className="w-4 h-4 text-red-400" /> Highlight Video (MP4 Upload or Youtube/Vimeo URL)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/embed/... or Supabase MP4 URL"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
                <label className="shrink-0 cursor-pointer inline-flex items-center gap-2 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-xs font-medium text-white transition-colors">
                  {uploadingVideo ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Video className="w-4 h-4 text-red-400" />
                  )}
                  <span>Upload MP4</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={uploadingVideo}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Video Preview */}
              {videoUrl && (
                <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 mt-2">
                  {videoUrl.includes("youtube") || videoUrl.includes("vimeo") ? (
                    <iframe
                      src={videoUrl}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  ) : (
                    <video src={videoUrl} controls className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded text-[10px] text-neutral-300">
                    Video Preview
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Author Information */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <User className="w-5 h-5 text-emerald-500" /> Author Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Erson"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Author Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Brand Content Strategist"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Author Avatar Image
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  placeholder="/image/cg-communications.webp"
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-3 text-sm text-white placeholder-neutral-600 focus:outline-none"
                />
                <label className="shrink-0 cursor-pointer p-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-xs font-medium text-white transition-colors">
                  {uploadingAvatar ? (
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <Upload className="w-4 h-4 text-emerald-400" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={uploadingAvatar}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Dynamic Article Content & Sections */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
            <FileText className="w-5 h-5 text-indigo-500" /> Article Content & Sections
          </h2>

          {/* Introduction */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Introduction Paragraph
            </label>
            <textarea
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              rows={4}
              placeholder="Opening hooks, background context, and core premise of the article..."
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          {/* Dynamic Sections */}
          <div className="space-y-6 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider">
                Body Sections ({sections.length})
              </h3>
              <button
                type="button"
                onClick={addSection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 text-red-400 text-xs font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Section
              </button>
            </div>

            {sections.map((section, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-4 relative group"
              >
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                    Section #{idx + 1}
                  </span>
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                      title="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => updateSectionField(idx, "heading", e.target.value)}
                    placeholder="e.g. 1. The First 3 Seconds: Dynamic Visual Hooks"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Section Body Text
                  </label>
                  <textarea
                    value={section.body}
                    onChange={(e) => updateSectionField(idx, "body", e.target.value)}
                    rows={4}
                    placeholder="Detailed explanation, technical steps, or case study analysis..."
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1">
                    Key Takeaway Callout (Optional)
                  </label>
                  <input
                    type="text"
                    value={section.keyTakeaway || ""}
                    onChange={(e) => updateSectionField(idx, "keyTakeaway", e.target.value)}
                    placeholder="e.g. Never open with a 5-second logo animation..."
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3 text-sm text-amber-300/90 placeholder-neutral-600"
                  />
                </div>

                {/* Optional Section Media (Image or Video) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                      Section Photo (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={section.imageUrl || ""}
                        onChange={(e) => updateSectionField(idx, "imageUrl", e.target.value)}
                        placeholder="Image URL or upload"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white"
                      />
                      <label className="shrink-0 cursor-pointer p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-white">
                        {sectionUploadState[idx] ? (
                          <span className="inline-block animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleSectionMediaUpload(idx, f, "image");
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                      Section Video (Optional MP4 / Embed)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={section.videoUrl || ""}
                        onChange={(e) => updateSectionField(idx, "videoUrl", e.target.value)}
                        placeholder="Video URL or upload"
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white"
                      />
                      <label className="shrink-0 cursor-pointer p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-white">
                        <Video className="w-3.5 h-3.5 text-red-400" />
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleSectionMediaUpload(idx, f, "video");
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="pt-4 border-t border-neutral-800">
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Conclusion Paragraph
            </label>
            <textarea
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              rows={3}
              placeholder="Final thoughts, strategic takeaway, and call to action..."
              className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-500/60 rounded-xl py-3 px-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="px-6 py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-sm font-semibold shadow-lg shadow-red-600/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEditing ? "Save & Update Post" : "Publish Blog Post"}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase text-red-500 font-bold tracking-widest mb-2">
              LIVE PREVIEW • {category}
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-4">{title || "Untitled Blog Post"}</h1>
            <p className="text-neutral-400 text-lg mb-6">{excerpt}</p>

            {coverImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-neutral-800">
                <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
              </div>
            )}

            {videoUrl && (
              <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-neutral-800 bg-black">
                {videoUrl.includes("youtube") || videoUrl.includes("vimeo") ? (
                  <iframe src={videoUrl} className="w-full h-full" allowFullScreen />
                ) : (
                  <video src={videoUrl} controls className="w-full h-full object-cover" />
                )}
              </div>
            )}

            <div className="prose prose-invert max-w-none space-y-6 text-neutral-300">
              <p className="text-base leading-relaxed">{introduction}</p>
              {sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl font-bold text-white">{sec.heading}</h3>
                  <p className="leading-relaxed">{sec.body}</p>
                  {sec.keyTakeaway && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm">
                      💡 <strong>Takeaway:</strong> {sec.keyTakeaway}
                    </div>
                  )}
                  {sec.imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden my-4">
                      <Image src={sec.imageUrl} alt="Section" fill className="object-cover" />
                    </div>
                  )}
                </div>
              ))}
              <p className="text-base leading-relaxed pt-4 border-t border-neutral-800">{conclusion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
