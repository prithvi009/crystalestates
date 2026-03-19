import type { Metadata } from "next";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "Contact Crystal Estates — Get Free Property Consultation in Mumbai & Pune",
  description:
    "Get a free property consultation from Crystal Estates. Call +91 98870 73904 or visit our Pune office. Expert advice on plots, flats & properties across Mumbai, Thane, Navi Mumbai, Pune & Solapur.",
  keywords: [
    "contact Crystal Estates",
    "property consultation Mumbai",
    "real estate agent contact Pune",
    "free property advice",
    "property dealer phone number",
    "real estate office Pune",
    "book site visit Mumbai property",
  ],
  alternates: {
    canonical: "https://www.crystalestates.in/contact",
  },
  openGraph: {
    title: "Contact Crystal Estates — Free Property Consultation",
    description:
      "Call +91 98870 73904 for expert property advice across Mumbai, Pune & Solapur. We respond within 30 minutes.",
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
      "Get a free property consultation from Crystal Estates for properties in Mumbai, Pune & Solapur.",
    url: "https://www.crystalestates.in/contact",
    mainEntity: {
      "@type": "RealEstateAgent",
      name: "Crystal Estates",
      telephone: "+919887073904",
      email: "info@crystalestates.in",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Innov8, 102, Suman Business Center, Kalyani Nagar",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411014",
        addressCountry: "IN",
      },
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
