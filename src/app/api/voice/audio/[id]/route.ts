import { NextRequest, NextResponse } from "next/server";
import { getAudio } from "@/lib/voice/audio-cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const audioBase64 = getAudio(id);

  if (!audioBase64) {
    return NextResponse.json({ error: "Audio not found or expired" }, { status: 404 });
  }

  const audioBuffer = Buffer.from(audioBase64, "base64");

  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Length": audioBuffer.length.toString(),
      "Cache-Control": "no-cache, no-store",
    },
  });
}
