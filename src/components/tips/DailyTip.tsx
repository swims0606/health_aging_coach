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
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gray-700" />
          <h3 className="text-gray-900 font-semibold text-sm">오늘의 꿀팁</h3>
        </div>
        <button
          onClick={loadTip}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      <div>
        <h4 className="text-gray-900 font-medium text-sm mb-1">{tip.title}</h4>
        <p className="text-gray-600 text-xs leading-relaxed">{tip.content}</p>
      </div>
    </motion.div>
  );
}
