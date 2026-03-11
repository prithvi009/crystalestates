import { NextRequest, NextResponse } from "next/server";

/* ------------------------------------------------------------------ */
/*  Airtable Configuration                                             */
/*  Set these in your .env.local:                                      */
/*    AIRTABLE_PAT         – Personal Access Token                     */
/*    AIRTABLE_BASE_ID     – Base ID (starts with "app...")            */
/*    AIRTABLE_TABLE_NAME  – Table name (default: "Leads")             */
/*    NOTIFICATION_EMAIL   – (optional) email for alerts               */
/* ------------------------------------------------------------------ */

const AIRTABLE_PAT = process.env.AIRTABLE_PAT ?? "";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID ?? "";
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME ?? "Leads";

interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  source: "contact_form" | "lead_capture" | "property_inquiry" | "exit_intent" | "investment_report";
  propertyInterest?: string;
  propertyType?: string;
  budget?: string;
  location?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadPayload = await request.json();

    // ----- Validation -----
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name is required (min 2 characters)" },
        { status: 400 }
      );
    }

    if (!body.phone || !/^[6-9]\d{9}$/.test(body.phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "Valid 10-digit Indian phone number is required" },
        { status: 400 }
      );
    }

    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // ----- Push to Airtable -----
    if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
      console.warn(
        "[Leads API] Airtable not configured — logging lead to console."
      );
      console.log("[NEW LEAD]", JSON.stringify(body, null, 2));

      return NextResponse.json({
        success: true,
        message: "Lead received (Airtable not configured — logged to server)",
      });
    }

    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;

    // Build message with all details so nothing is lost
    const messageParts: string[] = [];
    if (body.message) messageParts.push(body.message);
    if (body.email) messageParts.push(`Email: ${body.email}`);
    if (body.propertyInterest) messageParts.push(`Property: ${body.propertyInterest}`);
    if (body.propertyType) messageParts.push(`Type: ${body.propertyType}`);
    if (body.budget) messageParts.push(`Budget: ${body.budget}`);
    if (body.location) messageParts.push(`Location: ${body.location}`);
    if (body.subject) messageParts.push(`Subject: ${body.subject}`);

    const airtableFields: Record<string, string> = {
      Name: body.name.trim(),
      Phone: body.phone.replace(/\s/g, ""),
      Source: body.source,
      Message: messageParts.join("\n"),
    };

    const airtableResponse = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: airtableFields }],
      }),
    });

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text();
      console.error("[Airtable Error]", airtableResponse.status, errorData);
      // Still return success to user — don't expose internal errors
      // But log it for debugging
      return NextResponse.json({
        success: true,
        message: "Thank you! We'll reach out shortly.",
      });
    }

    const airtableData = await airtableResponse.json();

    // ----- Optional: Send email notification via Airtable Automations -----
    // Airtable Automations (free tier) can trigger on new record creation:
    //   → Send email to your team
    //   → Send Slack/WhatsApp webhook
    //   → Trigger a Make.com / Zapier scenario
    // This is configured in Airtable UI, not in code.

    console.log(
      `[NEW LEAD] ${body.name} (${body.phone}) via ${body.source} → Airtable record created:`,
      airtableData.records?.[0]?.id
    );

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll reach out shortly.",
    });
  } catch (error) {
    console.error("[Leads API Error]", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
