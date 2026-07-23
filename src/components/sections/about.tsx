"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, ArrowRight, Star } from "lucide-react";
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
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            About Me
          </span>
          <h2 className="section-heading mt-4">
            The Story Behind <span className="text-accent">The Craft</span>
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
                className="absolute -bottom-7 -right-1 bg-card p-3 rounded-xl shadow-soft-lg border border-border"
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

            {/* Rating Breakdown Card (Replaces Highlights) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-border/80 shadow-soft-lg space-y-4 text-xs"
            >
              {/* Profile Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-bold text-accent text-sm overflow-hidden">
                    <span>E</span>
                    
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Erson</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>4.9</span>
                        <span className="text-muted-foreground font-normal">(48)</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Online</span>
                      <span>•</span>
                      <span>Avg response time: 3 hours</span>
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.fiverr.com/s/BRk6mpW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-secondary hover:bg-accent/10 hover:text-accent border border-border transition-colors"
                >
                  <span>Get Info</span>
                </a>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Column: Star Rating Distribution */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-medium mb-2 text-muted-foreground">
                    <span className="font-semibold text-foreground text-xs">48 Reviews</span>
                    <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                      <span className="ml-1 text-foreground">4.9</span>
                    </div>
                  </div>

                  {[
                    { stars: "5 Stars", count: 45, percentage: 94 },
                    { stars: "4 Stars", count: 3, percentage: 6 },
                    { stars: "3 Stars", count: 0, percentage: 0 },
                    { stars: "2 Stars", count: 0, percentage: 0 },
                    { stars: "1 Star", count: 0, percentage: 0 },
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-2 text-[11px]">
                      <span className="w-12 text-muted-foreground shrink-0">{item.stars}</span>
                      <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-foreground/80 dark:bg-foreground/90 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-muted-foreground shrink-0">({item.count})</span>
                    </div>
                  ))}
                </div>

                {/* Right Column: Rating Breakdown Metrics */}
                <div className="space-y-2.5 sm:border-l sm:border-border/60 sm:pl-4 pt-2 sm:pt-0">
                  <p className="font-semibold text-foreground mb-1 text-xs">Rating Breakdown</p>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Seller communication level</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 5
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Quality of delivery</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.9
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Value of delivery</span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 4.9
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

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
