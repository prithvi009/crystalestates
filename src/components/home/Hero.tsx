"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";
import HomeSearch from "./HomeSearch";

const ease = [0.25, 0.4, 0.25, 1] as const;

export default function Hero() {
  return (
    <section className="relative bg-bg-light">
      {/* Soft gold glow accent */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(198,169,98,0.12)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-28 pb-10 lg:pb-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
          {/* ── VISUAL (desktop only — mobile stays clean) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease }}
            className="relative order-1 lg:order-2 hidden lg:block"
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

          {/* ── SEARCH (mobile: bottom) ── */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="max-w-xl lg:max-w-none"
            >
              <HomeSearch />
              <p className="mt-4 text-sm text-navy/55">
                or{" "}
                <Link href="/contact" className="font-semibold text-gold-dark hover:text-gold inline-flex items-center gap-1">
                  book a free consultation
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
