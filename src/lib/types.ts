// User Statistics
export interface UserStats {
  currentStreak: number;
  totalDays: number;
  habitsCompletedToday: number;
  habitsTotalToday: number;
  weeklyCompletion: number;
  monthlyCompletion: number;
  level: string;
  nextMilestone: string;
  daysToMilestone: number;
}

// Weekly Data Point
export interface WeeklyDataPoint {
  day: string;
  completion: number;
}

// Monthly Data Point
export interface MonthlyDataPoint {
  week: string;
  completion: number;
}

// Achievement
export interface Achievement {
  id: string;
  title: string;
  date: string;
  icon: string;
}

// Habit Progress
export interface HabitProgress {
  id: string;
  name: string;
  completion: number;
  streak: number;
}

// Habit Category
export type HabitCategory = 'water' | 'exercise' | 'nutrition' | 'sleep' | 'stress';

// Habit Difficulty
export type HabitDifficulty = 'easy' | 'medium' | 'hard';

// Habit
export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  streak: number;
  completedToday: boolean;
  totalCompletions: number;
  createdAt: Date;
  targetDays: number; // 3, 7, 21일 목표
}

// Habit Completion
export interface HabitCompletion {
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
  completedAt?: Date;
}

// Bonus Reward
export interface BonusReward {
  type: 'bonus_points' | 'badge' | 'message';
  value: number;
  message: string;
}

// Learning Content
export interface LearningContent {
  id: string;
  day: number;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  category: string;
  keyPoints: string[];
  actionTip: string;
  textContent: string;
  readingTime: number; // 분
  completed: boolean;
  completedAt?: Date;
}

// Learning Progress
export interface LearningProgress {
  contentId: string;
  watchedVideo: boolean;
  readText: boolean;
  completedAt?: Date;
  timeSpent: number; // 초
}
