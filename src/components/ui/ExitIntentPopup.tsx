"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && window.innerWidth >= 768) {
        setIsOpen(true);
        setHasShown(true);
      }
    },
    [hasShown]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Exit Intent Visitor",
          phone: phone.replace(/\D/g, "").slice(-10),
          source: "exit_intent",
          message: "Requested exclusive undervalued property list",
        }),
      });
    } catch {
      // Don't block the success state
    }

    setIsSubmitted(true);
    setTimeout(() => setIsOpen(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-2xl bg-card-dark border border-border-subtle p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                  <svg
                    className="h-8 w-8 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-white">
                  Thank You!
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  We will send you the property list shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="mx-auto mb-6 h-[2px] w-12 bg-gold" />

                <h2 className="text-center text-2xl font-heading font-bold text-white">
                  Wait! Don&apos;t Miss Out
                </h2>
                <p className="mt-2 text-center text-sm text-text-muted">
                  Get our exclusive list of undervalued properties before you go.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label htmlFor="exit-name" className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="exit-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full rounded-lg border border-border-subtle bg-primary-black px-4 py-3 text-sm text-white placeholder:text-text-ghost outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="exit-phone" className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="exit-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 95117 50686"
                      className="w-full rounded-lg border border-border-subtle bg-primary-black px-4 py-3 text-sm text-white placeholder:text-text-ghost outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gold-light glow-gold-hover"
                  >
                    Get Free Property List
                  </button>
                </form>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-ghost">
                  <Lock className="h-3 w-3" />
                  We respect your privacy. No spam, ever.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
