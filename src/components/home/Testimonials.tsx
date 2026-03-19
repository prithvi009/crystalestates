"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive visible count
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / visibleCount);

  const goToPage = useCallback(
    (page: number) => {
      setDirection(page > currentIndex ? 1 : -1);
      setCurrentIndex(page);
    },
    [currentIndex]
  );

  const goNext = useCallback(() => {
    goToPage((currentIndex + 1) % totalPages);
  }, [currentIndex, totalPages, goToPage]);

  const goPrev = useCallback(() => {
    goToPage((currentIndex - 1 + totalPages) % totalPages);
  }, [currentIndex, totalPages, goToPage]);

  // Auto-play with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext, isPaused]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * visibleCount,
    currentIndex * visibleCount + visibleCount
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 sm:py-28 bg-black relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="testimonial-grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="#C6A962" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonial-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <motion.div
            className="mx-auto h-[3px] bg-gold rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        {/* Carousel */}
        <div
          className="relative"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden mx-8 sm:mx-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`grid gap-6 ${
                  visibleCount === 3
                    ? "grid-cols-3"
                    : visibleCount === 2
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {visibleTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-7 sm:p-8"
                  >
                    {/* Large quotation mark */}
                    <span className="absolute top-5 left-6 text-6xl leading-none text-gold/20 font-serif select-none pointer-events-none">
                      &ldquo;
                    </span>

                    {/* Star rating */}
                    <div className="flex gap-1 mb-5 relative z-10">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "fill-gold text-gold"
                              : "fill-white/10 text-white/10"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-white/90 text-lg leading-relaxed mb-7 relative z-10">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Client info */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shrink-0">
                        <span className="text-black font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {testimonial.location}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-gold/80 border border-gold/30 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                        {testimonial.propertyType}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Go to testimonial page ${i + 1}`}
                className="relative py-1"
              >
                <motion.div
                  className="h-2 rounded-full"
                  animate={{
                    width: i === currentIndex ? 28 : 10,
                    backgroundColor:
                      i === currentIndex
                        ? "rgb(198, 169, 98)"
                        : "rgba(255, 255, 255, 0.2)",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
