import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Shield, Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Crystal Estates",
  description:
    "How Crystal Estates collects, uses, and protects your personal information — including data from our forms, WhatsApp, cookies, Google Ads, Google Analytics, and the Meta (Facebook) Pixel.",
  alternates: { canonical: "https://www.crystalestates.in/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2 August 2026";

/* Small helpers to keep the markup consistent */
function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-heading text-2xl md:text-[1.75rem] text-navy mb-4">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-navy/70">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-light">
      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-10">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <nav className="flex items-center gap-2 text-sm text-navy/50 mb-6">
            <Link href="/" className="flex items-center gap-1 hover:text-gold-dark transition-colors">
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-navy/30" />
            <span className="text-gold-dark font-medium">Privacy Policy</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-gold/15">
              <Shield className="w-5 h-5 text-gold-dark" />
            </span>
            <p className="section-label">Legal</p>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-navy">Privacy Policy</h1>
          <p className="mt-4 text-navy/60">
            Last updated: <span className="font-medium text-navy/80">{LAST_UPDATED}</span>
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="bg-white border border-border-subtle card-elevate rounded-2xl p-6 sm:p-10 space-y-10">
            <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-navy/70">
              <p>
                Crystal Estates (&quot;Crystal Estates&quot;, &quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;) operates the website{" "}
                <span className="font-medium text-navy/80">www.crystalestates.in</span> (the
                &quot;Site&quot;). This Privacy Policy explains what information we collect, how we
                use it, and the choices you have. By using the Site or submitting an enquiry, you
                agree to the practices described below.
              </p>
              <p>
                We are a real estate consultancy serving Pune and Mumbai, Maharashtra, India. This
                policy is written to comply with the requirements of advertising partners including
                Google (Google Ads &amp; Google Analytics) and Meta (Facebook &amp; Instagram), as
                well as applicable Indian data-protection law.
              </p>
            </div>

            <Section title="1. Information We Collect">
              <p>We collect the following categories of information:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-gold">
                <li>
                  <span className="font-medium text-navy/85">Information you provide.</span> Your
                  name, phone number, email address, budget, preferred location, property type, and
                  any message you send through our contact forms, lead forms, WhatsApp, or phone
                  calls.
                </li>
                <li>
                  <span className="font-medium text-navy/85">Usage &amp; device data.</span> Pages
                  visited, referring URLs, approximate location, browser type, device type, and
                  interactions with the Site, collected automatically via cookies and similar
                  technologies.
                </li>
                <li>
                  <span className="font-medium text-navy/85">Advertising identifiers.</span> Cookies
                  and pixels set by Google and Meta to measure ad performance and show relevant ads.
                </li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information">
              <ul className="list-disc pl-5 space-y-2 marker:text-gold">
                <li>To respond to your enquiries and provide property recommendations and site visits.</li>
                <li>To contact you by phone, WhatsApp, SMS, or email about properties and services you asked about.</li>
                <li>To operate, maintain, and improve the Site and our services.</li>
                <li>To measure and improve our marketing, including advertising campaigns on Google and Meta.</li>
                <li>To comply with legal obligations and prevent fraud or abuse.</li>
              </ul>
            </Section>

            <Section title="3. Cookies &amp; Tracking Technologies">
              <p>
                We use cookies and similar technologies to run the Site and understand how it is
                used. These include essential cookies (required for the Site to function) and
                analytics/advertising cookies (used only to measure and improve our marketing).
              </p>
              <p>
                You can control or delete cookies through your browser settings. Disabling some
                cookies may affect how the Site works.
              </p>
            </Section>

            <Section title="4. Advertising &amp; Analytics Partners">
              <p>
                We work with third-party advertising and analytics providers that may set cookies or
                use pixels on your device:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-gold">
                <li>
                  <span className="font-medium text-navy/85">Google Ads &amp; Google Analytics.</span>{" "}
                  Used to measure website traffic and conversions and to show relevant ads. Learn
                  more in{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark underline underline-offset-2 hover:text-gold"
                  >
                    Google&apos;s Privacy Policy
                  </a>
                  . You can manage ad personalisation at{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark underline underline-offset-2 hover:text-gold"
                  >
                    Google Ads Settings
                  </a>
                  .
                </li>
                <li>
                  <span className="font-medium text-navy/85">Meta Pixel (Facebook &amp; Instagram).</span>{" "}
                  Used to measure ad performance and reach relevant audiences. Learn more in{" "}
                  <a
                    href="https://www.facebook.com/privacy/policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-dark underline underline-offset-2 hover:text-gold"
                  >
                    Meta&apos;s Privacy Policy
                  </a>
                  . You can manage ad preferences in your Facebook or Instagram settings.
                </li>
              </ul>
              <p>
                You can opt out of interest-based advertising from many companies via{" "}
                <a
                  href="https://optout.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark underline underline-offset-2 hover:text-gold"
                >
                  aboutads.info
                </a>{" "}
                and{" "}
                <a
                  href="https://youradchoices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-dark underline underline-offset-2 hover:text-gold"
                >
                  youradchoices.com
                </a>
                .
              </p>
            </Section>

            <Section title="5. How We Share Your Information">
              <p>We do not sell your personal information. We may share it only:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-gold">
                <li>With service providers who help us operate the Site and communicate with you (e.g. hosting, messaging, analytics), under confidentiality obligations.</li>
                <li>With developers, banks, or partners strictly to progress a property enquiry you have made, with your knowledge.</li>
                <li>When required by law, regulation, or a valid legal request.</li>
              </ul>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We keep your information only as long as needed to serve your enquiry, meet legal
                and accounting requirements, and support our legitimate business interests. When it
                is no longer needed, we delete or anonymise it.
              </p>
            </Section>

            <Section title="7. Your Rights &amp; Choices">
              <ul className="list-disc pl-5 space-y-2 marker:text-gold">
                <li>Request access to, or a copy of, the personal information we hold about you.</li>
                <li>Request correction or deletion of your personal information.</li>
                <li>Opt out of marketing messages at any time by replying &quot;STOP&quot; or contacting us.</li>
                <li>Withdraw consent for cookies via your browser settings.</li>
              </ul>
              <p>
                To exercise any of these rights, email us at{" "}
                <a
                  href="mailto:info@crystalestates.in"
                  className="text-gold-dark underline underline-offset-2 hover:text-gold"
                >
                  info@crystalestates.in
                </a>
                .
              </p>
            </Section>

            <Section title="8. Data Security">
              <p>
                We use reasonable technical and organisational measures to protect your information.
                However, no method of transmission or storage is completely secure, and we cannot
                guarantee absolute security.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                The Site is not intended for anyone under 18, and we do not knowingly collect
                personal information from children.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. The &quot;Last updated&quot;
                date at the top reflects the latest revision. Significant changes will be posted on
                this page.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>If you have questions about this Privacy Policy or your data, contact us:</p>
              <div className="mt-2 rounded-xl bg-bg-cream border border-border-subtle p-5 space-y-3 text-navy/80">
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <a href="mailto:info@crystalestates.in" className="hover:text-gold-dark transition-colors">
                    info@crystalestates.in
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <a href="tel:+919511750686" className="hover:text-gold-dark transition-colors">
                    +91 95117 50686
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                  <span>
                    Innov8, Suman Business Park, Kalyani Nagar,
                    <br />
                    Pune, Maharashtra 411014, India
                  </span>
                </p>
              </div>
            </Section>
          </div>

          <p className="text-center text-sm text-navy/45 mt-8">
            See also our{" "}
            <Link href="/terms" className="text-gold-dark hover:text-gold underline underline-offset-2">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/disclaimer" className="text-gold-dark hover:text-gold underline underline-offset-2">
              Disclaimer
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
