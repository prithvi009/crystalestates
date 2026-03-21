import { v2 as cloudinary } from "cloudinary";

/**
 * Configure Cloudinary lazily (env vars may not be ready at module load on Vercel).
 */
function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

/**
 * Upload a buffer to Cloudinary using base64 data URI.
 * Works reliably on Vercel serverless functions.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
  } = {}
): Promise<{ url: string; publicId: string; width?: number; height?: number; format?: string; bytes?: number }> {
  const { folder = "crystal-estates", resourceType = "auto" } = options;

  const cld = getCloudinary();

  // Verify config is set
  const cfg = cld.config();
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    throw new Error(
      `Cloudinary not configured. cloud_name=${cfg.cloud_name ? "set" : "MISSING"}, api_key=${cfg.api_key ? "set" : "MISSING"}, api_secret=${cfg.api_secret ? "set" : "MISSING"}`
    );
  }

  const base64 = buffer.toString("base64");
  const dataUri = `data:application/octet-stream;base64,${base64}`;

  const result = await cld.uploader.upload(dataUri, {
    folder,
    resource_type: resourceType,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

/**
 * Delete a file from Cloudinary by public_id.
 */
export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" | "raw" = "image") {
  const cld = getCloudinary();
  return cld.uploader.destroy(publicId, { resource_type: resourceType });
}

/**
 * Generate an optimized URL with transformations.
 */
export function getOptimizedUrl(
  url: string,
  transforms: { width?: number; height?: number; crop?: string; quality?: string | number; format?: string } = {}
): string {
  if (!url.includes("cloudinary.com")) return url;

  const { width, height, crop = "fill", quality = "auto", format = "auto" } = transforms;

  const parts: string[] = [`q_${quality}`, `f_${format}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (width || height) parts.push(`c_${crop}`);

  const transformStr = parts.join(",");

  return url.replace("/upload/", `/upload/${transformStr}/`);
}
