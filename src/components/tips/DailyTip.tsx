'use client';

import React, { useEffect, useState } from 'react';
import { HabitTip, Habit } from '@/lib/types';
import { getDailyTip } from '@/lib/habitTips';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyTipProps {
  habits: Habit[];
}

export default function DailyTip({ habits }: DailyTipProps) {
  const [tip, setTip] = useState<HabitTip | null>(null);

  const loadTip = () => {
    const dailyTip = getDailyTip(habits);
    setTip(dailyTip);
  };

  useEffect(() => {
    loadTip();
  }, [habits]);

  if (!tip) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        marginBottom: '24px',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div style={{
            background: 'linear-gradient(135deg, #6EC1E4, #A8E6CF)',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-sm" style={{ color: '#374151', letterSpacing: '0.3px' }}>
            오늘의 꿀팁
          </h3>
        </div>
        <button
          onClick={loadTip}
          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
          style={{ color: '#9ca3af' }}
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div>
        <h4 className="font-medium text-sm mb-2" style={{ color: '#374151' }}>
          {tip.title}
        </h4>
        <p className="text-sm leading-relaxed" style={{ color: '#6b7280', fontWeight: 300 }}>
          {tip.content}
        </p>
      </div>
    </motion.div>
  );
}
