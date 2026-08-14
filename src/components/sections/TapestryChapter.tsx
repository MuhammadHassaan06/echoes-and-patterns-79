'use client';

import React from 'react';
import { Language } from '@/types/i18n';
import RegionCard from '../ui/RegionCard';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';

interface TapestryChapterProps {
  lang: Language;
}

export default function TapestryChapter({ lang }: TapestryChapterProps) {
  const content = lang === 'ur' ? ur.tapestry : en.tapestry;
  const regions = content.regions;

  return (
    <section id="tapestry" className="py-24 px-6 border-t border-gold-antique/10 bg-emerald-vibrant/10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
            CHAPTER 2 • REGIONAL CRAFT ATLAS
          </span>
          <h2 className={`text-4xl font-bold text-cream-archival ${lang === 'ur' ? 'font-urdu text-5xl' : 'font-serif'}`}>
            {content.title}
          </h2>
          <p className={`text-sm text-cream-archival/70 ${lang === 'ur' ? 'font-urdu' : 'font-sans'}`}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RegionCard
            title={regions.punjab.title}
            craft={regions.punjab.craft}
            description={regions.punjab.description}
            lang={lang}
          />
          <RegionCard
            title={regions.sindh.title}
            craft={regions.sindh.craft}
            description={regions.sindh.description}
            lang={lang}
          />
          <RegionCard
            title={regions.kpk.title}
            craft={regions.kpk.craft}
            description={regions.kpk.description}
            lang={lang}
          />
          <RegionCard
            title={regions.balochistan.title}
            craft={regions.balochistan.craft}
            description={regions.balochistan.description}
            lang={lang}
          />
          <RegionCard
            title={regions.gb_kashmir.title}
            craft={regions.gb_kashmir.craft}
            description={regions.gb_kashmir.description}
            lang={lang}
          />
        </div>
      </div>
    </section>
  );
}
