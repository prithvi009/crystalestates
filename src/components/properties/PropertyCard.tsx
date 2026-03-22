"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Maximize2,
  Bed,
  Bath,
  MessageCircle,
  ShieldCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import type { Property } from "@/lib/db/schema";

interface PropertyCardProps {
  property: Property;
}

const badgeConfig: Record<string, { label: string; bg: string }> = {
  "High Demand": { label: "HIGH DEMAND", bg: "bg-red-500" },
  "New Listing": { label: "NEW LAUNCH", bg: "bg-blue-500" },
  "Price Rising": { label: "PRICE RISING", bg: "bg-emerald-500" },
};

function optimizeImg(url: string, opts: { w?: number; h?: number } = {}): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  const { w, h } = opts;
  const parts = ["f_auto", "q_auto"];
  if (w) parts.push(`w_${w}`);
  if (h) parts.push(`h_${h}`);
  if (w || h) parts.push("c_fill", "g_auto");
  return url.replace("/upload/", `/upload/${parts.join(",")}/`);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const whatsappUrl = useMemo(() => {
    const msg = encodeURIComponent(
      "Hi, I am interested in " + property.name + " (" + property.price + "). Please share more details."
    );
    return "https://wa.me/919511750686?text=" + msg;
  }, [property.name, property.price]);

  const images = (property.images ?? []) as string[];
  const hasImages = images.length > 0 && images[0] !== "/placeholder-property.jpg";

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % images.length);
  };

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-gray-100 hover:border-gold/30 transition-all duration-500"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* ── Image Area ── */}
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative h-56 sm:h-60 overflow-hidden bg-gray-100">
          {hasImages ? (
            <>
              <img
                src={optimizeImg(images[imgIndex], { w: 600, h: 400 })}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Image carousel dots & arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {images.slice(0, 5).map((_, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          imgIndex === i
                            ? "bg-white w-4"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                    {images.length > 5 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            /* Elegant placeholder when no images */
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/80 flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `linear-gradient(rgba(198,169,98,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(198,169,98,0.5) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="text-center z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-gold/60" />
                </div>
                <p className="text-xs text-white/40 font-medium">{property.type}</p>
              </div>
            </div>
          )}

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-10" />

          {/* Badge */}
          {property.badge && badgeConfig[property.badge] && (
            <span className={`absolute top-3 left-3 z-20 ${badgeConfig[property.badge].bg} text-white text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-lg`}>
              {badgeConfig[property.badge].label}
            </span>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-3 left-4 z-20">
            <p className="text-xl sm:text-2xl font-bold text-white font-heading drop-shadow-lg">
              {property.price}
            </p>
          </div>

          {/* Photo count */}
          {hasImages && images.length > 1 && (
            <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-md">
              {images.length} photos
            </div>
          )}
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="p-4 sm:p-5">
        {/* Name + Location */}
        <Link href={`/properties/${property.slug}`} className="block group/link">
          <h3 className="font-heading text-lg font-bold text-charcoal truncate group-hover/link:text-gold transition-colors">
            {property.name}
          </h3>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-gold" />
            <span className="truncate">{property.location}</span>
          </p>
        </Link>

        {/* Spec row */}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-gray-400" />
              {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gray-400" />
              {property.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
            {property.area}
          </span>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-gray-100" />

        {/* Bottom row: RERA / Possession + Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            {property.rera ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[120px]">RERA Verified</span>
              </span>
            ) : property.possession ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                <Calendar className="w-3 h-3 shrink-0" />
                {property.possession}
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link
              href={`/properties/${property.slug}`}
              className="inline-flex items-center gap-1.5 bg-charcoal hover:bg-gold text-white hover:text-charcoal rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300"
            >
              View
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
