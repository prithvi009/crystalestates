"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, MapPin, BarChart3, Lock } from "lucide-react";

const trustItems = [
  { label: "RERA Registered", icon: ShieldCheck },
  { label: "Title-Verified Properties", icon: CheckCircle },
  { label: "2 Cities, 1 Standard", icon: MapPin },
  { label: "Data-Powered Search", icon: BarChart3 },
  { label: "\u20B90 Hidden Charges", icon: Lock },
];

export default function TrustBar() {
  return (
    <motion.section
      className="bg-white border-y border-border-subtle py-8 sm:py-10 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Desktop: horizontal row */}
      <div className="hidden md:flex items-center justify-center max-w-6xl mx-auto px-6">
        {trustItems.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <div className="w-[1px] h-8 bg-border-medium mx-6 lg:mx-8" />
            )}
            <div className="flex items-center gap-2.5">
              <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="font-body text-sm text-navy tracking-wider uppercase whitespace-nowrap">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: 2-column grid */}
      <div className="md:hidden px-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="font-body text-[13px] text-navy font-medium tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
