"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, CheckCircle2, MessageCircle } from "lucide-react";
import Select from "@/components/ui/Select";

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
  "Flat",
  "Commercial",
  "Row House",
  "Land",
  "Not Sure",
];

const budgetOptions = [
  "Under \u20B950L",
  "\u20B950L - \u20B91Cr",
  "\u20B91Cr - \u20B91.5Cr",
  "\u20B91.5Cr - \u20B92Cr",
  "\u20B92Cr - \u20B93Cr",
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
    control,
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
    "w-full px-4 py-3.5 rounded-xl border border-border-subtle bg-white text-navy text-base placeholder:text-text-ghost focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors";
  const labelBase = "block text-sm text-navy/70 mb-1.5 font-medium";
  const errorBase = "text-error text-xs mt-1";

  return (
    <section className="relative py-14 sm:py-24 bg-bg-light overflow-hidden">
      {/* Gold gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(198,169,98,0.10) 0%, transparent 70%)",
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
        <motion.div variants={itemVariants} className="text-center mb-8">
          <p className="section-label mb-4">Get Started</p>
          <h2 className="font-heading text-2xl sm:text-4xl text-navy mb-4">
            Find your perfect property
          </h2>
          <p className="text-base sm:text-lg text-navy/60">
            Tell us what you&apos;re looking for. We reply within 30 minutes.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl p-6 sm:p-8 card-elevate border border-border-subtle">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-heading text-2xl text-navy mb-2">
                Thank You!
              </h3>
              <p className="text-navy/60 text-sm max-w-sm mx-auto">
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
                  <span className="inline-flex items-center px-3.5 bg-bg-cream border border-r-0 border-border-subtle rounded-l-xl text-base text-navy/70">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="76662 29818"
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
                <Controller
                  control={control}
                  name="propertyType"
                  render={({ field }) => (
                    <Select
                      label="Property Type"
                      placeholder="Select property type"
                      value={field.value}
                      onChange={field.onChange}
                      options={propertyTypeOptions}
                    />
                  )}
                />
                {errors.propertyType && (
                  <p className={errorBase}>{errors.propertyType.message}</p>
                )}
              </div>

              {/* Budget Range */}
              <div>
                <Controller
                  control={control}
                  name="budget"
                  render={({ field }) => (
                    <Select
                      label="Budget Range"
                      placeholder="Select budget range"
                      value={field.value}
                      onChange={field.onChange}
                      options={budgetOptions}
                    />
                  )}
                />
                {errors.budget && (
                  <p className={errorBase}>{errors.budget.message}</p>
                )}
              </div>

              {/* Preferred Location */}
              <div>
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <Select
                      label="Preferred Location"
                      placeholder="Select preferred location"
                      value={field.value}
                      onChange={field.onChange}
                      options={locationOptions}
                    />
                  )}
                />
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
                className="w-full py-4 bg-navy text-white font-semibold rounded-full hover:bg-gold hover:text-navy transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
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
              href="https://wa.me/917666229818?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Crystal%20Estates%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-emerald transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Or WhatsApp us directly &rarr; +91 76662 29818
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
