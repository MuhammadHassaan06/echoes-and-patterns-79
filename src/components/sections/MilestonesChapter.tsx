'use client';

import React from 'react';
import { Language } from '@/types/i18n';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';

interface MilestonesChapterProps {
  lang: Language;
}

export default function MilestonesChapter({ lang }: MilestonesChapterProps) {
  const content = lang === 'ur' ? ur.milestones : en.milestones;

  return (
    <section id="milestones" className="py-24 px-6 border-t border-gold-antique/10 bg-emerald-deep">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
            CHAPTER 3 • HISTORICAL CHRONICLE
          </span>
          <h2 className={`text-4xl font-bold text-cream-archival ${lang === 'ur' ? 'font-urdu text-5xl' : 'font-serif'}`}>
            {content.title}
          </h2>
        </div>

        <div className="space-y-8">
          {content.timeline.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl bg-emerald-vibrant/20 border border-gold-antique/20 backdrop-blur-sm"
            >
              <div className="min-w-[140px]">
                <span className="font-mono text-sm px-3 py-1 rounded bg-gold-antique/20 text-chamakpatti-yellow font-bold border border-gold-antique/40 inline-block">
                  {item.era}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className={`text-xl font-bold text-cream-archival ${lang === 'ur' ? 'font-urdu text-2xl' : 'font-serif'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm text-cream-archival/80 ${lang === 'ur' ? 'font-urdu leading-relaxed' : 'font-sans'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
