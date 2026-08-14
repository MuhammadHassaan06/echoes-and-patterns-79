'use client';

import React from 'react';
import { Language } from '@/types/i18n';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const content = lang === 'ur' ? ur.hero : en.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-emerald-vibrant/40 blur-[120px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-gold-antique/10 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gold-antique/40 bg-emerald-vibrant/30 backdrop-blur-md text-xs font-mono text-chamakpatti-yellow">
          1947 — 2026 • 79 YEARS OF INDEPENDENCE
        </div>

        <h1
          className={`text-5xl md:text-7xl font-bold tracking-tight text-cream-archival drop-shadow-md ${
            lang === 'ur' ? 'font-urdu leading-tight text-6xl md:text-8xl' : 'font-serif'
          }`}
        >
          {content.title}
        </h1>

        <p
          className={`text-lg md:text-xl text-cream-archival/80 max-w-2xl mx-auto ${
            lang === 'ur' ? 'font-urdu leading-relaxed' : 'font-sans'
          }`}
        >
          {content.subtitle}
        </p>

        <div className="pt-6">
          <a
            href="#genesis"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-vibrant hover:bg-gold-antique hover:text-emerald-deep text-cream-archival font-medium text-sm border border-gold-antique/40 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <span className={lang === 'ur' ? 'font-urdu text-base' : 'font-sans'}>
              {content.cta}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
