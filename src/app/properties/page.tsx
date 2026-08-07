import type { Metadata } from "next";
import { getAllProperties } from "@/lib/db/queries";
import PropertiesClient from "./PropertiesClient";
import { propertyTypes, locations, budgetRanges } from "@/lib/constants";

export const dynamic = "force-dynamic";

function pick(value: string | string[] | undefined, allowed: readonly string[]): string {
  const v = Array.isArray(value) ? value[0] : value;
  return v && (allowed as readonly string[]).includes(v) ? v : "All";
}

export const metadata: Metadata = {
  title: "Properties for Sale in Pune & Mumbai — Plots, Flats, Row Houses",
  description:
    "Browse RERA-verified properties for sale across Pune & Mumbai. Plots, flats, row houses & commercial spaces. Filter by location, type & budget. Crystal Estates.",
  keywords: [
    "flats for sale Pune",
    "RERA verified properties",
    "plots Pune",
    "flats Pune",
    "Mumbai property",
    "Andheri East flats",
    "investment property Maharashtra",
  ],
  alternates: {
    canonical: "https://www.crystalestates.in/properties",
  },
  openGraph: {
    title: "Properties for Sale — Pune & Mumbai | Crystal Estates",
    description:
      "Browse RERA-verified plots, flats, row houses & commercial properties across Pune & Mumbai.",
    url: "https://www.crystalestates.in/properties",
    type: "website",
  },
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const properties = await getAllProperties();
  const sp = await searchParams;
  const initialType = pick(sp.type, propertyTypes);
  const initialLocation = pick(sp.location, locations);
  const initialBudget = pick(sp.budget, budgetRanges);
  const rawQ = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const initialSearch = (rawQ ?? "").toString().slice(0, 80);

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
              "Browse RERA-verified plots, flats, row houses & commercial properties across Pune & Mumbai.",
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
      <PropertiesClient
        properties={properties}
        initialType={initialType}
        initialLocation={initialLocation}
        initialBudget={initialBudget}
        initialSearch={initialSearch}
      />
    </>
  );
}
