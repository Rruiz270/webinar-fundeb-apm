"use client";

import { useState } from "react";
import { NAV_LINKS, HERO } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-teal-darker/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3">
            <img
              src="https://webinar-fundeb-apm.vercel.app/images/apm-logo-pill-web.png"
              alt="APM — Associação Paulista de Municípios"
              className="h-11 w-auto"
            />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-white/40 text-xs">+</span>
              <span className="text-green font-extrabold text-lg">i10</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inscricao"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-green text-teal-darker font-semibold text-sm hover:brightness-110 transition-all"
            >
              {HERO.cta}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-teal-darker">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-white/70 hover:text-white py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inscricao"
              onClick={() => setMobileOpen(false)}
              className="block text-center px-5 py-3 rounded-lg bg-green text-teal-darker font-semibold text-sm"
            >
              {HERO.cta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
