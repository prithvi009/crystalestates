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
} from "lucide-react";
import type { Property } from "@/lib/db/schema";
import PropertyCard from "./PropertyCard";

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
  { id: "pricing", label: "Price & EMI", icon: IndianRupee },
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
/*  EMI Calculator helper                                              */
/* ------------------------------------------------------------------ */

function calculateEMI(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return emi;
}

function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`;
  }
  return amount.toLocaleString("en-IN");
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
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState(
    `I'm interested in ${property.name}`
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  // EMI calculator state
  const defaultLoan = Math.round(property.priceNumeric * 0.8);
  const [loanAmount, setLoanAmount] = useState(defaultLoan);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const tabNavRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  /* ---- Derived data ---- */
  const highlights = (property.highlights ?? []) as string[];
  const amenities = (property.amenities ?? []) as string[];
  const nearbyPlaces = (property.nearbyPlaces ?? []) as NearbyPlace[];
  const priceBreakdown = (property.priceBreakdown ?? {}) as PriceBreakdown;
  const documents = (property.documents ?? []) as DocItem[];

  const monthlyEMI = useMemo(
    () => calculateEMI(loanAmount, interestRate, tenure),
    [loanAmount, interestRate, tenure]
  );
  const totalAmount = monthlyEMI * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  /* ---- WhatsApp ---- */
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${property.name}" (${property.price}). Please share more details.`
  );
  const whatsappUrl = `https://wa.me/919887073904?text=${whatsappMessage}`;

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

  const handleBookVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          source: "property_inquiry",
          propertyInterest: property.name,
          propertyType: property.type,
          message: formMessage || `Site visit request for ${property.name}`,
        }),
      });
    } catch {
      // Don't block WhatsApp redirect
    }

    setFormSubmitted(true);
    const msg = encodeURIComponent(
      `Hi, I'm ${formName} (${formPhone}). I'd like to book a site visit for "${property.name}".`
    );
    window.open(`https://wa.me/919887073904?text=${msg}`, "_blank");
  };

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

  const tenureOptions = [5, 10, 15, 20, 25, 30];

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="min-h-screen bg-offwhite">
      {/* ============================================================ */}
      {/*  BREADCRUMB                                                   */}
      {/* ============================================================ */}
      <div className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 md:pt-24">
          <nav className="flex items-center gap-2 text-sm text-gray-400 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-gold transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/properties"
              className="hover:text-gold transition-colors"
            >
              Properties
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gold truncate max-w-[200px]">
              {property.name}
            </span>
          </nav>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  SECTION 1: HERO / GALLERY AREA                              */}
      {/* ============================================================ */}
      <div className="relative h-[420px] md:h-[520px] bg-charcoal overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(198,169,98,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198,169,98,0.4) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Animated shimmer */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(198,169,98,0.3) 50%, transparent 70%)",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-10" />

        {/* Badge */}
        {property.badge && badgeConfig[property.badge] && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`absolute top-6 left-6 z-20 ${badgeConfig[property.badge].bg} text-white text-xs font-bold px-4 py-2 rounded-full tracking-wide uppercase shadow-lg`}
          >
            {badgeConfig[property.badge].label}
          </motion.span>
        )}

        {/* Share button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleCopyLink}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm px-4 py-2.5 rounded-full hover:bg-white/20 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-light" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </>
          )}
        </motion.button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs tracking-[0.25em] uppercase text-gold-light font-semibold mb-3 bg-gold/10 px-3 py-1 rounded-full backdrop-blur-sm">
              {property.type}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {property.name}
            </h1>
            <p className="flex items-center gap-2 text-gray-300 text-sm md:text-base mb-6">
              <MapPin className="w-4 h-4 text-gold" />
              {property.location}
            </p>

            {/* Quick specs bar */}
            <div className="flex flex-wrap items-center gap-3 md:gap-5">
              {/* Price - prominent */}
              <div className="bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-xl px-5 py-3">
                <p className="text-xs text-gold-light uppercase tracking-wider font-medium">
                  Price
                </p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {property.price}
                </p>
              </div>

              {/* Other specs */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                  <Maximize2 className="w-4 h-4 text-gold-light" />
                  {property.area}
                </span>
                {property.bedrooms && (
                  <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <Bed className="w-4 h-4 text-gold-light" />
                    {property.bedrooms} BHK
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <Bath className="w-4 h-4 text-gold-light" />
                    {property.bathrooms} Bath
                  </span>
                )}
                {property.floor && (
                  <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <Building2 className="w-4 h-4 text-gold-light" />
                    {property.floor}
                  </span>
                )}
                {property.facing && (
                  <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                    <Compass className="w-4 h-4 text-gold-light" />
                    {property.facing}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10">
                  <Calendar className="w-4 h-4 text-gold-light" />
                  {property.possession}
                </span>
              </div>
            </div>

            {/* RERA badge */}
            {property.rera && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 inline-flex items-center gap-2 bg-emerald/20 backdrop-blur-sm border border-emerald/30 text-white text-sm font-medium px-4 py-2 rounded-full"
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                RERA: {property.rera}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

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
                  className={`flex items-center gap-2 whitespace-nowrap px-5 py-4 text-sm font-medium transition-all relative border-b-2 ${
                    isActive
                      ? "text-gold border-gold"
                      : "text-gray-500 border-transparent hover:text-charcoal hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  MAIN CONTENT AREA                                            */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ======================================================== */}
          {/*  LEFT COLUMN                                              */}
          {/* ======================================================== */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* ====================================================== */}
            {/*  SECTION 3: OVERVIEW                                    */}
            {/* ====================================================== */}
            <section
              ref={setSectionRef("overview")}
              id="overview"
            >
              <FadeIn>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-charcoal mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-gold" />
                    </div>
                    About This Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-[15px] mb-8">
                    {property.description}
                  </p>

                  {/* Key Highlights */}
                  {highlights.length > 0 && (
                    <div className="mb-8">
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
                            className={`flex items-center justify-between px-5 py-3.5 text-sm ${
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
            {/*  SECTION 4: PRICE & EMI CALCULATOR                     */}
            {/* ====================================================== */}
            <section
              ref={setSectionRef("pricing")}
              id="pricing"
            >
              <FadeIn>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <BadgeIndianRupee className="w-5 h-5 text-gold" />
                    </div>
                    Price & EMI Calculator
                  </h2>

                  {/* Price Breakdown */}
                  {(priceBreakdown.basePrice || priceBreakdown.total) && (
                    <div className="mb-8">
                      <h3 className="text-base font-semibold text-charcoal mb-3">
                        Price Breakdown
                      </h3>
                      <div className="rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            {priceBreakdown.basePrice && (
                              <tr className="border-b border-gray-100">
                                <td className="px-5 py-4 text-gray-600">
                                  Base Price
                                </td>
                                <td className="px-5 py-4 text-right font-semibold text-charcoal">
                                  {priceBreakdown.basePrice}
                                </td>
                              </tr>
                            )}
                            {priceBreakdown.stampDuty && (
                              <tr className="border-b border-gray-100">
                                <td className="px-5 py-4 text-gray-600">
                                  Stamp Duty (approx.)
                                </td>
                                <td className="px-5 py-4 text-right font-semibold text-charcoal">
                                  {priceBreakdown.stampDuty}
                                </td>
                              </tr>
                            )}
                            {priceBreakdown.registration && (
                              <tr className="border-b border-gray-100">
                                <td className="px-5 py-4 text-gray-600">
                                  Registration (approx.)
                                </td>
                                <td className="px-5 py-4 text-right font-semibold text-charcoal">
                                  {priceBreakdown.registration}
                                </td>
                              </tr>
                            )}
                            {property.bookingAmount && (
                              <tr className="border-b border-gray-100">
                                <td className="px-5 py-4 text-gray-600">
                                  Booking Amount
                                </td>
                                <td className="px-5 py-4 text-right font-semibold text-emerald">
                                  {property.bookingAmount}
                                </td>
                              </tr>
                            )}
                            {priceBreakdown.total && (
                              <tr className="bg-gradient-to-r from-gold/5 to-gold/10">
                                <td className="px-5 py-4 font-bold text-charcoal text-base">
                                  Total (Estimated)
                                </td>
                                <td className="px-5 py-4 text-right font-bold text-gold text-xl">
                                  {priceBreakdown.total}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        * Prices are estimated and may vary. Stamp duty and
                        registration charges are approximate.
                      </p>
                    </div>
                  )}

                  {/* EMI Calculator */}
                  <div className="bg-gradient-to-br from-charcoal to-charcoal/95 rounded-2xl p-6 md:p-8 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">EMI Calculator</h3>
                        <p className="text-xs text-gray-400">
                          Estimate your monthly payments
                        </p>
                      </div>
                    </div>

                    {/* Loan Amount */}
                    <div className="mb-6">
                      <label className="text-sm text-gray-400 mb-2 block">
                        Loan Amount
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setLoanAmount((v) => Math.max(100000, v - 500000))
                          }
                          className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-bold text-gold">
                            {formatCurrency(loanAmount)}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setLoanAmount((v) =>
                              Math.min(property.priceNumeric, v + 500000)
                            )
                          }
                          className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="range"
                        min={100000}
                        max={property.priceNumeric}
                        step={100000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full mt-3 accent-gold h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 L</span>
                        <span>{formatCurrency(property.priceNumeric)}</span>
                      </div>
                    </div>

                    {/* Interest Rate */}
                    <div className="mb-6">
                      <label className="text-sm text-gray-400 mb-2 block">
                        Interest Rate: {interestRate}% p.a.
                      </label>
                      <input
                        type="range"
                        min={7}
                        max={12}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        className="w-full accent-gold h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>7%</span>
                        <span>12%</span>
                      </div>
                    </div>

                    {/* Tenure */}
                    <div className="mb-8">
                      <label className="text-sm text-gray-400 mb-3 block">
                        Loan Tenure
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {tenureOptions.map((y) => (
                          <button
                            key={y}
                            onClick={() => setTenure(y)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              tenure === y
                                ? "bg-gold text-charcoal"
                                : "bg-white/10 text-gray-300 hover:bg-white/20"
                            }`}
                          >
                            {y} yrs
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* EMI Result */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                      <div className="text-center mb-4">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                          Your Monthly EMI
                        </p>
                        <p className="text-4xl font-bold text-gold">
                          <span className="text-lg mr-1">&#8377;</span>
                          {Math.round(monthlyEMI).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">
                            Total Interest
                          </p>
                          <p className="text-sm font-bold text-white">
                            &#8377; {formatCurrency(Math.round(totalInterest))}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white/5 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">
                            Total Amount
                          </p>
                          <p className="text-sm font-bold text-white">
                            &#8377; {formatCurrency(Math.round(totalAmount))}
                          </p>
                        </div>
                      </div>
                    </div>
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
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
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
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <MapPinned className="w-5 h-5 text-gold" />
                    </div>
                    Location & Nearby
                  </h2>

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
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
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
            <FadeIn>
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
                    title: "300+ Families",
                    desc: "Happy homeowners",
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

                {formSubmitted ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-12 h-12 text-emerald mx-auto mb-3" />
                    <p className="text-white font-bold">Thank you!</p>
                    <p className="text-sm text-gray-400 mt-1">
                      We&apos;ll contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookVisit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      required
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                    />
                    <textarea
                      placeholder="Message (optional)"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows={2}
                      className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-gold to-gold-light py-3.5 text-sm font-bold text-charcoal hover:opacity-90 transition-opacity shadow-lg shadow-gold/20"
                    >
                      Schedule Site Visit
                    </button>
                  </form>
                )}

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
                    href="tel:+919887073904"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 py-3 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </div>
              </motion.div>

              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border-2 border-gold/20">
                    <span className="text-xl font-bold text-gold-dark">
                      RS
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal">Rahul Sharma</p>
                    <p className="text-xs text-gray-500">
                      Senior Property Consultant
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className="w-3 h-3 rounded-full bg-gold"
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">5.0</span>
                    </div>
                  </div>
                </div>
                <a
                  href="tel:+919887073904"
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl border-2 border-charcoal py-3 text-sm font-bold text-charcoal hover:bg-charcoal hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  +91 98870 73904
                </a>
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
        {/*  SECTION 9: SIMILAR PROPERTIES                               */}
        {/* ============================================================ */}
        {relatedProperties.length > 0 && (
          <FadeIn className="mt-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
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
              href="tel:+919887073904"
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
    </div>
  );
}
