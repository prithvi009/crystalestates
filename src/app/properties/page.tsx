import type { Metadata } from "next";
import { getAllProperties } from "@/lib/db/queries";
import PropertiesClient from "./PropertiesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties for Sale in Solapur, Pune & Mumbai — Plots, Flats, Row Houses",
  description:
    "Browse RERA-verified properties for sale across Solapur, Pune & Mumbai. Plots, flats, row houses & commercial spaces. Filter by location, type & budget. Crystal Estates.",
  keywords: [
    "property for sale Solapur",
    "flats for sale Pune",
    "plots for sale Solapur",
    "RERA verified properties",
    "row house Solapur",
    "plots Pune Solapur highway",
    "flats Pune",
    "Mumbai property",
    "Andheri East flats",
    "investment property Maharashtra",
  ],
  alternates: {
    canonical: "https://www.crystalestates.in/properties",
  },
  openGraph: {
    title: "Properties for Sale — Mumbai, Pune & Solapur | Crystal Estates",
    description:
      "Browse RERA-verified plots, flats, row houses & commercial properties across Mumbai, Pune & Solapur.",
    url: "https://www.crystalestates.in/properties",
    type: "website",
  },
};

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Properties for Sale — Crystal Estates",
            description:
              "Browse RERA-verified plots, flats, row houses & commercial properties across Mumbai, Pune & Solapur.",
            url: "https://www.crystalestates.in/properties",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: properties.length,
              itemListElement: properties.slice(0, 20).map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://www.crystalestates.in/properties/${p.slug}`,
                name: p.name,
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.crystalestates.in" },
              { "@type": "ListItem", position: 2, name: "Properties", item: "https://www.crystalestates.in/properties" },
            ],
          }),
        }}
      />
      <PropertiesClient properties={properties} />
    </>
  );
}
