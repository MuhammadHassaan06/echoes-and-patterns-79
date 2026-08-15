'use client';

import React, { useRef, useEffect } from 'react';
import { drawKeepsakeBadge, BadgeOptions } from '@/lib/canvas-utils';

interface BadgeCanvasProps extends BadgeOptions {
  width?: number;
  height?: number;
}

export default function BadgeCanvas({
  name = '',
  wish = '',
  frameIndex = 0,
  language = 'en',
  width = 600,
  height = 600,
}: BadgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawKeepsakeBadge(canvasRef.current, { name, wish, frameIndex, language });
    }
  }, [name, wish, frameIndex, language]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-gold-antique/30 shadow-2xl bg-emerald-deep max-w-[420px] w-full mx-auto aspect-square group">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
