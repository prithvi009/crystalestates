import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import GoogleAds from "@/components/analytics/GoogleAds";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.crystalestates.in"),
  title: {
    default: "Crystal Estates | Premium Properties in Pune & Mumbai",
    template: "%s | Crystal Estates",
  },
  description:
    "Premium real estate consultancy offering RERA-verified plots, flats, row houses & investment properties across Pune & Mumbai. Title-verified, transparent pricing. Data-driven approach. Call +91 95117 50686.",
  keywords: [
    "real estate Pune",
    "property for sale Pune",
    "real estate consultancy Maharashtra",
    "RERA verified properties",
    "flats Pune",
    "property investment Maharashtra",
    "Crystal Estates",
    "Crest Oaks Andheri",
    "Yash Evana Talegaon",
    "PMRDA approved plots",
    "real estate consultant Pune",
    "Mumbai property",
    "Andheri East flats",
    "Talegaon row houses",
    "investment property Pune",
    "NA plots Maharashtra",
  ],
  openGraph: {
    title: "Crystal Estates | Decoding Value in Real Estate",
    description:
      "RERA-verified plots, flats, row houses & investment properties across Pune & Mumbai. Data-driven consultancy with transparent pricing.",
    url: "https://www.crystalestates.in",
    type: "website",
    locale: "en_IN",
    siteName: "Crystal Estates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Estates | Properties in Pune & Mumbai",
    description:
      "RERA-verified properties across Maharashtra. Data-driven real estate consultancy. Transparent pricing.",
  },
  alternates: {
    canonical: "https://www.crystalestates.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "placeholder",
  },
  other: {
    "theme-color": "#0A0A0A",
    "apple-mobile-web-app-title": "Crystal Estates",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["RealEstateAgent", "LocalBusiness"],
              "@id": "https://www.crystalestates.in/#organization",
              name: "Crystal Estates",
              legalName: "Crystal Estates Real Estate Consultancy",
              description:
                "Premium real estate consultancy in Maharashtra offering RERA-verified plots, row houses, flats, and investment properties across Pune & Mumbai. Data-driven approach to real estate.",
              url: "https://www.crystalestates.in",
              telephone: "+919511750686",
              email: "info@crystalestates.in",
              priceRange: "₹8L - ₹5Cr+",
              currenciesAccepted: "INR",
              paymentAccepted: "Cash, Bank Transfer, Cheque, Home Loan",
              areaServed: [
                { "@type": "City", name: "Pune" },
                { "@type": "City", name: "Mumbai" },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+919511750686",
                  contactType: "sales",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Marathi"],
                },
              ],
              sameAs: [
                "https://instagram.com/crystalestates",
                "https://linkedin.com/company/crystalestates",
                "https://youtube.com/@crystalestates",
              ],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-primary-black text-white">
        <GoogleAds />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
