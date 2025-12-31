"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            Expertise
          </span>
          <h2 className="section-heading mt-4">
            Skills & <span className="text-accent">Tools</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Mastering the art of visual storytelling through professional tools
            and techniques.
          </p>
        </motion.div>

        {/* Skills Categories */}
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

              {/* Skills List */}
              <div className="relative space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                    }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <skill.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: catIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full gradient-accent"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Primary Tools I Work With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "DaVinci Resolve",
              "Adobe Premiere Pro",
              "After Effects",
              "Photoshop",
              "Audition",
            ].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="px-4 py-2 rounded-xl bg-secondary text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors cursor-default"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
