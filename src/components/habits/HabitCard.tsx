'use client';

import React from 'react';
import { Droplets, Activity, Apple, Moon, Heart, Flame, Calendar } from 'lucide-react';
import { Habit, HabitCategory } from '@/lib/types';
import AppCard from '@/components/native-ui/AppCard';
import HabitCircle from '@/components/native-ui/HabitCircle';
import { designTokens } from '@/lib/designTokens';

interface HabitCardProps {
  habit: Habit;
  onToggle: (habitId: string) => void;
  onCalendarClick?: (habit: Habit) => void;
  index: number;
}

const categoryIcons: Record<HabitCategory, React.ElementType> = {
  water: Droplets,
  exercise: Activity,
  nutrition: Apple,
  sleep: Moon,
  stress: Heart,
};

const categoryColors: Record<HabitCategory, { icon: string; bg: string; main: string }> = {
  water: { icon: 'text-blue-500', bg: 'bg-blue-50', main: '#3b82f6' },
  exercise: { icon: 'text-green-500', bg: 'bg-green-50', main: '#22c55e' },
  nutrition: { icon: 'text-orange-500', bg: 'bg-orange-50', main: '#f97316' },
  sleep: { icon: 'text-purple-500', bg: 'bg-purple-50', main: '#a855f7' },
  stress: { icon: 'text-pink-500', bg: 'bg-pink-50', main: '#ec4899' },
};

const difficultyLabels: Record<string, string> = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
};

export default function HabitCard({ habit, onToggle, onCalendarClick, index }: HabitCardProps) {
  const Icon = categoryIcons[habit.category];
  const colors = categoryColors[habit.category];

  return (
    <AppCard
      index={index}
      padding="none"
      shadow="card"
      className={habit.completedToday ? 'ring-2 ring-primary-200' : ''}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Icon */}
        <div
          className={`${colors.bg} flex-shrink-0 flex items-center justify-center`}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: designTokens.borderRadius.lg,
          }}
        >
          <Icon className={`w-7 h-7 ${colors.icon}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{habit.name}</h3>
            {habit.streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-full">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-500">{habit.streak}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
              {difficultyLabels[habit.difficulty]}
            </span>
            {habit.tags && habit.tags.length > 0 && (
              <span className="text-xs text-gray-500">
                {habit.tags[0]}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>진행률</span>
              <span className="font-medium">
                {habit.totalCompletions}/{habit.targetDays}일
              </span>
            </div>
            <div
              className="w-full bg-gray-100 overflow-hidden"
              style={{
                height: '6px',
                borderRadius: designTokens.borderRadius.full,
              }}
            >
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${Math.min((habit.totalCompletions / habit.targetDays) * 100, 100)}%`,
                  backgroundColor: colors.main,
                  borderRadius: designTokens.borderRadius.full,
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          {/* Calendar Button */}
          {onCalendarClick && (
            <button
              onClick={() => onCalendarClick(habit)}
              className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              style={{
                minWidth: designTokens.touchTargets.minimum,
                minHeight: designTokens.touchTargets.minimum,
              }}
            >
              <Calendar className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Habit Circle Check Button */}
          <HabitCircle
            isCompleted={habit.completedToday}
            onToggle={() => onToggle(habit.id)}
            size="md"
            color={colors.main}
          />
        </div>
      </div>
    </AppCard>
  );
}
