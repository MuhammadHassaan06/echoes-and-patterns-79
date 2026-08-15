'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import RegionCard from '../ui/RegionCard';
import RegionCanvasPattern, { RegionId } from '../ui/RegionCanvasPattern';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';
import { Language } from '@/types/i18n';
import { Compass, Sparkles, Layers } from 'lucide-react';

interface TapestryChapterProps {
  lang?: Language;
}

// Regional Ambient Light & Accent Config
const regionalConfig: Record<
  RegionId,
  { accentColor: string; glowGradient: string; badgeLabel: string; badgeLabelUr: string }
> = {
  punjab: {
    accentColor: '#005B82',
    glowGradient: 'radial-gradient(circle at 50% 30%, rgba(0, 91, 130, 0.45) 0%, rgba(1, 46, 23, 0.1) 70%)',
    badgeLabel: 'Multani Ceramic & Glaze Motif',
    badgeLabelUr: 'ملتانی کاشی کاری نقش',
  },
  sindh: {
    accentColor: '#A33B20',
    glowGradient: 'radial-gradient(circle at 50% 30%, rgba(163, 59, 32, 0.45) 0%, rgba(1, 46, 23, 0.1) 70%)',
    badgeLabel: 'Ajrak Geometric Block Grid',
    badgeLabelUr: 'اجرک بلاک پرنٹ ہندسی بلاک',
  },
  kpk: {
    accentColor: '#C5A880',
    glowGradient: 'radial-gradient(circle at 50% 30%, rgba(197, 168, 128, 0.4) 0%, rgba(1, 46, 23, 0.1) 70%)',
    badgeLabel: 'Chased Copper Medallion & Acoustics',
    badgeLabelUr: 'پشاور تانبہ نقاشی و رباب نغمہ',
  },
  balochistan: {
    accentColor: '#D9381E',
    glowGradient: 'radial-gradient(circle at 50% 30%, rgba(217, 56, 30, 0.45) 0%, rgba(1, 46, 23, 0.1) 70%)',
    badgeLabel: 'Balochi Mirrorwork Needlework Lattice',
    badgeLabelUr: 'بلوچی کڑھائی و شیشہ کاری جال',
  },
  gb_kashmir: {
    accentColor: '#01411C',
    glowGradient: 'radial-gradient(circle at 50% 30%, rgba(1, 65, 28, 0.6) 0%, rgba(1, 46, 23, 0.1) 70%)',
    badgeLabel: 'Walnut Carving & Pashmina Weave',
    badgeLabelUr: 'اخروٹ لکڑی نقش و پشمینہ بُنائی',
  },
};

export default function TapestryChapter({ lang }: TapestryChapterProps = {}) {
  const { language } = useTranslation();
  const activeLang = lang ?? language;
  const isUrdu = activeLang === 'ur';

  const [activeRegion, setActiveRegion] = useState<RegionId>('punjab');

  const content = isUrdu ? ur.tapestry : en.tapestry;
  const regions = content.regions;
  const currentConfig = regionalConfig[activeRegion];

  const regionList: { id: RegionId; data: typeof regions.punjab }[] = [
    { id: 'punjab', data: regions.punjab },
    { id: 'sindh', data: regions.sindh },
    { id: 'kpk', data: regions.kpk },
    { id: 'balochistan', data: regions.balochistan },
    { id: 'gb_kashmir', data: regions.gb_kashmir },
  ];

  const activeData = regions[activeRegion];

  return (
    <section
      id="tapestry"
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="relative py-24 px-6 border-t border-gold-antique/10 bg-emerald-deep overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Shifting Ambient Background Light */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out z-0 opacity-80"
        style={{ background: currentConfig.glowGradient }}
      />

      {/* Background Decorative Motif Grid Line */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-antique/10 border border-gold-antique/30">
            <Compass className="w-3.5 h-3.5 text-chamakpatti-yellow animate-spin-slow" />
            <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
              {isUrdu ? 'باب 2 • علاقائی دستکاری کا نقشہ' : 'CHAPTER 2 • REGIONAL CRAFT ATLAS'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-cream-archival ${isUrdu ? 'font-urdu text-5xl leading-tight' : 'font-serif'}`}>
            {content.title}
          </h2>
          <p className={`text-base text-cream-archival/70 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
            {content.subtitle}
          </p>
        </div>

        {/* Interactive Showcase Hero Showcase Panel */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-8 bg-emerald-vibrant/30 border border-gold-antique/20 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Active Canvas Pattern Visual Display (5 Cols on Desktop) */}
            <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full rounded-2xl overflow-hidden border border-gold-antique/30 shadow-2xl group">
              <RegionCanvasPattern regionId={activeRegion} animate={true} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-transparent opacity-60" />
              
              {/* Active Pattern Badge Label */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-emerald-deep/90 border border-gold-antique/30 backdrop-blur-md flex items-center justify-between">
                <span className="font-mono text-xs text-chamakpatti-yellow font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-gold-antique" />
                  {isUrdu ? currentConfig.badgeLabelUr : currentConfig.badgeLabel}
                </span>
                <Sparkles className="w-4 h-4 text-chamakpatti-yellow animate-pulse" />
              </div>
            </div>

            {/* Active Region Detailed Description Panel (7 Cols on Desktop) */}
            <div className="lg:col-span-7 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-deep text-chamakpatti-yellow font-mono text-xs font-bold border border-gold-antique/40">
                    <span>● {activeData.craft}</span>
                  </div>
                  <h3 className={`text-3xl md:text-4xl font-bold text-cream-archival ${isUrdu ? 'font-urdu text-4xl' : 'font-serif'}`}>
                    {activeData.title}
                  </h3>
                  <p className={`text-base md:text-lg text-cream-archival/90 leading-relaxed ${isUrdu ? 'font-urdu text-lg leading-loose' : 'font-sans'}`}>
                    {activeData.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Region Switcher Pills Hint */}
              <div className="pt-4 border-t border-gold-antique/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-gold-antique/60 mr-2">
                  {isUrdu ? 'علاقہ منتخب کریں:' : 'Explore Region:'}
                </span>
                {regionList.map(({ id, data }) => (
                  <button
                    key={id}
                    onClick={() => setActiveRegion(id)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 ${
                      activeRegion === id
                        ? 'bg-gold-antique text-emerald-deep font-bold shadow-md scale-105'
                        : 'bg-emerald-vibrant/40 text-cream-archival/70 hover:text-cream-archival hover:bg-emerald-vibrant/60 border border-gold-antique/20'
                    }`}
                  >
                    {data.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5 Regional Craft Atlas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionList.map(({ id, data }) => (
            <RegionCard
              key={id}
              id={id}
              title={data.title}
              craft={data.craft}
              description={data.description}
              lang={activeLang}
              isActive={activeRegion === id}
              accentColor={regionalConfig[id].accentColor}
              onSelect={() => setActiveRegion(id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
