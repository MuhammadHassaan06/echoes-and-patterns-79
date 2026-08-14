'use client';

import React from 'react';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import AudioToggle from '../ui/AudioToggle';
import { Language } from '@/types/i18n';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navbar({ lang, onLanguageChange }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-emerald-deep/80 border-b border-gold-antique/20 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold font-serif text-cream-archival tracking-wider">
            {lang === 'ur' ? 'صدائے آزادی' : 'ECHOES & PATTERNS'}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-vibrant border border-gold-antique/30 text-chamakpatti-yellow">
            79th PKR
          </span>
        </div>

        <div className="flex items-center gap-4">
          <AudioToggle />
          <LanguageSwitcher currentLang={lang} onSelectLang={onLanguageChange} />
        </div>
      </div>
    </header>
  );
}
