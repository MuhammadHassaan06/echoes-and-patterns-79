'use client';

import React, { useState } from 'react';
import { Language } from '@/types/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import GenesisChapter from '@/components/sections/GenesisChapter';
import TapestryChapter from '@/components/sections/TapestryChapter';
import MilestonesChapter from '@/components/sections/MilestonesChapter';
import BadgeCreatorChapter from '@/components/sections/BadgeCreatorChapter';

export default function Home() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-emerald-deep text-cream-archival selection:bg-gold-antique selection:text-emerald-deep">
      <Navbar lang={lang} onLanguageChange={setLang} />
      <main>
        <Hero lang={lang} />
        <GenesisChapter lang={lang} />
        <TapestryChapter lang={lang} />
        <MilestonesChapter lang={lang} />
        <BadgeCreatorChapter lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
