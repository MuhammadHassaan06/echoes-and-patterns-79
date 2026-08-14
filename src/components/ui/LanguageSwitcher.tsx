'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Language } from '@/types/i18n';

export interface LanguageSwitcherProps {
  currentLang?: Language;
  onSelectLang?: (lang: Language) => void;
}

export default function LanguageSwitcher({
  currentLang,
  onSelectLang,
}: LanguageSwitcherProps = {}) {
  const { language, setLanguage } = useTranslation();

  const activeLang = currentLang ?? language;
  const handleSelectLang = onSelectLang ?? setLanguage;

  return (
    <div className="flex items-center rounded-full border border-gold-antique/30 p-0.5 bg-emerald-deep/60">
      <button
        onClick={() => handleSelectLang('en')}
        aria-label="Switch language to English"
        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
          activeLang === 'en'
            ? 'bg-gold-antique text-emerald-deep font-bold shadow-sm'
            : 'text-cream-archival/70 hover:text-cream-archival'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => handleSelectLang('ur')}
        aria-label="Switch language to Urdu"
        className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-urdu font-medium transition-all cursor-pointer ${
          activeLang === 'ur'
            ? 'bg-gold-antique text-emerald-deep font-bold shadow-sm'
            : 'text-cream-archival/70 hover:text-cream-archival'
        }`}
      >
        اردو
      </button>
    </div>
  );
}
