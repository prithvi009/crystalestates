"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Cpu,
  Heart,
  Target,
  ArrowRight,
  Database,
  Sparkles,
  Eye,
  MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const approach = [
  {
    icon: Database,
    title: "Data-Driven",
    desc: "We analyze sub-registrar data, growth corridors, and infrastructure plans before recommending any property.",
  },
  {
    icon: Sparkles,
    title: "Tech-First",
    desc: "AI-powered lead management, CRM tracking, and digital marketing capabilities no other broker in our market offers.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "Every property goes through title verification, RERA compliance check, and market valuation before we present it to you.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Transparency",
    desc: "No hidden fees, no inflated prices. We believe in clear, honest communication at every step of your property journey.",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Data-driven insights, AI automation, and digital processes. Real estate, reimagined for the modern buyer.",
  },
  {
    icon: Heart,
    title: "Trust",
    desc: "Verified properties, clear documentation, and RERA compliance. Your peace of mind is our priority.",
  },
  {
    icon: Target,
    title: "Tenacity",
    desc: "We don\u2019t stop until you find the perfect property. We go the extra mile, every single time.",
  },
];

const cities = [
  {
    name: "Solapur",
    desc: "Emerging investment hub with rapid infrastructure growth along the Pune-Solapur expressway. Plots, farmhouses, and residential developments.",
  },
  {
    name: "Pune",
    desc: "Maharashtra\u2019s tech capital. Premium apartments, township plots, and commercial spaces across Hinjewadi, Wakad, Baner, and beyond.",
  },
  {
    name: "Mumbai",
    desc: "India\u2019s financial capital. Luxury apartments, redevelopment projects, and high-yield commercial investments across MMR.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative bg-primary-black pt-36 pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl"
          >
            Built Different
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted"
          >
            Crystal Estates isn&apos;t your typical brokerage. We&apos;re a
            technology-powered real estate consultancy built for the age of
            transparency.
          </motion.p>
        </div>
      </section>

      {/* ========== OUR APPROACH ========== */}
      <section className="bg-bg-light py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-text-dark md:text-4xl">
              Our Approach
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {approach.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="rounded-2xl border border-text-dark/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-text-dark">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-text-dark-muted">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== OUR VALUES ========== */}
      <section className="bg-primary-black py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Our Values
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  custom={i}
                  className="group rounded-2xl border border-border-subtle bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/30 hover:bg-white/[0.08] md:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {v.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== WHERE WE OPERATE ========== */}
      <section className="bg-bg-light py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-text-dark md:text-4xl">
              Where We Operate
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                variants={fadeUp}
                custom={i}
                className="group rounded-2xl border border-text-dark/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-text-dark">
                  {city.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-text-dark-muted">
                  {city.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="bg-gold py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-bold text-primary-black md:text-4xl"
          >
            Ready to find your dream property?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-lg text-lg text-primary-black/70"
          >
            Let&apos;s start with a free, no-obligation consultation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-primary-black px-8 py-3.5 text-sm font-semibold text-gold transition-transform hover:scale-105"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-black px-8 py-3.5 text-sm font-semibold text-primary-black transition-colors hover:bg-primary-black hover:text-gold"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
