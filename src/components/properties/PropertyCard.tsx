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
  "New Listing": { label: "NEW LAUNCH", bg: "bg-navy" },
  "Price Rising": { label: "PRICE RISING", bg: "bg-emerald" },
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

  const specs = [
    property.bedrooms ? { icon: Bed, label: `${property.bedrooms} BHK` } : null,
    property.bathrooms ? { icon: Bath, label: `${property.bathrooms} Bath` } : null,
    property.area ? { icon: Maximize2, label: property.area } : null,
  ].filter(Boolean) as { icon: React.ElementType; label: string }[];

  return (
    <motion.article
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-border-subtle card-elevate card-elevate-hover hover:border-gold/40 transition-all duration-500"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* ── Image ── */}
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-cream">
          {hasImages ? (
            <>
              <img
                src={optimizeImg(images[imgIndex], { w: 760, h: 570 })}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {images.slice(0, 5).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${imgIndex === i ? "bg-white w-5" : "bg-white/60 w-1.5"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light flex items-center justify-center">
              <div className="text-center z-10">
                <div className="w-16 h-16 rounded-2xl bg-gold/15 flex items-center justify-center mx-auto mb-2.5">
                  <MapPin className="w-7 h-7 text-gold" />
                </div>
                <p className="text-xs text-white/70 font-medium tracking-[0.2em] uppercase">{property.type}</p>
              </div>
            </div>
          )}

          {/* Badge */}
          {property.badge && badgeConfig[property.badge] && (
            <span className={`absolute top-4 left-4 z-20 ${badgeConfig[property.badge].bg} text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase shadow-lg`}>
              {badgeConfig[property.badge].label}
            </span>
          )}
          {/* Type chip */}
          <span className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm text-navy text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {property.type}
          </span>
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <Link href={`/properties/${property.slug}`} className="block group/link">
          <h3 className="font-heading text-[1.35rem] leading-tight font-bold text-navy line-clamp-1 group-hover/link:text-gold-dark transition-colors">
            {property.name}
          </h3>
          <p className="flex items-center gap-1.5 text-navy/55 text-sm mt-2">
            <MapPin className="w-4 h-4 shrink-0 text-gold" />
            <span className="truncate">{property.location}</span>
          </p>
        </Link>

        {/* Price */}
        <div className="mt-4">
          <p className="text-[11px] text-navy/45 uppercase tracking-[0.18em]">Starting from</p>
          <p className="font-heading text-3xl font-bold text-navy leading-none mt-1">
            {property.price}
          </p>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-navy/70">
          {specs.map((s, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <s.icon className="w-4 h-4 text-gold" />
              {s.label}
            </span>
          ))}
        </div>

        <div className="my-4 border-t border-border-subtle" />

        {/* Footer */}
        <div className="mt-auto flex items-center gap-3">
          {property.rera && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald font-medium mr-auto">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              RERA Verified
            </span>
          )}
          <Link
            href={`/properties/${property.slug}`}
            className={`inline-flex items-center justify-center gap-1.5 bg-navy hover:bg-gold text-white hover:text-navy rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${property.rera ? "" : "flex-1"}`}
          >
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="shrink-0 w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#20BD5A] flex items-center justify-center text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
