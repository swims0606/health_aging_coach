'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Video, BookOpen } from 'lucide-react';

export type ContentTabType = 'video' | 'text';

interface ContentTabsProps {
  activeTab: ContentTabType;
  onTabChange: (tab: ContentTabType) => void;
}

export default function ContentTabs({ activeTab, onTabChange }: ContentTabsProps) {
  const tabs: { id: ContentTabType; label: string; icon: React.ElementType }[] = [
    { id: 'video', label: '영상', icon: Video },
    { id: 'text', label: '텍스트', icon: BookOpen },
  ];

  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-md transition-colors ${
              isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeContentTab"
                className="absolute inset-0 bg-primary-500 rounded-md"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
