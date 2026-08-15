'use client';

import React from 'react';
import { Language } from '@/types/i18n';
import RegionCanvasPattern, { RegionId } from './RegionCanvasPattern';
import { Sparkles } from 'lucide-react';

interface RegionCardProps {
  id: RegionId;
  title: string;
  craft: string;
  description: string;
  lang: Language;
  isActive?: boolean;
  accentColor?: string;
  onSelect?: () => void;
}

export default function RegionCard({
  id,
  title,
  craft,
  description,
  lang,
  isActive = false,
  accentColor = '#C5A880',
  onSelect,
}: RegionCardProps) {
  const isUrdu = lang === 'ur';

  return (
    <div
      onMouseEnter={onSelect}
      onClick={onSelect}
      onTouchStart={onSelect}
      className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
        isActive
          ? 'bg-emerald-vibrant/40 border-2 shadow-2xl scale-[1.02] -translate-y-1'
          : 'bg-emerald-vibrant/20 border border-gold-antique/20 hover:border-gold-antique/50 hover:bg-emerald-vibrant/30 hover:-translate-y-0.5'
      } ${isUrdu ? 'text-right' : 'text-left'}`}
      style={{
        borderColor: isActive ? accentColor : undefined,
        boxShadow: isActive ? `0 0 30px ${accentColor}33` : undefined,
      }}
    >
      {/* Top Header Row with Title & Canvas Pattern Badge */}
      <div className={`flex items-start justify-between gap-4 mb-4 ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
                isActive ? 'text-chamakpatti-yellow' : 'text-cream-archival group-hover:text-gold-antique'
              } ${isUrdu ? 'font-urdu text-2xl' : 'font-serif'}`}
            >
              {title}
            </h3>
            {isActive && (
              <Sparkles className="w-4 h-4 text-chamakpatti-yellow animate-pulse shrink-0" />
            )}
          </div>
          <p className="text-xs font-mono text-gold-antique/90 font-medium">
            {craft}
          </p>
        </div>

        {/* Mini Canvas Thumbnail Pattern */}
        <div className="w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-gold-antique/30 shadow-inner group-hover:scale-105 transition-transform duration-300">
          <RegionCanvasPattern regionId={id} animate={isActive} />
        </div>
      </div>

      {/* Region Description */}
      <p
        className={`text-sm text-cream-archival/80 leading-relaxed ${
          isUrdu ? 'font-urdu text-base leading-loose' : 'font-sans'
        }`}
      >
        {description}
      </p>

      {/* Active Accent Bottom Border Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 opacity-80"
        style={{
          backgroundColor: isActive ? accentColor : 'transparent',
        }}
      />
    </div>
  );
}
