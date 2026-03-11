"use client";

import { useState } from "react";
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
  XCircle,
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
} from "lucide-react";
import type { Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";

interface PropertyDetailProps {
  property: Property;
  relatedProperties: Property[];
}

const tabs = [
  { id: "overview", label: "Overview", icon: List },
  { id: "amenities", label: "Amenities", icon: ShieldCheck },
  { id: "location", label: "Location", icon: MapPinned },
  { id: "pricing", label: "Price Breakdown", icon: IndianRupee },
  { id: "documents", label: "Documents", icon: FileText },
] as const;

type TabId = (typeof tabs)[number]["id"];

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
};

function getAmenityIcon(name: string): React.ElementType {
  return amenityIconMap[name] || CheckCircle;
}

export default function PropertyDetail({
  property,
  relatedProperties,
}: PropertyDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${property.name}" (${property.price}). Please share more details.`
  );
  const whatsappUrl = `https://wa.me/919887073904?text=${whatsappMessage}`;

  const handleBookVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) return;

    // Save lead to Airtable
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
          message: `Site visit request for ${property.name} (${property.price})`,
        }),
      });
    } catch {
      // Don't block WhatsApp redirect on API failure
    }

    // Also open WhatsApp for immediate contact
    const msg = encodeURIComponent(
      `Hi, I'm ${formName} (${formPhone}). I'd like to book a site visit for "${property.name}".`
    );
    window.open(`https://wa.me/919887073904?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Breadcrumb */}
      <div className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* Hero Image Placeholder */}
      <div className="relative h-[400px] md:h-[500px] bg-charcoal overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(198,169,98,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(198,169,98,0.4) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 max-w-7xl mx-auto">
          <span className="inline-block text-xs tracking-[0.2em] uppercase text-gold-light font-medium mb-2">
            {property.type}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {property.name}
          </h1>
          <p className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
            <MapPin className="w-4 h-4" />
            {property.location}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="flex-1 min-w-0">
            {/* Price & Key Specs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-3xl font-bold text-gold">{property.price}</p>

              {/* Key Specs Bar */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-charcoal" />
                  {property.area}
                </span>
                {property.bedrooms && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-charcoal" />
                      {property.bedrooms} Bedrooms
                    </span>
                  </>
                )}
                {property.bathrooms && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-charcoal" />
                      {property.bathrooms} Bathrooms
                    </span>
                  </>
                )}
                {property.floor && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-charcoal" />
                      {property.floor}
                    </span>
                  </>
                )}
                {property.facing && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-charcoal" />
                      {property.facing} Facing
                    </span>
                  </>
                )}
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-charcoal" />
                  {property.possession}
                </span>
              </div>

              {/* RERA */}
              {property.rera && (
                <div className="mt-4">
                  <span className="inline-block bg-emerald/10 text-emerald text-xs font-medium px-3 py-1.5 rounded-md">
                    RERA: {property.rera}
                  </span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex overflow-x-auto border-b border-gray-100">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 whitespace-nowrap px-5 py-4 text-sm font-medium transition-colors relative ${
                        activeTab === tab.id
                          ? "text-gold"
                          : "text-gray-500 hover:text-charcoal"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-6"
                >
                  {/* Overview */}
                  {activeTab === "overview" && (
                    <div>
                      <h3 className="text-lg font-bold text-charcoal mb-3">
                        About This Property
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {property.description}
                      </p>
                      <h4 className="text-base font-semibold text-charcoal mb-3">
                        Highlights
                      </h4>
                      <ul className="space-y-2.5">
                        {property.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2.5 text-gray-600"
                          >
                            <CheckCircle className="w-4.5 h-4.5 text-emerald shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Amenities */}
                  {activeTab === "amenities" && (
                    <div>
                      <h3 className="text-lg font-bold text-charcoal mb-4">
                        Amenities & Features
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.amenities.map((amenity) => {
                          const Icon = getAmenityIcon(amenity);
                          return (
                            <div
                              key={amenity}
                              className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 hover:border-gold/30 transition-colors"
                            >
                              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold/10">
                                <Icon className="w-4.5 h-4.5 text-gold-dark" />
                              </div>
                              <span className="text-sm text-charcoal font-medium">
                                {amenity}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {activeTab === "location" && (
                    <div>
                      <h3 className="text-lg font-bold text-charcoal mb-4">
                        Location & Nearby
                      </h3>
                      {/* Map Placeholder */}
                      <div className="relative rounded-xl bg-charcoal/5 border-2 border-dashed border-gray-200 h-48 flex items-center justify-center mb-6">
                        <div className="text-center">
                          <MapPinned className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Map view coming soon
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {property.location}
                          </p>
                        </div>
                      </div>
                      {/* Nearby Places */}
                      <h4 className="text-base font-semibold text-charcoal mb-3">
                        Nearby Places
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {property.nearbyPlaces.map((place) => (
                          <div
                            key={place.name}
                            className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                          >
                            <span className="flex items-center gap-2 text-sm text-charcoal">
                              <MapPin className="w-3.5 h-3.5 text-gold" />
                              {place.name}
                            </span>
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                              {place.distance}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  {activeTab === "pricing" && (
                    <div>
                      <h3 className="text-lg font-bold text-charcoal mb-4">
                        Price Breakdown
                      </h3>
                      <div className="rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm">
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="px-5 py-4 text-gray-600">
                                Base Price
                              </td>
                              <td className="px-5 py-4 text-right font-semibold text-charcoal">
                                {property.priceBreakdown.basePrice}
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="px-5 py-4 text-gray-600">
                                Stamp Duty
                              </td>
                              <td className="px-5 py-4 text-right font-semibold text-charcoal">
                                {property.priceBreakdown.stampDuty}
                              </td>
                            </tr>
                            <tr className="border-b border-gray-100">
                              <td className="px-5 py-4 text-gray-600">
                                Registration
                              </td>
                              <td className="px-5 py-4 text-right font-semibold text-charcoal">
                                {property.priceBreakdown.registration}
                              </td>
                            </tr>
                            <tr className="bg-gold/5">
                              <td className="px-5 py-4 font-bold text-charcoal">
                                Total (Estimated)
                              </td>
                              <td className="px-5 py-4 text-right font-bold text-gold text-lg">
                                {property.priceBreakdown.total}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        * Prices are estimated and may vary. Stamp duty and
                        registration charges are approximate.
                      </p>
                    </div>
                  )}

                  {/* Documents */}
                  {activeTab === "documents" && (
                    <div>
                      <h3 className="text-lg font-bold text-charcoal mb-4">
                        Document Verification
                      </h3>
                      <div className="space-y-3">
                        {property.documents.map((doc) => (
                          <div
                            key={doc.title}
                            className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                          >
                            <span className="text-sm font-medium text-charcoal">
                              {doc.title}
                            </span>
                            {doc.status === "verified" && (
                              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald">
                                <CheckCircle className="w-4 h-4" />
                                Verified
                              </span>
                            )}
                            {doc.status === "pending" && (
                              <span className="flex items-center gap-1.5 text-xs font-medium text-yellow-600">
                                <Clock className="w-4 h-4" />
                                Pending
                              </span>
                            )}
                            {doc.status === "na" && (
                              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                                <XCircle className="w-4 h-4" />
                                N/A
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column - Sidebar (desktop) */}
          <div className="hidden lg:block w-[350px] shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Lead Capture Card */}
              <div className="bg-charcoal rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-white mb-1">
                  Interested in this property?
                </h3>
                <p className="text-sm text-gray-400 mb-5">
                  Fill in your details and we&apos;ll get back to you.
                </p>

                <form onSubmit={handleBookVisit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-emerald py-3 text-sm font-bold text-white hover:bg-emerald-light transition-colors"
                  >
                    Book Site Visit
                  </button>
                </form>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 w-full rounded-lg bg-green-600 py-3 text-sm font-bold text-white hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>

              {/* Agent Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-gold-dark">RS</span>
                  </div>
                  <div>
                    <p className="font-bold text-charcoal">Rahul Sharma</p>
                    <p className="text-xs text-gray-500">
                      Property Consultant
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+919887073904"
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-lg border border-charcoal py-2.5 text-sm font-medium text-charcoal hover:bg-charcoal hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91 98870 73904
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-charcoal mb-6">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((rp) => (
                <PropertyCard key={rp.id} property={rp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-4 z-40 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-lg font-bold text-gold">{property.price}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-11 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="tel:+919887073904"
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald px-5 py-3 text-sm font-bold text-white hover:bg-emerald-light transition-colors"
            >
              <Phone className="w-4 h-4" />
              Book Site Visit
            </a>
          </div>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
