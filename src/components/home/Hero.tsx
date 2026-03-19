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
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
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
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #C6A962 0%, transparent 70%)",
            top: "-20%",
            right: "-10%",
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background:
              "radial-gradient(circle, #C6A962 0%, transparent 70%)",
            bottom: "-15%",
            left: "-5%",
          }}
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, #FAFAFA 0%, transparent 70%)",
            top: "40%",
            left: "30%",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Noise/grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)]" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating trust badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-white/70 text-xs sm:text-sm tracking-wide font-light">
              Trusted by 300+ families across Maharashtra
            </span>
          </div>
        </motion.div>

        {/* Gold accent line that draws in */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 120, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" as const }}
          />
        </motion.div>

        {/* Gold label */}
        <motion.p
          variants={itemVariants}
          className="text-gold/80 text-xs sm:text-sm tracking-[0.35em] font-light mb-8 uppercase"
        >
          Premium Real Estate Consultancy
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white max-w-5xl mx-auto leading-[0.95] tracking-tight"
        >
          Your Future{" "}
          <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Address
          </span>
          <br />
          Starts Here
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Premium plots, row houses, and investment properties across Mumbai,
          Pune &amp; Solapur&apos;s fastest-growing corridors.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="#properties"
            className="group relative inline-flex items-center px-9 py-4 bg-gold text-black font-semibold rounded-xl text-sm sm:text-base transition-all duration-500 hover:shadow-[0_0_40px_rgba(198,169,98,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10">Explore Properties</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <a
            href="https://wa.me/919887073904?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20with%20Crystal%20Estates."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-9 py-4 rounded-xl text-sm sm:text-base font-semibold text-white border border-white/[0.12] bg-white/[0.04] backdrop-blur-md transition-all duration-500 hover:bg-white/[0.08] hover:border-white/[0.2] hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Free Consultation
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-0"
        >
          {trustItems.map((item, index) => (
            <span key={item} className="flex items-center text-white/35 text-sm sm:text-[15px] font-light tracking-wide">
              {index > 0 && (
                <span className="hidden sm:inline-block mx-5 w-[1px] h-4 bg-white/10" />
              )}
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-light">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
