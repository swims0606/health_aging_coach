'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { motivationalQuotes } from '@/lib/mockData';

export default function MotivationalQuote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Get a random quote on mount
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border border-gray-200 rounded-lg p-5"
    >
      <div className="flex items-start gap-3">
        <div className="bg-white rounded p-2 border border-gray-200">
          <Sparkles className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 mb-1">오늘의 동기부여</p>
          <p className="text-sm font-medium text-gray-900">{quote}</p>
        </div>
      </div>
    </motion.div>
  );
}
