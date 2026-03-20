"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

export default function GoogleAds() {
  if (!GA_ID && !GADS_ID) return null;

  const trackingId = GA_ID || GADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}', { send_page_view: true });` : ""}
          ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}

// ---- Conversion tracking helpers ----

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire when a lead form is submitted (contact, inquiry, site visit, etc.) */
export function trackLeadConversion(formName: string, propertyName?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  // Google Ads conversion (you'll set NEXT_PUBLIC_GADS_CONVERSION_LABEL in env)
  const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  if (conversionLabel && process.env.NEXT_PUBLIC_GADS_ID) {
    window.gtag("event", "conversion", {
      send_to: `${process.env.NEXT_PUBLIC_GADS_ID}/${conversionLabel}`,
      event_callback: () => {},
    });
  }

  // GA4 custom event
  window.gtag("event", "generate_lead", {
    event_category: "Lead",
    event_label: formName,
    property_name: propertyName || "",
    value: 1,
  });
}

/** Fire when a user clicks call/WhatsApp CTA */
export function trackContactClick(method: "call" | "whatsapp", propertyName?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", method === "call" ? "phone_call_click" : "whatsapp_click", {
    event_category: "Contact",
    event_label: propertyName || "general",
    value: 1,
  });
}

/** Fire when a user views a property detail page */
export function trackPropertyView(propertyName: string, propertyType: string, price: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "view_item", {
    event_category: "Property",
    event_label: propertyName,
    items: [
      {
        item_name: propertyName,
        item_category: propertyType,
        price: price,
      },
    ],
  });
}

/** Fire when a user uses the EMI calculator */
export function trackEMICalculation(propertyName: string, loanAmount: number) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "emi_calculation", {
    event_category: "Engagement",
    event_label: propertyName,
    value: loanAmount,
  });
}

/** Fire when a user downloads investment report */
export function trackReportDownload() {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "report_download", {
    event_category: "Lead",
    event_label: "investment_report",
  });
}
