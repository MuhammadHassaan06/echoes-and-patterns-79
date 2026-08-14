'use client';

import React from 'react';
import { Language } from '@/types/i18n';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';

interface GenesisChapterProps {
  lang: Language;
}

export default function GenesisChapter({ lang }: GenesisChapterProps) {
  const content = lang === 'ur' ? ur.genesis : en.genesis;

  return (
    <section id="genesis" className="relative py-24 px-6 border-t border-gold-antique/10 bg-emerald-deep/90">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <span className="inline-block font-mono text-sm tracking-widest text-gold-antique px-3 py-1 rounded bg-gold-antique/10 border border-gold-antique/30">
          CHAPTER 1 • {content.dateLabel}
        </span>

        <div className="p-8 md:p-12 rounded-2xl bg-emerald-vibrant/20 border border-gold-antique/30 backdrop-blur-sm shadow-xl space-y-6">
          <p
            className={`text-2xl md:text-3xl text-cream-archival font-serif leading-relaxed italic ${
              lang === 'ur' ? 'font-urdu not-italic text-3xl md:text-4xl leading-loose' : ''
            }`}
          >
            &ldquo;{content.tributeText}&rdquo;
          </p>

          <p className="text-xs font-mono text-cream-archival/60 tracking-wide">
            {content.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
