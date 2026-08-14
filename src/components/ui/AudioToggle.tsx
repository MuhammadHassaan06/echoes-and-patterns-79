'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-gold-antique/40 hover:bg-gold-antique/10 text-cream-archival transition-colors cursor-pointer"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-chamakpatti-yellow animate-pulse" />
          <span>AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-cream-archival/60" />
          <span>AUDIO OFF</span>
        </>
      )}
    </button>
  );
}
