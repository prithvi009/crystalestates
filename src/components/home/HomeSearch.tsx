"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, X } from "lucide-react";
import Select, { type SelectOption } from "@/components/ui/Select";
import { propertyTypes, locations, budgetRanges } from "@/lib/constants";

function withFriendlyAll(opts: readonly string[], allLabel: string): SelectOption[] {
  return opts.map((o, i) => (i === 0 ? { value: o, label: allLabel } : { value: o, label: o }));
}

const typeOpts = withFriendlyAll(propertyTypes, "Any type");
const budgetOpts = withFriendlyAll(budgetRanges, "Any budget");
const AREAS = locations.slice(1); // drop "All"

/* ---------------------------------------------------------------- */
/*  Typeable location autocomplete (Airbnb-style)                    */
/* ---------------------------------------------------------------- */
function LocationField({
  bare,
  text,
  setText,
}: {
  bare?: boolean;
  text: string;
  setText: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const q = text.trim().toLowerCase();
  const matches = q ? AREAS.filter((a) => a.toLowerCase().includes(q)) : AREAS;
  const exact = AREAS.some((a) => a.toLowerCase() === q);

  return (
    <div className={`relative ${bare ? "flex-1 min-w-0" : ""}`} ref={ref}>
      {bare ? (
        <div className={`rounded-full px-5 py-2 transition-colors ${open ? "bg-navy/[0.05]" : ""}`}>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/45">
            Location
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => { setText(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder="Search area…"
            className="w-full bg-transparent outline-none text-sm text-navy placeholder:text-navy/40 font-medium"
          />
        </div>
      ) : (
        <>
          <label className="block text-xs mb-1.5 font-medium text-navy/60">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40 pointer-events-none" />
            <input
              type="text"
              value={text}
              onChange={(e) => { setText(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder="Type an area…"
              className="w-full rounded-xl border border-border-medium bg-white pl-10 pr-4 py-3 text-[15px] text-navy placeholder:text-navy/40 outline-none focus:border-gold focus:ring-2 focus:ring-gold/25 transition-all"
            />
          </div>
        </>
      )}

      {open && (
        <ul className={`absolute z-50 mt-2 max-h-64 overflow-auto rounded-xl border border-border-subtle bg-white py-1.5 shadow-[0_16px_44px_rgba(16,42,67,0.18)] scrollbar-hide ${bare ? "min-w-[240px] w-max max-w-[80vw] left-3" : "w-full left-0"}`}>
          {q && !exact && (
            <li>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[15px] text-left text-navy hover:bg-bg-cream"
              >
                <Search className="w-4 h-4 text-gold shrink-0" />
                Search “<span className="font-semibold">{text.trim()}</span>”
              </button>
            </li>
          )}
          {matches.map((a) => (
            <li key={a}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setText(a); setOpen(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[15px] text-left text-navy/80 hover:bg-bg-cream"
              >
                <MapPin className="w-4 h-4 text-navy/35 shrink-0" />
                {a}
              </button>
            </li>
          ))}
          {matches.length === 0 && !q && (
            <li className="px-4 py-2.5 text-sm text-navy/45">No areas</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function HomeSearch() {
  const router = useRouter();
  const [locText, setLocText] = useState("");
  const [type, setType] = useState("All");
  const [budget, setBudget] = useState("All");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const search = () => {
    const p = new URLSearchParams();
    const loc = locText.trim();
    if (loc) {
      const known = AREAS.find((a) => a.toLowerCase() === loc.toLowerCase());
      if (known) p.set("location", known);
      else p.set("q", loc);
    }
    if (type !== "All") p.set("type", type);
    if (budget !== "All") p.set("budget", budget);
    const qs = p.toString();
    setSheetOpen(false);
    router.push(qs ? `/properties?${qs}` : "/properties");
  };

  const summary = [
    locText.trim() || null,
    type !== "All" ? type : null,
    budget !== "All" ? budget : null,
  ].filter(Boolean).join(" · ");

  return (
    <div>
      {/* ── Desktop: Airbnb-style pill ── */}
      <div className="hidden sm:flex items-center gap-1 bg-white rounded-full border border-border-subtle shadow-[0_16px_44px_-16px_rgba(16,42,67,0.3)] p-2">
        <LocationField bare text={locText} setText={setLocText} />
        <span className="h-9 w-px bg-border-subtle shrink-0" />
        <Select bare label="Type" value={type} onChange={setType} options={typeOpts} className="flex-1 min-w-0" />
        <span className="h-9 w-px bg-border-subtle shrink-0" />
        <Select bare label="Budget" value={budget} onChange={setBudget} options={budgetOpts} menuAlign="right" className="flex-1 min-w-0" />
        <button
          onClick={search}
          aria-label="Search properties"
          className="ml-1 shrink-0 inline-flex items-center gap-2 rounded-full bg-navy text-white font-semibold pl-5 pr-6 py-3.5 transition-colors duration-300 hover:bg-gold hover:text-navy"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* ── Mobile: compact "Start your search" pill ── */}
      <button
        onClick={() => setSheetOpen(true)}
        className="sm:hidden w-full flex items-center gap-3 bg-white rounded-full border border-border-subtle shadow-[0_10px_30px_-12px_rgba(16,42,67,0.35)] pl-4 pr-2 py-2 text-left active:scale-[0.99] transition-transform"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gold/15 shrink-0">
          <Search className="w-4 h-4 text-gold-dark" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold text-navy leading-tight truncate">
            {summary || "Start your search"}
          </span>
          <span className="block text-xs text-navy/50 leading-tight">
            {summary ? "Tap to edit" : "Location · Type · Budget"}
          </span>
        </span>
      </button>

      {/* ── Mobile: bottom sheet ── */}
      <AnimatePresence>
        {sheetOpen && (
          <motion.div
            className="fixed inset-0 z-[70] sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={() => setSheetOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
              className="absolute bottom-0 left-0 right-0 bg-bg-light rounded-t-3xl p-5 pb-8 shadow-[0_-10px_40px_rgba(16,42,67,0.25)]"
            >
              <div className="mx-auto mb-5 h-1.5 w-11 rounded-full bg-navy/15" />
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading text-2xl text-navy">Find your home</h3>
                <button
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-border-subtle text-navy/60"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <LocationField text={locText} setText={setLocText} />
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Type" value={type} onChange={setType} options={typeOpts} />
                  <Select label="Budget" value={budget} onChange={setBudget} options={budgetOpts} />
                </div>
              </div>

              <button
                onClick={search}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-navy text-white font-semibold py-4 text-base transition-colors duration-300 active:bg-gold active:text-navy"
              >
                <Search className="w-4 h-4" />
                Search Properties
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
