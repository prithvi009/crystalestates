import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { properties } from "../src/lib/db/schema";
import { uploadToCloudinary } from "../src/lib/cloudinary";

const VIDEO_PATH = "/Users/prithvirajawatade/Downloads/Royale_Towers_15s_Ad_5.mp4";
const SLUG = "kohinoor-royale-hinjewadi";

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("⬆️  Uploading hero video to Cloudinary...");
  const buf = readFileSync(VIDEO_PATH);
  const { url } = await uploadToCloudinary(buf, {
    folder: "crystal-estates/kohinoor-royale",
    resourceType: "video",
  });
  console.log(`  ✅ ${url}`);

  await db.update(properties).set({ videoUrl: url }).where(eq(properties.slug, SLUG));
  console.log(`\n✅ Set videoUrl on /properties/${SLUG}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
