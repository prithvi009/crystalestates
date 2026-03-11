"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

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

  // Auto-play
  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  const visibleTestimonials = testimonials.slice(
    currentIndex * visibleCount,
    currentIndex * visibleCount + visibleCount
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex justify-center mb-6">
          <div className="w-[60px] h-[3px] bg-gold rounded-full" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center mb-14">
          What Our Clients Say
        </h2>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-400 hover:text-charcoal transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md text-gray-400 hover:text-charcoal transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden mx-6 sm:mx-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
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
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    {/* Star rating */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? "fill-gold text-gold"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="italic text-charcoal text-sm leading-relaxed mb-6">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Client info */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal text-sm">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {testimonial.location} &middot;{" "}
                          {testimonial.propertyType}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === currentIndex ? "bg-gold" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
