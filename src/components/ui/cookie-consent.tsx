"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Enable analytics after consent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
    // Disable analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-custom">
            <div className="relative bg-card border border-border rounded-2xl p-4 md:p-6 shadow-soft-lg flex flex-col md:flex-row items-start md:items-center gap-4">
              {/* Close button */}
              <button
                onClick={declineCookies}
                className="absolute top-3 right-3 p-1 rounded-lg hover:bg-secondary transition-colors md:hidden"
                aria-label="Close cookie banner"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon */}
              <div className="hidden md:flex w-12 h-12 rounded-xl bg-accent/10 items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-accent" />
              </div>

              {/* Text */}
              <div className="flex-1 pr-6 md:pr-0">
                <p className="text-sm md:text-base">
                  <span className="font-medium">We use cookies</span> to enhance
                  your experience and analyze site traffic. By clicking
                  &quot;Accept&quot;, you consent to our use of cookies.
                </p>
                <a
                  href="/privacy"
                  className="text-sm text-accent hover:underline mt-1 inline-block"
                >
                  Learn more
                </a>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={declineCookies}
                  className="flex-1 md:flex-none px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm font-medium"
                >
                  Decline
                </button>
                <motion.button
                  onClick={acceptCookies}
                  className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add gtag type to window
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
