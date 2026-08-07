import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { properties } from "../src/lib/db/schema";
import { uploadToCloudinary } from "../src/lib/cloudinary";

const SLUG = "kohinoor-royale-hinjewadi";
const PAGES =
  "/private/tmp/claude-501/-Users-prithvirajawatade-Desktop-crystal-estate/cc818a7f-5a38-4ff0-8da1-5176c16d26a5/scratchpad/pdfpages";

const floorPlanPages = [
  { page: "page-33", title: "2 BHK Premium · 768 sq ft" },
  { page: "page-32", title: "2 BHK Luxurious · 813 sq ft" },
  { page: "page-36", title: "3 BHK Premium · 954 sq ft" },
  { page: "page-34", title: "3 BHK Luxurious A · 1089 sq ft" },
  { page: "page-35", title: "3 BHK Luxurious B · 1089 sq ft" },
  { page: "page-29", title: "Master Layout" },
];
const mapPages = [
  { page: "page-23", title: "Locality Map" },
  { page: "page-21", title: "Connectivity" },
];

function toJpeg(src: string, maxDim = 2400): Buffer {
  const out = `/tmp/ke_${src.replace(/\W/g, "")}.jpg`;
  execSync(`sips -s format jpeg -s formatOptions 86 -Z ${maxDim} "${PAGES}/${src}.png" --out "${out}"`, { stdio: "ignore" });
  return readFileSync(out);
}

async function uploadPages(list: { page: string; title: string }[], folder: string) {
  const out: { title: string; url: string }[] = [];
  for (const item of list) {
    const buf = toJpeg(item.page);
    const { url } = await uploadToCloudinary(buf, { folder, resourceType: "image" });
    out.push({ title: item.title, url });
    console.log(`  ✅ ${item.title} -> ${url}`);
  }
  return out;
}

async function main() {
  const db = drizzle(neon(process.env.DATABASE_URL!));

  console.log("⬆️  Uploading floor plans...");
  const floorPlans = await uploadPages(floorPlanPages, "crystal-estates/kohinoor-royale/plans");
  console.log("⬆️  Uploading location maps...");
  const locationMaps = await uploadPages(mapPages, "crystal-estates/kohinoor-royale/maps");

  const description =
    "Kohinoor Royale Towers is an iconic riverside address at Blue Ridge, Hinjawadi Phase 1 — two Art Deco-inspired towers (Althea & Aspen), each rising Stilt + 29 floors above a landscaped estate by the serene Mula river.\n\nInspired by the Art Deco icons of the world, the towers carry a striking crown, symmetrical façade lines, Art Deco balcony grills and a magnificent double-height lobby. Thoughtfully planned 2 & 3 BHK residences maximise space, ventilation and natural light, with only eight homes per floor served by five high-speed elevators.\n\nEvery home is a Kohinoor Intelligent Home — smart Wi-Fi switches, video door phone, burglar alarm and programmable mood lighting — set within a 5-tier secured community. Residents enjoy the Klub Grande clubhouse, a state-of-the-art gym, indoor games, swimming & kids' pool, party lawn, and a full sports arena (tennis, badminton, half-basketball and box cricket). Built by the Kohinoor Group — 41+ years of legacy, 54+ projects delivered and 20,000+ happy families.";

  const highlights = [
    "Art Deco-inspired twin towers with a stunning crown",
    "Stilt + 29 floors · only 8 residences per floor",
    "5 high-speed elevators & grand double-height lobby",
    "River-facing residences at Blue Ridge, Hinjawadi Phase 1",
    "Kohinoor Intelligent Homes — smart switches, VDP & mood lighting",
    "Klub Grande clubhouse with 5-tier security",
    "Earthquake-resistant RCC framed structure",
  ];

  const amenities = [
    "Club House",
    "Gymnasium",
    "Swimming Pool",
    "Kids' Play Area",
    "Indoor Games",
    "Jogging Track",
    "Landscaped Garden",
    "24/7 Security",
    "CCTV",
    "Power Backup",
    "Lift Access",
    "Car Parking",
    "Rain Water Harvesting",
    "Intercom",
  ];

  const nearbyPlaces = [
    { name: "Upcoming Hinjawadi Phase 1 Metro Station", distance: "2 km", category: "Connectivity" },
    { name: "Pune–Bengaluru Highway (NH48)", distance: "4 km", category: "Connectivity" },
    { name: "Wipro / Cognizant / Infosys campuses", distance: "2 km", category: "Business" },
    { name: "Persistent Systems", distance: "2 km", category: "Business" },
    { name: "Blue Ridge Public School", distance: "1 km", category: "Education" },
    { name: "Symbiosis (SIIB)", distance: "2 km", category: "Education" },
    { name: "Ruby Hall Clinic, Hinjawadi", distance: "3 km", category: "Healthcare" },
    { name: "Kaushalya Hospital", distance: "2 km", category: "Healthcare" },
    { name: "Xion Mall", distance: "3 km", category: "Shopping" },
    { name: "Grand High Street", distance: "4 km", category: "Shopping" },
    { name: "Hyatt Place & Courtyard by Marriott", distance: "2 km", category: "Hotels" },
    { name: "Pune International Airport", distance: "25 km", category: "Connectivity" },
  ];

  await db
    .update(properties)
    .set({
      floorPlans,
      locationMaps,
      floorPlanUrl: floorPlans[0]?.url ?? null,
      description,
      highlights,
      amenities,
      nearbyPlaces,
      builderName: "Kohinoor Group",
      floor: "Stilt + 29 Floors",
      name: "Kohinoor Royale Towers",
    })
    .where(eq(properties.slug, SLUG));

  console.log(`\n✅ Enriched ${SLUG}: ${floorPlans.length} floor plans, ${locationMaps.length} maps`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
