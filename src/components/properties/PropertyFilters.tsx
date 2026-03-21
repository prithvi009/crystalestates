"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { propertyTypes, locations, budgetRanges } from "@/lib/constants";

interface PropertyFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  selectedBudget: string;
  onBudgetChange: (budget: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

function DarkSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: readonly string[] | { value: string; label: string }[];
}) {
  const isStringArray = typeof options[0] === "string";

  return (
    <div className="flex-1 min-w-[140px]">
      <label className="block text-xs text-text-muted mb-1.5 font-body">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg bg-primary-black border border-border-subtle text-white text-sm px-4 py-2.5 pr-10 font-body focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors cursor-pointer"
        >
          {isStringArray
            ? (options as readonly string[]).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))
            : (options as { value: string; label: string }[]).map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
    </div>
  );
}

export default function PropertyFilters({
  selectedType,
  onTypeChange,
  selectedLocation,
  onLocationChange,
  selectedBudget,
  onBudgetChange,
  sortBy,
  onSortChange,
}: PropertyFiltersProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activeFilters: { label: string; clear: () => void }[] = [];
  if (selectedType !== "All")
    activeFilters.push({ label: selectedType, clear: () => onTypeChange("All") });
  if (selectedLocation !== "All")
    activeFilters.push({ label: selectedLocation, clear: () => onLocationChange("All") });
  if (selectedBudget !== "All")
    activeFilters.push({ label: selectedBudget, clear: () => onBudgetChange("All") });
  if (sortBy !== "default") {
    const sortLabel = sortOptions.find((o) => o.value === sortBy)?.label ?? sortBy;
    activeFilters.push({ label: sortLabel, clear: () => onSortChange("default") });
  }

  const clearAll = () => {
    onTypeChange("All");
    onLocationChange("All");
    onBudgetChange("All");
    onSortChange("default");
  };

  return (
    <>
      {/* ===== DESKTOP FILTERS (md+) ===== */}
      <div className="hidden md:block">
        <div className="flex items-end gap-4 flex-wrap">
          <DarkSelect
            label="Property Type"
            value={selectedType}
            onChange={onTypeChange}
            options={propertyTypes}
          />
          <DarkSelect
            label="Location"
            value={selectedLocation}
            onChange={onLocationChange}
            options={locations}
          />
          <DarkSelect
            label="Budget"
            value={selectedBudget}
            onChange={onBudgetChange}
            options={budgetRanges}
          />
          <DarkSelect
            label="Sort By"
            value={sortBy}
            onChange={onSortChange}
            options={sortOptions}
          />
        </div>

        {/* Active filter pills */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {activeFilters.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="inline-flex items-center gap-1.5 bg-gold/10 text-gold border border-gold/20 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors font-body"
              >
                {f.label}
                <X className="w-3 h-3" />
              </button>
            ))}
            <button
              onClick={clearAll}
              className="text-xs text-text-muted hover:text-gold transition-colors font-body ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ===== MOBILE FILTER BAR (< md) ===== */}
      <div className="md:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-border-subtle bg-primary-black px-4 py-2.5 text-sm font-medium text-white hover:border-gold transition-colors font-body"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-black text-xs font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Quick type chips (horizontal scroll) */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors font-body ${
                  selectedType === type
                    ? "bg-gold text-black"
                    : "border border-border-subtle text-text-muted hover:border-gold hover:text-gold"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter pills on mobile */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {activeFilters.map((f) => (
              <button
                key={f.label}
                onClick={f.clear}
                className="inline-flex items-center gap-1.5 bg-gold/10 text-gold border border-gold/20 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gold/20 transition-colors font-body"
              >
                {f.label}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMobileDrawerOpen(false)}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card-dark rounded-t-2xl max-h-[85vh] overflow-y-auto border-t border-border-subtle"
            >
              {/* Handle */}
              <div className="sticky top-0 bg-card-dark pt-3 pb-2 px-5 border-b border-border-subtle rounded-t-2xl">
                <div className="w-10 h-1 rounded-full bg-border-medium mx-auto mb-3" />
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-heading font-bold text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-full hover:bg-primary-black transition-colors"
                  >
                    <X className="w-5 h-5 text-text-muted" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <DarkSelect
                  label="Property Type"
                  value={selectedType}
                  onChange={onTypeChange}
                  options={propertyTypes}
                />
                <DarkSelect
                  label="Location"
                  value={selectedLocation}
                  onChange={onLocationChange}
                  options={locations}
                />
                <DarkSelect
                  label="Budget"
                  value={selectedBudget}
                  onChange={onBudgetChange}
                  options={budgetRanges}
                />
                <DarkSelect
                  label="Sort By"
                  value={sortBy}
                  onChange={onSortChange}
                  options={sortOptions}
                />

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 pb-4">
                  {activeFilters.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="flex-1 rounded-lg border border-border-subtle py-3 text-sm font-medium text-text-muted hover:border-gold hover:text-gold transition-colors font-body"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex-1 rounded-lg bg-gold py-3 text-sm font-bold text-black hover:bg-gold/90 transition-colors font-body"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
