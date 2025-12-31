"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, Linkedin, Heart, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";

// Fiverr SVG icon as a component
const FiverrSvg = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.878-.476l1.453.4c-.36.82-1.201 1.288-2.343 1.288-1.668 0-2.72-1.063-2.72-2.586 0-1.522 1.052-2.586 2.665-2.586 1.554 0 2.42.947 2.42 2.47v.632zm-1.514-1.026c-.087-.443-.41-.741-.893-.741-.508 0-.832.323-.919.741h1.812zm-5.304 2.33c.508 0 .85-.235.85-.545 0-.362-.21-.482-.85-.612-.894-.192-1.975-.449-1.975-1.671 0-1.012.805-1.72 2.132-1.72 1.143 0 1.987.54 2.245 1.406l-1.453.399c-.086-.318-.362-.534-.805-.534-.436 0-.72.178-.72.48 0 .362.272.457.896.575.867.174 1.923.436 1.923 1.695 0 1.098-.88 1.77-2.256 1.77-1.213 0-2.12-.58-2.406-1.462l1.492-.4c.124.412.42.618.927.618zm-3.172-3.952h1.61v4.874h-1.61v-4.874zm-.795-1.879a.988.988 0 0 1 .994-.982.991.991 0 0 1 .997.982.992.992 0 0 1-.997.983.988.988 0 0 1-.994-.983zm-3.91 4.274h2.803v1.295H3.074v-6.633H6.8v1.295H4.683v1.618h1.915v1.295H4.683v1.13h-.002z" />
  </svg>
);

interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon | typeof FiverrSvg;
}

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/erson.editz/",
    icon: Instagram,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ersoneditz",
    icon: Youtube,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ersoneditz/",
    icon: Linkedin,
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/s/BRk6mpW",
    icon: FiverrSvg,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-2"
          >
            <a
              href="#home"
              className="font-display text-xl font-bold tracking-tight"
            >
              <span className="text-accent">E</span>RSON
            </a>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} {siteConfig.alias}.  All rights
              reserved.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
