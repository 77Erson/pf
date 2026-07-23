"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Organizations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const organizations = [
    {
      name: "Kantipur Media Group",
      logo: "/image/kantipur-media-group.webp",
      href: "https://kmg.com.np/",
    },
    {
      name: "Uptrendly Media",
      logo: "/image/uptrendly-media.webp",
      href: "https://www.uptrendly.com/",
    },
    {
      name: "CG Communications",
      logo: "/image/cg-communications.webp",
      href: "https://cgnet.com.np/",
    },
    {
      name: "Compass Wealth Management",
      logo: "/image/compass-wealth-management.webp",
      href: "https://www.compasswm.net/",
    },
    {
      name: "Xtreme Energy Drink",
      logo: "/image/xtreme.webp",
      href: "https://www.instagram.com/xtreme_energydrink/?hl=en",
    },
    {
      name: "Monaco Pool",
      logo: "/image/monaco-pool.webp",
      href: "https://monacopool.com/",
    },
    {
      name: "Huskey Turf Solutions",
      logo: "/image/huskey-turf-solutions.webp",
      href: "https://www.huskeyturf.com/",
    },
    {
      name: "Paper Son Coffee",
      logo: "/image/paper-son-coffee.webp",
      href: "https://papersoncoffee.com/",
    },
    {
      name: "Snap Clean",
      logo: "/image/snap-clean.webp",
      href: "https://snapcleanhome.com/",
    },
  ];

  const scrollingOrganizations = [...organizations, ...organizations];

  return (
    <section id="organizations" className="section bg-secondary/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            Partners
          </span>
          <h2 className="section-heading mt-4">
            Associated <span className="text-accent">Organizations</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
            Proud to have collaborated with these amazing organizations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="organization-ticker relative overflow-hidden bg-background/60 py-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card to-transparent" />

            <div className="flex w-max animate-organization-scroll gap-6 pr-6">
              {scrollingOrganizations.map((organization, index) => (
                <motion.a
                  key={`${organization.name}-${index}`}
                  href={organization.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/15 shadow-md shadow-accent/5 transition-transform duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/20 md:h-24 md:w-24"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.04 }}
                  aria-label={`Visit ${organization.name}`}
                >
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-background/95 p-2.5 ring-1 ring-border/70 shadow-sm md:h-16 md:w-16">
                    <img
                      alt={`${organization.name} logo`}
                      src={organization.logo}
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
