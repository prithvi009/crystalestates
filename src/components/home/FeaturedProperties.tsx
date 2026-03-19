"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Bed,
  Maximize2,
  Building2,
  MessageCircle,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { propertyTypes } from "@/lib/constants";
import type { Property } from "@/lib/db/schema";

const tabs = propertyTypes;

const badgeStyles: Record<string, string> = {
  "High Demand": "bg-red-500/80 text-white",
  "New Listing": "bg-blue-500/80 text-white",
  "Price Rising": "bg-emerald/80 text-white",
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
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
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
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image area with geometric pattern + shimmer */}
      <div className="relative h-56 bg-gradient-to-br from-charcoal to-black overflow-hidden">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`geo-${property.id}`}
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 20h40M20 0v40"
                  stroke="#C6A962"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="20" cy="20" r="2" fill="#C6A962" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#geo-${property.id})`} />
          </svg>
        </div>

        {/* Decorative shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Property type label centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-gold/60 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              {property.type}
            </p>
            <p className="text-white/80 font-medium text-sm">{property.name}</p>
          </div>
        </div>

        {/* Badge */}
        {property.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${badgeStyles[property.badge]}`}
          >
            {badgeEmoji[property.badge]} {property.badge}
          </span>
        )}

        {/* Price overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-3 px-4">
          <p className="text-2xl font-bold text-white">
            {property.price}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-charcoal mb-1.5 line-clamp-1">
          {property.name}
        </h3>

        <p className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        {/* Spec chips */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-600 text-xs rounded-full px-3 py-1">
            <Maximize2 className="w-3 h-3" />
            {property.area}
          </span>
          {property.bedrooms && (
            <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-600 text-xs rounded-full px-3 py-1">
              <Bed className="w-3 h-3" />
              {property.bedrooms} BHK
            </span>
          )}
          <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-600 text-xs rounded-full px-3 py-1">
            <Building2 className="w-3 h-3" />
            {property.type}
          </span>
        </div>

        {/* RERA badge */}
        {property.rera && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs bg-emerald/10 text-emerald px-3 py-1 rounded-full font-medium">
              <Shield className="w-3 h-3" />
              RERA: {property.rera.slice(0, 12)}...
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 text-center py-2.5 text-sm font-medium border border-charcoal/20 text-charcoal rounded-lg hover:bg-charcoal hover:text-white transition-all duration-300"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium bg-emerald text-white rounded-lg hover:bg-emerald/90 transition-colors duration-300"
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

export default function FeaturedProperties({
  properties,
}: FeaturedPropertiesProps) {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filtered =
    activeTab === "All"
      ? properties
      : properties.filter((p) => p.type === activeTab);

  return (
    <section id="properties" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
            Featured Properties
          </h2>
          <motion.div
            className="mx-auto h-[3px] bg-gold rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        {/* Filter pills */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gold text-black shadow-md shadow-gold/20"
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/80 border border-gray-200"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        </AnimatePresence>

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
            className="group inline-flex items-center gap-2 text-charcoal font-semibold text-lg hover:text-gold transition-colors duration-300"
          >
            View All Properties
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
