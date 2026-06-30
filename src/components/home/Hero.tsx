"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "RERA", label: "Registered" },
  { value: "2", label: "Cities" },
  { value: "100%", label: "Title-Verified" },
];

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function Hero() {
  return (
    <section className="relative bg-bg-light overflow-hidden">
      {/* Soft gold glow accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(198,169,98,0.12)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-28 pb-16 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── VISUAL (mobile: top) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[60vh] lg:min-h-[440px] lg:max-h-[560px] shadow-[0_30px_80px_-20px_rgba(16,42,67,0.35)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://res.cloudinary.com/ditxq9glo/video/upload/so_0,f_jpg,w_1200,q_60/11630727-uhd_3840_2160_25fps_tla7lg.jpg"
              >
                <source
                  src="https://res.cloudinary.com/ditxq9glo/video/upload/w_1280,q_auto,f_mp4/11630727-uhd_3840_2160_25fps_tla7lg.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

              {/* Floating location chip */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-xs font-medium text-navy shadow-lg">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                Pune &amp; Mumbai
              </div>
            </div>

            {/* Floating trust card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="absolute -bottom-5 left-4 right-4 sm:left-8 sm:right-auto bg-white rounded-2xl px-5 py-4 shadow-[0_16px_40px_rgba(16,42,67,0.14)] flex items-center gap-4"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gold/15 shrink-0">
                <ShieldCheck className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy leading-tight">RERA-verified listings</p>
                <p className="text-xs text-navy/55">Transparent. Title-checked.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── TEXT (mobile: bottom) ── */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="section-label"
            >
              RERA Registered Consultancy
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-5 font-heading text-[2.65rem] leading-[1.05] sm:text-6xl lg:text-7xl text-navy tracking-tight"
            >
              Find your next
              <br />
              address in
              <br />
              <span className="text-gradient-gold">Maharashtra</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="mt-6 text-lg sm:text-xl text-navy/65 max-w-md leading-relaxed"
            >
              Plots, homes &amp; apartments across Pune and Mumbai. Verified. Transparent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/properties"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-navy text-white font-semibold rounded-full text-base transition-all duration-300 hover:bg-gold hover:text-navy"
              >
                Explore Properties
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full text-base font-semibold text-navy border border-navy/20 transition-all duration-300 hover:border-gold hover:text-gold-dark"
              >
                Book Free Consultation
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease }}
              className="mt-10 flex border-t border-navy/10 pt-6 max-w-md"
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 ${i > 0 ? "border-l border-navy/10 pl-5" : ""} ${i < stats.length - 1 ? "pr-5" : ""}`}
                >
                  <p className="font-heading text-3xl text-navy leading-none">{s.value}</p>
                  <p className="text-sm text-navy/55 mt-2">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
