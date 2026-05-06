"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Ons verhaal" },
  { href: "/platforms", label: "Platforms" },
  { href: "/#contact", label: "Contact" },
];

export default function HomeNav() {
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
      <header className={`nav${scrolled ? " nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <Image src="/images/logo.png" alt="Stichting Philia" width={34} height={34} style={{ height: 34, width: "auto" }} />
            <span className="logo-name">Stichting Philia</span>
          </Link>

          <nav>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/#contact" className="nav-cta">Neem contact op</Link>

          <button
            className="nav-mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Menu sluiten" : "Menu openen"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="nav-mobile-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer${isOpen ? " nav-mobile-drawer-open" : ""}`}>
        <div className="nav-mobile-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-mobile-link${pathname === link.href ? " nav-mobile-link-active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/#contact" className="nav-mobile-cta" onClick={() => setIsOpen(false)}>
          Neem contact op →
        </Link>
      </div>
    </>
  );
}
