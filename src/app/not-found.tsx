"use client";

import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background grain">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 */}
          <h1 className="font-display text-8xl md:text-9xl font-bold">
            4<span className="text-accent">0</span>4
          </h1>

          {/* Message */}
          <p className="text-xl md:text-2xl text-muted-foreground mt-6 mb-8">
            Oops! This page seems to have been edited out.
          </p>

          {/* CTA */}
          <motion.a
            href="/"
            className="btn-accent inline-flex"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Home
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
