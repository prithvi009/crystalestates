"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Tell Us What You Want",
    description:
      "Fill a 2-min form or call us. We understand your budget, location, and goals.",
  },
  {
    number: "02",
    title: "We Find the Best Match",
    description:
      "Title search, RERA check, comparison report \u2014 we do the heavy lifting.",
  },
  {
    number: "03",
    title: "Visit & Decide",
    description:
      "Accompanied site visits, negotiation support, complete transparency.",
  },
  {
    number: "04",
    title: "Hassle-Free Ownership",
    description:
      "Documentation, registration, loan assistance \u2014 until you get the keys.",
  },
];

function GoldConnectingLine() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={lineRef}
      className="absolute top-[40px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-[1px] overflow-hidden"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-gold/60 via-gold to-gold/60 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-primary-black overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(198,169,98,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl text-white mb-4"
          >
            How It Works
          </motion.h2>

          <motion.div
            className="mx-auto h-[2px] bg-gold rounded-full mb-5"
            initial={{ width: 0 }}
            animate={isInView ? { width: 50 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base text-text-muted font-body"
          >
            From first call to keys in hand
          </motion.p>
        </div>

        {/* Desktop layout: horizontal 4-column with connecting gold line */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Animated gold connecting line */}
            <GoldConnectingLine />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.18,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Gold number */}
                  <span className="font-heading text-5xl text-gold mb-4 relative z-10 bg-primary-black px-3">
                    {step.number}
                  </span>

                  {/* Gold line below number */}
                  <motion.div
                    className="w-8 h-[2px] bg-gold/60 rounded-full mb-6"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 32 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.18,
                    }}
                  />

                  {/* Title */}
                  <h3 className="font-body text-sm uppercase tracking-wider text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-muted leading-relaxed font-body max-w-[240px]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet layout: vertical with dashed connecting line */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical dashed connecting line */}
            <div
              className="absolute left-[28px] top-0 bottom-0 w-[1px]"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(198,169,98,0.4) 6px, transparent 6px)",
                backgroundSize: "1px 12px",
                backgroundRepeat: "repeat-y",
              }}
            />

            <div className="space-y-10">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.15,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="relative flex gap-6 items-start"
                >
                  {/* Number circle */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-primary-black border border-gold/40 flex items-center justify-center shrink-0">
                    <span className="font-heading text-xl text-gold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-1 flex-1">
                    <h3 className="font-body text-sm uppercase tracking-wider text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed font-body">
                      {step.description}
                    </p>
                    {/* Gold accent line */}
                    <div className="w-6 h-[1px] bg-gold/40 mt-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
