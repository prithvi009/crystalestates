"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, CornerDownLeft } from "lucide-react";

interface LeadFormProps {
  source: string;
  propertyName?: string;
  propertyType?: string;
  buttonLabel?: string;
  successTitle?: string;
  successMessage?: string;
  variant?: "dark" | "light";
  onSuccess?: () => void;
  /** Keep the success state minimal (used for gated unlocks). */
  quiet?: boolean;
}

const QUESTIONS = [
  {
    key: "name",
    eyebrow: "Let's get you in",
    question: "First, what's your name?",
    placeholder: "Type your name…",
  },
  {
    key: "phone",
    eyebrow: "Almost there",
    question: "And your phone number?",
    placeholder: "98765 43210",
  },
] as const;

export default function LeadForm({
  source,
  propertyName,
  propertyType,
  buttonLabel = "Submit",
  successTitle = "You're all set!",
  successMessage = "Our team will reach out shortly.",
  variant = "dark",
  onSuccess,
  quiet = false,
}: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const dark = variant === "dark";
  const digits = phone.replace(/\D/g, "").slice(-10);
  const nameValid = name.trim().length >= 2;
  const phoneValid = /^[6-9]\d{9}$/.test(digits);
  const isLast = step === QUESTIONS.length - 1;
  const currentValid = step === 0 ? nameValid : phoneValid;

  const goNext = () => {
    if (!currentValid) {
      setError(step === 0 ? "Please enter your name" : "Enter a valid 10-digit mobile number");
      return;
    }
    setError(null);
    if (isLast) {
      void submit();
    } else {
      setDir(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setError(null);
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  async function submit() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: digits,
          source,
          propertyInterest: propertyName,
          propertyType,
          message: propertyName ? `Enquiry for ${propertyName}` : undefined,
        }),
      });
      if (!res.ok) throw new Error("failed");
      try {
        const { trackLeadConversion } = await import("@/components/analytics/GoogleAds");
        trackLeadConversion(source);
      } catch {}
      setStatus("done");
      onSuccess?.();
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again or call us.");
    }
  }

  /* ---- Success ---- */
  if (status === "done" && !quiet) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${dark ? "bg-emerald/20" : "bg-emerald/10"}`}
        >
          <CheckCircle2 className="h-8 w-8 text-emerald" />
        </motion.div>
        <p className={`font-heading text-2xl ${dark ? "text-white" : "text-navy"}`}>{successTitle}</p>
        <p className={`mt-1.5 text-sm ${dark ? "text-white/60" : "text-navy/60"}`}>{successMessage}</p>
      </motion.div>
    );
  }

  const textMuted = dark ? "text-white/55" : "text-navy/55";
  const textStrong = dark ? "text-white" : "text-navy";
  const underline = dark ? "border-white/20" : "border-navy/15";
  const placeholderCls = dark ? "placeholder:text-white/25" : "placeholder:text-navy/25";

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-1.5 mb-5">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full overflow-hidden ${dark ? "bg-white/10" : "bg-navy/10"}`}>
            <motion.div
              className="h-full bg-gold rounded-full"
              initial={false}
              animate={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden min-h-[132px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <p className={`text-[11px] uppercase tracking-[0.18em] font-semibold mb-2 ${dark ? "text-gold-light" : "text-gold-dark"}`}>
              {step + 1} / {QUESTIONS.length} · {QUESTIONS[step].eyebrow}
            </p>
            <label htmlFor={`lf-${step}`} className={`block font-heading text-xl sm:text-[1.6rem] leading-snug mb-4 ${textStrong}`}>
              {QUESTIONS[step].question}
            </label>

            <div className="flex items-end gap-2">
              {step === 1 && (
                <span className={`pb-2 text-lg font-medium ${textMuted}`}>+91</span>
              )}
              <input
                id={`lf-${step}`}
                autoFocus={step > 0}
                type={step === 1 ? "tel" : "text"}
                inputMode={step === 1 ? "numeric" : "text"}
                autoComplete={step === 1 ? "tel" : "name"}
                placeholder={QUESTIONS[step].placeholder}
                value={step === 0 ? name : phone}
                onChange={(e) =>
                  step === 0
                    ? setName(e.target.value)
                    : setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goNext();
                  }
                }}
                className={`flex-1 bg-transparent border-b-2 ${underline} focus:border-gold outline-none pb-2 text-lg sm:text-xl ${textStrong} ${placeholderCls} transition-colors`}
              />
            </div>

            {error && <p className="text-error text-xs mt-2">{error}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            aria-label="Back"
            className={`flex items-center justify-center w-11 h-11 rounded-full border transition-colors ${
              dark ? "border-white/15 text-white/70 hover:bg-white/10" : "border-navy/15 text-navy/60 hover:bg-navy/5"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          disabled={status === "loading"}
          className="group flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gold py-4 text-[15px] font-semibold text-navy shadow-[0_10px_28px_-10px_rgba(198,169,98,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              {isLast ? buttonLabel : "Continue"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>

      <p className={`mt-3 flex items-center justify-center gap-1.5 text-[11px] ${dark ? "text-white/35" : "text-navy/40"}`}>
        <CornerDownLeft className="w-3 h-3" />
        press <span className="font-semibold">Enter</span> · 100% confidential
      </p>
    </div>
  );
}
