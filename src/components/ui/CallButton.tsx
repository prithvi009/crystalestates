"use client";

import { Phone } from "lucide-react";

export default function CallButton() {
  return (
    <a
      href="tel:+919887073904"
      aria-label="Call Crystal Estates"
      onClick={() => {
        import("@/components/analytics/GoogleAds").then(({ trackContactClick }) => trackContactClick("call")).catch(() => {});
      }}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-gold-light block md:hidden"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
