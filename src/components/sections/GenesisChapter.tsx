'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Radio, Play, RotateCcw, Volume2, Sparkles } from 'lucide-react';

export default function GenesisChapter() {
  const { t, language } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const tributeText: string = t('genesis.tributeText');
  const words = tributeText.split(' ');

  // Web Audio API synthesized ambient broadcast tone
  const playGeneratedTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // Soft A3 warm tone
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 3); // Warm slide to A4
      
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 3.5);
    } catch {
      // Audio context fallback if blocked by browser policy
    }
  };

  const handleTriggerBroadcast = () => {
    setIsPlaying(true);
    setKey((prev) => prev + 1);
    playGeneratedTone();
  };

  // Auto-start animation on scroll / mount
  useEffect(() => {
    setIsPlaying(true);
  }, [language]);

  return (
    <section
      id="genesis"
      className="relative py-24 px-4 sm:px-6 border-t border-gold-antique/20 bg-emerald-deep/95 overflow-hidden"
      aria-label="Chapter 1: The Genesis 1947"
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-gold-antique/40" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-gold-antique/20" />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-antique/10 border border-gold-antique/30">
            <Radio className="w-3.5 h-3.5 text-chamakpatti-yellow animate-pulse" />
            <span className="font-mono text-xs text-gold-antique tracking-widest uppercase font-semibold">
              CHAPTER 1 • {t('genesis.dateLabel')}
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-bold text-cream-archival ${
              language === 'ur' ? 'font-urdu leading-relaxed' : 'font-serif'
            }`}
          >
            {language === 'ur' ? 'آغازِ آزادی — 1947' : 'The Genesis (1947)'}
          </h2>
        </div>

        {/* Vintage Broadcast Archive Box */}
        <div className="relative rounded-2xl bg-emerald-vibrant/25 border-2 border-gold-antique/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Corner Ornamental Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-antique/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-antique/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-antique/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-antique/60" />

          {/* Broadcast Header & Waveform Equalizer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gold-antique/20 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-chamakpatti-yellow animate-ping" />
              <span className="font-mono text-xs tracking-wider text-gold-antique font-medium uppercase">
                COMMEMORATIVE TRANSMISSION • 14 AUG 1947
              </span>
            </div>

            {/* Live SVG Equalizer Waveform */}
            <div className="flex items-end gap-1 h-6 px-3 py-1 rounded bg-emerald-deep/60 border border-gold-antique/30">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 50, 85, 60].map((height, i) => (
                <motion.span
                  key={i}
                  className="w-1 bg-gold-antique rounded-full"
                  animate={
                    isPlaying
                      ? {
                          height: [`${height * 0.2}%`, `${height}%`, `${height * 0.3}%`],
                        }
                      : { height: '20%' }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + (i % 4) * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Animated Typographic Reveal */}
          <div className="min-h-[160px] sm:min-h-[180px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`text-2xl sm:text-3xl md:text-4xl text-cream-archival leading-relaxed ${
                  language === 'ur'
                    ? 'font-urdu text-3xl sm:text-4xl md:text-5xl leading-[1.9]'
                    : 'font-serif italic'
                }`}
              >
                &ldquo;
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                &rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Action Trigger & Accessibility Caption Footer */}
          <div className="pt-8 mt-8 border-t border-gold-antique/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleTriggerBroadcast}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-vibrant hover:bg-gold-antique text-cream-archival hover:text-emerald-deep border border-gold-antique/40 text-xs font-mono font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-md"
              aria-label="Replay commemorative announcement reveal"
            >
              {isPlaying ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{language === 'ur' ? 'پیغام دوبارہ سنیں/دیکھیں' : 'REPLAY BROADCAST MOMENT'}</span>
              <Volume2 className="w-3.5 h-3.5 text-chamakpatti-yellow ml-1" />
            </button>

            {/* Accessibility Caption */}
            <p
              className="text-xs font-mono text-cream-archival/70 text-center sm:text-right max-w-sm"
              role="note"
            >
              <Sparkles className="w-3 h-3 text-gold-antique inline mr-1" />
              {t('genesis.caption')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
