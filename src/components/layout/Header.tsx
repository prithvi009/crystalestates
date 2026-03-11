"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
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
                {/* Letter C */}
                <path
                  d="M20 14C17.5 14 14 16.5 14 22C14 27.5 17.5 30 20 30"
                  stroke="#C6A962"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Letter E */}
                <path
                  d="M24 14H31M24 22H29M24 30H31M24 14V30"
                  stroke="#C6A962"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className="text-lg font-heading font-semibold tracking-[0.2em] text-white">
                CRYSTAL ESTATES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-gold"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeLink"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-2.5 bg-gold text-black text-sm font-semibold tracking-wider uppercase rounded transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
              >
                Book Consultation
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`text-2xl font-heading font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                        isActive ? "text-gold" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="block h-0.5 mt-1 bg-gold rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.08 }}
              >
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="mt-4 inline-flex items-center px-8 py-3 bg-gold text-black text-base font-semibold tracking-wider uppercase rounded transition-all duration-300 hover:bg-gold-light"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
