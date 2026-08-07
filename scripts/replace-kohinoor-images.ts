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
const DL = "/Users/prithvirajawatade/Downloads";

// Ordered: living → living+dining → dining/kitchen → bedroom → bathroom
const files = [
  "IMG_2977.png", // living room (wide)
  "IMG_2984.png", // living + dining
  "IMG_2985.png", // living + dining (alt)
  "IMG_2991.png", // dining + kitchen
  "IMG_2995.png", // bedroom
  "IMG_2994.png", // bathroom
];

/** Convert to a reasonably sized JPEG via macOS sips before upload (keeps HD, cuts weight). */
function toJpeg(src: string): Buffer {
  const out = `/tmp/ke_${Math.abs(hash(src))}.jpg`;
  execSync(
    `sips -s format jpeg -s formatOptions 82 -Z 2400 "${src}" --out "${out}"`,
    { stdio: "ignore" }
  );
  return readFileSync(out);
}
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("⬆️  Uploading sample-flat photos to Cloudinary...");
  const urls: string[] = [];
  for (const f of files) {
    try {
      const buf = toJpeg(`${DL}/${f}`);
      const { url } = await uploadToCloudinary(buf, {
        folder: "crystal-estates/kohinoor-royale/flat",
        resourceType: "image",
      });
      urls.push(url);
      console.log(`  ✅ ${f} -> ${url}`);
    } catch (e) {
      console.warn(`  ⚠️  ${f} failed:`, (e as Error).message);
    }
  }

  if (!urls.length) throw new Error("No images uploaded");

  await db
    .update(properties)
    .set({ images: urls, videoUrl: null })
    .where(eq(properties.slug, SLUG));

  console.log(`\n✅ Set ${urls.length} images & cleared video on /properties/${SLUG}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
