'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Activity, Apple, Moon, Heart, Flame } from 'lucide-react';
import { Habit, HabitCategory } from '@/lib/types';
import CheckButton from './CheckButton';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  index: number;
}

const categoryIcons: Record<HabitCategory, React.ElementType> = {
  water: Droplets,
  exercise: Activity,
  nutrition: Apple,
  sleep: Moon,
  stress: Heart,
};

const categoryColors: Record<HabitCategory, { icon: string; bg: string }> = {
  water: { icon: 'text-blue-500', bg: 'bg-blue-100' },
  exercise: { icon: 'text-green-500', bg: 'bg-green-100' },
  nutrition: { icon: 'text-orange-500', bg: 'bg-orange-100' },
  sleep: { icon: 'text-purple-500', bg: 'bg-purple-100' },
  stress: { icon: 'text-pink-500', bg: 'bg-pink-100' },
};

const difficultyLabels: Record<string, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
};

export default function HabitCard({ habit, onToggle, index }: HabitCardProps) {
  const Icon = categoryIcons[habit.category];
  const colors = categoryColors[habit.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
        habit.completedToday ? 'ring-2 ring-primary-200' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`${colors.bg} rounded-lg p-3 flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{habit.name}</h3>

          <div className="flex items-center gap-3 mb-3">
            {/* Streak */}
            {habit.streak > 0 && (
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-500">
                  {habit.streak}일 연속
                </span>
              </div>
            )}

            {/* Difficulty */}
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {difficultyLabels[habit.difficulty]}
            </span>
          </div>

          {/* Progress */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>진행률</span>
              <span>{Math.round((habit.totalCompletions / habit.targetDays) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((habit.totalCompletions / habit.targetDays) * 100, 100)}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-primary-500 h-1.5 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {habit.totalCompletions}/{habit.targetDays}일 완료
            </p>
          </div>
        </div>

        {/* Check Button */}
        <CheckButton
          isCompleted={habit.completedToday}
          onToggle={() => onToggle(habit.id)}
        />
      </div>
    </motion.div>
  );
}
