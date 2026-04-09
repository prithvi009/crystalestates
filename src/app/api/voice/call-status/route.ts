import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  console.log("[Call Status]", {
    callSid: formData.get("CallSid"),
    status: formData.get("CallStatus"),
    duration: formData.get("CallDuration"),
    to: formData.get("To"),
  });

  return NextResponse.json({ received: true });
}
