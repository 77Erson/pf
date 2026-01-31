"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/erson.editz/",
    icon: "/icons/instagram.svg",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@ersoneditz",
    icon: "/icons/youtube.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/ersoneditz/",
    icon: "/icons/linkedin.svg",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/s/BRk6mpW",
    icon: "/icons/fiverr.svg",
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
            {socialLinks.map((social) => (
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
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 dark:invert"
                />
              </motion.a>
            ))}
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
