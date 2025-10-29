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
