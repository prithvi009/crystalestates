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
      className="relative py-14 sm:py-28 bg-bg-cream overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(198,169,98,0.10)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            Simple Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-heading text-2xl sm:text-4xl text-navy mb-4"
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
            className="text-base sm:text-lg text-navy/60 font-body"
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
                  <span className="font-heading text-4xl text-gold mb-4 relative z-10 bg-bg-cream px-3">
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
                  <h3 className="font-body text-sm uppercase tracking-wider text-navy font-semibold mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-navy/60 leading-relaxed font-body max-w-[240px]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: compact horizontal scroll of step cards */}
        <div className="lg:hidden -mx-5 px-5 sm:-mx-6 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
              className="snap-start shrink-0 w-[72%] sm:w-[44%] rounded-2xl bg-white border border-border-subtle p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-heading text-3xl text-gold leading-none">{step.number}</span>
                <span className="h-px flex-1 bg-gold/25" />
              </div>
              <h3 className="font-body text-[13px] uppercase tracking-wider text-navy font-semibold mb-1.5">
                {step.title}
              </h3>
              <p className="text-[13px] text-navy/60 leading-relaxed font-body">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
