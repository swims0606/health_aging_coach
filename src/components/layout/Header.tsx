'use client';

import React from 'react';
import { designTokens } from '@/lib/designTokens';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottom: `1px solid ${designTokens.colors.divider}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="container flex items-center px-4"
        style={{ height: '56px' }}
      >
        <div className="flex-1">
          <h1
            style={{
              fontSize: designTokens.typography.fontSize.h2,
              fontWeight: designTokens.typography.fontWeight.semibold,
              color: designTokens.colors.text.primary,
              letterSpacing: designTokens.typography.letterSpacing.tight,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}
