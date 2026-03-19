"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Maximize2, Building2 } from "lucide-react";
import type { Property } from "@/lib/db/schema";

interface PropertyCardProps {
  property: Property;
}

const badgeConfig: Record<
  string,
  { label: string; bg: string }
> = {
  "High Demand": { label: "\uD83D\uDD25 High Demand", bg: "bg-red-500" },
  "New Listing": { label: "\u26A1 New Listing", bg: "bg-blue-500" },
  "Price Rising": { label: "\uD83D\uDCC8 Price Rising", bg: "bg-emerald" },
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${property.name}" (${property.price}). Please share more details.`
  );
  const whatsappUrl = `https://wa.me/919887073904?text=${whatsappMessage}`;

  return (
    <motion.div
      className="group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      {/* Image Placeholder Area */}
      <div className="relative h-48 bg-charcoal overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(198,169,98,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198,169,98,0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Property type label centered */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <span className="text-xs tracking-[0.2em] uppercase text-gold-light font-medium">
            {property.type}
          </span>
          <span className="mt-1 text-sm text-gray-300 px-4 text-center truncate max-w-[90%]">
            {property.name}
          </span>
        </div>

        {/* Badge */}
        {property.badge && badgeConfig[property.badge] && (
          <span
            className={`absolute top-3 left-3 z-20 ${badgeConfig[property.badge].bg} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
          >
            {badgeConfig[property.badge].label}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Property Name */}
        <h3 className="font-bold text-lg text-charcoal truncate">
          {property.name}
        </h3>

        {/* Location */}
        <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{property.location}</span>
        </p>

        {/* Price */}
        <p className="text-2xl font-bold text-gold mt-3">{property.price}</p>

        {/* Specs Row */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-2 flex-wrap">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3" />
            {property.area}
          </span>
          {property.bedrooms && (
            <>
              <span className="text-gray-300">&middot;</span>
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3" />
                {property.bedrooms} BHK
              </span>
            </>
          )}
          <span className="text-gray-300">&middot;</span>
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            {property.type}
          </span>
        </div>

        {/* RERA Badge */}
        {property.rera && (
          <div className="mt-3">
            <span className="inline-block bg-emerald/10 text-emerald text-xs font-medium px-2.5 py-1 rounded-md">
              RERA: {property.rera.length > 14
                ? `${property.rera.slice(0, 14)}...`
                : property.rera}
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 text-center border border-charcoal text-charcoal hover:bg-charcoal hover:text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700 transition-colors duration-200"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
