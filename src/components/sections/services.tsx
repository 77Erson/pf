"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Video, Handshake, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    title: "Content Strategy",
    description:
      "Before we shoot or edit anything, I help you figure out what to create, how to structure it, and how to build a system you can repeat, so every piece of content compounds into a consistent, recognizable brand instead of standing alone.",
    icon: Lightbulb,
    tags: ["Content Systems", "Brand Positioning", "Audience Growth", "Structure & Scripting"],
    highlightColor: "from-amber-500/20 via-amber-500/10 to-transparent",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    number: "02",
    title: "Video Production & Post-Production",
    description:
      "Turning raw footage into polished, on-brand content - editing, motion graphics, color grading, and sound design, all built around your brand's voice, tone, and pacing, not just clean cuts.",
    icon: Video,
    tags: ["Video Editing", "Motion Graphics", "Color Grading", "Sound Design"],
    highlightColor: "from-blue-500/20 via-blue-500/10 to-transparent",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    number: "03",
    title: "Content Partnership",
    description:
      "An ongoing creative partner for brands and founders who need consistent, on-brand content every month, so you're not rebuilding your content strategy from scratch every time you publish.",
    icon: Handshake,
    tags: ["Monthly Retainer", "Dedicated Partner", "Volume Output", "Ongoing Strategy"],
    highlightColor: "from-emerald-500/20 via-emerald-500/10 to-transparent",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
];

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section bg-background relative overflow-hidden" ref={ref}>
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            Services
          </span>
          <h2 className="section-heading mt-4">
            Strategic Content & <span className="text-accent">Production</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            End-to-end video solutions designed to elevate your brand, drive engagement, and convert viewers into loyal fans.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
              className="group relative flex flex-col justify-between p-8 rounded-3xl bg-card border border-border/80 hover:border-accent/50 shadow-soft transition-all duration-300 hover:shadow-soft-lg overflow-hidden"
            >
              {/* Card Gradient Overlay on Hover */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  service.highlightColor
                )}
              />

              <div className="relative z-10">
                {/* Header Row: Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-4xl text-accent/40 group-hover:text-accent transition-colors duration-300">
                    {service.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-secondary border border-border group-hover:bg-accent/10 group-hover:border-accent/30 flex items-center justify-center transition-all duration-300">
                    <service.icon className="w-6 h-6 text-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-xl mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5",
                        service.badgeColor
                      )}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="relative z-10 pt-4 border-t border-border/60">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-foreground group-hover:text-accent transition-colors duration-300"
                >
                  <span>Discuss This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 p-4 px-6 rounded-2xl bg-card border border-border shadow-soft">
            <span className="text-sm text-muted-foreground">
              Not sure which service fits your current stage?
            </span>
            <a
              href="https://calendly.com/erson/consultation-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent hover:underline flex items-center gap-1"
            >
              Book A 15-Minutes Call <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
