"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
} from "lucide-react";

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
});

type LeadFormData = z.infer<typeof leadSchema>;

const propertyTypeOptions = [
  "Plot",
  "Row House",
  "Flat",
  "Commercial",
  "Land",
  "Not Sure",
];

const budgetOptions = [
  "Under \u20B910L",
  "\u20B910-25L",
  "\u20B925-50L",
  "\u20B950L-1Cr",
  "\u20B91Cr+",
];

const locationOptions = [
  "Solapur City",
  "Pune-Solapur Highway",
  "PMRDA Belt",
  "Solapur Outskirts",
  "Other",
];

const trustBadges = [
  { icon: ShieldCheck, text: "RERA Registered" },
  { icon: Star, text: "4.8\u2605 Google Rating" },
  { icon: Award, text: "5+ Years Experience" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
    },
  });

  const onSubmit = async (data: LeadFormData) => {
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

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";
  const selectBase =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors appearance-none";
  const labelBase = "block text-sm font-medium text-charcoal mb-1.5";
  const errorBase = "text-red-500 text-xs mt-1";

  return (
    <section className="py-20 sm:py-24 bg-offwhite relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(198,169,98,0.5) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex justify-center mb-6">
          <div className="w-[60px] h-[3px] bg-gold rounded-full" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center mb-14">
          Find Your Perfect Property in 2 Minutes
        </h2>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* LEFT: Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className={labelBase}>
                  Full Name <span className="text-red-400">*</span>
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
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-sm text-gray-500">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="9887073904"
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
                  Property Type <span className="text-red-400">*</span>
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

              {/* Budget */}
              <div>
                <label htmlFor="budget" className={labelBase}>
                  Budget Range <span className="text-red-400">*</span>
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

              {/* Location */}
              <div>
                <label htmlFor="location" className={labelBase}>
                  Preferred Location <span className="text-red-400">*</span>
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
                  <span className="text-gray-400 font-normal">(optional)</span>
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
                className="w-full py-3.5 bg-emerald text-white font-semibold rounded-lg hover:bg-emerald-light transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting
                  ? "Submitting..."
                  : "Get Free Property Recommendations"}
              </button>

              <p className="text-gray-500 text-sm text-center">
                We typically respond within 30 minutes during business hours
              </p>

              {/* Success message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-emerald/10 border border-emerald/20 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                  <p className="text-emerald text-sm font-medium">
                    Thank you! Our team will contact you shortly with
                    personalized property recommendations.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* RIGHT: Trust section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="bg-black rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">
                Your Trusted Real Estate Partner
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Crystal Estates has been helping families find their dream
                properties across Solapur and Pune for over 5 years. With RERA
                verified listings, transparent pricing, and end-to-end support,
                we make property buying simple, safe, and stress-free.
              </p>

              {/* Trust badges */}
              <div className="space-y-4 mb-8">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.text}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-sm font-medium text-gray-200">
                        {badge.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                {/* Phone */}
                <a
                  href="tel:+919887073904"
                  className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors"
                >
                  <Phone className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium">+91 98870 73904</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919887073904?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Crystal%20Estates%20properties."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  <span className="text-sm font-medium">
                    Chat on WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
