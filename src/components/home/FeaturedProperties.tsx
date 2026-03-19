"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Bed, Maximize2, Building2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { propertyTypes } from "@/lib/constants";
import type { Property } from "@/lib/db/schema";

const tabs = propertyTypes;

const badgeStyles: Record<string, string> = {
  "High Demand": "bg-red-500 text-white",
  "New Listing": "bg-blue-500 text-white",
  "Price Rising": "bg-emerald-light text-white",
};

const badgeEmoji: Record<string, string> = {
  "High Demand": "\uD83D\uDD25",
  "New Listing": "\u26A1",
  "Price Rising": "\uD83D\uDCC8",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

function PropertyCard({ property }: { property: Property }) {
  const whatsappUrl = `https://wa.me/919887073904?text=${encodeURIComponent(
    `Hi, I'm interested in ${property.name} (${property.type}) at ${property.location}. Please share more details.`
  )}`;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      {/* Image area placeholder */}
      <div className="relative h-[200px] bg-charcoal flex items-center justify-center overflow-hidden">
        <div className="text-center px-4">
          <p className="text-gold text-xs font-medium tracking-wider uppercase mb-1">
            {property.type}
          </p>
          <p className="text-white font-semibold text-sm">{property.name}</p>
        </div>

        {/* Badge */}
        {property.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${
              badgeStyles[property.badge]
            }`}
          >
            {badgeEmoji[property.badge]} {property.badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-charcoal mb-1 line-clamp-1">
          {property.name}
        </h3>

        <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <p className="text-2xl font-bold text-gold mb-3">{property.price}</p>

        {/* Key specs */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3" />
            {property.area}
          </span>
          {property.bedrooms && (
            <>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3" />
                {property.bedrooms} BHK
              </span>
            </>
          )}
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {property.type}
          </span>
        </div>

        {/* RERA badge */}
        {property.rera && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 text-xs bg-emerald/10 text-emerald px-2 py-0.5 rounded-full font-medium">
              RERA: {property.rera.slice(0, 8)}...
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 text-center py-2 text-sm font-medium border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal hover:text-white transition-colors duration-300"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors duration-300"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered =
    activeTab === "All"
      ? properties
      : properties.filter((p) => p.type === activeTab);

  return (
    <section id="properties" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="flex justify-center mb-6">
          <div className="w-[60px] h-[3px] bg-gold rounded-full" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-charcoal text-center mb-10">
          Featured Properties
        </h2>

        {/* Filter tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-gold text-black"
                    : "border border-gray-300 text-gray-600 hover:border-gold hover:text-gold"
                }`}
              >
                {tab === "All" ? "All" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Property cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
          >
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/properties"
            className="inline-flex items-center px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
