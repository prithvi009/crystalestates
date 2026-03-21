import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload a buffer to Cloudinary.
 * Returns the secure URL and public_id.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
    transformation?: Record<string, unknown>[];
  } = {}
): Promise<{ url: string; publicId: string; width?: number; height?: number; format?: string; bytes?: number }> {
  const { folder = "crystal-estates", resourceType = "auto" } = options;

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: resourceType,
          // Auto-quality + auto-format for optimal delivery
          quality: "auto",
          fetch_format: "auto",
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("Upload failed"));
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      )
      .end(buffer);
  });
}

/**
 * Delete a file from Cloudinary by public_id.
 */
export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" | "raw" = "image") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/**
 * Generate an optimized URL with transformations.
 * Usage: getOptimizedUrl(url, { width: 800, height: 600, crop: "fill" })
 */
export function getOptimizedUrl(
  url: string,
  transforms: { width?: number; height?: number; crop?: string; quality?: string | number; format?: string } = {}
): string {
  // If it's not a Cloudinary URL, return as-is
  if (!url.includes("cloudinary.com")) return url;

  const { width, height, crop = "fill", quality = "auto", format = "auto" } = transforms;

  // Build transformation string
  const parts: string[] = [`q_${quality}`, `f_${format}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (width || height) parts.push(`c_${crop}`);

  const transformStr = parts.join(",");

  // Insert transformation into URL
  // Cloudinary URLs: https://res.cloudinary.com/CLOUD/image/upload/EXISTING/path.jpg
  // We insert our transforms after /upload/
  return url.replace("/upload/", `/upload/${transformStr}/`);
}
