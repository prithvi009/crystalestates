import { properties } from "@/data/properties";
import { notFound } from "next/navigation";
import PropertyDetail from "@/components/properties/PropertyDetail";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    return {
      title: "Property Not Found | Crystal Estates",
    };
  }

  return {
    title: `${property.name} | Crystal Estates`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.name} — ${property.price}`,
      description: property.description.slice(0, 160),
      type: "website",
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  // Find related properties: same type or same location, exclude current
  const related = properties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.type === property.type || p.locationArea === property.locationArea)
    )
    .slice(0, 3);

  return <PropertyDetail property={property} relatedProperties={related} />;
}
