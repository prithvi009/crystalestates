"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, X } from "lucide-react";

interface Corridor {
  name: string;
  appreciation: string;
  priceRange: string;
  description: string;
  listings: string;
}

const corridors: Corridor[] = [
  {
    name: "Navi Mumbai Airport Belt",
    appreciation: "18-25% annual appreciation",
    priceRange: "\u20B96,000\u2013\u20B912,000/sqft",
    description:
      "The upcoming Navi Mumbai International Airport is driving massive appreciation in Panvel, Kharghar, and Ulwe. Early investors are seeing 2-3x returns.",
    listings: "6 available",
  },
  {
    name: "Thane-Ghodbunder Corridor",
    appreciation: "12-18% annual appreciation",
    priceRange: "\u20B98,000\u2013\u20B914,000/sqft",
    description:
      "Mumbai\u2019s fastest-growing suburban corridor with metro connectivity, IT parks, and premium residential demand.",
    listings: "5 available",
  },
  {
    name: "Pune-Solapur Highway (NH65)",
    appreciation: "12-15% annual appreciation",
    priceRange: "\u20B92,500\u2013\u20B94,000/sqft",
    description:
      "The 200km corridor is seeing massive infrastructure investment. Early investors are reaping 2-3x returns.",
    listings: "8 available",
  },
  {
    name: "PMRDA Eastern Belt",
    appreciation: "10-18% annual appreciation",
    priceRange: "\u20B93,500\u2013\u20B96,000/sqft",
    description:
      "IT-driven demand is pushing property values in Loni Kalbhor, Wagholi, and surrounding areas.",
    listings: "6 available",
  },
  {
    name: "Solapur MIDC Corridor",
    appreciation: "8-12% annual appreciation",
    priceRange: "\u20B91,500\u2013\u20B93,000/sqft",
    description:
      "Industrial growth in MIDC is creating residential demand. Smart money is entering now.",
    listings: "5 available",
  },
  {
    name: "Solapur Smart City Zone",
    appreciation: "10-14% annual appreciation",
    priceRange: "\u20B92,000\u2013\u20B93,500/sqft",
    description:
      "Government-backed Smart City infrastructure is transforming Solapur\u2019s real estate landscape.",
    listings: "4 available",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function InvestmentCorridors() {
  const [showModal, setShowModal] = useState(false);
  const [reportPhone, setReportPhone] = useState("");
  const [reportName, setReportName] = useState("");

  return (
    <section className="py-20 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
          Where Smart Money Is Moving
        </h2>
        <div className="flex justify-center mb-14">
          <div className="w-[60px] h-[3px] bg-gold rounded-full" />
        </div>

        {/* Corridors grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {corridors.map((corridor) => (
            <motion.div
              key={corridor.name}
              variants={cardVariants}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">
                  {corridor.name}
                </h3>
                <TrendingUp className="w-6 h-6 text-gold shrink-0 ml-3" />
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                {corridor.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="text-gray-300">
                  {corridor.priceRange}
                </span>
                <span className="text-emerald-light font-medium">
                  {corridor.appreciation}
                </span>
                <span className="text-gold font-medium">
                  {corridor.listings}
                </span>
              </div>
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

      {/* Simple modal */}
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
                  if (reportName.trim() && reportPhone.replace(/\D/g, "").length >= 10) {
                    try {
                      await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: reportName,
                          phone: reportPhone.replace(/\D/g, "").slice(-10),
                          source: "investment_report",
                          message: "Requested free investment corridor report",
                        }),
                      });
                    } catch { /* continue to WhatsApp */ }
                  }
                  const msg = encodeURIComponent(
                    `Hi, I'm ${reportName || "interested"}. I'd like to receive the free investment report from Crystal Estates.`
                  );
                  window.open(`https://wa.me/919887073904?text=${msg}`, "_blank");
                  setShowModal(false);
                }}
                className="block w-full text-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors duration-300"
              >
                Get Report on WhatsApp
              </button>

              <p className="text-center text-gray-400 text-xs mt-4">
                Or call us at{" "}
                <a href="tel:+919887073904" className="text-gold hover:underline">
                  +91 98870 73904
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
