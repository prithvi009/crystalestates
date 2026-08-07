"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface LeadFormProps {
  source: string;
  propertyName?: string;
  propertyType?: string;
  buttonLabel?: string;
  successTitle?: string;
  successMessage?: string;
  variant?: "dark" | "light";
  onSuccess?: () => void;
  /** Keep the success state minimal (used for the floor-plan unlock). */
  quiet?: boolean;
}

export default function LeadForm({
  source,
  propertyName,
  propertyType,
  buttonLabel = "Request a Callback",
  successTitle = "Thank you!",
  successMessage = "Our team will reach out shortly.",
  variant = "dark",
  onSuccess,
  quiet = false,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const dark = variant === "dark";
  const digits = phone.replace(/\D/g, "").slice(-10);
  const valid = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(digits);

  const fieldBase =
    "w-full rounded-xl pl-11 pr-4 py-3.5 text-[15px] outline-none transition-all duration-200 border";
  const fieldTheme = dark
    ? "bg-white/10 border-white/15 text-white placeholder:text-white/40 focus:border-gold focus:ring-2 focus:ring-gold/30"
    : "bg-bg-cream border-border-medium text-navy placeholder:text-navy/40 focus:border-gold focus:ring-2 focus:ring-gold/25";
  const iconTheme = dark ? "text-white/45" : "text-navy/40";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || status === "loading") return;
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

  if (status === "done" && !quiet) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${dark ? "bg-emerald/20" : "bg-emerald/10"}`}>
          <CheckCircle2 className="h-7 w-7 text-emerald" />
        </div>
        <p className={`font-heading text-xl ${dark ? "text-white" : "text-navy"}`}>{successTitle}</p>
        <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-navy/60"}`}>{successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 ${iconTheme}`} style={{ width: 18, height: 18 }} />
        <input
          type="text"
          inputMode="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${fieldBase} ${fieldTheme}`}
        />
      </div>
      <div className="relative">
        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[15px] ${dark ? "text-white/55" : "text-navy/50"}`}>
          <Phone style={{ width: 18, height: 18 }} className={iconTheme} />
        </span>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${fieldBase} ${fieldTheme}`}
        />
      </div>

      {error && <p className="text-error text-xs">{error}</p>}

      <button
        type="submit"
        disabled={!valid || status === "loading"}
        className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-[15px] font-semibold text-navy transition-all duration-300 hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {buttonLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className={`text-center text-[11px] ${dark ? "text-white/40" : "text-navy/40"}`}>
        🔒 Your details are safe · No spam, ever
      </p>
    </form>
  );
}
