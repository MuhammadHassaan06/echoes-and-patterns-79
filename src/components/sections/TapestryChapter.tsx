'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import RegionCard from '../ui/RegionCard';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';
import { Language } from '@/types/i18n';

interface TapestryChapterProps {
  lang?: Language;
}

export default function TapestryChapter({ lang }: TapestryChapterProps = {}) {
  const { language } = useTranslation();
  const activeLang = lang ?? language;

  const content = activeLang === 'ur' ? ur.tapestry : en.tapestry;
  const regions = content.regions;

  return (
    <section id="tapestry" className="py-24 px-6 border-t border-gold-antique/10 bg-emerald-vibrant/10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
            CHAPTER 2 • REGIONAL CRAFT ATLAS
          </span>
          <h2 className={`text-4xl font-bold text-cream-archival ${activeLang === 'ur' ? 'font-urdu text-5xl' : 'font-serif'}`}>
            {content.title}
          </h2>
          <p className={`text-sm text-cream-archival/70 ${activeLang === 'ur' ? 'font-urdu' : 'font-sans'}`}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RegionCard
            title={regions.punjab.title}
            craft={regions.punjab.craft}
            description={regions.punjab.description}
            lang={activeLang}
          />
          <RegionCard
            title={regions.sindh.title}
            craft={regions.sindh.craft}
            description={regions.sindh.description}
            lang={activeLang}
          />
          <RegionCard
            title={regions.kpk.title}
            craft={regions.kpk.craft}
            description={regions.kpk.description}
            lang={activeLang}
          />
          <RegionCard
            title={regions.balochistan.title}
            craft={regions.balochistan.craft}
            description={regions.balochistan.description}
            lang={activeLang}
          />
          <RegionCard
            title={regions.gb_kashmir.title}
            craft={regions.gb_kashmir.craft}
            description={regions.gb_kashmir.description}
            lang={activeLang}
          />
        </div>
      </div>
    </section>
  );
}
