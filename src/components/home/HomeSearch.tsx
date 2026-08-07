"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
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
    router.push(qs ? `/properties?${qs}` : "/properties");
  };

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

      {/* ── Mobile: stacked card ── */}
      <div className="sm:hidden bg-white rounded-2xl border border-border-subtle shadow-[0_16px_40px_-16px_rgba(16,42,67,0.3)] p-3 space-y-2.5">
        <LocationField text={locText} setText={setLocText} />
        <div className="grid grid-cols-2 gap-2.5">
          <Select label="Type" value={type} onChange={setType} options={typeOpts} />
          <Select label="Budget" value={budget} onChange={setBudget} options={budgetOpts} />
        </div>
        <button
          onClick={search}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy text-white font-semibold py-3.5 text-base transition-colors duration-300 hover:bg-gold hover:text-navy"
        >
          <Search className="w-4 h-4" />
          Search Properties
        </button>
      </div>
    </div>
  );
}
