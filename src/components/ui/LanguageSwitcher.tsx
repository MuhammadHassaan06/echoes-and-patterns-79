'use client';

import React from 'react';
import { Language } from '@/types/i18n';

interface LanguageSwitcherProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
}

export default function LanguageSwitcher({
  currentLang,
  onSelectLang,
}: LanguageSwitcherProps) {
  return (
    <div className="flex items-center rounded-full border border-gold-antique/30 p-0.5 bg-emerald-deep/60">
      <button
        onClick={() => onSelectLang('en')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
          currentLang === 'en'
            ? 'bg-gold-antique text-emerald-deep font-bold shadow-sm'
            : 'text-cream-archival/70 hover:text-cream-archival'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onSelectLang('ur')}
        className={`px-3 py-1 rounded-full text-xs font-urdu font-medium transition-all ${
          currentLang === 'ur'
            ? 'bg-gold-antique text-emerald-deep font-bold shadow-sm'
            : 'text-cream-archival/70 hover:text-cream-archival'
        }`}
      >
        اردو
      </button>
    </div>
  );
}
