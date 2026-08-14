'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold-antique/40 hover:border-gold-antique bg-emerald-vibrant/30 hover:bg-gold-antique/10 text-cream-archival transition-all duration-300 cursor-pointer shadow-sm"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-chamakpatti-yellow animate-pulse" />
          <span className="hidden xs:inline tracking-wider">AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-cream-archival/60" />
          <span className="hidden xs:inline tracking-wider text-cream-archival/80">AUDIO OFF</span>
        </>
      )}
    </button>
  );
}
