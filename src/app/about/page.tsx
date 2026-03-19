"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Shield,
  Cpu,
  Heart,
  Target,
  ArrowRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated counter component                                         */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      animate(motionVal, target, { duration, ease: "easeOut" as const });
    }
  }, [inView, motionVal, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { target: 75, suffix: "+", label: "Properties Listed" },
  { target: 300, suffix: "+", label: "Happy Clients" },
  { target: 150, prefix: "\u20B9", suffix: "Cr+", label: "Transactions" },
  { target: 4.8, suffix: "\u2605", label: "Google Rating", isDecimal: true },
];

const values = [
  {
    icon: Shield,
    title: "Transparency",
    desc: "No hidden fees, no inflated prices. We believe in clear, honest communication at every step.",
  },
  {
    icon: Cpu,
    title: "Technology",
    desc: "Data-driven insights, virtual tours, and digital processes. Real estate, reimagined.",
  },
  {
    icon: Heart,
    title: "Trust",
    desc: "Verified properties, clear documentation, and RERA compliance. Your peace of mind is our priority.",
  },
  {
    icon: Target,
    title: "Tenacity",
    desc: "We don't stop until you find the perfect property. Our team goes the extra mile, every time.",
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
      <section className="relative bg-black pt-36 pb-28 md:pt-48 md:pb-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
          >
            Our Story
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Building Trust, One Property at a Time
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
          >
            Crystal Estates is Maharashtra&apos;s trusted real estate
            consultancy, combining technology with transparency across Mumbai, Pune &amp; Solapur.
          </motion.p>
        </div>
      </section>

      {/* ========== STORY ========== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl font-bold text-charcoal md:text-4xl"
              >
                Who We Are
              </motion.h2>

              <motion.div
                variants={fadeUp}
                custom={1}
                className="mt-4 h-1 w-16 rounded-full bg-gold"
              />

              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-8 text-lg leading-relaxed text-gray-600"
              >
                Crystal Estates was founded with a simple mission: make real
                estate transparent, accessible, and tech-forward. Based in
                Pune, Maharashtra, we serve buyers and investors across
                Mumbai, Pune, and Solapur — the state&apos;s most dynamic growth corridors.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-5 text-lg leading-relaxed text-gray-600"
              >
                We&apos;re not your traditional broker. We combine data-driven
                market intelligence with on-ground expertise to help you make
                informed property decisions. Every property goes through our
                rigorous verification process&nbsp;&mdash; title check, RERA
                compliance, legal review&nbsp;&mdash; before it reaches you.
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={4}
                className="mt-5 text-lg leading-relaxed text-gray-600"
              >
                Whether you&apos;re buying your first home, investing in land,
                or an NRI looking to invest back home, Crystal Estates is your
                trusted partner.
              </motion.p>
            </motion.div>

            {/* Visual placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-charcoal"
            >
              {/* Geometric pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(198,169,98,0.3)_49%,rgba(198,169,98,0.3)_51%,transparent_52%)] bg-[length:40px_40px]" />
                <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,rgba(198,169,98,0.3)_49%,rgba(198,169,98,0.3)_51%,transparent_52%)] bg-[length:40px_40px]" />
              </div>

              {/* CE monogram */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-gold/30">
                <span className="text-5xl font-bold tracking-wider text-gold/60">
                  CE
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== NUMBERS ========== */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl bg-white p-6 text-center shadow-sm md:p-8"
              >
                <span className="block text-4xl font-bold text-gold md:text-5xl">
                  {stat.isDecimal ? (
                    /* For 4.8 we just display it statically to avoid decimal rounding */
                    <DecimalCounter target={stat.target} suffix={stat.suffix ?? ""} />
                  ) : (
                    <AnimatedCounter
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  )}
                </span>
                <span className="mt-2 block text-sm font-medium text-charcoal md:text-base">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-charcoal md:text-4xl"
          >
            Meet the Team
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-12 max-w-lg rounded-3xl border border-gray-100 bg-white p-8 shadow-lg md:p-10"
          >
            {/* Avatar placeholder */}
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-charcoal">
              <span className="text-3xl font-bold text-gold">RS</span>
            </div>

            <h3 className="mt-6 text-2xl font-bold text-charcoal">
              Rahul Sharma
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide text-gold">
              Founder &amp; Chief Consultant
            </p>

            <p className="mt-5 text-base leading-relaxed text-gray-600">
              With over 8 years in real estate and a background in technology,
              Rahul founded Crystal Estates to bring transparency and
              data-driven decision making to Maharashtra&apos;s property market.
              With deep knowledge of growth corridors across Mumbai, Pune, and
              Solapur, he leads a team that has helped 200+ families find their
              dream properties.
            </p>

            {/* Social placeholder */}
            <div className="mt-6 flex justify-center gap-3">
              {["Li", "Tw", "Ig"].map((label) => (
                <span
                  key={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-offwhite text-xs font-semibold text-charcoal transition-colors hover:bg-gold hover:text-black"
                >
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== VALUES ========== */}
      <section className="bg-black py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-3xl font-bold text-white md:text-4xl"
          >
            Our Values
          </motion.h2>

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
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-gold/30 hover:bg-white/[0.08] md:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {v.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
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
            className="text-3xl font-bold text-black md:text-4xl"
          >
            Ready to find your dream property?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-gold transition-transform hover:scale-105"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-gold"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Decimal counter (e.g. 4.8)                                         */
/* ------------------------------------------------------------------ */

function DecimalCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      animate(motionVal, target, { duration: 2, ease: "easeOut" as const });
    }
  }, [inView, motionVal, target]);

  useEffect(() => {
    const unsubscribe = motionVal.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toFixed(1)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [motionVal, suffix]);

  return <span ref={ref}>0.0{suffix}</span>;
}
