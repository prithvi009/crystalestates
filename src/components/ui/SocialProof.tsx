"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialProofMessages } from "@/data/testimonials";

export default function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const showNext = useCallback(() => {
    setIsVisible(true);

    // Hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return hideTimer;
  }, []);

  // Initial delay of 10 seconds before starting
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, 10000);

    return () => clearTimeout(startTimer);
  }, []);

  // Show/cycle logic after start
  useEffect(() => {
    if (!hasStarted) return;

    // Show immediately on start
    const hideTimer = showNext();

    // Cycle every 30 seconds
    const cycleInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % socialProofMessages.length);
      showNext();
    }, 30000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(cycleInterval);
    };
  }, [hasStarted, showNext]);

  // When index changes (after initial), show the message
  useEffect(() => {
    if (!hasStarted || currentIndex === 0) return;
    const hideTimer = showNext();
    return () => clearTimeout(hideTimer);
  }, [currentIndex, hasStarted, showNext]);

  const message = socialProofMessages[currentIndex];
  if (!message) return null;

  const firstLetter = message.name.charAt(0).toUpperCase();

  return (
    <div className="fixed bottom-24 left-6 z-40 max-w-[320px]">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-xl border border-offwhite"
          >
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-black text-sm font-bold">
              {firstLetter}
            </div>

            {/* Content */}
            <div className="min-w-0">
              <p className="text-sm text-charcoal leading-snug">
                <span className="font-semibold">{message.name}</span>{" "}
                <span className="text-charcoal/70">from {message.city}</span>{" "}
                <span className="text-charcoal/80">{message.action}</span>
              </p>
              <p className="mt-1 text-xs text-charcoal/50">Just now</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
