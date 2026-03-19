"use client";

import { motion, useInView } from "framer-motion";
import { Search, MapPin, FileCheck, KeyRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Tell Us What You Want",
    description:
      "Fill a 2-minute form or call us. We understand your budget, location preference, and goals.",
    icon: Search,
  },
  {
    number: "02",
    title: "We Find the Best Match",
    description:
      "Our team shortlists properties, verifies titles, and prepares detailed comparison reports.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Visit & Decide",
    description:
      "We arrange site visits, handle negotiations, and ensure you get the best deal.",
    icon: FileCheck,
  },
  {
    number: "04",
    title: "Hassle-Free Ownership",
    description:
      "Documentation, registration, loan assistance \u2014 we handle it all until you get the keys.",
    icon: KeyRound,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-offwhite overflow-hidden">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(198,169,98,0.06)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold-dark text-xs sm:text-sm tracking-[0.3em] font-light uppercase mb-5"
          >
            How It Works
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal leading-tight"
          >
            From Search to Keys in{" "}
            <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </motion.h2>
        </div>

        {/* Desktop layout: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting dashed line */}
            <motion.div
              className="absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-[1px]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(198,169,98,0.3) 6px, transparent 6px)",
                  backgroundSize: "12px 1px",
                  backgroundRepeat: "repeat-x",
                }}
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + index * 0.15,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="relative flex flex-col items-center"
                  >
                    {/* Number circle with gold gradient */}
                    <div className="relative z-10 w-[104px] h-[104px] rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mb-8 shadow-lg shadow-gold/15">
                      <span className="text-2xl font-bold text-black tracking-tight">
                        {step.number}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="group relative w-full bg-white rounded-2xl p-7 shadow-sm border border-gray-100/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-l-gold hover:border-l-2">
                      {/* Large watermark number */}
                      <span className="absolute top-3 right-5 text-[48px] font-bold leading-none text-charcoal/[0.03] tracking-tighter pointer-events-none select-none">
                        {step.number}
                      </span>

                      <div className="flex items-center gap-2.5 mb-3">
                        <Icon className="w-[18px] h-[18px] text-gold" strokeWidth={1.5} />
                        <h3 className="text-[17px] font-semibold text-charcoal tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-500 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet layout: vertical */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.12,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="relative flex gap-5 sm:gap-6"
              >
                {/* Left column: circle + connecting line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shrink-0 shadow-md shadow-gold/15">
                    <span className="text-lg font-bold text-black">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-[1px] flex-1 mt-3 mb-3 min-h-[40px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(198,169,98,0.3) 4px, transparent 4px)",
                        backgroundSize: "1px 8px",
                        backgroundRepeat: "repeat-y",
                      }}
                    />
                  )}
                </div>

                {/* Right column: content card */}
                <div className="pb-8 flex-1">
                  <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80">
                    {/* Watermark number */}
                    <span className="absolute top-2 right-4 text-[40px] font-bold leading-none text-charcoal/[0.03] tracking-tighter pointer-events-none select-none">
                      {step.number}
                    </span>

                    <div className="flex items-center gap-2.5 mb-2">
                      <Icon className="w-[18px] h-[18px] text-gold" strokeWidth={1.5} />
                      <h3 className="text-lg font-semibold text-charcoal">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
