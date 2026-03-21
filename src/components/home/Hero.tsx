"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const cities = ["Pune", "Mumbai"];

const stats = [
  { value: "2 Cities" },
  { value: "RERA Registered" },
  { value: "Tech-Powered" },
];

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center bg-primary-black overflow-hidden">
      {/* Background video — all devices */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://res.cloudinary.com/ditxq9glo/video/upload/so_0,f_jpg,w_1920,q_60/11630727-uhd_3840_2160_25fps_tla7lg.jpg"
        >
          <source
            src="https://res.cloudinary.com/ditxq9glo/video/upload/w_1280,q_auto,f_mp4/11630727-uhd_3840_2160_25fps_tla7lg.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.7)_100%)]" />

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
            Premium plots, row houses, and apartments across Pune &amp;
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

        {/* RIGHT SIDE — desktop: vertical stat column, mobile: horizontal trust pills */}

        {/* Desktop stat column */}
        <motion.div
          className="hidden lg:flex w-[40%] flex-col items-end gap-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-end gap-2">
            {cities.map((city, i) => (
              <motion.span
                key={city}
                className="text-sm font-body text-text-ghost hover:text-white transition-colors duration-300 cursor-default tracking-wider uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: "easeOut" }}
              >
                {city}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="w-[1px] h-12 bg-gold/40"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          />
          <div className="flex flex-col items-end gap-2">
            {stats.map((stat, i) => (
              <motion.span
                key={stat.value}
                className="text-xs font-body text-text-muted tracking-wider uppercase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 + i * 0.1, ease: "easeOut" }}
              >
                {stat.value}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator — hidden on mobile */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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
