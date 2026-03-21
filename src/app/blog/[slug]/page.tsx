import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, ChevronRight, MessageCircle, User } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Blog data (duplicated until we move to MDX/CMS)                    */
/* ------------------------------------------------------------------ */

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  body: string[];
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
    body: [
      "The 7/12 extract, also known as the Satbara Utara, is one of the most critical documents in Maharashtra real estate. It is maintained by the revenue department and contains details about land ownership, area, crop season, and any existing liabilities or encumbrances on the property. Before purchasing any plot, flat, or farmhouse in Maharashtra, verifying the 7/12 extract is a mandatory step that protects buyers from fraud.",
      "In 2026, the Maharashtra government has made it significantly easier to access the 7/12 extract online through the Bhulekh portal (bhulekh.mahabhumi.gov.in). The digitized records cover all 36 districts of Maharashtra and are updated regularly by Talathis (village revenue officers). You can now check any land record by entering the district, taluka, village name, and survey number.",
      "To access the 7/12 extract online, follow these steps: First, visit the official Maharashtra Bhulekh website. Select your district, taluka, and village from the dropdown menus. Enter the survey number or gut number of the property you wish to verify. The system will display the 7/12 extract showing the current owner's name, land area in acres and hectares, the type of land (agricultural or non-agricultural), and any loans or mortgages against the property.",
      "Key details to verify on the 7/12 extract include: the owner's name matching the seller's identity, whether the land is classified as agricultural or non-agricultural (NA), any existing loans or liens, mutation entries that show the history of ownership transfers, and whether the land falls under any government acquisition. If you find any discrepancies, consult a property lawyer before proceeding with the purchase.",
      "For property buyers working with Crystal Estates, we handle the complete due diligence process including 7/12 verification, title search, encumbrance certificate verification, and RERA compliance checks. Our legal team ensures every property we recommend has a clean title and clear documentation, giving you complete peace of mind.",
    ],
  },
  {
    slug: "crest-oaks-marol-andheri-east-review",
    title: "Crest Oaks Marol, Andheri East — Complete Project Review",
    excerpt:
      "An in-depth review of Crest Oaks in Marol, Andheri East — covering pricing, floor plans, amenities, connectivity, and investment potential.",
    category: "Project Reviews",
    date: "2026-01-10",
    readTime: "12 min",
    body: [
      "Crest Oaks in Marol, Andheri East is one of the most anticipated residential projects in Mumbai's western suburbs. Located in the heart of the MIDC industrial belt that has rapidly transformed into a premium residential zone, this project offers 2 BHK and 3 BHK apartments with modern specifications and world-class amenities. With SEEPZ, the international airport, and the upcoming Metro Line 1 extension in close proximity, Crest Oaks is positioned for strong capital appreciation.",
      "The project offers configurations ranging from 650 sq. ft. to 1,200 sq. ft. carpet area, with prices starting from approximately ₹1.8 Crore for a 2 BHK and ₹2.8 Crore for a 3 BHK. The floor plans are designed for maximum space utilization with large windows, cross-ventilation, and Italian marble flooring in living areas. All apartments come with modular kitchen provisions, video door phone, and premium CP fittings from international brands.",
      "Amenities at Crest Oaks include a fully equipped gymnasium, infinity-edge swimming pool, landscaped gardens, children's play area, jogging track, multipurpose hall, 24/7 security with CCTV surveillance, and dedicated visitor parking. The project is RERA registered, ensuring transparency in construction timelines and financial management. The possession date is set for December 2027.",
      "From a connectivity standpoint, Marol has emerged as one of the best-connected localities in Mumbai. The JVLR connects it to Powai and the Eastern Express Highway, while the Western Express Highway is a 10-minute drive away. The Marol Naka Metro Station on Metro Line 1 provides seamless access to Ghatkopar, Andheri, and Versova. IT parks like Mindspace and Marol MIDC are within walking distance, making it ideal for working professionals.",
      "Our verdict: Crest Oaks offers an excellent combination of location, specification, and pricing for both end-users and investors. The Marol micro-market has shown consistent 8-10% year-on-year appreciation, and with upcoming infrastructure projects like the coastal road extension and metro expansion, this trend is expected to continue. Contact Crystal Estates for a detailed walkthrough and exclusive pricing.",
    ],
  },
  {
    slug: "best-areas-invest-pune-2026",
    title: "Best Areas to Invest in Pune in 2026",
    excerpt:
      "Pune is one of Maharashtra's top real estate markets. Discover the best localities for residential and commercial property investment this year.",
    category: "Investment",
    date: "2026-02-01",
    readTime: "10 min",
    body: [
      "Pune, Maharashtra's tech and education capital, continues to be one of the most attractive real estate investment destinations in India. With booming IT corridors, expanding metro connectivity, PMRDA-driven infrastructure growth, and a steady influx of working professionals, Pune offers a wide range of high-growth property options. In 2026, several localities stand out for their investment potential.",
      "Hinjewadi-Wakad remains one of the most sought-after residential corridors in Pune. With proximity to the Rajiv Gandhi Infotech Park, multiple RERA-approved projects, and excellent social infrastructure including schools, hospitals, and shopping centers, property prices here have appreciated 10-15% over the past two years. A 2 BHK apartment in Wakad currently ranges from ₹55 lakh to ₹85 lakh.",
      "Wagholi and the PMRDA Eastern Belt are rapidly developing areas, especially for budget-conscious investors. With new township projects, proximity to Kharadi IT hub, and improving road connectivity, land prices offer excellent value. The upcoming ring road and metro extension will further boost connectivity in this corridor.",
      "For commercial investment, areas like Baner-Balewadi and Kharadi-Viman Nagar offer opportunities in office spaces and retail shops. With Pune's IT and services industries expanding, demand for commercial real estate is on the rise. The proposed metro lines and improved road infrastructure will further enhance connectivity across the city.",
      "Crystal Estates has a dedicated team in Pune covering both residential and commercial properties. Whether you're looking for a plot, apartment, or commercial space, our local experts can guide you to the best deals with verified documentation and RERA compliance. Reach out for a free investment consultation.",
    ],
  },
  {
    slug: "na-conversion-maharashtra-process",
    title: "NA Conversion in Maharashtra — Step by Step Process",
    excerpt:
      "A complete walkthrough of the Non-Agricultural (NA) land conversion process in Maharashtra, including documents required, fees, and timelines.",
    category: "Legal",
    date: "2026-02-15",
    readTime: "7 min",
    body: [
      "Non-Agricultural (NA) conversion is the legal process of changing the classification of agricultural land to non-agricultural use in Maharashtra. This is a critical step if you plan to construct a residential, commercial, or industrial property on agricultural land. Without NA conversion, any construction on agricultural land is illegal and can be demolished by the authorities. Understanding this process is essential for anyone investing in land in Maharashtra.",
      "The NA conversion process in Maharashtra is governed by the Maharashtra Land Revenue Code, 1966 (Section 44). To apply for NA conversion, the landowner must submit an application to the District Collector or the Tahsildar of the respective taluka. The application must include the 7/12 extract, village map (gaon nakasha), property card, zone certificate from the local planning authority, and a no-objection certificate from the Gram Panchayat.",
      "The fees for NA conversion vary based on the location and the intended use. For residential purposes, the conversion tax is typically calculated as a percentage of the market value (jantri rate) of the land. As of 2026, the premium ranges from 2% to 15% of the market value depending on the zone classification. Additional charges include application fees, stamp duty on the conversion order, and administrative charges.",
      "The typical timeline for NA conversion in Maharashtra ranges from 3 to 6 months, though it can take longer if there are objections or disputes. After submitting the application, the Tahsildar conducts a site inspection and publishes a public notice. If no objections are raised within 30 days, the conversion order is issued. The order must then be registered, and the mutation entry in the 7/12 extract must be updated to reflect the non-agricultural status.",
      "Common challenges in NA conversion include delays due to incomplete documentation, disputes over land boundaries, environmental restrictions (especially near rivers, hills, or forest areas), and pending litigation. At Crystal Estates, our legal team assists clients with the entire NA conversion process, from document preparation to liaison with revenue authorities, ensuring a smooth and timely conversion.",
    ],
  },
  {
    slug: "stamp-duty-maharashtra-2026-calculator",
    title: "Stamp Duty in Maharashtra 2026 — Complete Calculator & Guide",
    excerpt:
      "Understand stamp duty and registration charges in Maharashtra for 2026, with our easy calculator for flats, plots, and resale properties.",
    category: "Buying Guides",
    date: "2026-03-01",
    readTime: "9 min",
    body: [
      "Stamp duty is a mandatory tax levied by the Maharashtra state government on property transactions. It is one of the largest components of the total cost of buying a property, and understanding the current rates is essential for budgeting your purchase. In 2026, the stamp duty rates in Maharashtra vary based on the property location, buyer's gender, and the type of property being purchased.",
      "In municipal corporation areas like Mumbai, Pune, Nagpur, and Thane, the stamp duty rate for male buyers is 6% of the market value or agreement value (whichever is higher), while female buyers get a 1% concession, paying 5%. In other areas (Municipal Council, Nagar Panchayat, or rural areas), the rates are generally 1% lower. Registration charges are a flat 1% of the property value, capped at ₹30,000.",
      "For resale properties, stamp duty is calculated on the higher of the agreement value or the ready reckoner (circle) rate. The ready reckoner rates are published annually by the Inspector General of Registration and Stamps, Maharashtra. In 2026, several areas in Mumbai and Pune have seen a 3-5% increase in ready reckoner rates, which directly impacts the stamp duty payable.",
      "Special concessions apply for first-time homebuyers under the Pradhan Mantri Awas Yojana (PMAY) scheme. Properties valued under ₹50 lakh in Gram Panchayat areas or ₹45 lakh in urban areas may qualify for stamp duty exemption or reduction. Additionally, women-only registrations attract the lowest stamp duty rates, making joint registration with a female family member a popular strategy.",
      "To calculate your exact stamp duty, you need the agreement value, the ready reckoner rate for your area, the property type (flat, plot, bungalow, commercial), and the buyer's gender. Crystal Estates provides a free stamp duty estimation as part of our property buying service. Our team also assists with the entire registration process, ensuring you pay the correct amount and avoid penalties.",
    ],
  },
  {
    slug: "rera-agent-registration-maharashtra",
    title: "RERA Agent Registration Process Maharashtra 2026",
    excerpt:
      "Step-by-step guide to registering as a RERA-certified real estate agent in Maharashtra — eligibility, documents, fees, and renewal process.",
    category: "Legal",
    date: "2026-03-10",
    readTime: "6 min",
    body: [
      "The Real Estate (Regulation and Development) Act, 2016, commonly known as RERA, mandates that all real estate agents operating in Maharashtra must be registered with MahaRERA. Operating without RERA registration can attract penalties of up to ₹10,000 per day and imprisonment of up to one year. As of 2026, MahaRERA has streamlined the online registration process, making it faster and more transparent.",
      "To register as a RERA agent in Maharashtra, you need to meet the following eligibility criteria: you must be an Indian citizen, at least 18 years of age, with no criminal record or pending cases related to fraud or moral turpitude. Both individuals and companies/firms can apply for RERA agent registration. The registration is valid for 5 years and must be renewed before expiry.",
      "The documents required for RERA agent registration include: PAN card, Aadhaar card, address proof, passport-size photograph, educational qualification certificates, income tax returns for the last 3 years, and a declaration in the prescribed format. If applying as a company or firm, you also need the incorporation certificate, partnership deed, board resolution, and the firm's PAN and GST registration.",
      "The registration process is entirely online through the MahaRERA portal (maharera.maharashtra.gov.in). Create an account, fill in the application form with personal and business details, upload the required documents, and pay the registration fee. The fee for individual agents is ₹10,000, while for firms it is ₹50,000. After submission, MahaRERA typically processes the application within 30 days.",
      "Once registered, RERA agents receive a unique registration number that must be displayed on all marketing materials, property listings, and communications. Crystal Estates is a fully RERA-registered brokerage, and all our consultants operate under our firm's RERA certification. If you're a real estate professional looking to get RERA registered, our compliance team can guide you through the process.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getRelatedPosts(currentSlug: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

/* ------------------------------------------------------------------ */
/*  Dynamic SEO Metadata                                               */
/* ------------------------------------------------------------------ */

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Crystal Estates" };
  }

  return {
    title: `${post.title} | Crystal Estates Blog`,
    description: post.excerpt,
    keywords: [
      post.category,
      "Maharashtra real estate",
      "Crystal Estates",
      "property guide",
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.crystalestates.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Prithviraj Awatade"],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Blog Post Page (Server Component)                                  */
/* ------------------------------------------------------------------ */

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <main className="min-h-screen bg-primary-black">
      {/* ---- Article Header ---- */}
      <section className="pt-36 pb-12 px-6">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/60 truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          {/* Category Badge */}
          <span className="inline-block rounded-full bg-gold/10 text-gold font-body text-xs font-semibold px-4 py-1.5 mb-6">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 font-body text-sm text-text-muted">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Prithviraj Awatade
            </span>
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* ---- Article Body ---- */}
      <section className="px-6 pb-16">
        <article className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {post.body.map((paragraph, i) => (
              <div key={i}>
                <p className="font-body text-base text-text-muted leading-relaxed">
                  {paragraph}
                </p>

                {/* Lead capture CTA after 2nd paragraph */}
                {i === 1 && (
                  <div className="my-10 rounded-2xl bg-card-dark border border-border-subtle p-8 text-center">
                    <p className="font-heading text-xl text-white mb-3">
                      Looking for Expert Guidance?
                    </p>
                    <p className="font-body text-sm text-text-muted mb-6">
                      Our property consultants can help you navigate the
                      Maharashtra real estate market with confidence.
                    </p>
                    <a
                      href="https://wa.me/919511750686?text=Hi%2C%20I%20read%20your%20blog%20and%20need%20property%20guidance."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gold hover:bg-gold/90 transition-colors px-6 py-3 font-body text-sm font-semibold text-primary-black"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat with Us on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* ---- Author Box ---- */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-card-dark border border-border-subtle p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gold/10">
              <User className="h-8 w-8 text-gold" />
            </div>
            <div>
              <p className="font-heading text-xl text-white mb-1">
                Prithviraj Awatade
              </p>
              <p className="font-body text-xs text-gold mb-3">
                Founder, Crystal Estates
              </p>
              <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
                Prithviraj is a RERA-certified real estate consultant with deep
                expertise in the Maharashtra property market. With a focus on
                transparency and client-first service, he has helped hundreds of
                families find their dream homes across Mumbai and Pune.
              </p>
              <a
                href="https://wa.me/919511750686?text=Hi%20Prithviraj%2C%20I%20would%20like%20to%20book%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold hover:bg-gold/90 transition-colors px-5 py-2.5 font-body text-sm font-semibold text-primary-black"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Related Posts ---- */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-10 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl bg-card-dark border border-border-subtle p-6 flex flex-col transition-all duration-300 hover:border-gold/30 hover:-translate-y-1">
                  <span className="self-start rounded-full bg-gold/10 text-gold font-body text-xs font-semibold px-3 py-1 mb-4">
                    {related.category}
                  </span>
                  <h3 className="font-heading text-lg text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="font-body text-sm text-text-muted leading-relaxed mb-4 line-clamp-2 flex-1">
                    {related.excerpt}
                  </p>
                  <div className="flex items-center justify-between font-body text-xs text-text-muted">
                    <span>{formatDate(related.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {related.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
