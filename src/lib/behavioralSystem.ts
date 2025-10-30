import { RewardSystem } from './types';

// Reward Schedules (변동비 강화 스케줄)
export const rewardSchedules: RewardSystem[] = [
  {
    type: 'bonus_points',
    probability: 0.2,
    trigger: 'daily',
    value: 20,
    message: '🎉 보너스 포인트!'
  },
  {
    type: 'badge',
    probability: 0.05,
    trigger: 'weekly',
    value: 1,
    message: '🏆 주간 배지 획득!'
  },
  {
    type: 'message',
    probability: 0.15,
    trigger: 'random',
    value: 1,
    message: '✨ 대단해요!'
  },
  {
    type: 'animation',
    probability: 0.1,
    trigger: 'streak',
    value: 1,
    message: '🔥 연속 달성 보너스!'
  }
];

// Motivational Messages by Context
export const motivationalMessages = {
  achievements: [
    '🌟 작은 습관이 큰 변화를 만듭니다',
    '💫 한 걸음씩 나아가고 있습니다',
    '🎯 목표를 향해 꾸준히 전진 중입니다',
    '⭐ 매일의 노력이 쌓이고 있습니다'
  ],
  struggles: [
    '💪 어려울 때일수록 성장하고 있습니다',
    '🌱 실패는 배움의 기회입니다',
    '🔥 포기하지 마세요, 거의 다 왔습니다',
    '💎 시련이 당신을 더 강하게 만듭니다'
  ],
  progress: [
    '🚀 당신은 이미 변화하고 있습니다',
    '📈 꾸준함이 결과를 만듭니다',
    '✨ 오늘도 한 걸음 더 가까워졌습니다',
    '🎊 진전이 눈에 보이고 있습니다'
  ],
  encouragement: [
    '💎 일관성이 가장 강력한 도구입니다',
    '🌈 매일의 선택이 미래를 만듭니다',
    '🏆 당신은 할 수 있습니다',
    '⚡ 지금 이 순간이 중요합니다'
  ]
};

// Growth Metrics for Personal Growth Tracking
export const growthMetrics = [
  '에너지 레벨',
  '집중력',
  '수면 질',
  '스트레스 관리',
  '자존감',
  '생산성',
  '건강 의식',
  '기분',
  '체력',
  '동기부여'
];

// Calculate reward probability based on streak and consistency
export const calculateRewardProbability = (
  streak: number,
  consistency: number
): number => {
  // Base probability: 20%
  let probability = 0.2;

  // Increase by 5% for every 7-day streak (up to +15%)
  const streakBonus = Math.min(Math.floor(streak / 7) * 0.05, 0.15);
  probability += streakBonus;

  // Increase by up to 10% based on consistency
  const consistencyBonus = (consistency / 100) * 0.1;
  probability += consistencyBonus;

  // Cap at 50%
  return Math.min(probability, 0.5);
};

// Calculate habit difficulty adjustment based on success rate
export const adjustHabitDifficulty = (
  successRate: number,
  currentStreak: number
): 'easy' | 'medium' | 'hard' => {
  // If success rate is very high and streak is long, suggest increasing difficulty
  if (successRate >= 0.9 && currentStreak >= 14) {
    return 'hard';
  }

  // If success rate is good and streak is moderate, medium difficulty is fine
  if (successRate >= 0.7 && currentStreak >= 7) {
    return 'medium';
  }

  // Otherwise, keep it easy
  return 'easy';
};

// Get motivational message based on context
export const getMotivationalMessage = (
  context: 'achievements' | 'struggles' | 'progress' | 'encouragement'
): string => {
  const messages = motivationalMessages[context];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Generate enhanced bonus reward
export const generateEnhancedBonus = (
  streak: number,
  consistency: number
): { hasBonus: boolean; points: number; message: string; type: string } => {
  const probability = calculateRewardProbability(streak, consistency);
  const random = Math.random();

  if (random < probability) {
    const basePoints = 10 + Math.floor(streak / 3) * 5; // More points for longer streaks
    const bonusPoints = Math.floor(Math.random() * 30) + basePoints;

    return {
      hasBonus: true,
      points: bonusPoints,
      message: getMotivationalMessage('achievements'),
      type: 'enhanced'
    };
  }

  return { hasBonus: false, points: 0, message: '', type: 'none' };
};
