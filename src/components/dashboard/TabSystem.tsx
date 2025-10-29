'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type TabType = 'daily' | 'weekly' | 'monthly';

interface Tab {
  id: TabType;
  label: string;
}

interface TabSystemProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: Tab[] = [
  { id: 'daily', label: '일간' },
  { id: 'weekly', label: '주간' },
  { id: 'monthly', label: '월간' },
];

export default function TabSystem({ activeTab, onTabChange }: TabSystemProps) {
  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary-500 rounded-md"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
