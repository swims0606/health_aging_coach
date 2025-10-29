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
      className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 rounded-lg p-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium opacity-90 mb-1">오늘의 동기부여</p>
          <p className="text-lg font-semibold">{quote}</p>
        </div>
      </div>
    </motion.div>
  );
}
