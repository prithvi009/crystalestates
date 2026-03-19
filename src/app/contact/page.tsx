"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ChevronDown,
  Send,
  CheckCircle2,
} from "lucide-react";
import { faqs } from "@/data/faqs";

/* ------------------------------------------------------------------ */
/*  Form schema (Zod v4 classic API)                                   */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/*  Subjects                                                           */
/* ------------------------------------------------------------------ */

const subjects = [
  "Property Inquiry",
  "Schedule Site Visit",
  "Investment Consultation",
  "Home Loan Assistance",
  "General Question",
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
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || "",
          source: "contact_form",
          subject: data.subject,
          message: data.message,
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

  return (
    <main className="min-h-screen overflow-hidden">
      {/* ========== HERO ========== */}
      <section className="relative bg-black pt-32 pb-24 md:pt-44 md:pb-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400"
          >
            Have questions? We&apos;d love to hear from you. Reach out and
            we&apos;ll respond within 30 minutes.
          </motion.p>
        </div>
      </section>

      {/* ========== MAIN: FORM + INFO ========== */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            {/* ---------- LEFT: FORM ---------- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
                Send Us a Message
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-gold" />

              {/* Success banner */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 flex items-center gap-3 rounded-xl border border-emerald/20 bg-emerald/5 px-5 py-4"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald" />
                    <p className="text-sm font-medium text-emerald">
                      Thank you! Your message has been sent. We&apos;ll get back
                      to you within 30 minutes.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
                noValidate
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-charcoal"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    {...register("name")}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-charcoal placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-charcoal"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...register("phone")}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-charcoal placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-charcoal"
                  >
                    Email{" "}
                    <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-charcoal placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-charcoal"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    {...register("subject")}
                    className="mt-1.5 w-full appearance-none rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-charcoal focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-charcoal"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us what you need help with..."
                    {...register("message")}
                    className="mt-1.5 w-full resize-none rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-charcoal placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald px-8 py-4 text-base font-semibold text-white transition-all hover:bg-emerald-light focus:outline-none focus:ring-2 focus:ring-emerald/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ---------- RIGHT: INFO CARD ---------- */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-2xl bg-black p-8 text-white md:p-10">
                <h3 className="text-xl font-bold">Crystal Estates</h3>

                <div className="mt-8 space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Office Address
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-gray-400">
                        Innov8, Suman Business Park,
                        <br />
                        102, Suman Business Center,
                        <br />
                        Kalyani Nagar, Pune, Maharashtra 411014
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Phone</p>
                      <a
                        href="tel:+919887073904"
                        className="mt-1 block text-sm text-gray-400 transition-colors hover:text-gold"
                      >
                        +91 98870 73904
                      </a>
                      <a
                        href="tel:+919511750686"
                        className="mt-1 block text-sm text-gray-400 transition-colors hover:text-gold"
                      >
                        +91 95117 50686
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex gap-4">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/919887073904"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm text-gray-400 transition-colors hover:text-gold"
                      >
                        +91 98870 73904
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">Email</p>
                      <a
                        href="mailto:info@crystalestates.in"
                        className="mt-1 block text-sm text-gray-400 transition-colors hover:text-gold"
                      >
                        info@crystalestates.in
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        Office Hours
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM
                      </p>
                      <p className="text-sm text-gray-400">
                        Sunday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-8 flex h-40 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <div className="text-center">
                    <MapPin className="mx-auto h-6 w-6 text-gold/50" />
                    <p className="mt-2 text-sm text-gray-500">
                      View on Google Maps
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="bg-offwhite py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mt-12 space-y-4"
          >
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className={`overflow-hidden rounded-xl border bg-white transition-colors ${
                    isOpen
                      ? "border-l-4 border-l-gold border-t-gray-100 border-r-gray-100 border-b-gray-100"
                      : "border-gray-100"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-charcoal">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-gold" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========== WHATSAPP CTA ========== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Prefer WhatsApp?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-600">
              Most of our clients reach us through WhatsApp. It&apos;s faster
              and easier.
            </p>

            <a
              href="https://wa.me/919887073904"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-10 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{
                animation: "whatsapp-pulse 2s infinite",
              }}
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
