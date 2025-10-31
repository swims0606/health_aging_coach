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
  const [showAllHabits, setShowAllHabits] = useState(false);

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

  // Handle habit deletion
  const handleDeleteHabit = (habitId: string) => {
    if (window.confirm('이 습관을 삭제하시겠습니까?')) {
      const updatedHabits = habits.filter((h) => h.id !== habitId);
      const updatedCompletions = completions.filter((c) => c.habitId !== habitId);

      setHabits(updatedHabits);
      setCompletions(updatedCompletions);
      saveHabits(updatedHabits);
      saveCompletions(updatedCompletions);
    }
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

  // Limit to top 5 most recent/active habits unless "View All" is clicked
  const displayHabits = showAllHabits
    ? filteredHabits
    : filteredHabits
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5);

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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header title="습관" />
      <div
        className="container mx-auto px-4 max-w-4xl"
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingTop: '16px',
          paddingBottom: '80px',
        }}
      >
        {/* Today's Summary - Compact Design */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(to bottom, #ffffff, #f9fafb)',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#374151',
                letterSpacing: '-0.2px',
                margin: 0,
              }}
            >
              오늘의 진행상황
            </h2>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6EC1E4, #A8E6CF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {completedToday}/{totalHabits}
            </div>
          </div>
          <div>
            {/* Gradient Progress Bar - Compact */}
            <div
              className="rounded-full overflow-hidden"
              style={{
                height: '8px',
                backgroundColor: '#F8F7F4',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="h-full"
                style={{
                  background: 'linear-gradient(90deg, #6EC1E4, #A8E6CF)',
                  borderRadius: '9999px',
                }}
              />
            </div>
            <div className="flex items-center justify-between" style={{ marginTop: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#6b7280', margin: 0 }}>
                {completionRate}% 완료
              </p>
              {completionRate >= 50 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ fontSize: '14px', fontWeight: 500, color: '#6EC1E4', margin: 0 }}
                >
                  You're doing great! 🌟
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Daily Tip */}
        <DailyTip habits={habits.filter(h => h.isActive !== false)} />

        {/* Action Buttons - Compact */}
        <div className="flex gap-2" style={{ marginBottom: '12px' }}>
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

        {/* Category Filter - Compact */}
        <div style={{ marginBottom: '12px' }}>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Habits List - Compact spacing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <AnimatePresence mode="popLayout">
            {displayHabits.length > 0 ? (
              displayHabits.map((habit, index) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onCalendarClick={setSelectedHabitForCalendar}
                  onDelete={handleDeleteHabit}
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

          {/* View All Button - Compact */}
          {!showAllHabits && filteredHabits.length > 5 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowAllHabits(true)}
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '10px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                backgroundColor: '#FFFFFF',
                color: '#6B7280',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 200ms ease-in-out',
              }}
              whileHover={{ backgroundColor: '#F9FAFB' }}
              whileTap={{ scale: 0.98 }}
            >
              모든 습관 보기 ({filteredHabits.length})
            </motion.button>
          )}
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
