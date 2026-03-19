import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties } from "@/lib/db/queries";
import type { Property } from "@/lib/db/schema";
import PropertyDetail from "@/components/properties/PropertyDetail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function extractCity(location: string): string {
  const parts = location.split(",").map((s) => s.trim());
  return parts[parts.length - 1] || location;
}

function buildDescription(p: Property): string {
  const parts: string[] = [];
  parts.push(`${p.name} — ${p.type} for sale in ${p.locationArea}, ${extractCity(p.location)}.`);
  if (p.bedrooms) parts.push(`${p.bedrooms} BHK,`);
  if (p.area) parts.push(`${p.area},`);
  parts.push(`${p.price}.`);
  if (p.possession) parts.push(`Possession: ${p.possession}.`);
  if (p.rera) parts.push("RERA approved.");
  return parts.join(" ").slice(0, 155);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | Crystal Estates",
    };
  }

  const city = extractCity(property.location);
  const title = `${property.name} | ${property.type} for Sale in ${property.locationArea} | ${property.price} — Crystal Estates`;
  const description = buildDescription(property);
  const url = `https://www.crystalestates.in/properties/${slug}`;

  const amenitiesList: string[] = Array.isArray(property.amenities)
    ? (property.amenities as string[])
    : [];

  const keywords = [
    property.name,
    property.type,
    property.location,
    property.locationArea,
    city,
    `property for sale in ${property.locationArea}`,
    `${property.type} in ${property.locationArea}`,
    `${property.type} in ${city}`,
    property.rera ? "RERA approved" : "",
    property.builderName || "",
    property.price,
    "real estate",
    "Crystal Estates",
    ...amenitiesList,
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Crystal Estates",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const related = await getRelatedProperties(
    property.id,
    property.locationArea,
    3
  );

  const city = extractCity(property.location);
  const pageUrl = `https://www.crystalestates.in/properties/${slug}`;

  const realEstateListingSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.name,
    description: property.description,
    url: pageUrl,
    datePosted: property.createdAt,
    price: property.priceNumeric,
    priceCurrency: "INR",
    offers: {
      "@type": "Offer",
      price: property.priceNumeric,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  if (property.latitude && property.longitude) {
    realEstateListingSchema.geo = {
      "@type": "GeoCoordinates",
      latitude: property.latitude,
      longitude: property.longitude,
    };
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.name,
    description: property.description,
    offers: {
      "@type": "Offer",
      price: property.priceNumeric,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "RealEstateAgent",
        name: "Crystal Estates",
      },
    },
    brand: {
      "@type": "Brand",
      name: property.builderName || "Crystal Estates",
    },
    category: property.type,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.crystalestates.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties",
        item: "https://www.crystalestates.in/properties",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateListingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <PropertyDetail property={property} relatedProperties={related} />
    </>
  );
}
