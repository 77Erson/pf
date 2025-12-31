"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section bg-secondary/30" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest">
            About Me
          </span>
          <h2 className="section-heading mt-4">
            The Story Behind{" "}
            <span className="text-accent">The Craft</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-card border border-border shadow-soft-lg">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/sVFVOE4M8Hs?si=2SJ6JQG4fmsaBsTl"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-soft-lg border border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Available for</p>
                  <p className="text-sm text-muted-foreground">Freelance Work</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed">{aboutData.intro}</p>
            <p className="text-muted-foreground leading-relaxed">
              {aboutData.expertise}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {aboutData.passion}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {aboutData.highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 mt-6 text-accent font-medium hover:gap-3 transition-all"
              whileHover={{ x: 5 }}
            >
              {aboutData.cta}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {aboutData.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className={cn(
                "text-center p-6 rounded-2xl bg-card border border-border",
                "card-hover"
              )}
            >
              <div className="text-3xl md:text-4xl font-bold font-display text-accent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
