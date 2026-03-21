import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crystal2026";

const ALLOWED_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "webp", "gif", "svg",
  "mp4", "webm", "mov",
  "pdf",
]);

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// Increase body size limit for Vercel serverless (default is 4.5MB)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Vercel body size limit — set to 50MB
export const maxDuration = 60; // allow up to 60s for large uploads

function authorize(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  return token === ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 50MB." },
        { status: 400 }
      );
    }

    const originalName = file.name;
    const ext = originalName.split(".").pop()?.toLowerCase() || "";

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type .${ext} is not allowed. Accepted: ${[...ALLOWED_EXTENSIONS].join(", ")}` },
        { status: 400 }
      );
    }

    // Check Cloudinary is configured
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Image storage not configured. Please set Cloudinary environment variables." },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Determine resource type for Cloudinary
    const isVideo = ["mp4", "webm", "mov"].includes(ext);
    const isPdf = ext === "pdf";
    const resourceType = isVideo ? "video" : isPdf ? "raw" : "image";

    // Determine folder
    const folderHint = formData.get("folder") as string | null;
    const folder = folderHint
      ? `crystal-estates/${folderHint}`
      : "crystal-estates/properties";

    const result = await uploadToCloudinary(buffer, {
      folder,
      resourceType: resourceType as "image" | "video" | "raw",
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Upload API] Error:", message, error);
    return NextResponse.json(
      { error: `Upload failed: ${message}` },
      { status: 500 }
    );
  }
}
