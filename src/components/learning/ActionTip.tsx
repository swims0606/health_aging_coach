'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface ActionTipProps {
  tip: string;
}

export default function ActionTip({ tip }: ActionTipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-white/20 rounded-lg p-2">
          <Zap className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold">오늘의 실천</h3>
      </div>
      <p className="text-white/95 leading-relaxed text-lg">{tip}</p>
    </motion.div>
  );
}
