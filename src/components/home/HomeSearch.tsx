"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Select, { type SelectOption } from "@/components/ui/Select";
import { propertyTypes, locations, budgetRanges } from "@/lib/constants";

function withFriendlyAll(opts: readonly string[], allLabel: string): SelectOption[] {
  return opts.map((o, i) => (i === 0 ? { value: o, label: allLabel } : { value: o, label: o }));
}

const locationOpts = withFriendlyAll(locations, "Anywhere");
const typeOpts = withFriendlyAll(propertyTypes, "Any type");
const budgetOpts = withFriendlyAll(budgetRanges, "Any budget");

export default function HomeSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [budget, setBudget] = useState("All");

  const search = () => {
    const p = new URLSearchParams();
    if (location !== "All") p.set("location", location);
    if (type !== "All") p.set("type", type);
    if (budget !== "All") p.set("budget", budget);
    const qs = p.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
  };

  return (
    <div>
      {/* ── Desktop: Airbnb-style pill ── */}
      <div className="hidden sm:flex items-center gap-1 bg-white rounded-full border border-border-subtle shadow-[0_16px_44px_-16px_rgba(16,42,67,0.3)] p-2">
        <Select bare label="Location" value={location} onChange={setLocation} options={locationOpts} className="flex-1 min-w-0" />
        <span className="h-9 w-px bg-border-subtle shrink-0" />
        <Select bare label="Type" value={type} onChange={setType} options={typeOpts} className="flex-1 min-w-0" />
        <span className="h-9 w-px bg-border-subtle shrink-0" />
        <Select bare label="Budget" value={budget} onChange={setBudget} options={budgetOpts} menuAlign="right" className="flex-1 min-w-0" />
        <button
          onClick={search}
          className="ml-1 shrink-0 inline-flex items-center gap-2 rounded-full bg-navy text-white font-semibold pl-5 pr-6 py-3.5 transition-colors duration-300 hover:bg-gold hover:text-navy"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>

      {/* ── Mobile: stacked card ── */}
      <div className="sm:hidden bg-white rounded-2xl border border-border-subtle shadow-[0_16px_40px_-16px_rgba(16,42,67,0.3)] p-3 space-y-2.5">
        <Select label="Location" value={location} onChange={setLocation} options={locationOpts} />
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
