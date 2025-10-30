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

// Commitment Device (약속 장치)
export type CommitmentType = 'public_declaration' | 'penalty' | 'reward';

export interface Commitment {
  id: string;
  habitId: string;
  type: CommitmentType;
  description: string;
  targetDays: number;
  currentProgress: number;
  penalty?: string;
  reward?: string;
  isActive: boolean;
  createdAt: Date;
}

// Implementation Intention (실행 의도)
export interface ImplementationIntention {
  id: string;
  habitId: string;
  situation: string;    // "알람이 울리면"
  action: string;       // "바로 물 한 잔 마시기"
  location: string;     // "침실 → 부엌"
  time: string;         // "오전 7시"
  isActive: boolean;
  createdAt: Date;
}

// Habit Stacking (습관 스태킹)
export type HabitStackStatus = 'planned' | 'active' | 'completed';

export interface HabitStack {
  id: string;
  existingHabit: string;  // "양치질 후"
  newHabit: string;       // "비타민 복용"
  status: HabitStackStatus;
  successDays: number;
  createdAt: Date;
}

// Personal Growth (개인 성장)
export interface PersonalGrowth {
  id: string;
  metric: string;        // "에너지 레벨"
  beforeValue: string;   // "낮음"
  afterValue: string;    // "높음"
  improvement: string;   // "+40%"
  measurementDate: Date;
}

// Reward System
export interface RewardSystem {
  type: 'bonus_points' | 'badge' | 'message' | 'animation';
  probability: number; // 0-1
  trigger: 'daily' | 'weekly' | 'streak' | 'random';
  value: number;
  message?: string;
}
