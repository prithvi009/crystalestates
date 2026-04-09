import { NextRequest, NextResponse } from "next/server";
import { voiceConfig } from "@/lib/voice/config";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, clientPhone, pendingAmount, dueDate, invoiceNumber, daysOverdue } = body;

    if (!clientName || !clientPhone || !pendingAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Build Hindi greeting
    const greetingText = `Namaste ${clientName} ji, main Samruddhi Besan se bol raha hoon. Kaise hain aap? Aapka ${pendingAmount} rupaye ka payment pending hai, invoice number ${invoiceNumber} ke against, jo ${dueDate} ko due tha. Ye ${daysOverdue} din se overdue hai. Aap ye payment kab tak kar sakte hain?`;

    // Generate TTS audio
    const audioBase64 = await textToSpeech(greetingText);
    const audioId = `g_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    storeAudio(audioId, audioBase64);

    const audioUrl = `${voiceConfig.baseUrl}/api/voice/audio/${audioId}`;
    const handlerUrl = `${voiceConfig.baseUrl}/api/voice/call-handler`;
    const statusUrl = `${voiceConfig.baseUrl}/api/voice/call-status`;

    const twiml = `<Response><Play>${audioUrl}</Play><Gather input="speech" action="${handlerUrl}" method="POST" speechTimeout="auto" language="hi-IN"></Gather><Say voice="Polly.Aditi" language="hi-IN">Koi jawab nahi mila. Hum aapko dubara call karenge.</Say></Response>`;

    // Make Twilio call
    const authHeader = "Basic " + Buffer.from(`${voiceConfig.twilio.accountSid}:${voiceConfig.twilio.authToken}`).toString("base64");

    const params = new URLSearchParams();
    params.append("To", clientPhone);
    params.append("From", voiceConfig.twilio.phoneNumber);
    params.append("Twiml", twiml);
    params.append("StatusCallback", statusUrl);
    params.append("StatusCallbackEvent", "completed");

    const twilioRes = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${voiceConfig.twilio.accountSid}/Calls.json`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const twilioData = await twilioRes.json();

    if (!twilioRes.ok) {
      return NextResponse.json({ error: "Twilio error", details: twilioData }, { status: 500 });
    }

    return NextResponse.json({
      status: "call_initiated",
      callSid: twilioData.sid,
      to: twilioData.to,
      client: clientName,
      amount: pendingAmount,
    });
  } catch (error) {
    console.error("Outbound call error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
