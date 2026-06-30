import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const propertyTypes = [
  { href: "/properties?type=plots", label: "Plots" },
  { href: "/properties?type=row-houses", label: "Row Houses" },
  { href: "/properties?type=flats", label: "Flats" },
  { href: "/properties?type=commercial", label: "Commercial" },
  { href: "/properties?type=land", label: "Land" },
];

const locations = [
  { href: "/properties?location=pune", label: "Pune" },
  { href: "/properties?location=mumbai", label: "Mumbai" },
  { href: "/properties?location=pmrda-belt", label: "PMRDA Belt" },
  { href: "/properties?location=talegaon", label: "Talegaon" },
];

const WA_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const socialLinks: { icon?: typeof Instagram; href: string; label: string; customIcon?: boolean }[] = [
  { icon: Instagram, href: "https://instagram.com/crystalestates", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@crystalestates", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/crystalestates", label: "LinkedIn" },
  { label: "WhatsApp", href: "https://wa.me/919511750686", customIcon: true },
];

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold mb-5">
      {children}
    </h3>
  );
}

export default function Footer() {
  const linkClass =
    "text-sm text-white/55 transition-colors duration-300 hover:text-gold";

  return (
    <footer className="bg-navy text-white">
      {/* ── Brand + Social ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-12">
        <div className="flex flex-col items-center text-center">
          <Link href="/" className="mb-4 font-heading text-2xl leading-none">
            <span className="text-white tracking-[0.18em]">CRYSTAL</span>
            <span className="text-gold tracking-[0.3em] ml-1.5">ESTATES</span>
          </Link>
          <p className="text-white/45 text-sm tracking-wide mb-7">
            Decoding Value in Real Estate
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-white/55 transition-all duration-300 hover:text-navy hover:bg-gold hover:border-gold"
              >
                {social.customIcon ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d={WA_PATH} />
                  </svg>
                ) : social.icon ? (
                  <social.icon className="h-[17px] w-[17px]" />
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-white/10" />
      </div>

      {/* ── Columns ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <ColHeading>Quick Links</ColHeading>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHeading>Property Types</ColHeading>
            <ul className="space-y-3">
              {propertyTypes.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHeading>Locations</ColHeading>
            <ul className="space-y-3">
              {locations.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColHeading>Contact</ColHeading>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-white/55 leading-relaxed">
                  Innov8, Suman Business Park,<br />
                  Kalyani Nagar, Pune,<br />
                  Maharashtra 411014
                </span>
              </li>
              <li>
                <a href="tel:+919511750686" className="flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-gold">
                  <Phone className="h-4 w-4 text-gold shrink-0" />
                  +91 95117 50686
                </a>
              </li>
              <li>
                <a href="mailto:info@crystalestates.in" className="flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-gold">
                  <Mail className="h-4 w-4 text-gold shrink-0" />
                  info@crystalestates.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-white/10" />
      </div>

      {/* ── Bottom Bar ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-7">
        <p className="text-xs text-white/35 leading-relaxed text-center">
          &copy; 2026 Crystal Estates &nbsp;|&nbsp; MahaRERA Registered &nbsp;|&nbsp;{" "}
          <Link href="/privacy" className="transition-colors hover:text-white/60">Privacy</Link>
          &nbsp;|&nbsp;{" "}
          <Link href="/terms" className="transition-colors hover:text-white/60">Terms</Link>
          &nbsp;|&nbsp;{" "}
          <Link href="/disclaimer" className="transition-colors hover:text-white/60">Disclaimer</Link>
        </p>
      </div>
    </footer>
  );
}
