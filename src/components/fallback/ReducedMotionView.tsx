'use client';

import React from 'react';

interface ReducedMotionViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ReducedMotionView({ children, className = '' }: ReducedMotionViewProps) {
  return (
    <div className={`motion-reduce:transition-none motion-reduce:transform-none ${className}`}>
      {children}
    </div>
  );
}
