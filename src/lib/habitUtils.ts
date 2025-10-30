import { Habit } from './types';

export const defaultHabits: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'totalCompletions' | 'createdAt'>[] = [
  {
    name: '물 2L 마시기',
    category: 'water',
    difficulty: 'easy',
    targetDays: 21,
  },
  {
    name: '10분 걷기',
    category: 'exercise',
    difficulty: 'easy',
    targetDays: 21,
  },
  {
    name: '저혈당 아침식사',
    category: 'nutrition',
    difficulty: 'medium',
    targetDays: 21,
  },
  {
    name: '11시 전 잠자리',
    category: 'sleep',
    difficulty: 'medium',
    targetDays: 21,
  },
  {
    name: '명상 5분',
    category: 'stress',
    difficulty: 'easy',
    targetDays: 21,
  },
  {
    name: '채소 샐러드 먹기',
    category: 'nutrition',
    difficulty: 'easy',
    targetDays: 21,
  },
];

// Generate a unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create a new habit with default values
export const createHabit = (
  habitData: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'totalCompletions' | 'createdAt'>
): Habit => {
  return {
    ...habitData,
    id: generateId(),
    streak: 0,
    completedToday: false,
    totalCompletions: 0,
    createdAt: new Date(),
  };
};

// Initialize default habits
export const initializeDefaultHabits = (): Habit[] => {
  return defaultHabits.map((habit) => createHabit(habit));
};
