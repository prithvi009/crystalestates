"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";
import type { Property } from "@/lib/db/schema";

interface PropertyCardProps {
  property: Property;
}

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
  const [liked, setLiked] = useState(false);

  const images = (property.images ?? []) as string[];
  const hasImages = images.length > 0 && images[0] !== "/placeholder-property.jpg";

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const prev = (e: React.MouseEvent) => {
    stop(e);
    setImgIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    stop(e);
    setImgIndex((i) => (i + 1) % images.length);
  };

  return (
    <article className="group">
      {/* ── Image ── */}
      <div className="relative">
        <Link href={`/properties/${property.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-cream">
            {hasImages ? (
              <img
                src={optimizeImg(images[imgIndex], { w: 700, h: 700 })}
                alt={property.name}
                className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy to-navy-light">
                <MapPin className="w-8 h-8 text-gold/70" />
              </div>
            )}
          </div>
        </Link>

        {/* Wishlist heart */}
        <button
          onClick={(e) => { stop(e); setLiked((v) => !v); }}
          aria-label={liked ? "Remove from saved" : "Save"}
          className="absolute top-3 right-3 z-20 transition-transform active:scale-90"
        >
          <Heart
            className={`w-6 h-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] ${
              liked ? "fill-gold text-gold" : "fill-black/25 text-white"
            }`}
          />
        </button>

        {/* Carousel controls */}
        {hasImages && images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-navy shadow opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-navy shadow opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {images.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    imgIndex === i ? "bg-white" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Minimal caption ── */}
      <Link href={`/properties/${property.slug}`} className="block mt-3">
        <h3 className="text-[15px] font-semibold text-navy truncate">
          {property.name}
        </h3>
        <p className="text-[15px] text-navy/60 mt-0.5">
          <span className="text-navy">{property.price}</span>
          <span className="text-navy/50"> onwards</span>
        </p>
      </Link>
    </article>
  );
}
