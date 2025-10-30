import { Commitment, ImplementationIntention, HabitStack, PersonalGrowth } from './types';

// Mock Commitments
export const mockCommitments: Commitment[] = [
  {
    id: 'commit1',
    habitId: 'habit1',
    type: 'reward',
    description: '21일 연속 물 2L 마시기 성공하기',
    targetDays: 21,
    currentProgress: 12,
    reward: '새 운동복 구매',
    isActive: true,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'commit2',
    habitId: 'habit2',
    type: 'penalty',
    description: '7일 연속 운동하기',
    targetDays: 7,
    currentProgress: 5,
    penalty: '좋아하는 카페 1주일 금지',
    isActive: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'commit3',
    habitId: 'habit3',
    type: 'public_declaration',
    description: '30일 동안 저혈당 식단 유지하기',
    targetDays: 30,
    currentProgress: 18,
    isActive: true,
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
  },
];

// Mock Implementation Intentions
export const mockImplementationIntentions: ImplementationIntention[] = [
  {
    id: 'intent1',
    habitId: 'habit1',
    situation: '알람이 오전 7시에 울리면',
    action: '침대에서 일어나자마자 물 한 잔 마시기',
    location: '침실 → 부엌',
    time: '오전 7시',
    isActive: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'intent2',
    habitId: 'habit2',
    situation: '점심 식사를 마치면',
    action: '바로 10분 걷기 시작',
    location: '사무실 주변',
    time: '오후 12시 30분',
    isActive: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'intent3',
    habitId: 'habit5',
    situation: '저녁 10시가 되면',
    action: '명상 앱 켜고 5분 명상',
    location: '침실',
    time: '오후 10시',
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
];

// Mock Habit Stacks
export const mockHabitStacks: HabitStack[] = [
  {
    id: 'stack1',
    existingHabit: '양치질 후',
    newHabit: '비타민 복용',
    status: 'active',
    successDays: 12,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'stack2',
    existingHabit: '아침 식사 후',
    newHabit: '설거지하면서 스트레칭',
    status: 'active',
    successDays: 8,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'stack3',
    existingHabit: '출근 준비 완료 후',
    newHabit: '5분 명상',
    status: 'planned',
    successDays: 0,
    createdAt: new Date(),
  },
];

// Mock Personal Growth
export const mockPersonalGrowth: PersonalGrowth[] = [
  {
    id: 'growth1',
    metric: '에너지 레벨',
    beforeValue: '낮음 (3/10)',
    afterValue: '높음 (8/10)',
    improvement: '+166%',
    measurementDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'growth2',
    metric: '수면 질',
    beforeValue: '나쁨 (4/10)',
    afterValue: '좋음 (8/10)',
    improvement: '+100%',
    measurementDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'growth3',
    metric: '집중력',
    beforeValue: '보통 (5/10)',
    afterValue: '우수 (9/10)',
    improvement: '+80%',
    measurementDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'growth4',
    metric: '스트레스 관리',
    beforeValue: '나쁨 (3/10)',
    afterValue: '좋음 (7/10)',
    improvement: '+133%',
    measurementDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
];

// Habit ID to name mapping (for display purposes)
export const habitNames: Record<string, string> = {
  habit1: '물 2L 마시기',
  habit2: '10분 걷기',
  habit3: '저혈당 아침식사',
  habit4: '11시 전 잠자리',
  habit5: '명상 5분',
};
