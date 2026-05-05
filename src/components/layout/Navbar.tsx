"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/over-ons", label: "Verhaal" },
  { href: "/platforms", label: "Platforms" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 h-20 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-black/[0.08] shadow-sm"
            : "bg-[#F9F9F9]/95 backdrop-blur-md border-b border-black/[0.08]"
        }`}
      >
        <nav className="flex justify-between items-center w-full h-full px-6 md:px-8 max-w-[1440px] mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Stichting Philia logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="font-serif text-xl font-bold text-accent tracking-tight">
              Stichting Philia
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-on-surface hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-accent text-white rounded-full text-sm font-semibold hover:bg-purple-700 transition-colors"
          >
            Neem contact op
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-on-surface hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-20 left-0 right-0 bg-white border-b border-black/[0.08] z-40 md:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-3 text-base font-medium border-b border-black/[0.06] last:border-0 transition-colors ${
                pathname === link.href ? "text-accent" : "text-on-surface hover:text-accent"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-3 flex items-center justify-center py-3 bg-accent text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Neem contact op
          </Link>
        </div>
      </div>
    </>
  );
}
