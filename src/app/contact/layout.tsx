import type { Metadata } from "next";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Contact Crystal Estates — Free Property Consultation",
  description:
    "Get a free property consultation from Crystal Estates. Call +91 95117 50686 or WhatsApp us. Expert advice on plots, flats & properties across Solapur, Pune & Mumbai.",
  keywords: [
    "contact Crystal Estates",
    "property consultation Solapur",
    "real estate agent contact Pune",
    "free property advice",
    "property dealer phone number",
    "book site visit property",
  ],
  alternates: {
    canonical: "https://www.crystalestates.in/contact",
  },
  openGraph: {
    title: "Contact Crystal Estates — Free Property Consultation",
    description:
      "Call +91 95117 50686 for expert property advice across Solapur, Pune & Mumbai. We respond within 30 minutes.",
    url: "https://www.crystalestates.in/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Crystal Estates",
    description:
      "Get a free property consultation from Crystal Estates for properties in Solapur, Pune & Mumbai.",
    url: "https://www.crystalestates.in/contact",
    mainEntity: {
      "@type": "RealEstateAgent",
      name: "Crystal Estates",
      telephone: "+919511750686",
      email: "info@crystalestates.in",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.crystalestates.in" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.crystalestates.in/contact" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
