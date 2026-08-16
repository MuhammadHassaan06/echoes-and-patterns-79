'use client';

import React from 'react';

interface SectionSkeletonProps {
  title?: string;
}

export default function SectionSkeleton({ title = 'Loading Chapter...' }: SectionSkeletonProps) {
  return (
    <div className="py-24 px-6 border-t border-gold-antique/10 bg-emerald-deep flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div className="w-12 h-12 rounded-full border-2 border-gold-antique/20 border-t-gold-antique animate-spin" />
      <span className="font-mono text-xs text-gold-antique/70 uppercase tracking-widest animate-pulse">
        {title}
      </span>
    </div>
  );
}
