'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import HabitCard from '@/components/habits/HabitCard';
import CategoryFilter from '@/components/habits/CategoryFilter';
import BonusRewardModal from '@/components/habits/BonusRewardModal';
import CelebrationModal from '@/components/habits/CelebrationModal';
import HabitCalendarView from '@/components/calendar/HabitCalendarView';
import HabitLibraryModal from '@/components/habit-management/HabitLibraryModal';
import TipCard from '@/components/tips/TipCard';
import DailyTip from '@/components/tips/DailyTip';
import TouchableButton from '@/components/native-ui/TouchableButton';
import { Habit, HabitCompletion, HabitCategory, HabitTemplate } from '@/lib/types';
import {
  loadHabits,
  saveHabits,
  loadCompletions,
  saveCompletions,
  getTodayString,
  isHabitCompletedToday,
  calculateStreak,
  generateBonusReward,
  createHabitFromTemplate,
} from '@/lib/habitStorage';
import { initializeDefaultHabits } from '@/lib/habitUtils';
import { getTipsForHabit } from '@/lib/habitTips';
import { Sparkles, Plus, Calendar, Lightbulb } from 'lucide-react';

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory | 'all'>('all');
  const [bonusReward, setBonusReward] = useState({ isOpen: false, points: 0, message: '' });
  const [celebration, setCelebration] = useState({ isOpen: false, milestone: 0, habitName: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHabitForCalendar, setSelectedHabitForCalendar] = useState<Habit | null>(null);
  const [showHabitLibrary, setShowHabitLibrary] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [selectedHabitForTips, setSelectedHabitForTips] = useState<Habit | null>(null);

  // Load data on mount
  useEffect(() => {
    const loadedHabits = loadHabits();
    const loadedCompletions = loadCompletions();

    if (loadedHabits.length === 0) {
      // Initialize with default habits
      const defaultHabits = initializeDefaultHabits();
      setHabits(defaultHabits);
      saveHabits(defaultHabits);
    } else {
      // Update completedToday status
      const updatedHabits = loadedHabits.map((habit) => ({
        ...habit,
        completedToday: isHabitCompletedToday(habit.id, loadedCompletions),
        streak: calculateStreak(habit.id, loadedCompletions),
      }));
      setHabits(updatedHabits);
    }

    setCompletions(loadedCompletions);
    setIsLoading(false);
  }, []);

  // Handle adding habit from template
  const handleAddHabitFromTemplate = (template: HabitTemplate) => {
    const newHabit = createHabitFromTemplate(template);
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
    setShowHabitLibrary(false);
  };

  // Handle habit toggle
  const handleToggleHabit = (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit) return;

    const today = getTodayString();
    const isCompleted = !habit.completedToday;

    // Update completions
    let newCompletions = [...completions];
    const existingCompletionIndex = newCompletions.findIndex(
      (c) => c.habitId === habitId && c.date === today
    );

    if (existingCompletionIndex >= 0) {
      newCompletions[existingCompletionIndex] = {
        ...newCompletions[existingCompletionIndex],
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
      };
    } else {
      newCompletions.push({
        habitId,
        date: today,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
      });
    }

    const newStreak = calculateStreak(habitId, newCompletions);
    const oldStreak = habit.streak;

    // Update habits
    const updatedHabits = habits.map((h) => {
      if (h.id === habitId) {
        return {
          ...h,
          completedToday: isCompleted,
          totalCompletions: isCompleted ? h.totalCompletions + 1 : Math.max(0, h.totalCompletions - 1),
          streak: newStreak,
        };
      }
      return h;
    });

    setCompletions(newCompletions);
    setHabits(updatedHabits);
    saveCompletions(newCompletions);
    saveHabits(updatedHabits);

    // Show rewards if completing
    if (isCompleted) {
      // Check for bonus reward (20% chance)
      const bonus = generateBonusReward();
      if (bonus.hasBonus) {
        setTimeout(() => {
          setBonusReward({
            isOpen: true,
            points: bonus.points,
            message: bonus.message,
          });
        }, 500);
      }

      // Check for milestone celebration
      if (newStreak > oldStreak && [3, 7, 21].includes(newStreak)) {
        setTimeout(() => {
          setCelebration({
            isOpen: true,
            milestone: newStreak,
            habitName: habit.name,
          });
        }, bonus.hasBonus ? 3500 : 500);
      }
    }
  };

  // Filter habits by category
  const filteredHabits =
    selectedCategory === 'all'
      ? habits
      : habits.filter((habit) => habit.category === selectedCategory);

  // Calculate stats
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  if (isLoading) {
    return (
      <div>
        <Header title="습관" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              <p className="mt-4 text-gray-600">습관 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header title="습관" />
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">오늘의 진행상황</h2>
            <div className="text-2xl font-bold text-gray-900">
              {completedToday}/{totalHabits}
            </div>
          </div>
          <div>
            <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="bg-gray-900 h-2 rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{completionRate}% 완료</p>
          </div>
        </motion.div>

        {/* Daily Tip */}
        <DailyTip habits={habits.filter(h => h.isActive !== false)} />

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1">
            <TouchableButton
              onClick={() => setShowHabitLibrary(true)}
              variant="primary"
              size="lg"
              fullWidth
              icon={<Plus className="w-5 h-5" />}
            >
              습관 추가
            </TouchableButton>
          </div>
          <TouchableButton
            onClick={() => setShowTips(!showTips)}
            variant="secondary"
            size="lg"
            icon={<Lightbulb className="w-5 h-5" />}
          >
            팁
          </TouchableButton>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Habits List */}
        <div className="space-y-4 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit, index) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onCalendarClick={setSelectedHabitForCalendar}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-500">선택한 카테고리에 습관이 없습니다.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bonus Reward Modal */}
      <BonusRewardModal
        isOpen={bonusReward.isOpen}
        points={bonusReward.points}
        message={bonusReward.message}
        onClose={() => setBonusReward({ ...bonusReward, isOpen: false })}
      />

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={celebration.isOpen}
        milestone={celebration.milestone}
        habitName={celebration.habitName}
        onClose={() => setCelebration({ ...celebration, isOpen: false })}
      />

      {/* Calendar Modal */}
      <AnimatePresence>
        {selectedHabitForCalendar && (
          <HabitCalendarView
            habit={selectedHabitForCalendar}
            completions={completions.filter(c => c.habitId === selectedHabitForCalendar.id)}
            onClose={() => setSelectedHabitForCalendar(null)}
          />
        )}
      </AnimatePresence>

      {/* Habit Library Modal */}
      <AnimatePresence>
        {showHabitLibrary && (
          <HabitLibraryModal
            onClose={() => setShowHabitLibrary(false)}
            onSelectTemplate={handleAddHabitFromTemplate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
