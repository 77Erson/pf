"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { blogsData } from "@/data/blogs";
import { BlogCard } from "@/components/ui/blog-card";
import { cn } from "@/lib/utils";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Display top 3 featured blogs
  const featuredBlogs = blogsData.slice(0, 3);

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest">
            Expertise & Insights
          </span>
          <h2 className="section-heading mt-4">
            Skills & <span className="text-accent">Tools</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Mastering post-production technology and shareable video content strategy.
          </p>
        </motion.div>

        {/* Skills Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className={cn(
                "group relative p-6 rounded-3xl bg-card border border-border",
                "card-hover overflow-hidden"
              )}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category Header */}
              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <category.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {category.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills Tags List */}
              <div className="relative flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/80 text-xs font-medium border border-border/50 hover:border-accent/40 hover:text-accent transition-colors"
                  >
                    <skill.icon className="w-3.5 h-3.5 text-accent" />
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Primary Tools Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center border-b border-border/60 pb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Primary Production Tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "DaVinci Resolve Studio",
              "Adobe Premiere Pro",
              "After Effects",
              "Photoshop",
              "Audition",
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-xl bg-secondary text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Featured Blogs Section (Replacing Stats) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-widest mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Featured Blogs & Articles</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">
                Latest <span className="text-accent">Insights</span>
              </h3>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-medium text-sm text-accent hover:gap-3 transition-all self-start md:self-auto"
            >
              <span>Explore All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Blog Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/blogs"
              className="btn-accent inline-flex items-center gap-2 text-sm"
            >
              <span>Read Full Knowledge Base</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
