"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const credentials = [
  "RERA Registered",
  "Tech Background",
  "2 Cities",
  "Pune \u00B7 Mumbai",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function FounderSection() {
  return (
    <section className="py-20 sm:py-28 bg-primary-black">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* LEFT — Photo Placeholder (2/5 = 40%) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] rounded-2xl border-2 border-gold/30 bg-card-dark flex items-center justify-center overflow-hidden">
              {/* Subtle gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(198,169,98,0.05) 0%, transparent 40%, rgba(198,169,98,0.03) 100%)",
                }}
              />
              <span className="relative font-heading text-7xl text-gold/80 select-none">
                P
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Bio (3/5 = 60%) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-6"
          >
            {/* Label */}
            <p
              className="text-gold uppercase font-body"
              style={{ fontSize: "11px", letterSpacing: "0.3em" }}
            >
              Meet Your Advisor
            </p>

            {/* Name */}
            <h2 className="font-heading text-3xl md:text-4xl text-white">
              Prithviraj
            </h2>

            {/* Title */}
            <p className="text-sm text-gold">
              Founder &amp; Property Consultant
            </p>

            {/* Bio */}
            <div className="font-body text-base text-text-light leading-relaxed space-y-4">
              <p>
                I started Crystal Estates with one conviction: property buyers
                deserve transparency, not sales pitches. With a background in
                technology, AI automation, and manufacturing (Ojas Foods), I
                bring a data-driven approach to real estate that&apos;s rare in
                this industry.
              </p>
              <p>
                Every property I recommend has gone through rigorous title
                verification, RERA compliance check, and market analysis. I
                don&apos;t sell properties &mdash; I help you make informed
                decisions.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-2 pt-2">
              {credentials.map((cred) => (
                <span
                  key={cred}
                  className="px-3 py-1 rounded-full border border-gold/30 text-gold/80 text-xs"
                >
                  {cred}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="https://wa.me/919511750686?text=Hi%20Prithviraj%2C%20I%27d%20like%20to%20book%20a%20free%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-primary-black font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors duration-300"
              >
                Book a Free Consultation with Prithviraj
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
