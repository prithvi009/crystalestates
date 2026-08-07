"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Property } from "@/lib/db/schema";
import PropertyCard from "@/components/properties/PropertyCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({
  properties,
}: FeaturedPropertiesProps) {
  return (
    <section id="properties" className="py-14 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between gap-4 mb-7 sm:mb-10">
          <h2 className="font-heading text-2xl sm:text-4xl text-navy">
            Featured Projects
          </h2>
          <Link
            href="/properties"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-gold shrink-0"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards — horizontal snap carousel on mobile, grid on desktop */}
        {properties.length > 0 ? (
          <motion.div
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {properties.map((property) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                className="snap-start shrink-0 w-[68%] sm:w-[44%] md:w-auto"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-navy/40 text-lg">No properties available right now.</p>
          </div>
        )}

        {/* View all (mobile) */}
        <div className="flex justify-center mt-10 sm:hidden">
          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gold hover:text-navy transition-all duration-300"
          >
            View All Properties
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
