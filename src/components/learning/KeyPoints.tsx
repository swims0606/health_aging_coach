'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface KeyPointsProps {
  points: string[];
}

export default function KeyPoints({ points }: KeyPointsProps) {
  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-primary-500">💡</span>
        핵심 포인트
      </h3>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-start gap-3"
          >
            <div className="bg-primary-500 rounded-full p-1 mt-0.5 flex-shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-gray-700 leading-relaxed">{point}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
