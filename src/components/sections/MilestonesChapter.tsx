'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '@/hooks/useTranslation';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';
import { Language } from '@/types/i18n';
import { Sparkles, ArrowRight, Calendar } from 'lucide-react';

interface MilestonesChapterProps {
  lang?: Language;
}

export default function MilestonesChapter({ lang }: MilestonesChapterProps = {}) {
  const { language } = useTranslation();
  const activeLang = lang ?? language;
  const isUrdu = activeLang === 'ur';

  const content = isUrdu ? ur.milestones : en.milestones;

  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout: Pinned horizontal scroll track (≥768px, no reduced motion)
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const section = desktopSectionRef.current;
        const track = trackRef.current;
        const progressBar = progressBarRef.current;

        if (!section || !track) return;

        const isRTL = activeLang === 'ur';

        const getScrollAmount = () => {
          const overflow = track.scrollWidth - window.innerWidth + 120;
          return isRTL ? overflow : -overflow;
        };

        const anim = gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 400, 1000)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBar) {
                gsap.set(progressBar, { scaleX: self.progress });
              }
            },
          },
        });

        return () => {
          anim.kill();
        };
      });
    }, desktopSectionRef);

    return () => {
      ctx.revert();
    };
  }, [activeLang]);

  // Watermark years for visual depth
  const yearWatermarks = ['1950', '1970', '2000', '2020', '2026'];

  return (
    <section id="milestones" className="relative w-full bg-emerald-deep border-t border-gold-antique/10 overflow-hidden">
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (≥768px): Pinned Horizontal Scroll Track with GSAP         */}
      {/* ========================================================================= */}
      <div
        ref={desktopSectionRef}
        dir={isUrdu ? 'rtl' : 'ltr'}
        className="hidden md:flex flex-col justify-between h-screen w-full relative overflow-hidden py-10"
      >
        {/* Header Block */}
        <div className="w-full max-w-7xl mx-auto px-8 z-10 flex items-end justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-antique/10 border border-gold-antique/30">
              <Sparkles className="w-3.5 h-3.5 text-chamakpatti-yellow" />
              <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
                {isUrdu ? 'باب 3 • تاریخی سفرنامَہ' : 'CHAPTER 3 • HISTORICAL CHRONICLE'}
              </span>
            </div>
            <h2 className={`text-4xl lg:text-5xl font-bold text-cream-archival ${isUrdu ? 'font-urdu text-5xl leading-tight' : 'font-serif'}`}>
              {content.title}
            </h2>
            {content.subtitle && (
              <p className={`text-base text-cream-archival/70 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Interactive Scroll Indicator Hint */}
          <div className="hidden lg:flex items-center gap-3 text-gold-antique/60 text-xs font-mono tracking-wider uppercase bg-emerald-vibrant/30 px-4 py-2 rounded-full border border-gold-antique/20 backdrop-blur-sm">
            <span>{isUrdu ? 'تاریخ کا سفر جاری رکھنے کے لیے نیچے اسکرول کریں' : 'Scroll down to navigate timeline'}</span>
            <ArrowRight className={`w-4 h-4 text-chamakpatti-yellow animate-pulse ${isUrdu ? 'rotate-180' : ''}`} />
          </div>
        </div>

        {/* Timeline Axis Line (Background Decorative Line) */}
        <div className="absolute top-[52%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-antique/30 to-transparent pointer-events-none z-0" />

        {/* Track Container translated along X-axis */}
        <div className="w-full overflow-hidden z-10 my-auto py-6">
          <div
            ref={trackRef}
            className="flex flex-row items-stretch gap-8 px-12 lg:px-24 w-max"
          >
            {content.timeline.map((item, idx) => (
              <div
                key={idx}
                className={`group relative w-[440px] lg:w-[480px] shrink-0 flex flex-col justify-between p-8 rounded-2xl bg-emerald-vibrant/30 border border-gold-antique/20 backdrop-blur-md transition-all duration-300 hover:border-gold-antique/60 hover:shadow-[0_0_30px_rgba(197,168,128,0.15)] hover:-translate-y-1 ${isUrdu ? 'text-right' : 'text-left'}`}
              >
                {/* Large Background Watermark Year */}
                <span className={`absolute bottom-2 text-7xl font-bold font-mono text-gold-antique/5 select-none pointer-events-none group-hover:text-gold-antique/10 transition-colors duration-300 ${isUrdu ? 'left-4' : 'right-4'}`}>
                  {yearWatermarks[idx] || item.era.slice(0, 4)}
                </span>

                {/* Node connector dot on top line */}
                <div className={`absolute -top-3 ${isUrdu ? 'right-10' : 'left-10'} w-6 h-6 rounded-full bg-emerald-deep border-2 border-gold-antique flex items-center justify-center group-hover:scale-125 group-hover:border-chamakpatti-yellow transition-all duration-300`}>
                  <div className="w-2 h-2 rounded-full bg-chamakpatti-yellow group-hover:animate-ping" />
                </div>

                {/* Card Top: Era Pill & Counter */}
                <div className="flex items-center justify-between mb-6 z-10">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-deep/80 text-chamakpatti-yellow font-bold border border-gold-antique/40 shadow-inner">
                    <Calendar className="w-3.5 h-3.5 text-gold-antique" />
                    {item.era}
                  </span>
                  <span className="font-mono text-xs text-gold-antique/50 font-semibold tracking-wider">
                    0{idx + 1} / 0{content.timeline.length}
                  </span>
                </div>

                {/* Card Body */}
                <div className="space-y-3 z-10">
                  <h3 className={`text-2xl font-bold text-cream-archival group-hover:text-gold-antique transition-colors duration-300 ${isUrdu ? 'font-urdu text-3xl' : 'font-serif'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm text-cream-archival/80 leading-relaxed ${isUrdu ? 'font-urdu text-base leading-loose' : 'font-sans'}`}>
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Accent Line */}
                <div className="mt-6 pt-4 border-t border-gold-antique/10 flex items-center justify-between text-xs font-mono text-gold-antique/40 z-10">
                  <span>PAKISTAN @ 79</span>
                  <span className="group-hover:text-chamakpatti-yellow transition-colors duration-300">● HISTORICAL MOMENT</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pinned Progress Bar */}
        <div className="w-full max-w-7xl mx-auto px-8 z-10 flex flex-col gap-2">
          <div className="w-full h-1 bg-emerald-vibrant/60 rounded-full overflow-hidden border border-gold-antique/10">
            <div
              ref={progressBarRef}
              style={{ transformOrigin: isUrdu ? 'right' : 'left' }}
              className="h-full w-full bg-gradient-to-r from-gold-antique via-chamakpatti-yellow to-gold-antique transform scale-x-0 transition-transform duration-75"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-gold-antique/50 tracking-widest uppercase">
            <span>{isUrdu ? '1947 آغاز' : '1947 FOUNDATION'}</span>
            <span>{isUrdu ? 'یادگار سفرنامہ' : 'COMMEMORATIVE CHRONICLE'}</span>
            <span>{isUrdu ? '2026 مستقبل' : '2026 FUTURE'}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (<768px): Vertical Stacked Timeline (No Scroll-Jacking)     */}
      {/* ========================================================================= */}
      <div dir={isUrdu ? 'rtl' : 'ltr'} className="block md:hidden py-16 px-4 w-full relative">
        {/* Mobile Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-antique/10 border border-gold-antique/30">
            <Sparkles className="w-3.5 h-3.5 text-chamakpatti-yellow" />
            <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
              {isUrdu ? 'باب 3 • تاریخی سفرنامَہ' : 'CHAPTER 3 • HISTORICAL CHRONICLE'}
            </span>
          </div>
          <h2 className={`text-3xl font-bold text-cream-archival ${isUrdu ? 'font-urdu text-4xl leading-tight' : 'font-serif'}`}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className={`text-xs text-cream-archival/70 px-4 ${isUrdu ? 'font-urdu text-sm' : 'font-sans'}`}>
              {content.subtitle}
            </p>
          )}
        </div>

        {/* Mobile Timeline Container with vertical axis line */}
        <div className={`relative max-w-md mx-auto space-y-8 ${isUrdu ? 'pr-6 border-r-2' : 'pl-6 border-l-2'} border-gold-antique/30`}>
          {content.timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isUrdu ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative p-6 rounded-xl bg-emerald-vibrant/30 border border-gold-antique/20 backdrop-blur-sm space-y-3 ${isUrdu ? 'text-right' : 'text-left'}`}
            >
              {/* Vertical Timeline Node Marker */}
              <div className={`absolute ${isUrdu ? '-right-[31px]' : '-left-[31px]'} top-6 w-4 h-4 rounded-full bg-emerald-deep border-2 border-gold-antique flex items-center justify-center`}>
                <div className="w-1.5 h-1.5 rounded-full bg-chamakpatti-yellow" />
              </div>

              {/* Era Pill & Counter */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 font-mono text-xs px-2.5 py-1 rounded bg-emerald-deep text-chamakpatti-yellow font-bold border border-gold-antique/30">
                  <Calendar className="w-3 h-3 text-gold-antique" />
                  {item.era}
                </span>
                <span className="font-mono text-[10px] text-gold-antique/50 font-bold">
                  0{idx + 1} / 0{content.timeline.length}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className={`text-xl font-bold text-cream-archival ${isUrdu ? 'font-urdu text-2xl' : 'font-serif'}`}>
                {item.title}
              </h3>
              <p className={`text-xs text-cream-archival/80 leading-relaxed ${isUrdu ? 'font-urdu text-sm leading-relaxed' : 'font-sans'}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
