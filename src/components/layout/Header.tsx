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
      {/* Gold accent line at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60]"
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "top-0 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
            : "top-[2px] bg-transparent"
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
                className="transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(198,169,98,0.4)]"
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
              <span
                className="text-lg font-heading font-semibold tracking-[0.2em] text-white"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.3)" }}
              >
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
                    className={`relative text-sm tracking-wider uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-gold font-medium"
                        : "text-white/70 hover:text-gold font-medium"
                    }`}
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
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
                className="inline-flex items-center px-6 py-2.5 bg-gold text-black text-sm font-semibold tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/25"
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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[80%] max-w-sm bg-black/90 backdrop-blur-xl border-l border-white/10 flex flex-col md:hidden"
            >
              <div className="flex-1 flex flex-col items-start justify-center px-10">
                <nav className="flex flex-col gap-6 w-full">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.07 }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMobileMenu}
                          className={`text-2xl font-heading font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                            isActive
                              ? "text-gold"
                              : "text-white/80 hover:text-white"
                          }`}
                        >
                          {link.label}
                          {isActive && (
                            <span className="block h-0.5 mt-1 bg-gold rounded-full w-8" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navLinks.length * 0.07 }}
                    className="mt-4"
                  >
                    <Link
                      href="/contact"
                      onClick={closeMobileMenu}
                      className="inline-flex items-center px-8 py-3 bg-gold text-black text-base font-semibold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/25"
                    >
                      Book Consultation
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
