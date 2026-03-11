"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the viewport
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

  // Lock body scroll when open
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

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Exit Intent Visitor",
          phone: phone.replace(/\D/g, "").slice(-10),
          email,
          source: "exit_intent",
          message: "Requested exclusive undervalued property list",
        }),
      });
    } catch {
      // Don't block the success state on API failure
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-charcoal/60 transition-colors duration-200 hover:bg-offwhite hover:text-charcoal"
            >
              <X className="h-5 w-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10">
                  <svg
                    className="h-8 w-8 text-emerald"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-charcoal">
                  Thank You!
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  We will send you the property list shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Gold accent */}
                <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-gold" />

                <h2 className="text-center text-2xl font-heading font-bold text-charcoal">
                  Wait! Don&apos;t Miss Out
                </h2>
                <p className="mt-2 text-center text-sm text-charcoal/60">
                  Get our exclusive list of undervalued properties before you
                  go.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div>
                    <label
                      htmlFor="exit-phone"
                      className="block text-xs font-medium uppercase tracking-wider text-charcoal/60 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="exit-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98870 73904"
                      className="w-full rounded-lg border border-charcoal/15 bg-offwhite px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="exit-email"
                      className="block text-xs font-medium uppercase tracking-wider text-charcoal/60 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="exit-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-charcoal/15 bg-offwhite px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
                  >
                    Get Free Property List
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-charcoal/40">
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
