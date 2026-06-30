import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crystal Estates — Premium Real Estate in Mumbai & Pune",
    short_name: "Crystal Estates",
    description:
      "Find RERA-verified plots, flats, row houses & commercial properties across Pune & Mumbai. Transparent pricing, verified documents.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#102A43",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
