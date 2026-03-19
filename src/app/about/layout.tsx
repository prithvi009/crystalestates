import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Crystal Estates — Maharashtra's Trusted Real Estate Consultancy",
  description:
    "Crystal Estates is Maharashtra's trusted real estate consultancy with 300+ happy clients across Mumbai, Pune & Solapur. RERA-registered, 75+ verified properties, ₹150Cr+ transactions. Founded with a mission to make real estate transparent.",
  keywords: [
    "about Crystal Estates",
    "real estate consultancy Mumbai",
    "real estate consultancy Pune",
    "trusted property dealer Maharashtra",
    "RERA registered agent",
    "property consultant Pune",
    "real estate company Mumbai",
  ],
  alternates: {
    canonical: "https://www.crystalestates.in/about",
  },
  openGraph: {
    title: "About Crystal Estates — Trusted Real Estate in Mumbai & Pune",
    description:
      "300+ happy clients, 75+ verified properties, ₹150Cr+ transactions. Maharashtra's trusted real estate consultancy.",
    url: "https://www.crystalestates.in/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Crystal Estates",
    url: "https://www.crystalestates.in/about",
    mainEntity: {
      "@type": "Organization",
      name: "Crystal Estates",
      foundingDate: "2020",
      founder: {
        "@type": "Person",
        name: "Rahul Sharma",
        jobTitle: "Founder & Chief Consultant",
      },
      numberOfEmployees: { "@type": "QuantitativeValue", value: "15" },
      areaServed: ["Mumbai", "Thane", "Navi Mumbai", "Pune", "Solapur"],
      knowsAbout: [
        "Real Estate Investment",
        "RERA Compliance",
        "Property Verification",
        "NRI Property Purchase",
        "Home Loans",
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.crystalestates.in" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://www.crystalestates.in/about" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
