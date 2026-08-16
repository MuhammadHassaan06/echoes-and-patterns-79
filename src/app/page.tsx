'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import GenesisChapter from '@/components/sections/GenesisChapter';
import SectionSkeleton from '@/components/ui/SectionSkeleton';

// Lazy-load heavy interactive canvas and GSAP section components (Blueprint Section 7)
const TapestryChapter = dynamic(
  () => import('@/components/sections/TapestryChapter'),
  {
    ssr: false,
    loading: () => <SectionSkeleton title="CHAPTER 2 • THE LIVING TAPESTRY" />,
  }
);

const MilestonesChapter = dynamic(
  () => import('@/components/sections/MilestonesChapter'),
  {
    ssr: false,
    loading: () => <SectionSkeleton title="CHAPTER 3 • MILESTONES OF 79 YEARS" />,
  }
);

const BadgeCreatorChapter = dynamic(
  () => import('@/components/sections/BadgeCreatorChapter'),
  {
    ssr: false,
    loading: () => <SectionSkeleton title="CHAPTER 4 • DIGITAL KEEPSAKE" />,
  }
);

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
