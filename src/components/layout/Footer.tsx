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

const socialLinks: { icon?: typeof Instagram; href: string; label: string; customIcon?: boolean }[] = [
  { icon: Instagram, href: "https://instagram.com/crystalestates", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@crystalestates", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com/company/crystalestates", label: "LinkedIn" },
  {
    label: "WhatsApp",
    href: "https://wa.me/919511750686",
    customIcon: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      {/* ── Section 1: Brand + Tagline + Social ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-14">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-6">
            <svg
              width="36"
              height="36"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="42"
                height="42"
                rx="4"
                stroke="#C6A962"
                strokeWidth="1.5"
                fill="none"
              />
              <rect
                x="4"
                y="4"
                width="36"
                height="36"
                rx="2"
                stroke="#C6A962"
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
              <path
                d="M20 14C17.5 14 14 16.5 14 22C14 27.5 17.5 30 20 30"
                stroke="#C6A962"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M24 14H31M24 22H29M24 30H31M24 14V30"
                stroke="#C6A962"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-[#C6A962] font-heading font-semibold tracking-[0.25em] text-lg">
              CRYSTAL ESTATES
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-[#666] text-sm tracking-wider mb-8">
            Decoding Value in Real Estate
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
              >
                {social.customIcon ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ) : social.icon ? (
                  <social.icon className="h-[18px] w-[18px]" />
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gold Divider ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-[#C6A962]/30" />
      </div>

      {/* ── Section 2: Four Columns ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-[#C6A962] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-[#C6A962] mb-6">
              Property Types
            </h3>
            <ul className="space-y-3">
              {propertyTypes.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-[#C6A962] mb-6">
              Locations
            </h3>
            <ul className="space-y-3">
              {locations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-heading font-semibold tracking-[0.2em] uppercase text-[#C6A962] mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#C6A962] mt-0.5 shrink-0" />
                <span className="text-sm text-[#666] leading-relaxed">
                  Innov8, Suman Business Park,
                  <br />
                  Kalyani Nagar, Pune,
                  <br />
                  Maharashtra 411014
                </span>
              </li>
              <li>
                <a
                  href="tel:+919511750686"
                  className="flex items-center gap-3 text-sm text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
                >
                  <Phone className="h-4 w-4 text-[#C6A962] shrink-0" />
                  +91 95117 50686
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@crystalestates.in"
                  className="flex items-center gap-3 text-sm text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
                >
                  <Mail className="h-4 w-4 text-[#C6A962] shrink-0" />
                  info@crystalestates.in
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919511750686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#666] transition-colors duration-300 hover:text-[#C6A962]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#C6A962] shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Gold Divider ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="h-px bg-[#C6A962]/30" />
      </div>

      {/* ── Section 3: Bottom Bar ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-[#444] leading-relaxed">
            &copy; 2026 Crystal Estates &nbsp;|&nbsp; MahaRERA Registered &nbsp;|&nbsp;{" "}
            <Link href="/privacy" className="transition-colors duration-300 hover:text-[#666]">
              Privacy
            </Link>
            &nbsp;|&nbsp;{" "}
            <Link href="/terms" className="transition-colors duration-300 hover:text-[#666]">
              Terms
            </Link>
            &nbsp;|&nbsp;{" "}
            <Link href="/disclaimer" className="transition-colors duration-300 hover:text-[#666]">
              Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
