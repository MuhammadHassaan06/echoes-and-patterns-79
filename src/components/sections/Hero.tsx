'use client';

import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function Hero() {
  const { t, language } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations (hardware accelerated)
  const glowParallax = scrollY * 0.35;
  const contentParallax = scrollY * 0.15;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden bg-emerald-deep">
      {/* Layered CSS Radial Glows + Scroll Parallax */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
        style={{ transform: `translate3d(0, ${glowParallax}px, 0)` }}
      >
        {/* Layer 1: Core Emerald Ambient Glow */}
        <div className="w-[340px] sm:w-[540px] md:w-[680px] h-[340px] sm:h-[540px] md:h-[680px] rounded-full bg-radial from-emerald-vibrant/60 via-emerald-vibrant/20 to-transparent blur-[80px] sm:blur-[120px] animate-pulse" />

        {/* Layer 2: Gold Antique Accent Backlight */}
        <div className="absolute w-[220px] sm:w-[380px] md:w-[480px] h-[220px] sm:h-[380px] md:h-[480px] rounded-full bg-radial from-gold-antique/25 via-gold-antique/5 to-transparent blur-[60px] sm:blur-[90px]" />

        {/* Layer 3: Multani Blue Sub-glow */}
        <div className="absolute w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] rounded-full bg-radial from-multani-blue/20 to-transparent blur-[70px] translate-y-12" />

        {/* Decorative Crescent & Star Silhouette Glow Motif */}
        <svg
          className="absolute w-48 sm:w-80 md:w-96 h-48 sm:h-80 md:h-96 text-gold-antique/10 pointer-events-none"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          {/* Crescent */}
          <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" />
          {/* Star */}
          <polygon points="68,28 71,36 79,36 73,41 75,49 68,44 61,49 63,41 57,36 65,36" />
        </svg>
      </div>

      {/* Main Hero Content */}
      <div
        className="relative max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 z-10"
        style={{
          transform: `translate3d(0, ${contentParallax}px, 0)`,
          opacity: opacityFade,
        }}
      >
        {/* Independence Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-gold-antique/40 bg-emerald-vibrant/40 backdrop-blur-md text-[11px] sm:text-xs font-mono text-chamakpatti-yellow shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-chamakpatti-yellow animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-widest uppercase font-semibold">
            1947 — 2026 • 79 YEARS OF INDEPENDENCE
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-cream-archival drop-shadow-xl ${
            language === 'ur'
              ? 'font-urdu leading-[1.6] sm:leading-[1.7] text-5xl sm:text-7xl md:text-8xl'
              : 'font-serif leading-tight'
          }`}
        >
          {t('hero.title')}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-xl md:text-2xl text-cream-archival/85 max-w-2xl mx-auto font-light leading-relaxed ${
            language === 'ur' ? 'font-urdu leading-[1.8] text-lg sm:text-2xl' : 'font-sans'
          }`}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA Button */}
        <div className="pt-4 sm:pt-6">
          <a
            href="#genesis"
            className="group relative inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-emerald-vibrant hover:bg-gold-antique text-cream-archival hover:text-emerald-deep font-semibold text-sm sm:text-base border border-gold-antique/50 shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <span className={language === 'ur' ? 'font-urdu text-lg' : 'font-sans'}>
              {t('hero.cta')}
            </span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>

      {/* Decorative Bottom Subtle Gradient Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-deep via-emerald-deep/80 to-transparent pointer-events-none" />
    </section>
  );
}
