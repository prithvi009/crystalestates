"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight, SearchX } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyFilters from "@/components/properties/PropertyFilters";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function matchBudget(priceNumeric: number, budget: string): boolean {
  switch (budget) {
    case "Under \u20B910L":
      return priceNumeric < 1000000;
    case "\u20B910L - \u20B925L":
      return priceNumeric >= 1000000 && priceNumeric < 2500000;
    case "\u20B925L - \u20B950L":
      return priceNumeric >= 2500000 && priceNumeric < 5000000;
    case "\u20B950L - \u20B91Cr":
      return priceNumeric >= 5000000 && priceNumeric < 10000000;
    case "\u20B91Cr+":
      return priceNumeric >= 10000000;
    default:
      return true;
  }
}

export default function PropertiesPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = [...properties];

    // Filter by type
    if (selectedType !== "All") {
      result = result.filter((p) => p.type === selectedType);
    }

    // Filter by location
    if (selectedLocation !== "All") {
      result = result.filter((p) => p.locationArea === selectedLocation);
    }

    // Filter by budget
    if (selectedBudget !== "All") {
      result = result.filter((p) => matchBudget(p.priceNumeric, selectedBudget));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceNumeric - b.priceNumeric);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceNumeric - a.priceNumeric);
        break;
      case "newest":
        result.sort((a, b) => Number(b.id) - Number(a.id));
        break;
      default:
        break;
    }

    return result;
  }, [selectedType, selectedLocation, selectedBudget, sortBy]);

  return (
    <section className="min-h-screen bg-offwhite">
      {/* Header / Breadcrumb */}
      <div className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-gold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold">Properties</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold">
            Explore Properties
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Discover premium plots, homes, and commercial spaces across Solapur
            and Pune.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <PropertyFilters
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            selectedBudget={selectedBudget}
            onBudgetChange={setSelectedBudget}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Properties Grid */}
          <div className="flex-1 min-w-0">
            {/* Count */}
            <p className="text-sm text-gray-500 mb-6">
              Showing{" "}
              <span className="font-semibold text-charcoal">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "property" : "properties"}
            </p>

            {filtered.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${selectedType}-${selectedLocation}-${selectedBudget}-${sortBy}`}
              >
                {filtered.map((property) => (
                  <motion.div key={property.id} variants={cardVariants}>
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <SearchX className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-charcoal mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500 max-w-md mb-6">
                  Can&apos;t find what you&apos;re looking for? Try adjusting
                  your filters or reach out to us for personalized assistance.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
                >
                  Contact Us
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
