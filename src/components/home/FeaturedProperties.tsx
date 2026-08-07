"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { propertyTypes } from "@/lib/constants";
import type { Property } from "@/lib/db/schema";
import PropertyCard from "@/components/properties/PropertyCard";

const tabs = propertyTypes;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({
  properties,
}: FeaturedPropertiesProps) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered =
    activeTab === "All"
      ? properties
      : properties.filter((p) => p.type === activeTab);

  return (
    <section id="properties" className="py-14 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-7 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-4xl text-navy">
            Featured Projects
          </h2>
          <p className="font-body text-sm sm:text-lg text-navy/60 mt-1.5 sm:mt-3">
            Handpicked developments across Maharashtra
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 font-body ${
                  activeTab === tab
                    ? "bg-charcoal text-white shadow-md"
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards — horizontal snap carousel on mobile, grid on desktop */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filtered.map((property) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                className="snap-start shrink-0 w-[82%] sm:w-[46%] md:w-auto"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No properties found in this category.</p>
          </div>
        )}

        {/* View all link */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 bg-charcoal text-white font-semibold text-sm px-8 py-3.5 rounded-xl hover:bg-gold hover:text-charcoal transition-all duration-300 font-body"
          >
            View All Properties
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
