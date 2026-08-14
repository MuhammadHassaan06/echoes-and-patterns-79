'use client';

import React, { useState } from 'react';
import { Language } from '@/types/i18n';
import BadgeCanvas from '../ui/BadgeCanvas';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';

interface BadgeCreatorChapterProps {
  lang: Language;
}

export default function BadgeCreatorChapter({ lang }: BadgeCreatorChapterProps) {
  const content = lang === 'ur' ? ur.badge : en.badge;
  const [selectedWish, setSelectedWish] = useState<string>(content.wishes[0]);
  const [selectedFrame, setSelectedFrame] = useState<number>(0);

  return (
    <section id="badge-creator" className="py-24 px-6 border-t border-gold-antique/10 bg-emerald-vibrant/20">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
            CHAPTER 4 • DIGITAL KEEPSAKE
          </span>
          <h2 className={`text-4xl font-bold text-cream-archival ${lang === 'ur' ? 'font-urdu text-5xl' : 'font-serif'}`}>
            {content.title}
          </h2>
          <p className={`text-sm text-cream-archival/70 ${lang === 'ur' ? 'font-urdu' : 'font-sans'}`}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
          <BadgeCanvas wish={selectedWish} frameIndex={selectedFrame} language={lang} />

          <div className="space-y-6 w-full max-w-md">
            <div>
              <label className="block text-xs font-mono text-gold-antique mb-2 uppercase">
                {lang === 'ur' ? 'بیج کا سائز اور فریم' : 'Frame Motif'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {content.frames.map((frameName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFrame(idx)}
                    className={`px-3 py-2 rounded-lg border text-xs text-center transition-all ${
                      selectedFrame === idx
                        ? 'border-gold-antique bg-gold-antique/20 text-cream-archival font-bold'
                        : 'border-gold-antique/20 text-cream-archival/70 hover:border-gold-antique/40'
                    }`}
                  >
                    {frameName}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-gold-antique mb-2 uppercase">
                {lang === 'ur' ? 'پیغام منتظب کریں' : 'Select Wish / Promise'}
              </label>
              <div className="space-y-2">
                {content.wishes.map((wishText, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWish(wishText)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                      selectedWish === wishText
                        ? 'border-gold-antique bg-gold-antique/20 text-cream-archival font-bold'
                        : 'border-gold-antique/20 text-cream-archival/70 hover:border-gold-antique/40'
                    } ${lang === 'ur' ? 'font-urdu text-sm' : ''}`}
                  >
                    {wishText}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
