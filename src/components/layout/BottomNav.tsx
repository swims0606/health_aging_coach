'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckCircle, School, TrendingUp } from 'lucide-react';
import { designTokens } from '@/lib/designTokens';

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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${designTokens.colors.divider}`,
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
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
              className="flex flex-col items-center justify-center gap-1 relative"
              style={{
                color: isActive
                  ? designTokens.colors.primary[500]
                  : designTokens.colors.text.tertiary,
                transition: `color ${designTokens.transitions.base} ${designTokens.transitions.easing.standard}`,
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
                    backgroundColor: designTokens.colors.primary[500],
                  }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={isActive ? 2 : 1.5}
                style={{
                  transition: `all ${designTokens.transitions.base} ${designTokens.transitions.easing.standard}`,
                }}
              />
              <span
                style={{
                  fontSize: designTokens.typography.fontSize.caption,
                  fontWeight: isActive
                    ? designTokens.typography.fontWeight.medium
                    : designTokens.typography.fontWeight.normal,
                  transition: `font-weight ${designTokens.transitions.base} ${designTokens.transitions.easing.standard}`,
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
