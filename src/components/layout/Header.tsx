'use client';

import React from 'react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 items-center px-4">
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
      </div>
    </header>
  );
}
