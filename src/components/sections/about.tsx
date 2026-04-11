"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";

export function About() {
  const ref = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAvailableCard, setShowAvailableCard] = useState(true);

  useEffect(() => {
    // YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    let player: any;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (iframeRef.current) {
        player = new (window as any).YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: any) => {
              // 0 = ENDED
              if (event.data === 0) {
                setShowAvailableCard(false);
              }
            },
          },
        });
      }
    };

    return () => {
      document.body.removeChild(tag);
    };
  }, []);

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
                ref={iframeRef}
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
            {showAvailableCard && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute -bottom-9 -right-1 bg-card p-3 rounded-xl shadow-soft-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-xs">
                    <p className="font-medium leading-tight">Available for</p>
                    <p className="text-muted-foreground">Freelance work</p>
                  </div>
                </div>
              </motion.div>
            )}
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
