import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crystal Estates — Premium Real Estate in Mumbai & Pune",
    short_name: "Crystal Estates",
    description:
      "Find RERA-verified plots, flats, row houses & commercial properties across Pune & Mumbai. Transparent pricing, verified documents.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#C6A962",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
