'use client';

import React from 'react';

interface ReducedMotionViewProps {
  children: React.ReactNode;
}

export default function ReducedMotionView({ children }: ReducedMotionViewProps) {
  return <div className="transition-none transform-none">{children}</div>;
}
