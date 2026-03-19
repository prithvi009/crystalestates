import { notFound } from "next/navigation";
import { getPropertyBySlug, getRelatedProperties } from "@/lib/db/queries";
import type { Property } from "@/lib/db/schema";
import PropertyDetail from "@/components/properties/PropertyDetail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | Crystal Estates",
    };
  }

  const desc = (property.description || "").slice(0, 160);
  const title = `${property.name} - ${property.price} | ${property.type} in ${property.locationArea}`;

  return {
    title,
    description: desc,
    keywords: [
      property.type,
      property.locationArea,
      property.location,
      "real estate",
      "property",
      property.builderName || "",
      "Crystal Estates",
    ].filter(Boolean),
    openGraph: {
      title: `${property.name} — ${property.price}`,
      description: desc,
      type: "website",
      siteName: "Crystal Estates",
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name} — ${property.price}`,
      description: desc,
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

  return <PropertyDetail property={property} relatedProperties={related} />;
}
