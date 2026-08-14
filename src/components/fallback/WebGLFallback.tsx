'use client';

import React from 'react';

export default function WebGLFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-radial from-emerald-vibrant/40 via-emerald-deep to-emerald-deep">
      <div className="w-64 h-64 rounded-full bg-emerald-vibrant/30 blur-3xl border border-gold-antique/20" />
    </div>
  );
}
