'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import GenesisChapter from '@/components/sections/GenesisChapter';
import TapestryChapter from '@/components/sections/TapestryChapter';
import MilestonesChapter from '@/components/sections/MilestonesChapter';
import BadgeCreatorChapter from '@/components/sections/BadgeCreatorChapter';

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-deep text-cream-archival selection:bg-gold-antique selection:text-emerald-deep">
      <Navbar />
      <main>
        <Hero />
        <GenesisChapter />
        <TapestryChapter />
        <MilestonesChapter />
        <BadgeCreatorChapter />
      </main>
      <Footer />
    </div>
  );
}
