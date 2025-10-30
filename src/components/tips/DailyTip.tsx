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
      className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-xl p-5 shadow-lg mb-6"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <h3 className="text-white font-bold">오늘의 꿀팁</h3>
        </div>
        <button
          onClick={loadTip}
          className="p-1 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
        <h4 className="text-white font-bold mb-2">{tip.title}</h4>
        <p className="text-white text-sm leading-relaxed opacity-95">{tip.content}</p>
      </div>
    </motion.div>
  );
}
