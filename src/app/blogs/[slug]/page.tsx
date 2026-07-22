import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Eye, Tag, MessageSquare, Film } from "lucide-react";
import { blogsData } from "@/data/blogs";
import { getBlogBySlug, getAllBlogs } from "@/lib/supabase/blogs-service";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { BlogCard } from "@/components/ui/blog-card";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Erson",
    };
  }

  return {
    title: `${blog.title} | Erson`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://erson.studio/blogs/${blog.slug}`,
      images: [{ url: blog.coverImage }],
    },
    alternates: {
      canonical: `https://erson.studio/blogs/${blog.slug}`,
    },
  };
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getAllBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden min-h-screen pt-28 pb-16">
        <article className="container-custom max-w-4xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-accent" />
                {blog.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Eye className="w-3.5 h-3.5 text-accent" />
                {blog.views}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {blog.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {blog.excerpt}
            </p>

            {/* Author Profile */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/60">
              {blog.author.avatar ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/30 shrink-0 bg-secondary">
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-bold text-accent shrink-0">
                  {blog.author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm">{blog.author.name}</p>
                <p className="text-xs text-muted-foreground">{blog.author.role}</p>
              </div>
            </div>
          </div>

          {/* Highlight Video (If present) */}
          {blog.videoUrl && (
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-border shadow-soft-lg bg-black">
              {blog.videoUrl.includes("youtube") || blog.videoUrl.includes("vimeo") ? (
                <iframe
                  src={blog.videoUrl}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={blog.videoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Featured Cover Image */}
          {!blog.videoUrl && blog.coverImage && (
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 border border-border shadow-soft-lg bg-secondary">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground">
            {/* Introduction */}
            {blog.content.introduction && (
              <p className="text-lg leading-relaxed font-medium text-foreground/90 bg-secondary/50 p-6 rounded-2xl border-l-4 border-accent">
                {blog.content.introduction}
              </p>
            )}

            {/* Content Sections */}
            {blog.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-4 pt-4">
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {section.heading}
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                  {section.body}
                </p>

                {section.keyTakeaway && (
                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-xs sm:text-sm font-medium text-foreground flex items-start gap-3">
                    <span className="font-bold text-accent uppercase tracking-wider text-xs whitespace-nowrap mt-0.5">
                      Key Takeaway:
                    </span>
                    <span className="text-muted-foreground">{section.keyTakeaway}</span>
                  </div>
                )}

                {/* Section Image */}
                {section.imageUrl && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-6 border border-border bg-secondary">
                    <Image
                      src={section.imageUrl}
                      alt={section.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Section Video */}
                {section.videoUrl && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden my-6 border border-border bg-black">
                    {section.videoUrl.includes("youtube") || section.videoUrl.includes("vimeo") ? (
                      <iframe src={section.videoUrl} className="w-full h-full border-0" allowFullScreen />
                    ) : (
                      <video src={section.videoUrl} controls className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            {blog.content.conclusion && (
              <div className="pt-6 border-t border-border space-y-4">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Conclusion
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                  {blog.content.conclusion}
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 my-12 pt-6 border-t border-border">
              <Tag className="w-4 h-4 text-muted-foreground mr-1" />
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-secondary text-xs text-muted-foreground font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-accent/15 via-accent/5 to-transparent border border-accent/30 text-center space-y-4 my-12">
            <h3 className="font-display text-2xl font-bold">
              Ready to Upgrade Your Brand Video Content?
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Turn your raw footage into retention-driven assets that build brand identity and drive client conversions.
            </p>
            <div className="pt-2">
              <a
                href="/#contact"
                className="btn-accent inline-flex items-center gap-2 text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discuss Your Project With Erson</span>
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h3 className="font-display text-2xl font-bold mb-8">
                More Recommended Articles
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map((related, idx) => (
                  <BlogCard key={related.id} blog={related} index={idx} />
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
