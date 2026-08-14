'use client';

import React from 'react';
import { Language } from '@/types/i18n';

interface RegionCardProps {
  title: string;
  craft: string;
  description: string;
  lang: Language;
}

export default function RegionCard({ title, craft, description, lang }: RegionCardProps) {
  return (
    <div className="group relative bg-emerald-vibrant/20 border border-gold-antique/20 hover:border-gold-antique/60 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-antique/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-xl font-bold text-cream-archival ${lang === 'ur' ? 'font-urdu' : 'font-serif'}`}>
          {title}
        </h3>
        <span className="w-2 h-2 rounded-full bg-chamakpatti-yellow opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-xs font-mono text-gold-antique mb-4">{craft}</p>
      <p className={`text-sm text-cream-archival/80 ${lang === 'ur' ? 'font-urdu leading-relaxed text-base' : 'font-sans'}`}>
        {description}
      </p>
    </div>
  );
}
