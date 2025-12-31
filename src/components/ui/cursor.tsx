"use client";

import { motion } from "framer-motion";

export function Cursor() {
  return null; // Disabled by default - can enable for desktop
}

// Custom cursor for desktop (optional - enable if wanted)
export function CustomCursor() {
  return (
    <>
      {/* Add this to globals.css to enable:
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      */}
      <motion.div
        className="fixed w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: "var(--mouse-x, 0)",
          y: "var(--mouse-y, 0)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: "var(--mouse-x, 0)",
          y: "var(--mouse-y, 0)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}
