/**
 * AI 코치 메시지 생성 엔진
 * AI Coach Message Generation Engine
 */

import { Habit, HabitCompletion } from './types';
import type {
  AICoachMessage,
  AICoachMessageType,
  TimeOfDay,
  UserProfile,
} from './types';
import { antiAgingKnowledge } from './antiAgingKnowledge';

/**
 * 현재 시간대 판단
 */
export const getTimeOfDay = (hour: number): TimeOfDay => {
  if (hour >= 6 && hour < 10) return 'morning';
  if (hour >= 10 && hour < 14) return 'lunch';
  if (hour >= 14 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
};

/**
 * 사용자 프로필 생성
 */
export const buildUserProfile = (
  habits: Habit[],
  completions: HabitCompletion[]
): UserProfile => {
  const today = new Date().toISOString().split('T')[0];
  const last7Days = getLast7Days();

  // 완료된 습관
  const completedHabits = habits
    .filter((h) => h.completedToday)
    .map((h) => h.id);

  // 어려움을 겪는 습관 (최근 7일 중 50% 미만 완료)
  const strugglingHabits = habits
    .filter((habit) => {
      const recentCompletions = completions.filter(
        (c) =>
          c.habitId === habit.id &&
          last7Days.includes(c.date)
      );
      const completionRate = recentCompletions.length / 7;
      return completionRate < 0.5 && habit.isActive !== false;
    })
    .map((h) => h.id);

  // 현재 스트릭
  const activeHabits = habits.filter((h) => h.isActive !== false);
  const currentStreak =
    activeHabits.length > 0
      ? Math.max(...activeHabits.map((h) => h.streak))
      : 0;

  // 최장 스트릭 (현재는 현재 스트릭과 동일하게 처리)
  const longestStreak =
    activeHabits.length > 0
      ? Math.max(...activeHabits.map((h) => h.streak))
      : 0;

  // 총 완료 횟수
  const totalCompletions = habits.reduce(
    (sum, h) => sum + h.totalCompletions,
    0
  );

  return {
    completedHabits,
    strugglingHabits,
    preferredMealTimes: ['12:00', '18:00'],
    sleepPattern: {
      bedtime: '23:00',
      wakeup: '07:00',
    },
    activityLevel: 'moderate',
    healthGoals: ['저속노화', '건강한 습관', '장수'],
    currentStreak,
    longestStreak,
    totalCompletions,
  };
};

/**
 * 최근 7일 날짜 배열 생성
 */
const getLast7Days = (): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

/**
 * 오늘 완료한 습관 ID 가져오기
 */
const getTodayCompletedHabits = (habits: Habit[]): string[] => {
  return habits
    .filter((h) => h.completedToday)
    .map((h) => h.id);
};

/**
 * AI 코치 메시지 생성 (메인 함수)
 */
export const generateCoachMessage = (
  habits: Habit[],
  completions: HabitCompletion[],
  currentTime: Date = new Date()
): AICoachMessage => {
  const hour = currentTime.getHours();
  const timeOfDay = getTimeOfDay(hour);
  const userProfile = buildUserProfile(habits, completions);
  const completedToday = getTodayCompletedHabits(habits);

  // 1. 시간대별 메시지 우선
  const timeBasedMessage = generateTimeBasedMessage(
    hour,
    timeOfDay,
    completedToday,
    userProfile
  );
  if (timeBasedMessage) return timeBasedMessage;

  // 2. 스트릭 기반 격려 메시지
  const encouragementMessage = generateEncouragementMessage(
    userProfile,
    timeOfDay
  );
  if (encouragementMessage) return encouragementMessage;

  // 3. 어려움을 겪는 습관에 대한 조언
  const strugglingMessage = generateStrugglingHabitMessage(
    userProfile,
    habits,
    timeOfDay
  );
  if (strugglingMessage) return strugglingMessage;

  // 4. 기본 일반 조언
  return generateDefaultMessage(timeOfDay, userProfile);
};

/**
 * 시간대별 맞춤 메시지 생성
 */
const generateTimeBasedMessage = (
  hour: number,
  timeOfDay: TimeOfDay,
  completedToday: string[],
  userProfile: UserProfile
): AICoachMessage | null => {
  // 아침 시간 (6-10시)
  if (hour >= 6 && hour < 10) {
    if (!completedToday.includes('water-morning')) {
      const knowledge = antiAgingKnowledge.water.hydration;
      return {
        id: `coach-${Date.now()}`,
        type: 'water',
        message:
          '☀️ 좋은 아침이에요! 일어나자마자 미지근한 물 한 잔으로 하루를 시작해보세요. 밤새 손실된 수분을 보충하고 대사를 깨워줍니다.',
        scientificBasis: knowledge.principles[2],
        source: knowledge.source,
        personalization: {
          habitHistory: userProfile.completedHabits,
          timeOfDay,
          recentPatterns: ['아침 수분 섭취'],
          strugglingAreas: [],
        },
        actionable: true,
        priority: 'high',
        timestamp: new Date(),
      };
    }
  }

  // 점심 시간 (11-14시)
  if (hour >= 11 && hour < 14) {
    if (!completedToday.includes('balanced-lunch')) {
      const knowledge = antiAgingKnowledge.nutrition.bloodSugar;
      return {
        id: `coach-${Date.now()}`,
        type: 'nutrition',
        message:
          '🥗 점심 시간이에요! 혈당 스파이크를 피하는 "역순 식사법"을 시도해보세요. 샐러드나 나물을 먼저, 그 다음 단백질, 마지막에 탄수화물 순으로 드세요.',
        scientificBasis: knowledge.principles[2],
        source: knowledge.source,
        personalization: {
          habitHistory: userProfile.completedHabits,
          timeOfDay,
          recentPatterns: ['혈당 관리'],
          strugglingAreas: [],
        },
        actionable: true,
        priority: 'high',
        timestamp: new Date(),
      };
    }
  }

  // 오후 시간 (14-18시)
  if (hour >= 14 && hour < 18) {
    if (!completedToday.some((id) => id.includes('exercise'))) {
      const knowledge = antiAgingKnowledge.exercise.consistency;
      return {
        id: `coach-${Date.now()}`,
        type: 'exercise',
        message:
          '🚶‍♀️ 오후는 신체 활동에 최적의 시간이에요. 10분만이라도 걷기나 스트레칭으로 몸을 움직여보세요. 작은 움직임도 누적되면 큰 효과가 있답니다!',
        scientificBasis: knowledge.principles[1],
        source: knowledge.source,
        personalization: {
          habitHistory: userProfile.completedHabits,
          timeOfDay,
          recentPatterns: ['신체활동'],
          strugglingAreas: userProfile.strugglingHabits,
        },
        actionable: true,
        priority: 'medium',
        timestamp: new Date(),
      };
    }
  }

  // 저녁 시간 (19-22시)
  if (hour >= 19 && hour < 22) {
    const knowledge = antiAgingKnowledge.sleep.blueLight;
    return {
      id: `coach-${Date.now()}`,
      type: 'sleep',
      message:
        '🌙 이 시간대부터는 카페인을 피하고, 블루라이트 노출을 줄여보세요. 멜라토닌 분비가 시작되는 시간이에요. 수면의 질을 높이려면 조명을 어둡게 하고 편안한 활동을 하세요.',
      scientificBasis: knowledge.principles[0],
      source: knowledge.source,
      personalization: {
        habitHistory: userProfile.completedHabits,
        timeOfDay,
        recentPatterns: ['수면 준비'],
        strugglingAreas: [],
      },
      actionable: true,
      priority: 'high',
      timestamp: new Date(),
    };
  }

  return null;
};

/**
 * 격려 메시지 생성 (스트릭 기반)
 */
const generateEncouragementMessage = (
  userProfile: UserProfile,
  timeOfDay: TimeOfDay
): AICoachMessage | null => {
  const { currentStreak, longestStreak, totalCompletions } = userProfile;

  // 스트릭 달성 축하
  if (currentStreak >= 7 && currentStreak % 7 === 0) {
    return {
      id: `coach-${Date.now()}`,
      type: 'encouragement',
      message: `🔥 축하합니다! ${currentStreak}일 연속 달성! 습관이 자동화되고 있어요. 이 일관성이 세포 수준에서 긍정적인 변화를 만들고 있습니다.`,
      scientificBasis:
        '일관된 습관은 신경 회로를 강화하고, 뇌의 기저핵에서 자동화되어 의지력 소모를 줄입니다.',
      source: 'Charles Duhigg, 《The Power of Habit》',
      personalization: {
        habitHistory: userProfile.completedHabits,
        timeOfDay,
        recentPatterns: [`${currentStreak}일 연속`],
        strugglingAreas: [],
      },
      actionable: false,
      priority: 'high',
      timestamp: new Date(),
    };
  }

  // 새로운 최고 기록
  if (currentStreak > longestStreak) {
    return {
      id: `coach-${Date.now()}`,
      type: 'encouragement',
      message: `🏆 신기록 달성! 지금까지의 최고 기록을 경신했어요. ${currentStreak}일 연속! 당신의 노력이 만드는 변화는 매일 세포 수준에서 일어나고 있습니다.`,
      scientificBasis:
        '규칙적인 건강 습관은 텔로미어 길이를 유지하고, 염증을 감소시키며, 미토콘드리아 기능을 향상시킵니다.',
      source: 'Dr. Elissa Epel, 《The Telomere Effect》',
      personalization: {
        habitHistory: userProfile.completedHabits,
        timeOfDay,
        recentPatterns: ['신기록'],
        strugglingAreas: [],
      },
      actionable: false,
      priority: 'high',
      timestamp: new Date(),
    };
  }

  return null;
};

/**
 * 어려움을 겪는 습관에 대한 조언
 */
const generateStrugglingHabitMessage = (
  userProfile: UserProfile,
  habits: Habit[],
  timeOfDay: TimeOfDay
): AICoachMessage | null => {
  if (userProfile.strugglingHabits.length === 0) return null;

  const strugglingHabit = habits.find(
    (h) => h.id === userProfile.strugglingHabits[0]
  );
  if (!strugglingHabit) return null;

  const category = strugglingHabit.category;
  let knowledge;
  let message;

  switch (category) {
    case 'exercise':
      knowledge = antiAgingKnowledge.exercise.consistency;
      message = `💪 ${strugglingHabit.name} 습관이 어려우셨나요? 괜찮아요. 운동은 강도보다 일관성이 중요합니다. 하루 10분만이라도 시작해보세요. 작은 성공이 쌓여 큰 변화를 만듭니다.`;
      break;
    case 'water':
      knowledge = antiAgingKnowledge.water.hydration;
      message = `💧 ${strugglingHabit.name} 잊기 쉬우시죠? 물병을 눈에 잘 띄는 곳에 두고, 핸드폰 알람을 설정해보세요. 충분한 수분은 세포 기능과 피부 건강에 필수적입니다.`;
      break;
    case 'sleep':
      knowledge = antiAgingKnowledge.sleep.circadianRhythm;
      message = `😴 ${strugglingHabit.name}이 어려우신가요? 매일 같은 시간에 자고 일어나는 것부터 시작해보세요. 일정한 생체 리듬이 수면의 질을 크게 향상시킵니다.`;
      break;
    default:
      knowledge = antiAgingKnowledge.nutrition.bloodSugar;
      message = `🍽️ ${strugglingHabit.name}을 잊지 않으려면, 기존 습관에 연결해보세요. 예를 들어 "양치 후 물 마시기" 처럼요. 습관 연결이 성공률을 높입니다.`;
  }

  return {
    id: `coach-${Date.now()}`,
    type: category,
    message,
    scientificBasis: knowledge.principles[0],
    source: knowledge.source,
    personalization: {
      habitHistory: userProfile.completedHabits,
      timeOfDay,
      recentPatterns: ['어려움 겪는 습관'],
      strugglingAreas: [strugglingHabit.name],
    },
    actionable: true,
    priority: 'medium',
    timestamp: new Date(),
  };
};

/**
 * 기본 일반 조언 메시지
 */
const generateDefaultMessage = (
  timeOfDay: TimeOfDay,
  userProfile: UserProfile
): AICoachMessage => {
  const messages = [
    {
      type: 'nutrition' as AICoachMessageType,
      message:
        '🥗 다양한 색깔의 채소를 드셨나요? 컬러풀한 채소는 항산화 물질이 풍부해 노화를 늦춥니다. 하루 7-9가지 색깔을 목표로 해보세요!',
      knowledge: antiAgingKnowledge.nutrition.antioxidants,
    },
    {
      type: 'exercise' as AICoachMessageType,
      message:
        '💪 근력 운동하셨나요? 30세 이후 근육은 매년 감소합니다. 주 2-3회 저항 운동으로 근감소증을 예방하세요.',
      knowledge: antiAgingKnowledge.exercise.resistance,
    },
    {
      type: 'stress' as AICoachMessageType,
      message:
        '🧘‍♀️ 오늘 10분만 명상해보세요. 만성 스트레스는 텔로미어를 단축시켜 노화를 가속화합니다. 마음챙김이 세포 노화를 늦춥니다.',
      knowledge: antiAgingKnowledge.stress.mindfulness,
    },
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return {
    id: `coach-${Date.now()}`,
    type: randomMessage.type,
    message: randomMessage.message,
    scientificBasis: randomMessage.knowledge.principles[0],
    source: randomMessage.knowledge.source,
    personalization: {
      habitHistory: userProfile.completedHabits,
      timeOfDay,
      recentPatterns: [],
      strugglingAreas: userProfile.strugglingHabits,
    },
    actionable: true,
    priority: 'low',
    timestamp: new Date(),
  };
};

/**
 * AI 코치 메시지 저장
 */
export const saveCoachMessage = (message: AICoachMessage): void => {
  try {
    const stored = localStorage.getItem('ai_coach_messages');
    const messages: AICoachMessage[] = stored ? JSON.parse(stored) : [];
    messages.unshift(message);
    // 최대 50개까지만 저장
    const limited = messages.slice(0, 50);
    localStorage.setItem('ai_coach_messages', JSON.stringify(limited));
  } catch (error) {
    console.error('Failed to save coach message:', error);
  }
};

/**
 * AI 코치 메시지 히스토리 불러오기
 */
export const loadCoachMessageHistory = (): AICoachMessage[] => {
  try {
    const stored = localStorage.getItem('ai_coach_messages');
    if (!stored) return [];
    const messages = JSON.parse(stored);
    // Date 객체로 변환
    return messages.map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
  } catch (error) {
    console.error('Failed to load coach messages:', error);
    return [];
  }
};

/**
 * 오늘의 메시지 가져오기
 */
export const getTodayMessage = (): AICoachMessage | null => {
  const messages = loadCoachMessageHistory();
  if (messages.length === 0) return null;

  const today = new Date().toISOString().split('T')[0];
  const todayMessage = messages.find((m) => {
    const messageDate = new Date(m.timestamp).toISOString().split('T')[0];
    return messageDate === today;
  });

  return todayMessage || null;
};
