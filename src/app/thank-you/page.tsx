"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, FileSearch, MapPin, MessageCircle, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Steps data                                                         */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: Phone,
    title: "We'll call you to understand your requirements",
    description:
      "Our property consultant will reach out to discuss your budget, preferred location, and property type.",
  },
  {
    icon: FileSearch,
    title: "We'll shortlist matching properties",
    description:
      "Based on your criteria, we curate a handpicked list of RERA-verified properties that fit your needs.",
  },
  {
    icon: MapPin,
    title: "We'll arrange site visits at your convenience",
    description:
      "Schedule visits at times that work for you — weekdays or weekends, we accommodate your schedule.",
  },
];

/* ------------------------------------------------------------------ */
/*  Thank You Page                                                     */
/* ------------------------------------------------------------------ */

export default function ThankYouPage() {
  /* Fire conversion tracking on mount */
  useEffect(() => {
    import("@/components/analytics/GoogleAds")
      .then(({ trackLeadConversion }) => trackLeadConversion("thank_you"))
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-primary-black pt-36 pb-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        {/* ---- Success Icon ---- */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10"
        >
          <CheckCircle2 className="h-10 w-10 text-gold" />
        </motion.div>

        {/* ---- Heading ---- */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="font-heading text-4xl md:text-5xl text-white mb-4"
        >
          We&rsquo;ve Got Your Request
        </motion.h1>

        {/* ---- Subheading ---- */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-body text-lg text-text-muted mb-14 max-w-xl mx-auto"
        >
          Our team will contact you within 30 minutes during business hours.
        </motion.p>

        {/* ---- What Happens Next ---- */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="font-heading text-2xl text-white mb-10"
        >
          What Happens Next
        </motion.h2>

        <div className="grid gap-6 text-left mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={i + 3}
              className="flex gap-5 items-start rounded-2xl bg-card-dark border border-border-subtle p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/10">
                <step.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="font-body text-base font-semibold text-white mb-1">
                  Step {i + 1}: {step.title}
                </p>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ---- WhatsApp CTA ---- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={6}
          className="mb-10"
        >
          <a
            href="https://wa.me/919511750686"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-green-600 hover:bg-green-500 transition-colors px-8 py-4 font-body text-base font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Can&rsquo;t wait? Chat with us now
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* ---- Explore Projects Link ---- */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={7}
          className="font-body text-text-muted"
        >
          Meanwhile, explore our featured projects{" "}
          <Link
            href="/projects"
            className="text-gold hover:text-gold/80 transition-colors underline underline-offset-4"
          >
            View Projects <ArrowRight className="inline h-4 w-4" />
          </Link>
        </motion.p>
      </div>
    </main>
  );
}
