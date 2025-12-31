"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      // Hide the "back online" message after 3 seconds
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium shadow-lg ${
            isOnline
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4" />
              Back online
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              You&apos;re offline
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
