'use client';

import React from 'react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import AudioToggle from '../ui/AudioToggle';
import { useTranslation } from '@/hooks/useTranslation';

export default function Navbar() {
  const { language, setLanguage } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-emerald-deep/80 border-b border-gold-antique/20 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span
            className={`text-lg sm:text-xl font-bold text-cream-archival tracking-wider ${
              language === 'ur' ? 'font-urdu text-xl sm:text-2xl' : 'font-serif'
            }`}
          >
            {language === 'ur' ? 'صدائے آزادی' : 'ECHOES & PATTERNS'}
          </span>
          <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-vibrant/80 border border-gold-antique/30 text-chamakpatti-yellow tracking-wider font-semibold whitespace-nowrap">
            79th PKR
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <AudioToggle />
          <LanguageSwitcher currentLang={language} onSelectLang={setLanguage} />
        </div>
      </div>
    </header>
  );
}
