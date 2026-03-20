import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import GoogleAds from "@/components/analytics/GoogleAds";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.crystalestates.in"),
  title: {
    default: "Crystal Estates | RERA Verified Properties in Mumbai, Pune & Solapur",
    template: "%s | Crystal Estates",
  },
  description:
    "Find RERA-verified plots, flats, row houses & investment properties in Mumbai, Thane, Navi Mumbai, Pune & Solapur. Title-verified, transparent pricing. 300+ happy families. Call +91 98870 73904.",
  keywords: [
    "real estate Mumbai",
    "property for sale Mumbai",
    "flats in Thane",
    "flats Navi Mumbai",
    "plots Panvel",
    "property for sale Pune",
    "flats in Pune",
    "plots in Pune",
    "real estate Solapur",
    "plots Solapur",
    "properties Pune Solapur highway",
    "RERA verified properties Maharashtra",
    "PMRDA approved plots",
    "row houses Solapur",
    "flats Wagholi Pune",
    "Crystal Estates",
    "investment property Maharashtra",
    "Navi Mumbai airport property",
    "Kharghar commercial property",
    "Ghodbunder Road flats Thane",
    "2 BHK flat Mumbai",
    "3 BHK flat Pune",
    "plots near Pune",
    "property dealer Mumbai",
    "real estate agent Pune",
    "best real estate company Maharashtra",
  ],
  openGraph: {
    title: "Crystal Estates | Premium Properties in Mumbai, Pune & Solapur",
    description:
      "RERA-verified plots, flats, row houses & commercial properties across Mumbai, Thane, Navi Mumbai, Pune & Solapur. Transparent pricing, verified documents.",
    url: "https://www.crystalestates.in",
    type: "website",
    locale: "en_IN",
    siteName: "Crystal Estates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Estates | Properties in Mumbai, Pune & Solapur",
    description:
      "RERA-verified plots, flats & properties in Mumbai & Pune. 300+ happy families. Transparent pricing.",
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
    "theme-color": "#000000",
    "apple-mobile-web-app-title": "Crystal Estates",
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
              "@type": ["RealEstateAgent", "LocalBusiness"],
              "@id": "https://www.crystalestates.in/#organization",
              name: "Crystal Estates",
              legalName: "Crystal Estates Real Estate Consultancy",
              description:
                "Premium real estate consultancy in Maharashtra offering RERA-verified plots, row houses, flats, and investment properties across Mumbai, Thane, Navi Mumbai, Pune & Solapur. 300+ happy families, ₹150Cr+ transactions.",
              url: "https://www.crystalestates.in",
              telephone: "+919887073904",
              email: "info@crystalestates.in",
              foundingDate: "2020",
              numberOfEmployees: { "@type": "QuantitativeValue", value: "15" },
              priceRange: "₹8L - ₹1Cr+",
              currenciesAccepted: "INR",
              paymentAccepted: "Cash, Bank Transfer, Cheque, Home Loan",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Innov8, 102, Suman Business Center, Kalyani Nagar",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                postalCode: "411014",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "18.5525",
                longitude: "73.9028",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "09:00",
                  closes: "19:00",
                },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+919887073904",
                  contactType: "sales",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Marathi"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+919511750686",
                  contactType: "customer support",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Marathi"],
                },
              ],
              areaServed: [
                { "@type": "City", name: "Mumbai" },
                { "@type": "City", name: "Thane" },
                { "@type": "City", name: "Navi Mumbai" },
                { "@type": "City", name: "Pune" },
                { "@type": "City", name: "Solapur" },
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Real Estate Properties",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Residential Plots" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Flats & Apartments" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Row Houses" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Commercial Spaces" } },
                  { "@type": "Offer", itemOffered: { "@type": "Product", name: "Agricultural Land" } },
                ],
              },
              sameAs: [
                "https://instagram.com/crystalestates",
                "https://facebook.com/crystalestates",
                "https://linkedin.com/company/crystalestates",
                "https://youtube.com/@crystalestates",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                bestRating: "5",
                ratingCount: "200",
                reviewCount: "150",
              },
            }),
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        <GoogleAds />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
