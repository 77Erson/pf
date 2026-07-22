import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { BlogsClient } from "@/components/blogs/blogs-client";

export const metadata: Metadata = {
  title: "Blogs & Content Strategy Playbooks | Erson",
  description:
    "Explore articles, post-production strategies, and video marketing playbooks by Erson. Learn how to transform raw footage into high-retention content.",
  openGraph: {
    title: "Blogs & Content Strategy Playbooks | Erson",
    description:
      "Explore articles, post-production strategies, and video marketing playbooks by Erson.",
    url: "https://erson.studio/blogs",
  },
  alternates: {
    canonical: "https://erson.studio/blogs",
  },
};

export default function BlogsPage() {
  return (
    <>
      <main className="relative overflow-hidden min-h-screen pt-24 pb-16">
        <Navbar />
        <BlogsClient />
        <Footer />
      </main>
      <ScrollToTop />
    </>
  );
}
