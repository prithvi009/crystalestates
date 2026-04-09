import { NextRequest, NextResponse } from "next/server";
import { voiceConfig, SYSTEM_PROMPT } from "@/lib/voice/config";
import { storeAudio } from "@/lib/voice/audio-cache";

async function textToSpeech(text: string): Promise<string> {
  const res = await fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "api-subscription-key": voiceConfig.sarvam.apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      target_language_code: "hi-IN",
      speaker: voiceConfig.sarvam.speaker,
      model: voiceConfig.sarvam.model,
      pace: voiceConfig.sarvam.pace,
      speech_sample_rate: voiceConfig.sarvam.sampleRate,
      output_audio_codec: "mp3",
      enable_preprocessing: true,
    }),
  });
  const data = await res.json();
  return data.audios?.[0] || data.audio || "";
}

async function getAIResponse(userSpeech: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": voiceConfig.anthropic.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: voiceConfig.anthropic.model,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `Client ne kaha: ${userSpeech}` }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Maaf kijiye, main samajh nahi paaya. Kya aap dobara bata sakte hain?";
}

function twimlResponse(body: string): NextResponse {
  return new NextResponse(body, {
    headers: { "Content-Type": "text/xml" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const speechResult = formData.get("SpeechResult") as string | null;
    const handlerUrl = `${voiceConfig.baseUrl}/api/voice/call-handler`;

    // No speech detected — prompt again
    if (!speechResult) {
      return twimlResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Aditi" language="hi-IN">Kripya apna jawab dijiye.</Say><Gather input="speech" action="${handlerUrl}" method="POST" speechTimeout="auto" language="hi-IN"></Gather></Response>`
      );
    }

    // Get AI response
    const aiText = await getAIResponse(speechResult);

    // Check if payment committed
    if (aiText.includes("payment_committed")) {
      const confirmText =
        "Bahut dhanyavaad. Aapka payment commitment note kar liya gaya hai. Samruddhi Besan ki taraf se aapka bahut bahut dhanyavaad. Shubh din!";
      const audioBase64 = await textToSpeech(confirmText);
      const audioId = `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      storeAudio(audioId, audioBase64);
      const audioUrl = `${voiceConfig.baseUrl}/api/voice/audio/${audioId}`;

      return twimlResponse(
        `<?xml version="1.0" encoding="UTF-8"?><Response><Play>${audioUrl}</Play></Response>`
      );
    }

    // Normal conversation — TTS the AI response and continue gathering
    const audioBase64 = await textToSpeech(aiText);
    const audioId = `r_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    storeAudio(audioId, audioBase64);
    const audioUrl = `${voiceConfig.baseUrl}/api/voice/audio/${audioId}`;

    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Play>${audioUrl}</Play><Gather input="speech" action="${handlerUrl}" method="POST" speechTimeout="auto" language="hi-IN"></Gather><Say voice="Polly.Aditi" language="hi-IN">Dhanyavaad. Samruddhi Besan ki taraf se aapka din shubh ho.</Say></Response>`
    );
  } catch (error) {
    console.error("Call handler error:", error);
    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="Polly.Aditi" language="hi-IN">Maaf kijiye, kuch technical samasya aa gayi hai. Hum aapko dubara call karenge.</Say></Response>`
    );
  }
}
