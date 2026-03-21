import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Blog — Insights & Guides | Crystal Estates",
  description:
    "Expert insights on Maharashtra real estate — buying guides, project reviews, legal advice, investment tips, and market analysis from Crystal Estates.",
  keywords: [
    "real estate blog",
    "Maharashtra property guides",
    "home buying tips",
    "RERA Maharashtra",
    "property investment India",
    "Crystal Estates blog",
  ],
  openGraph: {
    title: "Blog — Insights & Guides | Crystal Estates",
    description:
      "Expert insights on Maharashtra real estate — buying guides, project reviews, legal advice, and investment tips.",
    url: "https://www.crystalestates.in/blog",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  Blog data                                                          */
/* ------------------------------------------------------------------ */

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    slug: "how-to-check-7-12-extract-online-maharashtra",
    title: "How to Check 7/12 Extract Online in Maharashtra (2026 Guide)",
    excerpt:
      "Learn how to access and verify the Satbara Utara (7/12 extract) online through the Maharashtra Bhulekh portal — essential before purchasing any property.",
    category: "Buying Guides",
    date: "2026-01-15",
    readTime: "8 min",
  },
  {
    slug: "crest-oaks-marol-andheri-east-review",
    title: "Crest Oaks Marol, Andheri East — Complete Project Review",
    excerpt:
      "An in-depth review of Crest Oaks in Marol, Andheri East — covering pricing, floor plans, amenities, connectivity, and investment potential.",
    category: "Project Reviews",
    date: "2026-01-10",
    readTime: "12 min",
  },
  {
    slug: "best-areas-invest-solapur-2026",
    title: "Best Areas to Invest in Solapur in 2026",
    excerpt:
      "Solapur is emerging as a real estate hotspot in Maharashtra. Discover the top localities for residential and commercial property investment this year.",
    category: "Investment",
    date: "2026-02-01",
    readTime: "10 min",
  },
  {
    slug: "na-conversion-maharashtra-process",
    title: "NA Conversion in Maharashtra — Step by Step Process",
    excerpt:
      "A complete walkthrough of the Non-Agricultural (NA) land conversion process in Maharashtra, including documents required, fees, and timelines.",
    category: "Legal",
    date: "2026-02-15",
    readTime: "7 min",
  },
  {
    slug: "stamp-duty-maharashtra-2026-calculator",
    title: "Stamp Duty in Maharashtra 2026 — Complete Calculator & Guide",
    excerpt:
      "Understand stamp duty and registration charges in Maharashtra for 2026, with our easy calculator for flats, plots, and resale properties.",
    category: "Buying Guides",
    date: "2026-03-01",
    readTime: "9 min",
  },
  {
    slug: "rera-agent-registration-maharashtra",
    title: "RERA Agent Registration Process Maharashtra 2026",
    excerpt:
      "Step-by-step guide to registering as a RERA-certified real estate agent in Maharashtra — eligibility, documents, fees, and renewal process.",
    category: "Legal",
    date: "2026-03-10",
    readTime: "6 min",
  },
];

const categories = [
  "All",
  "Market Insights",
  "Buying Guides",
  "Project Reviews",
  "Legal",
  "Investment",
];

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Blog Listing Page (Server Component)                               */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-primary-black">
      {/* ---- Hero ---- */}
      <section className="pt-36 pb-16 px-6 text-center">
        <p className="font-body text-sm uppercase tracking-widest text-gold mb-4">
          Crystal Estates Blog
        </p>
        <h1 className="font-heading text-5xl md:text-6xl text-white mb-4">
          Insights &amp; Guides
        </h1>
        <p className="font-body text-lg text-text-muted max-w-2xl mx-auto">
          Expert analysis, buying guides, and market insights to help you make
          smarter property decisions in Maharashtra.
        </p>
      </section>

      {/* ---- Category Pills ---- */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`inline-block rounded-full px-5 py-2 font-body text-sm cursor-pointer transition-colors ${
                cat === "All"
                  ? "bg-gold text-primary-black font-semibold"
                  : "bg-card-dark text-text-muted border border-border-subtle hover:border-gold/40 hover:text-white"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* ---- Blog Grid ---- */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="h-full rounded-2xl bg-card-dark border border-border-subtle p-6 flex flex-col transition-all duration-300 hover:border-gold/30 hover:-translate-y-1">
                {/* Category Badge */}
                <span className="self-start rounded-full bg-gold/10 text-gold font-body text-xs font-semibold px-3 py-1 mb-4">
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="font-heading text-xl text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="font-body text-sm text-text-muted leading-relaxed mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 font-body text-xs text-text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="font-body text-sm text-gold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
