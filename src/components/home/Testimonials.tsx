"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex((index + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1, 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1, -1);
  }, [currentIndex, goTo]);

  // Auto-play with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext, isPaused]);

  const current = testimonials[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
    }),
  };

  return (
    <section className="py-20 sm:py-28 bg-bg-light relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-text-dark mb-4">
            What Our Clients Say
          </h2>
          <motion.div
            className="mx-auto h-[3px] bg-gold rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          />
        </div>

        {/* Testimonial display */}
        <div
          className="relative text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Giant gold quote mark */}
          <span className="font-heading text-9xl text-gold opacity-15 leading-none select-none pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
            &ldquo;
          </span>

          {/* Quote area */}
          <div className="min-h-[220px] sm:min-h-[200px] flex items-center justify-center relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-3xl mx-auto"
              >
                {/* Quote text */}
                <p className="font-heading text-xl md:text-2xl italic text-text-dark leading-relaxed text-center px-4 sm:px-8">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Gold line divider */}
                <div className="flex justify-center my-6">
                  <div className="w-[40px] h-[2px] bg-gold rounded-full" />
                </div>

                {/* Name & detail */}
                <p className="font-body text-base font-semibold text-text-dark">
                  {current.name}
                </p>
                <p className="text-sm text-text-dark-muted mt-0.5">
                  {current.location} &middot; {current.propertyType}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={goPrev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-text-dark-muted hover:border-gold hover:text-gold transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > currentIndex ? 1 : -1)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="p-0.5"
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: i === currentIndex ? 20 : 6,
                      height: 6,
                      backgroundColor:
                        i === currentIndex
                          ? "var(--color-gold)"
                          : "#D1D5DB",
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-text-dark-muted hover:border-gold hover:text-gold transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
