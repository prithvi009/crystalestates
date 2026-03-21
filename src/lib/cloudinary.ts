import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload a buffer to Cloudinary using base64 data URI.
 * Works reliably on Vercel serverless functions (no streams needed).
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
  } = {}
): Promise<{ url: string; publicId: string; width?: number; height?: number; format?: string; bytes?: number }> {
  const { folder = "crystal-estates", resourceType = "auto" } = options;

  const base64 = buffer.toString("base64");
  const dataUri = `data:application/octet-stream;base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: resourceType,
    quality: "auto",
    fetch_format: "auto",
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
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
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
