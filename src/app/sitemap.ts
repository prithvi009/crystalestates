import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/db/queries";

const BASE_URL = "https://www.crystalestates.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();

  const propertyUrls: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${BASE_URL}/properties/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Location landing pages for internal linking (future)
  const locationSlugs = [
    "mumbai-thane",
    "navi-mumbai",
    "pune",
    "solapur",
    "pmrda-belt",
    "pune-solapur-highway",
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...propertyUrls,
  ];
}
