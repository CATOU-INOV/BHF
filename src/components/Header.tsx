"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { PhoneIcon } from "./Icons";
import { COMPANY, PRODUCTS, SERVICES } from "@/lib/constants";

const NAV = [
  { href: "/scierie", label: "La scierie" },
  { href: "/documentation", label: "Documentation" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-sciure-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          <Logo withText={false} className="w-10 h-9 md:w-12 md:h-11" />
          <span className="leading-tight">
            <span className="font-display font-bold text-xl md:text-2xl uppercase text-foret-800 block">
              Bois du Haut Forez
            </span>
            <span className="text-[11px] md:text-xs text-charbon-500 uppercase tracking-[0.18em]">
              Scierie · Chalmazel (42)
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-charbon-700" aria-label="Navigation principale">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-7 hover:text-foret-600 transition-colors"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((v) => !v)}
            >
              Nos produits
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 bg-white shadow-xl border border-sciure-200 min-w-[280px] py-2">
                {PRODUCTS.map((p) => (
                  <Link key={p.slug} href={`/produits/${p.slug}`}
                    className="block px-5 py-2.5 hover:bg-sciure-100 hover:text-foret-700">
                    {p.navTitle}
                  </Link>
                ))}
                <Link href="/produits" className="block px-5 py-2.5 hover:bg-sciure-100 text-foret-700">
                  Tous nos produits →
                </Link>
                <div className="border-t border-sciure-200 my-2" />
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`}
                    className="block px-5 py-2.5 hover:bg-sciure-100 hover:text-foret-700 text-charbon-500">
                    {s.title}
                  </Link>
                ))}
                <Link href="/services" className="block px-5 py-2.5 hover:bg-sciure-100 text-foret-700">
                  Tous nos services →
                </Link>
              </div>
            )}
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="px-3 py-7 hover:text-foret-600 transition-colors">
              {n.label}
            </Link>
          ))}
          <a href={`tel:${COMPANY.phoneRaw}`}
            className="ml-3 flex items-center gap-2 text-foret-700 hover:text-foret-600 px-3">
            <PhoneIcon /> {COMPANY.phone}
          </a>
          <Link href="/devis"
            className="ml-2 bg-ecorce-600 hover:bg-ecorce-700 text-white px-5 py-3 uppercase tracking-wide text-xs font-bold transition-colors">
            Devis gratuit
          </Link>
        </nav>

        <button
          className="lg:hidden p-2 text-foret-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-sciure-200 bg-white px-4 py-4 space-y-1 font-semibold text-charbon-700" aria-label="Navigation mobile">
          <Link href="/produits" className="block text-xs uppercase tracking-widest text-charbon-500 pb-1" onClick={close}>Nos produits</Link>
          {PRODUCTS.map((p) => (
            <Link key={p.slug} href={`/produits/${p.slug}`} className="block py-2 pl-3" onClick={close}>{p.navTitle}</Link>
          ))}
          <Link href="/services" className="block text-xs uppercase tracking-widest text-charbon-500 pt-3 pb-1" onClick={close}>Nos services</Link>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="block py-2 pl-3 text-charbon-500" onClick={close}>{s.title}</Link>
          ))}
          <div className="border-t border-sciure-200 my-2" />
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="block py-2" onClick={close}>{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}
