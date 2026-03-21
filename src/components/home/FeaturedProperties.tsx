"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, MessageCircle, ArrowRight, Calendar, Shield } from "lucide-react";
import Link from "next/link";
import { propertyTypes } from "@/lib/constants";
import type { Property } from "@/lib/db/schema";

const tabs = propertyTypes;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

function ProjectCard({ property }: { property: Property }) {
  const whatsappUrl = `https://wa.me/919511750686?text=${encodeURIComponent(
    `Hi, I'm interested in ${property.name} (${property.type}) at ${property.location}. Please share more details.`
  )}`;

  const configLabel = property.bedrooms
    ? `${property.bedrooms} BHK ${property.type}`
    : property.type;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group flex flex-col md:flex-row bg-card-dark rounded-xl overflow-hidden border border-white/[0.06] hover:border-gold/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(198,169,98,0.08)]"
    >
      {/* Left: Image placeholder */}
      <div className="relative w-full md:w-1/2 min-h-[220px] md:min-h-[320px] bg-gradient-to-br from-card-dark to-primary-black overflow-hidden">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`proj-${property.id}`}
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 25h50M25 0v50"
                  stroke="#C6A962"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="25" cy="25" r="1.5" fill="#C6A962" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#proj-${property.id})`} />
          </svg>
        </div>

        {/* Shimmer on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

        {/* Zoom effect container */}
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          {/* Property type label centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-gold/50 text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-body">
                {property.type}
              </p>
              <p className="text-white/60 font-heading text-lg">{property.name}</p>
            </div>
          </div>
        </div>

        {/* Badge top-left */}
        {property.badge && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded bg-gold text-primary-black shadow-lg shadow-gold/20">
            {property.badge === "New Listing"
              ? "New Launch"
              : property.badge === "High Demand"
              ? "High Demand"
              : "Price Rising"}
          </span>
        )}
      </div>

      {/* Right: Content */}
      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Project name */}
          <h3 className="font-heading text-xl md:text-2xl text-white mb-2 leading-tight">
            {property.name}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-sm text-text-muted mb-4">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gold/60" />
            <span className="line-clamp-1">{property.location}</span>
          </p>

          {/* Config */}
          {property.bedrooms && (
            <p className="text-sm text-white/70 mb-3 font-body">
              {configLabel} &middot; {property.area}
            </p>
          )}

          {/* Price */}
          <p className="text-lg font-semibold text-gold mb-3 font-body">
            {property.price}
          </p>

          {/* RERA */}
          {property.rera && (
            <div className="flex items-center gap-1.5 mb-3">
              <Shield className="w-3 h-3 text-gold/70" />
              <span className="font-mono text-xs text-gold/70 tracking-wide">
                RERA: {property.rera}
              </span>
            </div>
          )}

          {/* Possession */}
          {property.possession && (
            <p className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
              <Calendar className="w-3 h-3 shrink-0 text-text-muted/70" />
              Possession: {property.possession}
            </p>
          )}
        </div>

        {/* Gold divider */}
        <div>
          <div className="h-[1px] bg-gold/20 mb-5" />

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href={`/properties/${property.slug}`}
              className="flex-1 text-center py-2.5 text-sm font-medium border border-gold/30 text-gold rounded-lg hover:bg-gold hover:text-primary-black transition-all duration-300 font-body"
            >
              View Project
              <ArrowRight className="w-3.5 h-3.5 inline-block ml-1.5" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium bg-[#25D366] text-white rounded-lg hover:bg-[#20BD5A] transition-colors duration-300 font-body"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
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
    <section id="properties" className="py-20 sm:py-28 bg-primary-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14">
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">
            Featured Projects
          </h2>
          <motion.div
            className="h-[2px] bg-gold rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 50 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
          <p className="font-body text-base text-text-muted mt-4">
            Handpicked developments across Maharashtra
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex mb-12">
          <div className="flex gap-2 overflow-x-auto pb-2 max-w-full scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative whitespace-nowrap px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 font-body ${
                  activeTab === tab
                    ? "bg-gold text-primary-black shadow-md shadow-gold/20"
                    : "bg-white/[0.06] text-text-muted hover:bg-white/[0.1] border border-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filtered.map((property) => (
              <ProjectCard key={property.id} property={property} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-gold font-semibold text-lg hover:text-gold-light transition-colors duration-300 font-body"
          >
            View All Properties
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
