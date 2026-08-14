'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import GenesisChapter from '@/components/sections/GenesisChapter';
import TapestryChapter from '@/components/sections/TapestryChapter';
import MilestonesChapter from '@/components/sections/MilestonesChapter';
import BadgeCreatorChapter from '@/components/sections/BadgeCreatorChapter';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const { language } = useTranslation();

  return (
    <div className="min-h-screen bg-emerald-deep text-cream-archival selection:bg-gold-antique selection:text-emerald-deep">
      <Navbar />
      <main>
        <Hero />
        <GenesisChapter lang={language} />
        <TapestryChapter lang={language} />
        <MilestonesChapter lang={language} />
        <BadgeCreatorChapter lang={language} />
      </main>
      <Footer lang={language} />
    </div>
  );
}
