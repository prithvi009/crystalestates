"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const cities = ["Solapur", "Pune", "Mumbai"];

const stats = [
  { value: "3 Cities" },
  { value: "RERA Registered" },
  { value: "Tech-Powered" },
];

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center bg-primary-black overflow-hidden">
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

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center lg:items-center gap-16 lg:gap-10 pt-24 lg:pt-0">
        {/* LEFT SIDE — 60% */}
        <div className="w-full lg:w-[60%]">
          {/* Gold label */}
          <motion.p
            className="text-gold text-[11px] tracking-[0.3em] uppercase font-body"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            RERA Registered Consultancy
          </motion.p>

          {/* Gold line */}
          <motion.div
            className="mt-4 mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 50, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="h-[2px] w-full bg-gold" />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            Find Your
            <br />
            Next Address
            <br />
            <span className="text-gradient-gold">in Maharashtra</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="mt-8 font-body text-lg text-text-muted max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          >
            Premium plots, row houses, and apartments across Solapur, Pune &amp;
            Mumbai. Title-verified. RERA compliant. Data-driven.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center px-8 py-4 bg-gold text-black font-semibold rounded-lg text-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(198,169,98,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">Explore Projects</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold-light to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 rounded-lg text-sm font-semibold text-gold border border-gold/40 transition-all duration-500 hover:bg-gold/10 hover:border-gold/70 hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Free Consultation
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SIDE — 40% stat column */}
        <motion.div
          className="w-full lg:w-[40%] flex flex-row lg:flex-col items-center lg:items-end gap-8 lg:gap-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          {/* City names */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2">
            {cities.map((city, i) => (
              <motion.span
                key={city}
                className="text-sm font-body text-text-ghost hover:text-white transition-colors duration-300 cursor-default tracking-wider uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                {city}
              </motion.span>
            ))}
          </div>

          {/* Gold line divider */}
          <motion.div
            className="hidden lg:block w-[1px] h-12 bg-gold/40"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="lg:hidden w-12 h-[1px] bg-gold/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          />

          {/* Stat items */}
          <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2">
            {stats.map((stat, i) => (
              <motion.span
                key={stat.value}
                className="text-xs font-body text-text-muted tracking-wider uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.6 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                {stat.value}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-light font-body">
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
