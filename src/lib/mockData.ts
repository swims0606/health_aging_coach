import { UserStats, WeeklyDataPoint, MonthlyDataPoint, Achievement, HabitProgress } from './types';

export const mockUserStats: UserStats = {
  currentStreak: 12,
  totalDays: 45,
  habitsCompletedToday: 4,
  habitsTotalToday: 6,
  weeklyCompletion: 85,
  monthlyCompletion: 78,
  level: '습관 마스터',
  nextMilestone: '연속 21일',
  daysToMilestone: 9,
};

export const weeklyData: WeeklyDataPoint[] = [
  { day: '월', completion: 83 },
  { day: '화', completion: 100 },
  { day: '수', completion: 67 },
  { day: '목', completion: 100 },
  { day: '금', completion: 83 },
  { day: '토', completion: 100 },
  { day: '일', completion: 67 },
];

export const monthlyData: MonthlyDataPoint[] = [
  { week: '1주차', completion: 75 },
  { week: '2주차', completion: 82 },
  { week: '3주차', completion: 68 },
  { week: '4주차', completion: 88 },
];

export const recentAchievements: Achievement[] = [
  {
    id: '1',
    title: '7일 연속 달성!',
    date: '3일 전',
    icon: '🔥',
  },
  {
    id: '2',
    title: '물 2L 목표 달성',
    date: '5일 전',
    icon: '💧',
  },
  {
    id: '3',
    title: '첫 주간 100% 완료',
    date: '1주 전',
    icon: '⭐',
  },
];

export const habitProgressData: HabitProgress[] = [
  { id: '1', name: '물 2L 마시기', completion: 100, streak: 12 },
  { id: '2', name: '10분 걷기', completion: 86, streak: 9 },
  { id: '3', name: '저혈당 아침식사', completion: 71, streak: 5 },
  { id: '4', name: '11시 전 잠자리', completion: 57, streak: 4 },
  { id: '5', name: '명상 5분', completion: 43, streak: 3 },
];

export const motivationalQuotes = [
  '작은 습관이 큰 변화를 만듭니다',
  '오늘도 한 걸음 더 가까워졌습니다',
  '일관성이 가장 강력한 도구입니다',
  '당신은 이미 변화하고 있습니다',
  '매일의 선택이 미래를 만듭니다',
];
