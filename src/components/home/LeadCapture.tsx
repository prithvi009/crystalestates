"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, CheckCircle2, MessageCircle } from "lucide-react";

const leadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid 10-digit phone number")
    .max(10, "Enter a valid 10-digit phone number")
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  propertyType: z.string().min(1, "Please select a property type"),
  budget: z.string().min(1, "Please select a budget range"),
  location: z.string().min(1, "Please select a preferred location"),
  message: z.string().optional(),
  honeypot: z.string().max(0).optional(),
});

type LeadFormData = z.infer<typeof leadSchema>;

const propertyTypeOptions = [
  "Plot",
  "Flat",
  "Row House",
  "Commercial",
  "Land",
  "Not Sure",
];

const budgetOptions = [
  "Under \u20B910L",
  "\u20B910-25L",
  "\u20B925-50L",
  "\u20B950L-1Cr",
  "\u20B91-3Cr",
  "\u20B93Cr+",
];

const locationOptions = [
  "Pune",
  "PMRDA Belt",
  "Talegaon",
  "Mumbai-Andheri",
  "Mumbai-Thane",
  "Other",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      propertyType: "",
      budget: "",
      location: "",
      message: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    // Bot detection — honeypot filled means bot
    if (data.honeypot) return;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          phone: data.phone,
          source: "lead_capture",
          propertyType: data.propertyType,
          budget: data.budget,
          location: data.location,
          message: data.message || "",
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      // Track conversion
      try {
        const { trackLeadConversion } = await import(
          "@/components/analytics/GoogleAds"
        );
        trackLeadConversion("lead_capture");
      } catch {}

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border border-border-subtle bg-card-dark text-white text-sm placeholder:text-text-ghost focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";
  const selectBase =
    "w-full px-4 py-3 rounded-lg border border-border-subtle bg-card-dark text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors appearance-none";
  const labelBase = "block text-sm text-text-muted mb-1.5";
  const errorBase = "text-error text-xs mt-1";

  return (
    <section className="relative py-20 sm:py-28 bg-primary-black overflow-hidden">
      {/* Gold gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(198,169,98,0.06) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative max-w-xl mx-auto px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">
            Find Your Perfect Property
          </h2>
          <p className="text-base text-text-muted">
            Tell us what you&apos;re looking for. We respond within 30 minutes.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div variants={itemVariants}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-heading text-2xl text-white mb-2">
                Thank You!
              </h3>
              <p className="text-text-muted text-sm max-w-sm mx-auto">
                Our team will contact you shortly with personalized property
                recommendations.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Honeypot — hidden from humans */}
              <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="honeypot">Do not fill this</label>
                <input
                  id="honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("honeypot")}
                />
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className={labelBase}>
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className={inputBase}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className={errorBase}>{errors.fullName.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className={labelBase}>
                  Phone <span className="text-error">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 bg-border-subtle border border-r-0 border-border-subtle rounded-l-lg text-sm text-text-muted">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="95117 50686"
                    className={`${inputBase} rounded-l-none`}
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className={errorBase}>{errors.phone.message}</p>
                )}
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="propertyType" className={labelBase}>
                  Property Type
                </label>
                <select
                  id="propertyType"
                  className={selectBase}
                  {...register("propertyType")}
                >
                  <option value="">Select property type</option>
                  {propertyTypeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.propertyType && (
                  <p className={errorBase}>{errors.propertyType.message}</p>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className={labelBase}>
                  Budget Range
                </label>
                <select
                  id="budget"
                  className={selectBase}
                  {...register("budget")}
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className={errorBase}>{errors.budget.message}</p>
                )}
              </div>

              {/* Preferred Location */}
              <div>
                <label htmlFor="location" className={labelBase}>
                  Preferred Location
                </label>
                <select
                  id="location"
                  className={selectBase}
                  {...register("location")}
                >
                  <option value="">Select preferred location</option>
                  {locationOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className={errorBase}>{errors.location.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelBase}>
                  Message{" "}
                  <span className="text-text-ghost font-normal">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Any specific requirements..."
                  className={`${inputBase} resize-none`}
                  {...register("message")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gold text-primary-black font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Get Free Recommendations \u2192"}
              </button>
            </form>
          )}
        </motion.div>

        {/* WhatsApp + Security */}
        {!submitted && (
          <motion.div variants={itemVariants} className="mt-8 text-center space-y-3">
            <a
              href="https://wa.me/919511750686?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Crystal%20Estates%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Or WhatsApp us directly &rarr; +91 95117 50686
            </a>
            <p className="flex items-center justify-center gap-1.5 text-xs text-text-ghost">
              <Lock className="w-3.5 h-3.5" />
              Your information is secure and never shared
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
