import { Habit, HabitCompletion } from './types';

// Local Storage Keys
const STORAGE_KEYS = {
  HABITS: 'healthy-aging-habits',
  COMPLETIONS: 'healthy-aging-completions',
} as const;

// Get today's date in YYYY-MM-DD format
export const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Save habits to localStorage
export const saveHabits = (habits: Habit[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
  } catch (error) {
    console.error('Failed to save habits:', error);
  }
};

// Load habits from localStorage
export const loadHabits = (): Habit[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.HABITS);
    if (!stored) return [];

    const habits = JSON.parse(stored);
    // Convert date strings back to Date objects
    return habits.map((habit: any) => ({
      ...habit,
      createdAt: new Date(habit.createdAt),
    }));
  } catch (error) {
    console.error('Failed to load habits:', error);
    return [];
  }
};

// Save completions to localStorage
export const saveCompletions = (completions: HabitCompletion[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(completions));
  } catch (error) {
    console.error('Failed to save completions:', error);
  }
};

// Load completions from localStorage
export const loadCompletions = (): HabitCompletion[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPLETIONS);
    if (!stored) return [];

    const completions = JSON.parse(stored);
    // Convert date strings back to Date objects
    return completions.map((completion: any) => ({
      ...completion,
      completedAt: completion.completedAt ? new Date(completion.completedAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to load completions:', error);
    return [];
  }
};

// Check if habit is completed today
export const isHabitCompletedToday = (habitId: string, completions: HabitCompletion[]): boolean => {
  const today = getTodayString();
  return completions.some(
    (completion) => completion.habitId === habitId && completion.date === today && completion.completed
  );
};

// Calculate habit streak
export const calculateStreak = (habitId: string, completions: HabitCompletion[]): number => {
  const habitCompletions = completions
    .filter((c) => c.habitId === habitId && c.completed)
    .map((c) => c.date)
    .sort()
    .reverse();

  if (habitCompletions.length === 0) return 0;

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < habitCompletions.length; i++) {
    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    const expectedDateString = expectedDate.toISOString().split('T')[0];

    if (habitCompletions[i] === expectedDateString) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Generate bonus reward (20% chance)
export const generateBonusReward = (): { hasBonus: boolean; points: number; message: string } => {
  const random = Math.random();

  if (random < 0.2) {
    const bonusPoints = Math.floor(Math.random() * 30) + 10; // 10-40 points
    const messages = [
      '🎉 보너스 포인트!',
      '✨ 행운의 보상!',
      '🌟 특별 보너스!',
      '🎁 서프라이즈!',
    ];
    return {
      hasBonus: true,
      points: bonusPoints,
      message: messages[Math.floor(Math.random() * messages.length)],
    };
  }

  return { hasBonus: false, points: 0, message: '' };
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.HABITS);
  localStorage.removeItem(STORAGE_KEYS.COMPLETIONS);
};
