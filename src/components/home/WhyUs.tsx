"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, HeartHandshake, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CardData {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: CardData[] = [
  {
    icon: ShieldCheck,
    title: "RERA Verified",
    description:
      "Every property we list is title-verified and RERA compliant. Zero risk, zero surprises.",
  },
  {
    icon: Sparkles,
    title: "Tech-Powered Search",
    description:
      "AI-driven property matching, virtual tours, and real-time market data. We're not your traditional broker.",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    description:
      "From property search to registration to home loan assistance. One team handles everything.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description:
      "No hidden charges. No inflated rates. What you see is what you pay.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WhyUs() {
  return (
    <section className="py-20 sm:py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gold accent line */}
        <div className="flex justify-center mb-6">
          <div className="w-[60px] h-[3px] bg-gold rounded-full" />
        </div>

        {/* Section title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center mb-14">
          Why 200+ Families Trust Crystal Estates
        </h2>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariants}
                className="bg-white rounded-xl p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-charcoal mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
