"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogsData } from "@/data/blogs";
import { BlogCard } from "@/components/ui/blog-card";

export function BlogsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Display top featured blogs on homepage
  const featuredBlogs = blogsData.slice(0, 3);

  return (
    <section id="blogs" className="section" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Insights & Strategy</span>
          </div>
          <h2 className="section-heading mt-2">
            Case Studies <span className="text-accent">and Breakdown</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Deep dives into retention editing, post-production workflows, and building a high-impact brand visual identity.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* View All Blogs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/blogs"
            className="btn-accent inline-flex items-center gap-2 text-sm"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
