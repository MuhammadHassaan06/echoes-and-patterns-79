'use client';

import React, { useRef, useEffect } from 'react';
import { drawKeepsakeBadge, BadgeOptions } from '@/lib/canvas-utils';

interface BadgeCanvasProps extends BadgeOptions {
  width?: number;
  height?: number;
}

export default function BadgeCanvas({
  wish,
  frameIndex = 0,
  language = 'en',
  width = 600,
  height = 600,
}: BadgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawKeepsakeBadge(canvasRef.current, { wish, frameIndex, language });
    }
  }, [wish, frameIndex, language]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gold-antique/30 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full max-w-[400px] h-auto aspect-square"
      />
    </div>
  );
}
