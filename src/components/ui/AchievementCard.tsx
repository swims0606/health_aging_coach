'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Achievement } from '@/lib/types';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export default function AchievementCard({ achievement, index }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors"
    >
      <div className="text-3xl">{achievement.icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
        <p className="text-sm text-gray-500">{achievement.date}</p>
      </div>
    </motion.div>
  );
}
