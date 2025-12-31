"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Play, X, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const categories = [
  { key: "all", label: "All Projects" },
  { key: "commercial", label: "Commercial" },
  { key: "youtube", label: "YouTube" },
  { key: "social", label: "Social Media" },
  { key: "music", label: "Music Videos" },
];

export function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="section bg-secondary/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="section-heading mt-4">
            Featured <span className="text-accent">Work</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            A showcase of projects that demonstrate creativity, precision, and
            storytelling excellence.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                activeCategory === cat.key
                  ? "bg-accent text-accent-foreground"
                  : "bg-card border border-border hover:border-accent/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative"
              >
                <div
                  className={cn(
                    "relative aspect-video rounded-2xl overflow-hidden bg-muted",
                    "border border-border hover:border-accent/50 transition-all duration-300"
                  )}
                >
                  {/* YouTube Embed */}
                  {project.youtubeId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${project.youtubeId}`}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {/* Placeholder for thumbnail */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent" />
                      <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-accent ml-1" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Info Below */}
                <div className="mt-4">
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-lg bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
            whileHover={{ x: 5 }}
          >
            Have a project in mind? Let&apos;s talk
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl bg-card rounded-3xl overflow-hidden border border-border shadow-soft-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-background/50 hover:bg-background transition-colors"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Thumbnail */}
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-background/80 flex items-center justify-center">
                    <Play className="w-8 h-8 text-accent ml-1" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-lg bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {selectedProject.year && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {selectedProject.year}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold">
                  {selectedProject.title}
                </h3>

                {selectedProject.client && (
                  <p className="text-accent text-sm mt-1">
                    Client: {selectedProject.client}
                  </p>
                )}

                <p className="text-muted-foreground mt-4 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="flex gap-3 mt-6">
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="btn-accent"
                  >
                    Start a Similar Project
                  </a>
                  <button
                    className="btn-outline"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
