'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckCircle, School, TrendingUp } from 'lucide-react';

const navItems = [
  {
    name: '대시보드',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: '습관',
    href: '/habits',
    icon: CheckCircle,
  },
  {
    name: '학습',
    href: '/learning',
    icon: School,
  },
  {
    name: '진행상황',
    href: '/progress',
    icon: TrendingUp,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-inset-bottom">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-primary-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
