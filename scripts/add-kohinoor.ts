import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { properties } from "../src/lib/db/schema";
import { uploadToCloudinary } from "../src/lib/cloudinary";

const SRC = "https://www.kohinoorroyale.com/assets/images";
const FOLDER = "crystal-estates/kohinoor-royale";

// Gallery images to use as the listing photos, plus a floor plan.
const galleryPaths = [
  "gallery/g1.webp",
  "gallery/g2.webp",
  "gallery/g3.webp",
  "gallery/g4.webp",
  "gallery/g5.webp",
  "gallery/g6.webp",
];
const floorPlanPath = "floorplan/floorplan1.webp";

async function fetchAndUpload(path: string): Promise<string | null> {
  try {
    const res = await fetch(`${SRC}/${path}`);
    if (!res.ok) {
      console.warn(`  ⚠️  skip ${path} (HTTP ${res.status})`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const { url } = await uploadToCloudinary(buf, { folder: FOLDER, resourceType: "image" });
    console.log(`  ⬆️  ${path} -> ${url}`);
    return url;
  } catch (e) {
    console.warn(`  ⚠️  failed ${path}:`, (e as Error).message);
    return null;
  }
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const slug = "kohinoor-royale-hinjewadi";

  const existing = await db.select().from(properties).where(eq(properties.slug, slug)).limit(1);
  if (existing.length) {
    console.log(`ℹ️  "${slug}" already exists (id ${existing[0].id}). Deleting to re-insert fresh.`);
    await db.delete(properties).where(eq(properties.slug, slug));
  }

  console.log("⬆️  Uploading images to Cloudinary...");
  const imageUrls = (await Promise.all(galleryPaths.map(fetchAndUpload))).filter(Boolean) as string[];
  const floorPlanUrl = await fetchAndUpload(floorPlanPath);

  const images = imageUrls.length ? imageUrls : ["/placeholder-property.jpg"];

  const row = {
    slug,
    name: "Kohinoor Royale",
    location: "Hinjewadi, Pune",
    locationArea: "Hinjewadi-Wakad",
    type: "Flat" as const,
    price: "₹96 L – ₹1.40 Cr",
    priceNumeric: 9600000,
    area: "768 – 1089 sq ft",
    areaRange: "768 – 1089 sq ft (carpet)",
    bedrooms: 3,
    bathrooms: 3,
    floor: "8 residences / floor",
    facing: "River & Township View",
    possession: "Under Construction",
    rera: "PR1260002501033",
    highlights: [
      "Art Deco-inspired twin iconic towers",
      "Only 8 residences on each floor for privacy",
      "5 high-speed elevators",
      "Panoramic river & township views",
      "2 & 3 BHK homes maximising space, light & ventilation",
      "1.5-acre premium development within a 2.5-acre estate",
    ],
    description:
      "Kohinoor Royale by the Kohinoor Group is a new benchmark of luxury living in Hinjewadi, Pune. Two iconic Art Deco-inspired towers rise over a 2.5-acre estate, with a 1.5-acre premium development at its heart.\n\nThoughtfully planned 2 & 3 BHK residences maximise space, ventilation, and natural light, with only eight homes on each floor and five high-speed elevators ensuring privacy and convenience. Every residence is defined by refined craftsmanship, contemporary comfort, and seamless functionality, framed by panoramic river and township views.\n\nSurrounded by landscaped greenery and a 30+ amenity clubhouse experience, and moments from Hinjewadi's IT hub, metro, top schools and hospitals, Kohinoor Royale offers an address that balances serenity with connectivity.",
    amenities: [
      "Club House",
      "Gymnasium",
      "Swimming Pool",
      "Indoor Games",
      "Outdoor Games",
      "Jogging Track",
      "Landscaped Garden",
      "Children's Play Area",
      "24/7 Security",
      "Power Backup",
      "Lift Access",
      "Car Parking",
    ],
    nearbyPlaces: [
      { name: "Hinjewadi Phase 1 Metro Station", distance: "15 mins", category: "Connectivity" },
      { name: "Hinjewadi IT Park", distance: "18 mins", category: "Business" },
      { name: "Blue Ridge Public School", distance: "3 mins", category: "Education" },
      { name: "Ruby Hall Clinic", distance: "10 mins", category: "Healthcare" },
      { name: "Grand Highstreet Mall", distance: "12 mins", category: "Shopping" },
      { name: "NH48", distance: "24 mins", category: "Connectivity" },
    ],
    priceBreakdown: { basePrice: "₹96 Lacs onwards" },
    documents: [
      { title: "RERA Registered", status: "verified" as const },
      { title: "Title Verified", status: "verified" as const },
    ],
    badge: "New Listing" as const,
    images,
    floorPlanUrl: floorPlanUrl ?? null,
    builderName: "Kohinoor Group",
    carpetArea: "768 – 1089 sq ft",
    latitude: "18.5913",
    longitude: "73.7389",
    bookingAmount: null,
  };

  await db.insert(properties).values(row);
  console.log(`\n✅ Inserted "${row.name}" (${images.length} images) at /properties/${slug}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
