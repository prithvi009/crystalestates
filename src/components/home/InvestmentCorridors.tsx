"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, MapPin, Building2, ArrowRight, X } from "lucide-react";

interface Corridor {
  name: string;
  tag: string;
  priceRange: string;
  appreciation: string;
  properties: number;
}

const corridors: Corridor[] = [
  {
    name: "Pune-Solapur Highway (NH65)",
    tag: "High-Growth Corridor",
    priceRange: "\u20B92,500\u2013\u20B94,000/sqft",
    appreciation: "12-15%",
    properties: 8,
  },
  {
    name: "PMRDA Eastern Belt",
    tag: "Loni Kalbhor, Wagholi, Kedgaon",
    priceRange: "\u20B93,500\u2013\u20B96,000/sqft",
    appreciation: "10-18%",
    properties: 6,
  },
  {
    name: "Talegaon-Chakan",
    tag: "Industrial + Residential",
    priceRange: "\u20B93,000\u2013\u20B95,500/sqft",
    appreciation: "10-15%",
    properties: 4,
  },
  {
    name: "Mumbai \u2013 Andheri East",
    tag: "Crest Oaks Territory",
    priceRange: "\u20B915,000\u2013\u20B925,000/sqft",
    appreciation: "8-12%",
    properties: 3,
  },
  {
    name: "Solapur MIDC Corridor",
    tag: "Industrial Growth Zone",
    priceRange: "\u20B91,500\u2013\u20B93,000/sqft",
    appreciation: "8-12%",
    properties: 5,
  },
  {
    name: "Solapur Smart City Zone",
    tag: "Govt-Backed Infrastructure",
    priceRange: "\u20B92,000\u2013\u20B93,500/sqft",
    appreciation: "10-14%",
    properties: 4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function InvestmentCorridors() {
  const [showModal, setShowModal] = useState(false);
  const [reportPhone, setReportPhone] = useState("");
  const [reportName, setReportName] = useState("");

  return (
    <section className="py-20 sm:py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl text-text-dark mb-4">
            Where Smart Money Is Moving
          </h2>
          <div className="flex justify-center">
            <motion.div
              className="h-[3px] bg-gold rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            />
          </div>
        </div>

        {/* Corridors grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {corridors.map((corridor) => (
            <motion.div
              key={corridor.name}
              variants={cardVariants}
              className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md border-l-[3px] border-l-gold hover:border-l-[5px] transition-all duration-300 hover:-translate-y-0.5"
            >
              {/* Title & tag */}
              <h3 className="font-body text-base font-semibold text-text-dark mb-1">
                {corridor.name}
              </h3>
              <p className="text-xs text-gold font-medium mb-4">
                {corridor.tag}
              </p>

              {/* Data rows */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-text-dark-muted">
                    {corridor.priceRange}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald shrink-0" />
                  <span className="text-emerald font-medium">
                    {corridor.appreciation} annual appreciation
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="text-text-dark-muted">
                    {corridor.properties} properties available
                  </span>
                </div>
              </div>

              {/* Explore link */}
              <button className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-200 group/link">
                Explore
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-8 py-3.5 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors duration-300"
          >
            Get Our Free Investment Report
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-charcoal mb-2">
                Free Investment Report
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Get detailed corridor-wise analysis, price trends, and our top
                property picks delivered to your WhatsApp.
              </p>

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                />
                <input
                  type="tel"
                  value={reportPhone}
                  onChange={(e) => setReportPhone(e.target.value)}
                  placeholder="Phone number (10 digits)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                />
              </div>

              <button
                onClick={async () => {
                  if (
                    reportName.trim() &&
                    reportPhone.replace(/\D/g, "").length >= 10
                  ) {
                    try {
                      await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: reportName,
                          phone: reportPhone.replace(/\D/g, "").slice(-10),
                          source: "investment_report",
                          message:
                            "Requested free investment corridor report",
                        }),
                      });
                    } catch {
                      /* continue to WhatsApp */
                    }
                  }
                  const msg = encodeURIComponent(
                    `Hi, I'm ${reportName || "interested"}. I'd like to receive the free investment report from Crystal Estates.`
                  );
                  window.open(
                    `https://wa.me/919511750686?text=${msg}`,
                    "_blank"
                  );
                  setShowModal(false);
                }}
                className="block w-full text-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors duration-300"
              >
                Get Report on WhatsApp
              </button>

              <p className="text-center text-gray-400 text-xs mt-4">
                Or call us at{" "}
                <a
                  href="tel:+919511750686"
                  className="text-gold hover:underline"
                >
                  +91 95117 50686
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
