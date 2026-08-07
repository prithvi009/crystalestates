"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  ChevronRight,
  Maximize2,
  Bed,
  Bath,
  Building2,
  Compass,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  MessageCircle,
  Droplets,
  Zap,
  ShieldCheck,
  TreePine,
  Car,
  Dumbbell,
  Waves,
  Wifi,
  Flame,
  Video,
  Baby,
  PersonStanding,
  Fence,
  Church,
  Lamp,
  CloudRain,
  Warehouse,
  ArrowUpRight,
  MapPinned,
  FileText,
  IndianRupee,
  List,
  Shield,
  Share2,
  Check,
  BadgeIndianRupee,
  Users,
  FileCheck,
  Calculator,
  Play,
  ExternalLink,
  Minus,
  Plus,
  TrendingUp,
  Heart,
  Eye,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X,
  Download,
  ImageIcon,
} from "lucide-react";
import type { Property } from "@/lib/db/schema";
import PropertyCard from "./PropertyCard";
import LeadForm from "./LeadForm";

/* ------------------------------------------------------------------ */
/*  Cloudinary URL optimization helper                                 */
/* ------------------------------------------------------------------ */

function optimizeImg(url: string, opts: { w?: number; h?: number; q?: string } = {}): string {
  if (!url || !url.includes("cloudinary.com")) return url;
  const { w, h, q = "auto" } = opts;
  const parts = [`f_auto`, `q_${q}`];
  if (w) parts.push(`w_${w}`);
  if (h) parts.push(`h_${h}`);
  if (w || h) parts.push("c_fill");
  return url.replace("/upload/", `/upload/${parts.join(",")}/`);
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PropertyDetailProps {
  property: Property;
  relatedProperties: Property[];
}

interface NearbyPlace {
  name: string;
  distance: string;
  category?: string;
}

interface PriceBreakdown {
  basePrice?: string;
  stampDuty?: string;
  registration?: string;
  total?: string;
}

interface DocItem {
  title: string;
  status: "verified" | "pending" | "na";
}

/* ------------------------------------------------------------------ */
/*  Section IDs for scroll navigation                                  */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "overview", label: "Overview", icon: List },
  { id: "gallery", label: "Gallery", icon: Eye },
  { id: "floorplans", label: "Floor Plans", icon: Maximize2 },
  { id: "amenities", label: "Amenities", icon: ShieldCheck },
  { id: "location", label: "Location", icon: MapPinned },
  { id: "documents", label: "Documents", icon: FileText },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Amenity icon mapping                                               */
/* ------------------------------------------------------------------ */

const amenityIconMap: Record<string, React.ElementType> = {
  "Water Supply": Droplets,
  Electricity: Zap,
  "Internal Roads": ArrowUpRight,
  "Gated Entry": ShieldCheck,
  Garden: TreePine,
  Temple: Church,
  "Street Lights": Lamp,
  "Drainage System": CloudRain,
  "Car Parking": Car,
  Parking: Car,
  "Modular Kitchen": Flame,
  "Road Access": ArrowUpRight,
  Security: ShieldCheck,
  "Rain Water Harvesting": CloudRain,
  "Bore Well": Droplets,
  Fencing: Fence,
  "Flat Terrain": Maximize2,
  "Water Source": Droplets,
  "Fire Safety": Flame,
  "Lift Access": Building2,
  Lift: Building2,
  "Club House": Warehouse,
  "Swimming Pool": Waves,
  CCTV: Video,
  "Children's Play Area": Baby,
  "Jogging Track": PersonStanding,
  Drainage: CloudRain,
  "Gated Community": ShieldCheck,
  Gymnasium: Dumbbell,
  "24/7 Security": Shield,
  Intercom: Wifi,
  "Power Backup": Zap,
  Park: TreePine,
  "Landscaped Garden": TreePine,
};

function getAmenityIcon(name: string): React.ElementType {
  return amenityIconMap[name] || CheckCircle;
}

/* ------------------------------------------------------------------ */
/*  Badge config                                                       */
/* ------------------------------------------------------------------ */

const badgeConfig: Record<string, { label: string; bg: string }> = {
  "High Demand": { label: "High Demand", bg: "bg-red-500" },
  "New Listing": { label: "New Listing", bg: "bg-blue-500" },
  "Price Rising": { label: "Price Rising", bg: "bg-emerald" },
};

/* ------------------------------------------------------------------ */
/*  Fade-in animation wrapper                                          */
/* ------------------------------------------------------------------ */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PropertyDetail({
  property,
  relatedProperties,
}: PropertyDetailProps) {
  /* ---- State ---- */
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [isSticky, setIsSticky] = useState(false);
  const [copied, setCopied] = useState(false);

  // Image gallery state
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [plansUnlocked, setPlansUnlocked] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const tabNavRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* ---- Derived data ---- */
  const highlights = (property.highlights ?? []) as string[];
  const amenities = (property.amenities ?? []) as string[];
  const nearbyPlaces = (property.nearbyPlaces ?? []) as NearbyPlace[];
  const priceBreakdown = (property.priceBreakdown ?? {}) as PriceBreakdown;
  const documents = (property.documents ?? []) as DocItem[];
  const images = (property.images ?? []) as string[];
  const floorPlans = (property.floorPlans ?? []) as { title: string; url: string }[];
  const locationMaps = (property.locationMaps ?? []) as { title: string; url: string }[];
  const hasRealImages = images.length > 0 && images[0] !== "/placeholder-property.jpg";

  /* ---- Hero video (Cloudinary-optimized for instant HD playback) ---- */
  const videoUrl = property.videoUrl || "";
  const hasVideo = Boolean(videoUrl);
  const heroVideoSrc = videoUrl.includes("cloudinary.com")
    ? videoUrl.replace("/upload/", "/upload/f_auto,q_auto,w_1920/")
    : videoUrl;
  const heroVideoPoster = videoUrl.includes("cloudinary.com")
    ? videoUrl
        .replace("/upload/", "/upload/so_0,f_jpg,q_auto,w_1920/")
        .replace(/\.(mp4|mov|m4v|webm)$/i, ".jpg")
    : undefined;
  const showSlider = !hasVideo && hasRealImages && images.length > 1;

  /* ---- Description formatting ---- */
  const DESCRIPTION_WORD_LIMIT = 80;
  const descriptionText = property.description || "";
  const descriptionWords = descriptionText.split(/\s+/).filter(Boolean);
  const isLongDescription = descriptionWords.length > DESCRIPTION_WORD_LIMIT;
  const descriptionParagraphs = descriptionText
    .split(/\n{2,}|\r\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  // If no paragraph breaks, try splitting on single newlines
  const formattedParagraphs =
    descriptionParagraphs.length <= 1
      ? descriptionText.split(/\n/).map((p) => p.trim()).filter(Boolean)
      : descriptionParagraphs;
  const truncatedDescription = isLongDescription && !descriptionExpanded
    ? descriptionWords.slice(0, DESCRIPTION_WORD_LIMIT).join(" ") + "..."
    : null;

  /* ---- WhatsApp ---- */
  const whatsappUrl = useMemo(() => {
    const msg = encodeURIComponent(
      "Hi, I am interested in " + property.name + " (" + property.price + "). Please share more details."
    );
    return "https://wa.me/917666229818?text=" + msg;
  }, [property.name, property.price]);

  /* ---- Intersection Observer for sticky tabs & active section ---- */
  useEffect(() => {
    const tabEl = tabNavRef.current;
    if (!tabEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(tabEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-100px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ---- Remember floor-plan unlock per property ---- */
  useEffect(() => {
    try {
      if (localStorage.getItem(`ce_plans_${property.slug}`) === "1") {
        setPlansUnlocked(true);
      }
    } catch {}
  }, [property.slug]);

  const unlockPlans = useCallback(() => {
    setPlansUnlocked(true);
    try {
      localStorage.setItem(`ce_plans_${property.slug}`, "1");
    } catch {}
  }, [property.slug]);

  /* ---- Hero slider auto-advance ---- */
  useEffect(() => {
    if (!showSlider || lightboxOpen) return;
    const t = setInterval(
      () => setHeroImageIndex((i) => (i + 1) % images.length),
      4500
    );
    return () => clearInterval(t);
  }, [showSlider, lightboxOpen, images.length]);

  /* ---- Handlers ---- */
  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, []);

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    },
    []
  );

  /* ---- Property Details Table Data ---- */
  const detailRows = [
    { label: "Property Type", value: property.type },
    { label: "Total Area", value: property.area },
    { label: "Carpet Area", value: property.carpetArea },
    { label: "Super Built-up Area", value: property.superBuiltUpArea },
    { label: "Bedrooms", value: property.bedrooms ? `${property.bedrooms} BHK` : null },
    { label: "Bathrooms", value: property.bathrooms ? `${property.bathrooms}` : null },
    { label: "Floor", value: property.floor },
    { label: "Facing", value: property.facing },
    { label: "Possession", value: property.possession },
    { label: "RERA No.", value: property.rera },
    { label: "RERA Valid Till", value: property.reraValidTill },
    { label: "Builder", value: property.builderName },
    { label: "Maintenance Charge", value: property.maintenanceCharge },
    { label: "Booking Amount", value: property.bookingAmount },
  ].filter((r) => r.value != null && r.value !== "");

  /* ---- Nearby places by category ---- */
  const nearbyByCategory = useMemo(() => {
    const map: Record<string, NearbyPlace[]> = {};
    nearbyPlaces.forEach((p) => {
      const cat = p.category || "Nearby";
      if (!map[cat]) map[cat] = [];
      map[cat].push(p);
    });
    return map;
  }, [nearbyPlaces]);

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ============================================================ */}
      {/*  BREADCRUMB                                                   */}
      {/* ============================================================ */}
      <div className="bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4 md:pt-28">
          <nav className="flex items-center gap-2 text-sm text-navy/50 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-gold-dark transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-navy/30" />
            <Link
              href="/properties"
              className="hover:text-gold-dark transition-colors"
            >
              Properties
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-navy/30" />
            <span className="text-gold-dark font-medium truncate max-w-[200px]">
              {property.name}
            </span>
          </nav>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 1: HERO / GALLERY AREA                              */}
      {/* ============================================================ */}
      <div className="relative h-[300px] sm:h-[420px] md:h-[520px] bg-bg-cream overflow-hidden">
        {/* Clean hero media: video loop → image slider → pattern. No text overlay. */}
        {hasVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroVideoPoster}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        ) : hasRealImages ? (
          <AnimatePresence>
            <motion.img
              key={heroImageIndex}
              src={optimizeImg(images[heroImageIndex], { w: 1920, h: 1080 })}
              alt={`${property.name} — ${heroImageIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <>
            {/* Fallback geometric pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(rgba(198,169,98,0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(198,169,98,0.4) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </>
        )}

        {/* Slider controls (image hero only) */}
        {showSlider && (
          <>
            <button
              aria-label="Previous"
              onClick={() => setHeroImageIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-navy hover:bg-white transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next"
              onClick={() => setHeroImageIndex((i) => (i + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-navy hover:bg-white transition-colors shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/25 backdrop-blur-sm rounded-full px-3 py-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setHeroImageIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    heroImageIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* View gallery (video or image hero) */}
        {hasRealImages && (
          <button
            onClick={() => { setLightboxIndex(hasVideo ? 0 : heroImageIndex); setLightboxOpen(true); }}
            className="absolute bottom-5 right-5 z-20 flex items-center gap-2 bg-black/45 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full hover:bg-black/65 transition-colors"
          >
            <ImageIcon className="w-4 h-4" />
            {showSlider ? `${heroImageIndex + 1} / ${images.length}` : `View Gallery (${images.length})`}
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/*  INFO BAR (clean media hero → details below)                 */}
      {/* ============================================================ */}
      {true && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-7 sm:py-9">
            {/* Top row: tags + share */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {property.badge && badgeConfig[property.badge] && (
                  <span className={`${badgeConfig[property.badge].bg} text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase`}>
                    {badgeConfig[property.badge].label}
                  </span>
                )}
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-dark bg-gold/10 px-3 py-1.5 rounded-full">
                  {property.type}
                </span>
              </div>
              <button
                onClick={handleCopyLink}
                className="shrink-0 inline-flex items-center gap-2 border border-border-medium text-navy/70 text-sm px-4 py-2 rounded-full hover:border-gold hover:text-gold-dark transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>

            {/* Title + location */}
            <h1 className="mt-4 font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-navy leading-tight">
              {property.name}
            </h1>
            <p className="mt-2.5 flex items-center gap-2 text-navy/60 text-sm sm:text-base">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              {property.location}
            </p>

            {/* Price + RERA */}
            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-navy/45 font-medium">
                  Starting Price
                </p>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-navy leading-none mt-1.5">
                  {property.price}
                </p>
              </div>
              {property.rera && (
                <span className="inline-flex items-center gap-2 bg-emerald/10 border border-emerald/25 text-emerald text-sm font-medium px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  RERA: {property.rera}
                </span>
              )}
            </div>

            {/* Spec chips */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                { icon: Maximize2, val: property.area },
                property.bedrooms ? { icon: Bed, val: `${property.bedrooms} BHK` } : null,
                property.bathrooms ? { icon: Bath, val: `${property.bathrooms} Bath` } : null,
                property.floor ? { icon: Building2, val: property.floor } : null,
                property.facing ? { icon: Compass, val: property.facing } : null,
                { icon: Calendar, val: property.possession },
              ]
                .filter(Boolean)
                .map((s, i) => {
                  const spec = s as { icon: React.ElementType; val: string };
                  const Icon = spec.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 bg-bg-cream border border-border-subtle text-navy/75 text-sm px-3.5 py-2 rounded-lg"
                    >
                      <Icon className="w-4 h-4 text-gold" />
                      {spec.val}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/*  SECTION 2: STICKY TAB NAVIGATION                            */}
      {/* ============================================================ */}
      <div ref={tabNavRef} className="h-px" />
      <div
        className={`${
          isSticky ? "fixed top-0 left-0 right-0 shadow-lg z-40" : ""
        } bg-white border-b border-gray-100 transition-shadow duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-all relative border-b-2 ${
                    isActive
                      ? "text-gold border-gold"
                      : "text-gray-500 border-transparent hover:text-charcoal hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{section.label}</span>
                  <span className="sm:hidden">{section.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  MAIN CONTENT AREA                                            */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ======================================================== */}
          {/*  LEFT COLUMN                                              */}
          {/* ======================================================== */}
          <div className="flex-1 min-w-0 space-y-4 sm:space-y-8">
            {/* ====================================================== */}
            {/*  SECTION 3: OVERVIEW                                    */}
            {/* ====================================================== */}
            <section
              ref={setSectionRef("overview")}
              id="overview"
            >
              <FadeIn>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
                  <h2 className="text-lg sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-gold" />
                    </div>
                    About This Property
                  </h2>

                  {/* Auto-formatted description with Show More */}
                  <div className="mb-5 sm:mb-8">
                    {truncatedDescription ? (
                      <>
                        <p className="text-gray-600 leading-relaxed text-[15px]">
                          {truncatedDescription}
                        </p>
                        <button
                          onClick={() => setDescriptionExpanded(true)}
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
                        >
                          Show more
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {formattedParagraphs.length > 1 ? (
                            formattedParagraphs.map((para, i) => (
                              <p key={i} className="text-gray-600 leading-relaxed text-[15px]">
                                {para}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-600 leading-relaxed text-[15px]">
                              {descriptionText}
                            </p>
                          )}
                        </div>
                        {isLongDescription && descriptionExpanded && (
                          <button
                            onClick={() => setDescriptionExpanded(false)}
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
                          >
                            Show less
                            <ChevronUp className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {/* Key Highlights */}
                  {highlights.length > 0 && (
                    <div className="mb-5 sm:mb-8">
                      <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gold" />
                        Key Highlights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {highlights.map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald/5 to-transparent border border-emerald/10"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{h}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Property Details Table */}
                  {detailRows.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gold" />
                        Property Details
                      </h3>
                      <div className="rounded-xl border border-gray-100 overflow-hidden">
                        {detailRows.map((row, i) => (
                          <div
                            key={row.label}
                            className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3.5 text-sm ${
                              i % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                            } ${
                              i < detailRows.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }`}
                          >
                            <span className="text-gray-500 font-medium">
                              {row.label}
                            </span>
                            <span className="text-charcoal font-semibold text-right">
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            </section>

            {/* ====================================================== */}
            {/*  SECTION: IMAGE GALLERY                                */}
            {/* ====================================================== */}
            {hasRealImages && images.length > 1 && (
              <section
                ref={setSectionRef("gallery")}
                id="gallery"
              >
                <FadeIn>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
                    <h2 className="text-lg sm:text-lg sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gold" />
                      </div>
                      Gallery
                      <span className="ml-auto text-sm font-normal text-gray-400">
                        {images.length} photos
                      </span>
                    </h2>

                    {/* Horizontal scroll on mobile, masonry grid on desktop */}
                    <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                      {images.map((img, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                          className={`relative overflow-hidden rounded-xl border border-gray-100 group cursor-pointer snap-start shrink-0 w-[46%] md:w-auto ${
                            i === 0 ? "md:col-span-2 md:row-span-2" : ""
                          }`}
                        >
                          <div className={`${i === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"}`}>
                            <img
                              src={optimizeImg(img, i === 0 ? { w: 800, h: 600 } : { w: 400, h: 400 })}
                              alt={`${property.name} - Photo ${i + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                              <Eye className="w-5 h-5 text-charcoal" />
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </section>
            )}

            {/* ====================================================== */}
            {/*  SECTION: FLOOR PLANS & PRICING TABLE                  */}
            {/* ====================================================== */}
            <section
              ref={setSectionRef("floorplans")}
              id="floorplans"
            >
              <FadeIn>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
                  <h2 className="text-lg sm:text-lg sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Maximize2 className="w-5 h-5 text-gold" />
                    </div>
                    Floor Plans & Pricing
                  </h2>

                  {/* Floor Plans — multi-plan tabbed viewer (gated behind a lead form) */}
                  {floorPlans.length > 0 ? (
                    <div className="mb-5 sm:mb-8">
                      {/* Plan tabs */}
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 -mx-1 px-1">
                        {floorPlans.map((fp, i) => (
                          <button
                            key={fp.url}
                            onClick={() => setActivePlan(i)}
                            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                              activePlan === i
                                ? "bg-navy text-white"
                                : "bg-bg-cream text-navy/70 border border-border-subtle hover:border-gold hover:text-gold-dark"
                            }`}
                          >
                            {fp.title}
                          </button>
                        ))}
                      </div>
                      {plansUnlocked ? (
                        <div className="relative rounded-xl border border-border-subtle overflow-hidden bg-white">
                          <img
                            src={floorPlans[activePlan]?.url}
                            alt={`${floorPlans[activePlan]?.title} — ${property.name}`}
                            className="w-full h-auto object-contain max-h-[560px] mx-auto"
                          />
                          <a
                            href={floorPlans[activePlan]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-navy/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-navy transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Full Size
                          </a>
                        </div>
                      ) : (
                        /* Locked — blurred preview behind, form in normal flow (never clipped) */
                        <div className="relative rounded-2xl overflow-hidden border border-border-subtle">
                          <img
                            src={floorPlans[activePlan]?.url}
                            aria-hidden
                            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 select-none pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-navy/55" />
                          <div className="relative flex items-center justify-center p-4 sm:p-8">
                            <motion.div
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="w-full max-w-sm bg-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(16,42,67,0.3)]"
                            >
                              <div className="flex items-center gap-3 mb-1.5">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 shrink-0">
                                  <Maximize2 className="w-5 h-5 text-gold-dark" />
                                </span>
                                <h3 className="font-heading text-lg text-navy leading-tight">
                                  Unlock all {floorPlans.length} floor plans
                                </h3>
                              </div>
                              <p className="text-sm text-navy/60 mb-4">
                                Enter your details to instantly view the detailed 2 &amp; 3 BHK layouts &amp; master plan.
                              </p>
                              <LeadForm
                                variant="light"
                                source="floorplan_unlock"
                                propertyName={property.name}
                                propertyType={property.type}
                                buttonLabel="View Floor Plans"
                                quiet
                                onSuccess={unlockPlans}
                              />
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : property.floorPlanUrl ? (
                    <div className="mb-5 sm:mb-8">
                      <div className="relative rounded-xl border-2 border-gray-100 overflow-hidden bg-gray-50">
                        <img
                          src={property.floorPlanUrl}
                          alt={`Floor plan of ${property.name}`}
                          className="w-full h-auto object-contain max-h-[500px] mx-auto"
                        />
                        <a
                          href={property.floorPlanUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-charcoal/90 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-charcoal transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Full Size
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 py-16 px-6">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                        <Maximize2 className="w-8 h-8 text-gold/50" />
                      </div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        Floor plan not yet available
                      </p>
                      <p className="text-xs text-gray-400 text-center max-w-sm">
                        Contact us to request floor plans and detailed area statements for this property.
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Request Floor Plan
                      </a>
                    </div>
                  )}

                  {/* Area Statement / Configurations Table */}
                  <div>
                    <h3 className="text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-gold" />
                      Area & Configuration
                    </h3>
                    {/* Config card — stacked on mobile, table on desktop */}
                    <div className="rounded-xl border border-gray-100 overflow-hidden">
                      {/* Desktop table */}
                      <div className="hidden sm:block">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gradient-to-r from-charcoal to-charcoal/90 text-white">
                              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Configuration</th>
                              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">Area</th>
                              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider">Price (Approx.)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-100 hover:bg-gold/5 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-gold" />
                                  <span className="font-medium text-charcoal">
                                    {property.bedrooms ? `${property.bedrooms} BHK` : property.type}
                                    {property.facing ? ` — ${property.facing} Facing` : ""}
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="text-charcoal">
                                  {property.carpetArea && <p className="font-medium">Carpet: {property.carpetArea}</p>}
                                  {property.superBuiltUpArea && <p className="text-xs text-gray-500 mt-0.5">Super Built-up: {property.superBuiltUpArea}</p>}
                                  {!property.carpetArea && !property.superBuiltUpArea && <p className="font-medium">{property.area}</p>}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <span className="text-lg font-bold text-gold">{property.price}</span>
                                {property.bookingAmount && <p className="text-xs text-gray-500 mt-0.5">Booking: {property.bookingAmount}</p>}
                              </td>
                            </tr>
                            {property.areaRange && property.areaRange !== property.area && (
                              <tr className="bg-gold/5">
                                <td colSpan={3} className="px-5 py-3 text-xs text-gray-500">
                                  <span className="font-medium text-charcoal">Available sizes:</span> {property.areaRange}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile stacked card */}
                      <div className="sm:hidden p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gold" />
                          <span className="font-semibold text-charcoal text-sm">
                            {property.bedrooms ? `${property.bedrooms} BHK` : property.type}
                            {property.facing ? ` — ${property.facing}` : ""}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Area</p>
                            <p className="text-sm font-semibold text-charcoal">
                              {property.carpetArea || property.area}
                            </p>
                            {property.superBuiltUpArea && (
                              <p className="text-[10px] text-gray-400 mt-0.5">SBU: {property.superBuiltUpArea}</p>
                            )}
                          </div>
                          <div className="bg-gold/5 rounded-lg p-3">
                            <p className="text-[10px] text-gold-dark uppercase tracking-wider mb-0.5">Price</p>
                            <p className="text-sm font-bold text-gold">{property.price}</p>
                            {property.bookingAmount && (
                              <p className="text-[10px] text-gray-400 mt-0.5">Booking: {property.bookingAmount}</p>
                            )}
                          </div>
                        </div>
                        {property.areaRange && property.areaRange !== property.area && (
                          <p className="text-xs text-gray-500 bg-gold/5 rounded-lg px-3 py-2">
                            <span className="font-medium text-charcoal">Available sizes:</span> {property.areaRange}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
                      <Shield className="w-3 h-3" />
                      Prices are approximate and subject to change. Contact us for exact pricing.
                    </p>
                  </div>

                </div>
              </FadeIn>
            </section>


            {/* ====================================================== */}
            {/*  SECTION 5: AMENITIES                                   */}
            {/* ====================================================== */}
            {amenities.length > 0 && (
              <section
                ref={setSectionRef("amenities")}
                id="amenities"
              >
                <FadeIn>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
                    <h2 className="text-lg sm:text-lg sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-gold" />
                      </div>
                      Amenities & Features
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {amenities.map((amenity, i) => {
                        const Icon = getAmenityIcon(amenity);
                        return (
                          <motion.div
                            key={amenity}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center gap-3 rounded-xl border border-gray-100 p-3.5 hover:border-gold/40 hover:shadow-sm transition-all group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-colors shrink-0">
                              <Icon className="w-5 h-5 text-gold-dark" />
                            </div>
                            <span className="text-sm text-charcoal font-medium leading-tight">
                              {amenity}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>
              </section>
            )}

            {/* ====================================================== */}
            {/*  SECTION 6: LOCATION & NEARBY                          */}
            {/* ====================================================== */}
            <section
              ref={setSectionRef("location")}
              id="location"
            >
              <FadeIn>
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
                  <h2 className="text-lg sm:text-lg sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <MapPinned className="w-5 h-5 text-gold" />
                    </div>
                    Location & Nearby
                  </h2>

                  {/* Location & connectivity maps (gated behind a lead form) */}
                  {locationMaps.length > 0 && (
                    <div className="mb-6">
                      {plansUnlocked ? (
                        <div className="space-y-5">
                          {locationMaps.map((m) => (
                            <div key={m.url}>
                              <p className="text-sm font-semibold text-navy/70 mb-2">{m.title}</p>
                              <a
                                href={m.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative rounded-xl border border-border-subtle overflow-hidden bg-bg-cream group"
                              >
                                <img
                                  src={m.url}
                                  alt={`${m.title} — ${property.name}`}
                                  className="w-full h-auto object-contain"
                                />
                                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-navy/85 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink className="w-3 h-3" /> Full size
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Locked — blurred preview behind, form in normal flow */
                        <div className="relative rounded-2xl overflow-hidden border border-border-subtle">
                          <img
                            src={locationMaps[0].url}
                            aria-hidden
                            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 select-none pointer-events-none"
                          />
                          <div className="absolute inset-0 bg-navy/55" />
                          <div className="relative flex items-center justify-center p-4 sm:p-8">
                            <motion.div
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4 }}
                              className="w-full max-w-sm bg-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(16,42,67,0.3)]"
                            >
                              <div className="flex items-center gap-3 mb-1.5">
                                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/15 shrink-0">
                                  <MapPinned className="w-5 h-5 text-gold-dark" />
                                </span>
                                <h3 className="font-heading text-lg text-navy leading-tight">
                                  Unlock location &amp; connectivity maps
                                </h3>
                              </div>
                              <p className="text-sm text-navy/60 mb-4">
                                Enter your details to view the locality map, connectivity &amp; nearby landmarks.
                              </p>
                              <LeadForm
                                variant="light"
                                source="brochure_unlock"
                                propertyName={property.name}
                                propertyType={property.type}
                                buttonLabel="View Maps"
                                quiet
                                onSuccess={unlockPlans}
                              />
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Google Maps link */}
                  {property.latitude && property.longitude && (
                    <a
                      href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full rounded-xl bg-charcoal/5 border-2 border-dashed border-gray-200 h-48 mb-6 hover:border-gold/40 hover:bg-gold/5 transition-all group"
                    >
                      <div className="text-center">
                        <MapPinned className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-gold transition-colors" />
                        <p className="text-sm font-medium text-charcoal group-hover:text-gold transition-colors">
                          View on Google Maps
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 justify-center">
                          <ExternalLink className="w-3 h-3" />
                          {property.location}
                        </p>
                      </div>
                    </a>
                  )}

                  {!property.latitude && (
                    <div className="flex items-center justify-center w-full rounded-xl bg-charcoal/5 border-2 border-dashed border-gray-200 h-48 mb-6">
                      <div className="text-center">
                        <MapPinned className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          {property.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Video Tour */}
                  {property.videoUrl && (
                    <div className="mb-6">
                      <h3 className="text-base font-semibold text-charcoal mb-3 flex items-center gap-2">
                        <Play className="w-5 h-5 text-gold" />
                        Video Tour
                      </h3>
                      <div className="aspect-video rounded-xl overflow-hidden bg-charcoal">
                        <iframe
                          src={property.videoUrl.replace(
                            "watch?v=",
                            "embed/"
                          )}
                          title={`Video tour of ${property.name}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Nearby Places */}
                  {nearbyPlaces.length > 0 && (
                    <div>
                      <h3 className="text-base font-semibold text-charcoal mb-4">
                        Nearby Places
                      </h3>
                      {Object.keys(nearbyByCategory).length > 1 ? (
                        Object.entries(nearbyByCategory).map(
                          ([category, places]) => (
                            <div key={category} className="mb-4 last:mb-0">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                {category}
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {places.map((place) => (
                                  <div
                                    key={place.name}
                                    className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5 hover:border-gold/30 transition-colors"
                                  >
                                    <span className="flex items-center gap-2 text-sm text-charcoal font-medium">
                                      <MapPin className="w-3.5 h-3.5 text-gold" />
                                      {place.name}
                                    </span>
                                    <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                                      {place.distance}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {nearbyPlaces.map((place) => (
                            <div
                              key={place.name}
                              className="flex items-center justify-between rounded-xl border border-gray-100 p-3.5 hover:border-gold/30 transition-colors"
                            >
                              <span className="flex items-center gap-2 text-sm text-charcoal font-medium">
                                <MapPin className="w-3.5 h-3.5 text-gold" />
                                {place.name}
                              </span>
                              <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                                {place.distance}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>
            </section>

            {/* ====================================================== */}
            {/*  SECTION 7: DOCUMENTS & VERIFICATION                   */}
            {/* ====================================================== */}
            {documents.length > 0 && (
              <section
                ref={setSectionRef("documents")}
                id="documents"
              >
                <FadeIn>
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-7 shadow-sm border border-gray-100">
                    <h2 className="text-lg sm:text-lg sm:text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                        <FileCheck className="w-5 h-5 text-gold" />
                      </div>
                      Documents & Verification
                    </h2>

                    <div className="space-y-2.5">
                      {documents.map((doc, i) => (
                        <motion.div
                          key={doc.title}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between rounded-xl border border-gray-100 p-4 hover:border-gold/20 transition-colors"
                        >
                          <span className="flex items-center gap-3 text-sm font-medium text-charcoal">
                            <FileText className="w-4 h-4 text-gray-400" />
                            {doc.title}
                          </span>
                          {doc.status === "verified" && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald bg-emerald/10 px-3 py-1.5 rounded-full">
                              <CheckCircle className="w-4 h-4" />
                              Verified
                            </span>
                          )}
                          {doc.status === "pending" && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-full">
                              <Clock className="w-4 h-4" />
                              Pending
                            </span>
                          )}
                          {doc.status === "na" && (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                              <Minus className="w-4 h-4" />
                              N/A
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Trust banner */}
                    <div className="mt-6 bg-gradient-to-r from-emerald/5 to-emerald/10 border border-emerald/20 rounded-xl p-4 flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-emerald shrink-0" />
                      <p className="text-sm text-emerald font-medium">
                        All documents are verified by Crystal Estates to ensure
                        complete transparency and buyer safety.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </section>
            )}

            {/* ====================================================== */}
            {/*  SECTION 8: TRUST SIGNALS                              */}
            {/* ====================================================== */}
            <FadeIn className="hidden sm:block">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    icon: Shield,
                    title: "RERA Registered",
                    desc: "Govt. verified",
                    color: "text-emerald",
                    bg: "bg-emerald/10",
                  },
                  {
                    icon: FileCheck,
                    title: "Title Verified",
                    desc: "Clear ownership",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    icon: BadgeIndianRupee,
                    title: "Transparent Pricing",
                    desc: "No hidden charges",
                    color: "text-gold-dark",
                    bg: "bg-gold/10",
                  },
                  {
                    icon: Users,
                    title: "Data-Driven",
                    desc: "Tech-powered analysis",
                    color: "text-purple-600",
                    bg: "bg-purple-50",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <p className="text-sm font-bold text-charcoal">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          {/* ======================================================== */}
          {/*  RIGHT COLUMN - SIDEBAR (desktop only)                   */}
          {/* ======================================================== */}
          <div className="hidden lg:block w-[360px] shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Lead Capture Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-charcoal rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-1">
                  <Heart className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-bold text-white">
                    Interested?
                  </h3>
                </div>
                <p className="text-sm text-gray-400 mb-5">
                  Fill in your details for a callback or site visit.
                </p>

                <LeadForm
                  variant="dark"
                  source="property_inquiry"
                  propertyName={property.name}
                  propertyType={property.type}
                  buttonLabel="Request a Callback"
                  successMessage="Our team will call you shortly."
                />

                {/* Quick actions */}
                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+917666229818"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </motion.div>

              {/* Quick property summary */}
              <div className="bg-gradient-to-br from-gold/5 to-gold/10 rounded-2xl p-5 border border-gold/20">
                <p className="text-xs text-gold-dark uppercase tracking-wider font-semibold mb-2">
                  Quick Summary
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-semibold text-charcoal">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Area</span>
                    <span className="font-semibold text-charcoal">
                      {property.area}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Possession</span>
                    <span className="font-semibold text-charcoal">
                      {property.possession}
                    </span>
                  </div>
                  {property.builderName && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Builder</span>
                      <span className="font-semibold text-charcoal">
                        {property.builderName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  MOBILE LEAD CAPTURE (visible only on mobile)                */}
        {/* ============================================================ */}
        <div className="lg:hidden mt-8">
          <div className="bg-charcoal rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-1">
              <Heart className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-bold text-white">Interested?</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Fill in your details for a callback or site visit.
            </p>

            <LeadForm
              variant="dark"
              source="property_inquiry"
              propertyName={property.name}
              propertyType={property.type}
              buttonLabel="Request a Callback"
              successMessage="Our team will call you shortly."
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/*  SECTION 9: SIMILAR PROPERTIES                               */}
        {/* ============================================================ */}
        {relatedProperties.length > 0 && (
          <FadeIn className="mt-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-charcoal">
                    Similar Properties
                  </h2>
                  <p className="text-sm text-gray-500">
                    Properties you might also like
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProperties.map((rp) => (
                  <PropertyCard key={rp.id} property={rp} />
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>

      {/* ============================================================ */}
      {/*  MOBILE STICKY BOTTOM BAR                                    */}
      {/* ============================================================ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-[0_-4px_30px_rgba(0,0,0,0.12)] p-3 z-50 lg:hidden border-t border-gray-100">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          <div className="min-w-0">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
              Price
            </p>
            <p className="text-lg font-bold text-gold leading-tight truncate">
              {property.price}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:+917666229818"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-charcoal text-white hover:bg-charcoal/90 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-5 py-3 text-sm font-bold text-charcoal"
            >
              <Calendar className="w-4 h-4" />
              Book Visit
            </a>
          </div>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:hidden" />

      {/* ============================================================ */}
      {/*  LIGHTBOX MODAL                                               */}
      {/* ============================================================ */}
      <AnimatePresence>
        {lightboxOpen && hasRealImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
          >
            {/* Lightbox header */}
            <div className="flex items-center justify-between px-4 py-3 shrink-0">
              <span className="text-white/70 text-sm font-medium">
                {lightboxIndex + 1} of {images.length}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={images[lightboxIndex]}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors p-2"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main image */}
            <div className="flex-1 flex items-center justify-center px-2 sm:px-4 relative min-h-0">
              {/* Prev */}
              <button
                onClick={() => setLightboxIndex((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-1 sm:left-4 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={images[lightboxIndex]}
                  alt={`${property.name} - Photo ${lightboxIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[calc(100%-80px)] sm:max-w-full max-h-full object-contain rounded-lg"
                />
              </AnimatePresence>

              {/* Next */}
              <button
                onClick={() => setLightboxIndex((i) => (i + 1) % images.length)}
                className="absolute right-1 sm:right-4 z-10 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="shrink-0 py-3 px-4">
              <div className="flex gap-2 justify-center overflow-x-auto scrollbar-hide max-w-3xl mx-auto">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      lightboxIndex === i
                        ? "border-gold opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={optimizeImg(img, { w: 128, h: 96 })} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
