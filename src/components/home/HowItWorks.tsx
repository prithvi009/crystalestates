"use client";

import { motion } from "framer-motion";

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
      "Fill a 2-minute form or call us. We understand your budget, location preference, and goals.",
  },
  {
    number: "02",
    title: "We Find the Best Match",
    description:
      "Our team shortlists properties, verifies titles, and prepares detailed comparison reports.",
  },
  {
    number: "03",
    title: "Visit & Decide",
    description:
      "We arrange site visits, handle negotiations, and ensure you get the best deal.",
  },
  {
    number: "04",
    title: "Hassle-Free Ownership",
    description:
      "Documentation, registration, loan assistance \u2014 we handle it all until you get the keys.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex justify-center mb-6">
          <div className="w-[60px] h-[3px] bg-gold rounded-full" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center mb-16">
          From Search to Keys in 4 Simple Steps
        </h2>

        {/* Steps - horizontal on desktop, vertical on mobile */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Desktop layout */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="absolute top-10 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-[2px] bg-gold/20" />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number circle */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-gold flex items-center justify-center mb-6 shadow-lg shadow-gold/20">
                    <span className="text-2xl font-bold text-black">
                      {step.number}
                    </span>
                  </div>

                  {/* Connector dot on line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-10 -right-4 w-2 h-2 rounded-full bg-gold hidden lg:block" />
                  )}

                  <h3 className="text-lg font-semibold text-charcoal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-[240px]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile / tablet layout (vertical) */}
          <div className="lg:hidden space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={stepVariants}
                className="relative flex gap-6"
              >
                {/* Left: number + connecting line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-lg shadow-gold/20">
                    <span className="text-xl font-bold text-black">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-[2px] flex-1 bg-gold/20 mt-2 mb-2 min-h-[40px]" />
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-10">
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
