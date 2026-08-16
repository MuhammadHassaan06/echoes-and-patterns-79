'use client';

import React from 'react';

interface WebGLFallbackProps {
  className?: string;
}

export default function WebGLFallback({ className = '' }: WebGLFallbackProps) {
  return (
    <div
      role="img"
      aria-label="Pakistan 79th Independence Day Crescent Landmark WebGL Static Backdrop Visual"
      className={`w-full h-full min-h-[300px] flex items-center justify-center relative overflow-hidden bg-gradient-radial from-emerald-vibrant/40 via-emerald-deep to-emerald-deep rounded-3xl border border-gold-antique/20 shadow-2xl ${className}`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gold-antique/5 blur-3xl pointer-events-none" />

      {/* Ornate Static Crescent & Star Vector Motif */}
      <div className="relative z-10 text-center space-y-4">
        <svg
          className="w-32 h-32 md:w-48 md:h-48 mx-auto text-chamakpatti-yellow filter drop-shadow-[0_0_20px_rgba(243,198,35,0.4)]"
          viewBox="0 0 100 100"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* Crescent */}
          <path d="M50 10 A40 40 0 1 0 90 50 A32 32 0 1 1 50 10 Z" />
          {/* 5-Pointed Star */}
          <polygon points="68,32 73,42 84,42 75,48 78,59 68,52 58,59 61,48 52,42 63,42" />
        </svg>

        <div className="space-y-1">
          <span className="text-xs font-mono tracking-widest text-gold-antique uppercase block">
            1947 — 2026 • 79 YEARS
          </span>
          <p className="text-sm font-serif text-cream-archival/80">
            Pakistan Independence Day Keepsake
          </p>
        </div>
      </div>
    </div>
  );
}
