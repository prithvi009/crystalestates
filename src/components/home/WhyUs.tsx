"use client";

import { motion, useInView } from "framer-motion";
import { ShieldCheck, Sparkles, HeartHandshake, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface CardData {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
}

const cards: CardData[] = [
  {
    icon: ShieldCheck,
    title: "RERA Verified",
    description:
      "Every property we list is title-verified and RERA compliant. Zero risk, zero surprises.",
    number: "01",
  },
  {
    icon: Sparkles,
    title: "Tech-Powered Search",
    description:
      "AI-driven property matching, virtual tours, and real-time market data. We're not your traditional broker.",
    number: "02",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    description:
      "From property search to registration to home loan assistance. One team handles everything.",
    number: "03",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description:
      "No hidden charges. No inflated rates. What you see is what you pay.",
    number: "04",
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-charcoal overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,169,98,0.04)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(198,169,98,0.03)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold/70 text-xs sm:text-sm tracking-[0.3em] font-light uppercase mb-5"
          >
            Why Choose Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            Why 300+ Families Trust{" "}
            <span className="text-gold">Crystal Estates</span>
          </motion.h2>

          {/* Animated gold underline */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 100 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            />
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.12,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="group relative rounded-2xl p-7 sm:p-8 border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-gold/20 hover:bg-white/[0.05] hover:shadow-[0_8px_40px_rgba(198,169,98,0.06)]"
              >
                {/* Card number watermark */}
                <span className="absolute top-5 right-6 text-[13px] font-mono text-white/[0.08] tracking-wider group-hover:text-gold/[0.15] transition-colors duration-500">
                  {card.number}
                </span>

                {/* Icon container */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/[0.04] flex items-center justify-center mb-6 ring-1 ring-gold/10">
                  <Icon
                    className="w-5 h-5 text-gold"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight">
                  {card.title}
                </h3>

                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
