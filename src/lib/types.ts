// ============================================
// AI Coach Types
// ============================================

export type AICoachMessageType =
  | 'nutrition'
  | 'exercise'
  | 'sleep'
  | 'stress'
  | 'habit'
  | 'encouragement'
  | 'water';

export type TimeOfDay = 'morning' | 'lunch' | 'afternoon' | 'evening' | 'night' | 'anytime';

export type ActivityLevel = 'low' | 'moderate' | 'high';

export interface AICoachMessage {
  id: string;
  type: AICoachMessageType;
  message: string;
  scientificBasis?: string;
  source?: string;
  personalization: {
    habitHistory: string[];
    timeOfDay: TimeOfDay;
    recentPatterns: string[];
    strugglingAreas: string[];
  };
  actionable: boolean;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface UserProfile {
  completedHabits: string[];
  strugglingHabits: string[];
  preferredMealTimes: string[];
  sleepPattern: {
    bedtime: string;
    wakeup: string;
  };
  activityLevel: ActivityLevel;
  healthGoals: string[];
  currentStreak: number;
  longestStreak: number;
  totalCompletions: number;
}

// ============================================
// User Statistics
// ============================================

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

// Habit Frequency
export type HabitFrequency =
  | { type: 'daily' }
  | { type: 'weekly'; days: number } // 주 N회
  | { type: 'specific_days'; weekdays: number[] } // [1,3,5] = 월,수,금
  | { type: 'custom'; pattern: boolean[] }; // 사용자 정의 패턴

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
  frequency?: HabitFrequency; // 반복 주기
  isDefault?: boolean; // 기본 제공 vs 사용자 생성
  isActive?: boolean;  // 현재 진행 중 여부
  createdBy?: 'system' | 'user';
  customIcon?: string;
  customColor?: string;
  tags?: string[];     // ['건강', '운동', '영양'] 등
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

// === Calendar Types ===

// Calendar Day Status
export type CalendarDayStatus = 'completed' | 'missed' | 'future' | 'rest-day';

// Calendar Day
export interface CalendarDay {
  date: Date;
  status: CalendarDayStatus;
  isToday: boolean;
}

// Habit Calendar
export interface HabitCalendar {
  habitId: string;
  month: number;
  year: number;
  completions: { [date: string]: boolean }; // "2024-01-15": true
}

// Calendar Stats
export interface CalendarStats {
  totalDays: number;
  completedDays: number;
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
}

// === Habit Template Types ===

// Habit Template
export interface HabitTemplate {
  id: string;
  name: string;
  category: HabitCategory;
  description: string;
  tips: string[];
  difficulty: HabitDifficulty;
  recommendedFrequency: HabitFrequency;
  icon?: string;
  color?: string;
  tags: string[];
}

// === Tips Types ===

// Tip Category
export type TipCategory = 'getting-started' | 'consistency' | 'motivation' | 'troubleshooting';

// Time of Day - Already defined in AI Coach Types section above
// export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'anytime';

// Tip Difficulty
export type TipDifficulty = 'beginner' | 'intermediate' | 'advanced';

// Habit Tip
export interface HabitTip {
  id: string;
  habitId: string;
  category: TipCategory;
  title: string;
  content: string;
  difficulty: TipDifficulty;
  timeOfDay?: TimeOfDay;
  situation?: string; // '집에서', '직장에서', '외출 중' 등
  successRate?: number; // 이 팁을 따른 사용자들의 성공률
}

// Dynamic Tip Type
export type DynamicTipType = 'encouragement' | 'practical' | 'scientific' | 'personal';

// User Pattern
export type UserPattern = 'consistent' | 'struggling' | 'improving';

// Dynamic Tip Context
export interface DynamicTipContext {
  currentStreak: number;
  timeOfDay: string;
  recentPattern: UserPattern;
}

// Dynamic Tip
export interface DynamicTip {
  message: string;
  type: DynamicTipType;
  context: DynamicTipContext;
}

// Habit Search Filters
export interface HabitSearchFilters {
  category?: string;
  difficulty?: string;
  frequency?: string;
  tags?: string[];
  searchQuery?: string;
}
