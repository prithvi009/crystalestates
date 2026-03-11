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
    default: "Crystal Estates | Premium Properties in Mumbai, Pune & Solapur",
    template: "%s | Crystal Estates",
  },
  description:
    "Find RERA-verified plots, row houses, flats, and investment properties across Mumbai, Thane, Navi Mumbai, Pune, and Solapur. Title-verified, transparent pricing, tech-powered search.",
  keywords: [
    "real estate Mumbai",
    "properties Thane",
    "flats Navi Mumbai",
    "plots Panvel",
    "real estate Solapur",
    "plots Solapur",
    "properties Pune Solapur highway",
    "RERA verified properties",
    "PMRDA plots",
    "row houses Solapur",
    "flats Wagholi Pune",
    "Crystal Estates",
    "investment property Maharashtra",
    "Navi Mumbai airport property",
    "Kharghar commercial",
  ],
  openGraph: {
    title: "Crystal Estates | Premium Properties in Mumbai, Pune & Solapur",
    description:
      "Find RERA-verified plots, row houses, flats, and investment properties across Mumbai, Thane, Navi Mumbai, Pune, and Solapur.",
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
                "Premium real estate consultancy in Maharashtra. RERA-verified plots, row houses, flats, and investment properties across Mumbai, Pune & Solapur.",
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
                "Mumbai",
                "Thane",
                "Navi Mumbai",
                "Pune",
                "Solapur",
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
