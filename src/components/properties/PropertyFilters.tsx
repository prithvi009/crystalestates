"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { propertyTypes, locations, budgetRanges } from "@/data/properties";

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

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-gold text-black"
          : "border border-gray-300 text-gray-600 hover:border-gold hover:text-gold"
      }`}
    >
      {label}
    </button>
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

  const hasActiveFilters =
    selectedType !== "All" ||
    selectedLocation !== "All" ||
    selectedBudget !== "All" ||
    sortBy !== "default";

  const clearFilters = () => {
    onTypeChange("All");
    onLocationChange("All");
    onBudgetChange("All");
    onSortChange("default");
  };

  const activeFilterCount = [
    selectedType !== "All",
    selectedLocation !== "All",
    selectedBudget !== "All",
    sortBy !== "default",
  ].filter(Boolean).length;

  return (
    <>
      {/* ===== DESKTOP SIDEBAR (md+) ===== */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-24 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-charcoal">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-gold hover:text-gold-dark transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Property Type */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">
              Property Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  active={selectedType === type}
                  onClick={() => onTypeChange(type)}
                />
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">
              Location
            </h3>
            <div className="flex flex-wrap gap-2">
              {locations.map((loc) => (
                <FilterChip
                  key={loc}
                  label={loc}
                  active={selectedLocation === loc}
                  onClick={() => onLocationChange(loc)}
                />
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">
              Budget
            </h3>
            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((range) => (
                <FilterChip
                  key={range}
                  label={range}
                  active={selectedBudget === range}
                  onClick={() => onBudgetChange(range)}
                />
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-3">
              Sort By
            </h3>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </aside>

      {/* ===== MOBILE FILTER BAR (< md) ===== */}
      <div className="md:hidden mb-4">
        {/* Horizontal scroll chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {propertyTypes.map((type) => (
            <FilterChip
              key={type}
              label={type}
              active={selectedType === type}
              onClick={() => onTypeChange(type)}
            />
          ))}
        </div>

        {/* Filters button */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="mt-3 flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-charcoal hover:border-gold transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gold text-black text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Handle */}
              <div className="sticky top-0 bg-white pt-3 pb-2 px-5 border-b border-gray-100 rounded-t-2xl">
                <div className="w-10 h-1 rounded-full bg-gray-300 mx-auto mb-3" />
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-charcoal">Filters</h2>
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-6">
                {/* Property Type */}
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-3">
                    Property Type
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <FilterChip
                        key={type}
                        label={type}
                        active={selectedType === type}
                        onClick={() => onTypeChange(type)}
                      />
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-3">
                    Location
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((loc) => (
                      <FilterChip
                        key={loc}
                        label={loc}
                        active={selectedLocation === loc}
                        onClick={() => onLocationChange(loc)}
                      />
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-3">
                    Budget
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {budgetRanges.map((range) => (
                      <FilterChip
                        key={range}
                        label={range}
                        active={selectedBudget === range}
                        onClick={() => onBudgetChange(range)}
                      />
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="text-sm font-semibold text-charcoal mb-3">
                    Sort By
                  </h3>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => onSortChange(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm text-charcoal focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 pb-4">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex-1 rounded-lg border border-gray-300 py-3 text-sm font-medium text-charcoal hover:border-charcoal transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex-1 rounded-lg bg-gold py-3 text-sm font-bold text-black hover:bg-gold-light transition-colors"
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
