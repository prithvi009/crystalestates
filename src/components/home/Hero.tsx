"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const trustItems = [
  "RERA Registered",
  "75+ Properties",
  "\u20B9150Cr+ Transactions",
  "300+ Happy Families",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(198,169,98,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(198,169,98,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,169,98,0.08)_0%,transparent_70%)]" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Gold label */}
        <motion.p
          variants={itemVariants}
          className="text-gold text-xs sm:text-sm tracking-[0.3em] font-medium mb-6"
        >
          PREMIUM REAL ESTATE CONSULTANCY
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight"
        >
          Your Future Address Starts Here
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Premium plots, row houses, and investment properties across Mumbai,
          Pune &amp; Solapur&apos;s fastest-growing corridors.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#properties"
            className="inline-flex items-center px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300 text-sm sm:text-base"
          >
            Explore Properties
          </Link>
          <a
            href="https://wa.me/919887073904?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20with%20Crystal%20Estates."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3.5 border border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300 text-sm sm:text-base"
          >
            Book a Free Consultation
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-0"
        >
          {trustItems.map((item, index) => (
            <span key={item} className="flex items-center text-gray-400 text-xs sm:text-sm">
              {index > 0 && (
                <span className="hidden sm:inline mx-3 text-gold/40">|</span>
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-gold/60" />
      </motion.div>
    </section>
  );
}
