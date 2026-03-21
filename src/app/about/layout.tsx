import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Crystal Estates — Technology-Powered Real Estate Consultancy",
  description:
    "Crystal Estates is a technology-powered real estate consultancy founded by Prithviraj. RERA-registered, serving Solapur, Pune & Mumbai with data-driven property recommendations.",
  keywords: [
    "about Crystal Estates",
    "real estate consultancy Solapur",
    "real estate consultancy Pune",
    "trusted property consultant Maharashtra",
    "RERA registered agent",
    "property consultant Mumbai",
    "Prithviraj Crystal Estates",
  ],
  alternates: {
    canonical: "https://www.crystalestates.in/about",
  },
  openGraph: {
    title: "About Crystal Estates — Built Different",
    description:
      "Technology-powered real estate consultancy. Data-driven approach to property in Solapur, Pune & Mumbai.",
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
      areaServed: ["Solapur", "Pune", "Mumbai"],
      knowsAbout: [
        "Real Estate Investment",
        "RERA Compliance",
        "Property Verification",
        "Market Analysis",
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
