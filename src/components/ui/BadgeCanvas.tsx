'use client';

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { drawKeepsakeBadge, BadgeOptions } from '@/lib/canvas-utils';

export interface BadgeCanvasHandle {
  downloadImage: (filename?: string) => void;
}

interface BadgeCanvasProps extends BadgeOptions {
  width?: number;
  height?: number;
}

const BadgeCanvas = forwardRef<BadgeCanvasHandle, BadgeCanvasProps>(function BadgeCanvas(
  {
    name = '',
    wish = '',
    frameIndex = 0,
    language = 'en',
    width = 1200,
    height = 1200,
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawKeepsakeBadge(canvasRef.current, { name, wish, frameIndex, language });
    }
  }, [name, wish, frameIndex, language]);

  useImperativeHandle(ref, () => ({
    downloadImage(customName?: string) {
      if (!canvasRef.current) return;

      const link = document.createElement('a');
      const nameSlug = (customName || 'pakistan').replace(/[^a-zA-Z0-9_-]/g, '_');
      link.download = `echoes-79-badge-${nameSlug}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  }));

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
});

export default BadgeCanvas;