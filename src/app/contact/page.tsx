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
  ArrowRight,
} from "lucide-react";
import { faqs } from "@/data/faqs";

/* ------------------------------------------------------------------ */
/*  Form schema                                                        */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"),
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
/*  FAQPage JSON-LD                                                    */
/* ------------------------------------------------------------------ */

function FAQSchema() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
  );
}

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
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // honeypot check
    if (data.honeypot) return;

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

      // Track conversion
      try {
        const { trackLeadConversion } = await import(
          "@/components/analytics/GoogleAds"
        );
        trackLeadConversion("contact_form");
      } catch {}

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      alert("Something went wrong. Please try again or call us directly.");
    }
  };

  /* shared input classes */
  const inputCls =
    "mt-1.5 w-full rounded-xl border border-border-subtle bg-card-dark px-4 py-3 text-white placeholder:text-text-ghost focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

  return (
    <>
      <FAQSchema />
      <main className="min-h-screen overflow-hidden">
        {/* ========== MAIN 2-COLUMN SECTION ========== */}
        <section className="bg-primary-black pt-36 pb-20 md:pt-44 md:pb-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
              {/* ---------- LEFT: HEADING + FORM ---------- */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
                  Let&apos;s Talk Property
                </h1>
                <p className="mt-4 text-lg text-text-muted">
                  Reach out. We respond within 30 minutes.
                </p>

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
                        Thank you! Your message has been sent. We&apos;ll get
                        back to you within 30 minutes.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-10 space-y-6"
                  noValidate
                >
                  {/* Honeypot */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register("honeypot")}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text-light"
                    >
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      {...register("name")}
                      className={inputCls}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-error">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-text-light"
                    >
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-ghost">
                        +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="95117 50686"
                        {...register("phone")}
                        className={`${inputCls} mt-0 pl-12`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-error">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text-light"
                    >
                      Email{" "}
                      <span className="text-text-ghost">(optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className={inputCls}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-error">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text-light"
                    >
                      Subject <span className="text-gold">*</span>
                    </label>
                    <select
                      id="subject"
                      {...register("subject")}
                      className={`${inputCls} appearance-none`}
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
                      <p className="mt-1.5 text-sm text-error">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-light"
                    >
                      Message <span className="text-gold">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us what you need help with..."
                      {...register("message")}
                      className={`${inputCls} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-error">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-base font-semibold text-primary-black transition-all hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-black border-t-transparent" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* ---------- RIGHT: INFO CARD ---------- */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="rounded-2xl border border-border-subtle bg-card-dark p-8 md:p-10">
                  <h3 className="font-heading text-xl font-bold text-white">
                    Crystal Estates
                  </h3>

                  <div className="mt-8 space-y-6">
                    {/* Address */}
                    <div className="flex gap-4">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-medium text-text-light">
                          Office Address
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted">
                          Solapur, Maharashtra
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-medium text-text-light">
                          Phone
                        </p>
                        <a
                          href="tel:+919511750686"
                          className="mt-1 block text-sm text-text-muted transition-colors hover:text-gold"
                        >
                          +91 95117 50686
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-medium text-text-light">
                          Email
                        </p>
                        <a
                          href="mailto:info@crystalestates.in"
                          className="mt-1 block text-sm text-text-muted transition-colors hover:text-gold"
                        >
                          info@crystalestates.in
                        </a>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex gap-4">
                      <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-medium text-text-light">
                          WhatsApp
                        </p>
                        <a
                          href="https://wa.me/919511750686"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 block text-sm text-text-muted transition-colors hover:text-gold"
                        >
                          +91 95117 50686
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-4">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <div>
                        <p className="text-sm font-medium text-text-light">
                          Office Hours
                        </p>
                        <p className="mt-1 text-sm text-text-muted">
                          Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM
                        </p>
                        <p className="text-sm text-text-muted">
                          Sunday: By Appointment Only
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="mt-8 border-t border-border-subtle pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-ghost">
                      Follow Us
                    </p>
                    <div className="mt-4 flex gap-3">
                      {[
                        {
                          label: "Instagram",
                          abbr: "IG",
                          href: "https://instagram.com/crystalestates.in",
                        },
                        {
                          label: "YouTube",
                          abbr: "YT",
                          href: "https://youtube.com/@crystalestates",
                        },
                        {
                          label: "LinkedIn",
                          abbr: "Li",
                          href: "https://linkedin.com/company/crystalestates",
                        },
                      ].map((social) => (
                        <a
                          key={social.abbr}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-xs font-semibold text-text-muted transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold"
                        >
                          {social.abbr}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="mt-8 flex h-40 items-center justify-center rounded-xl border border-border-subtle bg-primary-black/50">
                    <div className="text-center">
                      <MapPin className="mx-auto h-6 w-6 text-gold/50" />
                      <p className="mt-2 text-sm text-text-ghost">
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
        <section className="bg-deep-black py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
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
                    className={`overflow-hidden rounded-xl border transition-colors ${
                      isOpen
                        ? "border-gold/30 bg-card-dark"
                        : "border-border-subtle bg-card-dark/50"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base font-semibold text-white">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-colors ${
                            isOpen ? "text-gold" : "text-text-ghost"
                          }`}
                        />
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
                          <div className="px-6 pb-5 text-sm leading-relaxed text-text-muted">
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
        <section className="bg-primary-black py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Prefer WhatsApp?
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-lg text-text-muted">
                Most of our clients reach us through WhatsApp. It&apos;s faster
                and easier.
              </p>

              <a
                href="https://wa.me/919511750686"
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
    </>
  );
}
