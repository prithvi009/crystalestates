"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight, SearchX, MessageCircle } from "lucide-react";
import type { Property } from "@/lib/db/schema";
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
    case "\u20B91Cr - \u20B93Cr":
      return priceNumeric >= 10000000 && priceNumeric < 30000000;
    case "\u20B93Cr+":
      return priceNumeric >= 30000000;
    case "\u20B91Cr+":
      return priceNumeric >= 10000000;
    default:
      return true;
  }
}

interface PropertiesClientProps {
  properties: Property[];
}

export default function PropertiesClient({
  properties,
}: PropertiesClientProps) {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = [...properties];

    if (selectedType !== "All") {
      result = result.filter((p) => p.type === selectedType);
    }

    if (selectedLocation !== "All") {
      result = result.filter((p) => p.locationArea === selectedLocation);
    }

    if (selectedBudget !== "All") {
      result = result.filter((p) => matchBudget(p.priceNumeric, selectedBudget));
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceNumeric - b.priceNumeric);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceNumeric - a.priceNumeric);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [properties, selectedType, selectedLocation, selectedBudget, sortBy]);

  return (
    <section className="min-h-screen bg-primary-black">
      {/* ── Hero / Breadcrumb ── */}
      <div className="bg-primary-black pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-gold hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
            <span className="text-gold">Properties</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-5xl font-bold text-white"
          >
            Explore Properties
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-text-muted text-lg max-w-xl"
          >
            Discover premium plots, homes, and commercial spaces across Mumbai,
            Pune &amp; Solapur.
          </motion.p>
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-16 z-30 bg-card-dark border-y border-border-subtle backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
        </div>
      </div>

      {/* ── Properties Grid ── */}
      <div className="bg-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {/* Count */}
          <p className="text-sm text-text-muted mb-8">
            Showing{" "}
            <span className="font-data font-semibold text-gold">
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
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-card-dark border border-border-subtle flex items-center justify-center mb-6">
                <SearchX className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                No properties found
              </h3>
              <p className="text-text-muted max-w-md mb-8">
                Can&apos;t find what you&apos;re looking for? Try adjusting your
                filters or reach out to us for personalized assistance.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── WhatsApp CTA ── */}
      <div className="bg-card-dark border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Can&apos;t find the right property?
          </h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            Tell us your requirements and our team will find the perfect match
            for you.
          </p>
          <a
            href="https://wa.me/919511750686?text=Hi%2C%20I%27m%20looking%20for%20a%20property.%20Can%20you%20help%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
