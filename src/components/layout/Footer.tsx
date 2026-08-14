'use client';

import React from 'react';
import { Language } from '@/types/i18n';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const content = lang === 'ur' ? ur.footer : en.footer;

  return (
    <footer className="w-full bg-emerald-vibrant/40 border-t border-gold-antique/20 py-12 px-6 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <p className={`text-sm text-cream-archival/80 ${lang === 'ur' ? 'font-urdu text-base' : 'font-sans'}`}>
          {content.note}
        </p>
        <div className="text-xs font-mono text-gold-antique/60">
          14 August 2026 • Pakistan 79th Independence Day Tribute
        </div>
      </div>
    </footer>
  );
}
