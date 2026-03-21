"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Download } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export default function MarketReportCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "market_report",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      try {
        const { trackLeadConversion } = await import(
          "@/components/analytics/GoogleAds"
        );
        trackLeadConversion("market_report");
      } catch {}

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border border-border-medium bg-white text-text-dark text-sm placeholder:text-text-dark-muted focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";

  return (
    <section className="py-20 sm:py-28 bg-bg-light">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Report Mockup */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-72 sm:w-80 aspect-[3/4] rounded-xl bg-primary-black overflow-hidden shadow-2xl">
              {/* Gold accent bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold" />

              {/* Content */}
              <div className="relative flex flex-col justify-between h-full p-8 sm:p-10">
                <div>
                  {/* Logo placeholder */}
                  <div className="w-10 h-10 rounded-lg border border-gold/30 flex items-center justify-center mb-10">
                    <span className="font-heading text-gold text-sm">CE</span>
                  </div>

                  {/* Title */}
                  <p
                    className="text-gold uppercase font-body mb-4"
                    style={{ fontSize: "10px", letterSpacing: "0.25em" }}
                  >
                    Crystal Estates Research
                  </p>
                  <h3 className="font-heading text-xl sm:text-2xl text-white leading-tight mb-3">
                    Maharashtra
                    <br />
                    Real Estate
                    <br />
                    Market Report
                  </h3>
                  <p className="text-text-muted text-sm">Q1 2026</p>
                </div>

                {/* Bottom decorative lines */}
                <div className="space-y-2">
                  <div className="h-px bg-gold/20 w-full" />
                  <div className="h-px bg-gold/10 w-3/4" />
                  <div className="h-px bg-gold/5 w-1/2" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Label */}
            <p
              className="text-gold uppercase font-body"
              style={{ fontSize: "11px", letterSpacing: "0.3em" }}
            >
              Free Download
            </p>

            {/* Heading */}
            <h2 className="font-heading text-2xl md:text-3xl text-text-dark leading-tight">
              Maharashtra Real Estate
              <br />
              Market Report
            </h2>

            {/* Description */}
            <p className="text-text-dark-muted text-base leading-relaxed">
              Get exclusive insights into property price trends, upcoming
              infrastructure developments, and investment opportunities across
              Pune and Mumbai corridors. Data-driven analysis to help
              you make smarter buying decisions.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-3 p-5 bg-success/10 border border-success/20 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-dark text-sm font-medium">
                    Check your inbox!
                  </p>
                  <p className="text-text-dark-muted text-xs mt-1">
                    We&apos;ve sent the report to your email. Our team may also
                    reach out with personalized insights.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputBase}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputBase}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputBase}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gold text-primary-black font-semibold text-sm rounded-lg hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Download Free Report"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
