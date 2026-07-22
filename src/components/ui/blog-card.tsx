"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";
import { BlogPost } from "@/data/blogs";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: BlogPost;
  index?: number;
}

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col rounded-3xl bg-card border border-border overflow-hidden",
        "card-hover shadow-soft transition-all duration-300"
      )}
    >
      {/* Cover Picture */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-accent-foreground shadow-md">
          {blog.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Basic info / Stats bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            {blog.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            {blog.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-accent" />
            {blog.views}
          </span>
        </div>

        {/* Basic Title */}
        <h3 className="font-display text-xl font-bold line-clamp-2 group-hover:text-accent transition-colors leading-snug">
          <Link href={`/blogs/${blog.slug}`}>
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {blog.excerpt}
        </p>

        {/* See More Link */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            By {blog.author.name}
          </span>
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:gap-2.5 transition-all"
          >
            <span>See More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
