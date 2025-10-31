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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(232, 230, 227, 0.5)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.03)',
      }}
    >
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 transition-all duration-300 relative"
              style={{
                color: isActive ? '#6EC1E4' : '#737373',
              }}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div
                  className="absolute top-2"
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#6EC1E4',
                  }}
                />
              )}
              <Icon
                className="h-5 w-5 transition-all duration-300"
                style={{
                  strokeWidth: isActive ? 2.5 : 2,
                }}
              />
              <span
                className="text-xs transition-all duration-300"
                style={{
                  fontWeight: isActive ? 500 : 400,
                  fontSize: '12px',
                }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
