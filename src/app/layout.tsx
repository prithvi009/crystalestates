import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CallButton from "@/components/ui/CallButton";
import SocialProof from "@/components/ui/SocialProof";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Crystal Estates | Premium Plots & Properties in Solapur & Pune",
    template: "%s | Crystal Estates",
  },
  description:
    "Find RERA-verified plots, row houses, and investment properties in Solapur, Pune-Solapur Highway, and PMRDA belt. Title-verified, transparent pricing, tech-powered search.",
  keywords: [
    "real estate Solapur",
    "plots Solapur",
    "properties Pune Solapur highway",
    "RERA verified properties",
    "PMRDA plots",
    "row houses Solapur",
    "flats Wagholi Pune",
    "Crystal Estates",
    "investment property Maharashtra",
  ],
  openGraph: {
    title: "Crystal Estates | Premium Plots & Properties in Solapur & Pune",
    description:
      "Find RERA-verified plots, row houses, and investment properties in Solapur, Pune-Solapur Highway, and PMRDA belt.",
    type: "website",
    locale: "en_IN",
    siteName: "Crystal Estates",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "placeholder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Crystal Estates",
              description:
                "Premium real estate consultancy in Solapur, Maharashtra. RERA-verified plots, row houses, flats, and investment properties.",
              url: "https://crystalestates.in",
              telephone: "+919887073904",
              email: "info@crystalestates.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Innov8, 102, Suman Business Center, Kalyani Nagar",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                postalCode: "411014",
                addressCountry: "IN",
              },
              areaServed: [
                "Solapur",
                "Pune",
                "PMRDA",
                "Pune-Solapur Highway Corridor",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "200",
              },
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CallButton />
        <SocialProof />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
