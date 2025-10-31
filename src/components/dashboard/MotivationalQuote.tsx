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
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFD3B6 0%, #fde68a 100%)',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Decorative sun icon */}
      <div className="absolute top-4 right-4 opacity-30">
        <Sparkles className="w-8 h-8 text-white" />
      </div>

      <div className="relative z-10">
        <p className="text-xs font-medium text-gray-700 mb-2 tracking-wide uppercase opacity-80">
          오늘의 동기부여
        </p>
        <p className="text-base font-normal text-gray-800 italic leading-relaxed" style={{ letterSpacing: '0.3px' }}>
          "{quote}"
        </p>
      </div>
    </motion.div>
  );
}
