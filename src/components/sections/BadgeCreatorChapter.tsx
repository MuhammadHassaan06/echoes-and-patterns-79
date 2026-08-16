'use client';

import React, { useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/hooks/useTranslation';
import type { BadgeCanvasHandle } from '../ui/BadgeCanvas';
import { exportBadgeAsPNG } from '@/lib/canvas-utils';
import { sanitizeWishText } from '@/lib/word-filter';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';
import { Language } from '@/types/i18n';
import { Download, Sparkles, User, MessageSquare, Frame, ShieldCheck } from 'lucide-react';

const BadgeCanvas = dynamic(() => import('../ui/BadgeCanvas'), {
  ssr: false,
});

interface BadgeCreatorChapterProps {
  lang?: Language;
}

export default function BadgeCreatorChapter({ lang }: BadgeCreatorChapterProps = {}) {
  const badgeRef = useRef<BadgeCanvasHandle>(null);
  const { language } = useTranslation();
  const activeLang = lang ?? language;
  const isUrdu = activeLang === 'ur';

  const content = isUrdu ? ur.badge : en.badge;

  // Form State Controls
  const [nameInput, setNameInput] = useState<string>(isUrdu ? 'پاکستان کا شہری' : 'Muhammad Hassaan');
  const [selectedFrame, setSelectedFrame] = useState<number>(0);
  const [wishInput, setWishInput] = useState<string>(content.wishes[0]);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Apply client-side word filter on wish input
  const sanitizedWish = useMemo(() => sanitizeWishText(wishInput), [wishInput]);
  const sanitizedName = useMemo(() => sanitizeWishText(nameInput), [nameInput]);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      if (badgeRef.current) {
        badgeRef.current.downloadImage(sanitizedName);
      }
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to export keepsake badge:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="badge-creator"
      dir={isUrdu ? 'rtl' : 'ltr'}
      className="py-24 px-6 border-t border-gold-antique/10 bg-emerald-deep/40 relative overflow-hidden"
    >
      {/* Background Decorative Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-antique/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Chapter Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-antique/10 border border-gold-antique/30">
            <Sparkles className="w-3.5 h-3.5 text-chamakpatti-yellow animate-pulse" />
            <span className="font-mono text-xs text-gold-antique tracking-widest uppercase">
              {isUrdu ? 'باب 4 • ڈیجیٹل یادگار' : 'CHAPTER 4 • DIGITAL KEEPSAKE'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-cream-archival ${isUrdu ? 'font-urdu text-5xl leading-tight' : 'font-serif'}`}>
            {content.title}
          </h2>
          <p className={`text-base text-cream-archival/70 ${isUrdu ? 'font-urdu' : 'font-sans'}`}>
            {content.subtitle}
          </p>
        </div>

        {/* 2-Column Main Generator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Live Canvas Badge Preview (5 cols on Desktop) */}
          <div className="lg:col-span-5 space-y-4 text-center">
            <BadgeCanvas
              ref={badgeRef}
              name={sanitizedName}
              wish={sanitizedWish}
              frameIndex={selectedFrame}
              language={activeLang}
              width={600}
              height={600}
            />

            <p className="text-xs font-mono text-gold-antique/60">
              {isUrdu ? 'بیج کا براہ راست پیش نظارہ' : 'Live High-Definition Canvas Preview'}
            </p>
          </div>

          {/* Right Column: Controls Form (7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-8 bg-emerald-vibrant/20 border border-gold-antique/20 rounded-3xl p-8 backdrop-blur-xl shadow-xl">
            {/* Control 1: Name Input */}
            <div className="space-y-2">
              <label htmlFor="badge-name-input" className="text-xs font-mono text-gold-antique uppercase font-bold tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-chamakpatti-yellow" aria-hidden="true" />
                {isUrdu ? '1. اپنا نام (اردو یا انگریزی)' : '1. Your Name (English or Urdu)'}
              </label>
              <input
                id="badge-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={40}
                placeholder={isUrdu ? 'اپنا نام درج کریں...' : 'Enter your name...'}
                className={`w-full px-4 py-3 rounded-xl bg-emerald-deep/80 border border-gold-antique/30 text-cream-archival placeholder:text-cream-archival/40 focus:outline-none focus:border-gold-antique focus:ring-1 focus:ring-gold-antique transition-all ${isUrdu ? 'font-urdu text-lg' : 'font-sans text-base'
                  }`}
              />
            </div>

            {/* Control 2: Frame Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gold-antique uppercase font-bold tracking-wider flex items-center gap-2">
                <Frame className="w-4 h-4 text-chamakpatti-yellow" />
                {isUrdu ? '2. بیج کا فریم منتظب کریں' : '2. Frame Motif'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {content.frames.map((frameName, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedFrame(idx)}
                    className={`px-4 py-3 rounded-xl border text-xs font-mono font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${selectedFrame === idx
                        ? 'border-gold-antique bg-gold-antique/25 text-chamakpatti-yellow shadow-lg scale-[1.02]'
                        : 'border-gold-antique/20 bg-emerald-deep/40 text-cream-archival/70 hover:border-gold-antique/50 hover:bg-emerald-deep/70'
                      } ${isUrdu ? 'font-urdu text-sm' : ''}`}
                  >
                    <span>{frameName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: 1-Line Wish / Promise Input & Suggestion Chips */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="badge-wish-input" className="text-xs font-mono text-gold-antique uppercase font-bold tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-chamakpatti-yellow" aria-hidden="true" />
                  {isUrdu ? '3. پاکستان کے لیے اپنا عزم / دعا' : '3. Wish / Promise for Pakistan'}
                </label>
                <span className="text-[10px] font-mono text-gold-antique/50">
                  {wishInput.length}/100
                </span>
              </div>

              <input
                id="badge-wish-input"
                type="text"
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
                maxLength={100}
                placeholder={isUrdu ? 'اپنا پیغام لکھیں...' : 'Type your wish or promise...'}
                className={`w-full px-4 py-3 rounded-xl bg-emerald-deep/80 border border-gold-antique/30 text-cream-archival placeholder:text-cream-archival/40 focus:outline-none focus:border-gold-antique focus:ring-1 focus:ring-gold-antique transition-all ${isUrdu ? 'font-urdu text-base' : 'font-sans text-sm'
                  }`}
              />

              {/* Quick Suggestion Chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-gold-antique/70 block">
                  {isUrdu ? 'تجویز کردہ پیغامات:' : 'Quick Suggestions:'}
                </span>
                <div className="flex flex-col gap-2">
                  {content.wishes.map((wishText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setWishInput(wishText)}
                      className={`text-left text-xs p-2.5 rounded-lg border transition-all duration-200 ${wishInput === wishText
                          ? 'border-gold-antique/60 bg-gold-antique/15 text-chamakpatti-yellow font-bold'
                          : 'border-gold-antique/15 bg-emerald-deep/30 text-cream-archival/70 hover:border-gold-antique/40 hover:text-cream-archival'
                        } ${isUrdu ? 'font-urdu text-sm text-right' : 'font-sans'}`}
                    >
                      "{wishText}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Control 4: Download High-Res PNG Button */}
            <div className="pt-4 border-t border-gold-antique/10">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-gold-antique via-chamakpatti-yellow to-gold-antique text-emerald-deep font-bold font-mono text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-emerald-deep" />
                    <span>{isUrdu ? 'بیج ڈاؤن لوڈ ہو گیا!' : 'High-Res Badge Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-emerald-deep" />
                    <span>{isUrdu ? 'اعلیٰ معیار کی PNG ڈاؤن لوڈ کریں' : 'Download High-Res PNG'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
