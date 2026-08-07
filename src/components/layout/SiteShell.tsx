"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CallButton from "@/components/ui/CallButton";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  // Property detail pages have their own sticky contact bar (mobile) + sidebar
  // (desktop), so the global floating WhatsApp/Call buttons are redundant there
  // and would overlap the sticky "Book" bar.
  const isPropertyDetail = pathname.startsWith("/properties/");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {!isPropertyDetail && (
        <>
          <WhatsAppButton />
          <CallButton />
        </>
      )}
      <ScrollToTop />
      <ExitIntentPopup />
    </>
  );
}
