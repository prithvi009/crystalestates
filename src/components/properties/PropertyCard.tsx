"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize2, Bed, Building2, MessageCircle, ShieldCheck } from "lucide-react";
import type { Property } from "@/lib/db/schema";

interface PropertyCardProps {
  property: Property;
}

const badgeConfig: Record<string, { label: string; icon: string }> = {
  "High Demand": { label: "High Demand", icon: "\uD83D\uDD25" },
  "New Listing": { label: "New Listing", icon: "\u26A1" },
  "Price Rising": { label: "Price Rising", icon: "\uD83D\uDCC8" },
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${property.name}" (${property.price}). Please share more details.`
  );
  const whatsappUrl = `https://wa.me/919511750686?text=${whatsappMessage}`;

  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden bg-card-dark border border-border-subtle hover:border-gold/40 transition-colors duration-300"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      {/* ── Image Placeholder Area ── */}
      <div className="relative h-52 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-black via-card-dark to-border-medium" />

        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(198,169,98,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198,169,98,0.5) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Bottom gradient for price overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10" />

        {/* Property type label centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <span className="text-xs tracking-[0.2em] uppercase text-gold font-medium font-body">
            {property.type}
          </span>
          <span className="mt-1.5 text-sm text-text-muted px-4 text-center truncate max-w-[90%] font-body">
            {property.name}
          </span>
        </div>

        {/* Badge (top-left, gold themed) */}
        {property.badge && badgeConfig[property.badge] && (
          <span className="absolute top-3 left-3 z-20 bg-gold/90 text-black text-xs font-semibold px-2.5 py-1 rounded-full font-body backdrop-blur-sm">
            {badgeConfig[property.badge].icon} {badgeConfig[property.badge].label}
          </span>
        )}

        {/* Price overlay at bottom of image area */}
        <div className="absolute bottom-3 left-4 z-20">
          <p className="text-2xl font-bold text-gold font-heading">
            {property.price}
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-5">
        {/* Property Name */}
        <h3 className="font-heading text-lg font-bold text-white truncate">
          {property.name}
        </h3>

        {/* Location */}
        <p className="flex items-center gap-1.5 text-text-muted text-sm mt-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0 text-gold/70" />
          <span className="truncate">{property.location}</span>
        </p>

        {/* Spec Chips */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="inline-flex items-center gap-1 bg-primary-black border border-border-subtle rounded-md px-2.5 py-1 text-xs text-text-muted font-body">
            <Maximize2 className="w-3 h-3" />
            {property.area}
          </span>
          {property.bedrooms && (
            <span className="inline-flex items-center gap-1 bg-primary-black border border-border-subtle rounded-md px-2.5 py-1 text-xs text-text-muted font-body">
              <Bed className="w-3 h-3" />
              {property.bedrooms} BHK
            </span>
          )}
          <span className="inline-flex items-center gap-1 bg-primary-black border border-border-subtle rounded-md px-2.5 py-1 text-xs text-text-muted font-body">
            <Building2 className="w-3 h-3" />
            {property.type}
          </span>
        </div>

        {/* RERA Badge */}
        {property.rera && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 bg-gold/10 text-gold text-xs font-medium px-2.5 py-1 rounded-md border border-gold/20 font-data">
              <ShieldCheck className="w-3 h-3" />
              RERA: {property.rera.length > 14
                ? `${property.rera.slice(0, 14)}...`
                : property.rera}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-5">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 text-center border border-border-subtle text-white hover:border-gold hover:text-gold rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 font-body"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-600 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-green-700 transition-colors duration-200 font-body"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
