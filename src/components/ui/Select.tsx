"use client";

import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[] | readonly SelectOption[];
  placeholder?: string;
  className?: string;
  /** "light" = white field (default), "dark" = navy field */
  variant?: "light" | "dark";
}

function normalize(
  options: readonly string[] | readonly SelectOption[]
): SelectOption[] {
  return options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o
  );
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  className = "",
  variant = "light",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const opts = normalize(options);
  const selected = opts.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isDark = variant === "dark";

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-xs mb-1.5 font-medium ${isDark ? "text-white/60" : "text-navy/60"}`}
        >
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`group w-full flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-[15px] text-left transition-all duration-200 border ${
          isDark
            ? "bg-navy-light/40 border-white/15 text-white hover:border-gold/60"
            : "bg-white border-border-medium text-navy hover:border-gold"
        } ${open ? "border-gold ring-2 ring-gold/25" : ""}`}
      >
        <span className={selected ? "" : isDark ? "text-white/40" : "text-navy/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isDark ? "text-white/60" : "text-navy/50"} ${open ? "rotate-180 text-gold" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full max-h-64 overflow-auto rounded-xl border border-border-subtle bg-white py-1.5 shadow-[0_16px_44px_rgba(16,42,67,0.18)] scrollbar-hide"
          >
            {opts.map((opt) => {
              const active = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-[15px] text-left transition-colors ${
                      active
                        ? "bg-gold/10 text-gold-dark font-semibold"
                        : "text-navy/80 hover:bg-bg-cream"
                    }`}
                  >
                    {opt.label}
                    {active && <Check className="w-4 h-4 text-gold-dark shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
