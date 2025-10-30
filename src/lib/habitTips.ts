import { HabitTip, DynamicTip, DynamicTipContext, Habit, HabitCompletion } from './types';

// 습관별 실천 꿀팁 데이터베이스
export const habitTipsDatabase: { [habitId: string]: HabitTip[] } = {
  'water-2l': [
    {
      id: 'water-2l-tip-1',
      habitId: 'water-2l',
      category: 'getting-started',
      title: '물병 전략으로 쉽게 달성하기',
      content: '500ml 물병을 4번 채워 마시면 2L 달성! 물병에 시간대별 눈금을 그어두면 진행 상황을 한눈에 확인할 수 있습니다.',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 85,
    },
    {
      id: 'water-2l-tip-2',
      habitId: 'water-2l',
      category: 'consistency',
      title: '타이밍을 고정하세요',
      content: '기상 직후, 식사 30분 전, 운동 전후에 마시는 루틴을 만드세요. 특정 행동과 연결하면 잊지 않고 실천할 수 있습니다.',
      difficulty: 'beginner',
      timeOfDay: 'morning',
      successRate: 78,
    },
    {
      id: 'water-2l-tip-3',
      habitId: 'water-2l',
      category: 'troubleshooting',
      title: '맛없어서 못 마시겠다면',
      content: '레몬, 라임, 오이를 넣거나 따뜻한 물, 차가운 물을 번갈아 마셔보세요. 탄산수도 좋은 대안입니다.',
      difficulty: 'beginner',
      situation: '집에서',
      successRate: 72,
    },
    {
      id: 'water-2l-tip-4',
      habitId: 'water-2l',
      category: 'motivation',
      title: '수분 섭취의 놀라운 효과',
      content: '충분한 수분 섭취는 피부 탄력, 소화 기능, 두뇌 활동을 개선합니다. 2주만 실천해도 변화를 느낄 수 있습니다!',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 90,
    },
  ],

  'walk-10min': [
    {
      id: 'walk-10min-tip-1',
      habitId: 'walk-10min',
      category: 'getting-started',
      title: '시간 없을 때 활용법',
      content: '엘리베이터 대신 계단, 가까운 거리는 걸어서, 전화 통화 중 걷기를 활용하세요. 10분은 금방입니다!',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 88,
    },
    {
      id: 'walk-10min-tip-2',
      habitId: 'walk-10min',
      category: 'getting-started',
      title: '점심시간 10분 걷기',
      content: '점심 식사 후 10분만 걸어도 소화가 잘 되고 오후 졸음이 사라집니다. 동료와 함께 걸으면 더 즐겁습니다.',
      difficulty: 'beginner',
      timeOfDay: 'afternoon',
      situation: '직장에서',
      successRate: 82,
    },
    {
      id: 'walk-10min-tip-3',
      habitId: 'walk-10min',
      category: 'consistency',
      title: '날씨가 나쁠 때는?',
      content: '실내에서도 가능합니다! 쇼핑몰, 백화점, 아파트 복도 등을 활용하거나 제자리 걷기도 효과적입니다.',
      difficulty: 'intermediate',
      timeOfDay: 'anytime',
      successRate: 75,
    },
    {
      id: 'walk-10min-tip-4',
      habitId: 'walk-10min',
      category: 'motivation',
      title: '걷기의 과학적 효과',
      content: '10분 걷기만으로도 심혈관 건강이 개선되고 스트레스 호르몬이 감소합니다. 매일 10분이 10년을 바꿉니다.',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 92,
    },
  ],

  'breakfast-lowgi': [
    {
      id: 'breakfast-lowgi-tip-1',
      habitId: 'breakfast-lowgi',
      category: 'getting-started',
      title: '완벽한 조합 공식',
      content: '통곡물(현미, 통밀빵) + 단백질(계란, 두부) + 채소(샐러드, 김치) 조합이 기본입니다. 이 3가지만 챙기면 성공!',
      difficulty: 'beginner',
      timeOfDay: 'morning',
      successRate: 80,
    },
    {
      id: 'breakfast-lowgi-tip-2',
      habitId: 'breakfast-lowgi',
      category: 'getting-started',
      title: '간편한 저혈당 아침 메뉴',
      content: '계란 스크램블 + 통밀토스트, 그릭요거트 + 견과류 + 베리, 두부 샐러드 등 5분이면 준비 가능합니다.',
      difficulty: 'beginner',
      timeOfDay: 'morning',
      situation: '집에서',
      successRate: 85,
    },
    {
      id: 'breakfast-lowgi-tip-3',
      habitId: 'breakfast-lowgi',
      category: 'troubleshooting',
      title: '아침에 시간이 없다면',
      content: '전날 밤 미리 준비하세요. 오버나이트 오트밀, 삶은 계란, 손질한 채소를 냉장고에 준비해두면 아침이 편해집니다.',
      difficulty: 'intermediate',
      timeOfDay: 'evening',
      successRate: 73,
    },
    {
      id: 'breakfast-lowgi-tip-4',
      habitId: 'breakfast-lowgi',
      category: 'motivation',
      title: '아침 식사가 하루를 결정합니다',
      content: '저혈당 아침 식사는 12-16시간 동안의 신진대사를 프로그래밍합니다. 오후 간식 욕구와 저녁 과식을 예방합니다.',
      difficulty: 'beginner',
      timeOfDay: 'morning',
      successRate: 88,
    },
  ],

  'sleep-11pm': [
    {
      id: 'sleep-11pm-tip-1',
      habitId: 'sleep-11pm',
      category: 'getting-started',
      title: '역산 알람 설정하기',
      content: '11시 취침이 목표라면 10시에 "준비 시작" 알람, 10시 30분에 "침실 입장" 알람을 설정하세요.',
      difficulty: 'beginner',
      timeOfDay: 'evening',
      successRate: 77,
    },
    {
      id: 'sleep-11pm-tip-2',
      habitId: 'sleep-11pm',
      category: 'consistency',
      title: '수면 루틴 만들기',
      content: '10시부터 조명 어둡게 → 샤워 → 스트레칭 → 책 읽기 → 11시 취침. 매일 같은 루틴을 반복하면 몸이 기억합니다.',
      difficulty: 'intermediate',
      timeOfDay: 'evening',
      successRate: 82,
    },
    {
      id: 'sleep-11pm-tip-3',
      habitId: 'sleep-11pm',
      category: 'troubleshooting',
      title: '잠이 안 올 때는?',
      content: '침대에 누워 20분 이상 잠들지 못하면 일어나서 독서나 스트레칭을 하세요. 침대는 오직 잠만 자는 곳으로 학습시키세요.',
      difficulty: 'advanced',
      timeOfDay: 'evening',
      successRate: 68,
    },
    {
      id: 'sleep-11pm-tip-4',
      habitId: 'sleep-11pm',
      category: 'motivation',
      title: '밤 10시~새벽 2시 골든타임',
      content: '이 시간대에 성장호르몬과 멜라토닌이 가장 활발하게 분비됩니다. 노화 방지의 핵심은 이 시간의 수면입니다.',
      difficulty: 'beginner',
      timeOfDay: 'evening',
      successRate: 91,
    },
  ],

  'meditation-5min': [
    {
      id: 'meditation-5min-tip-1',
      habitId: 'meditation-5min',
      category: 'getting-started',
      title: '초보자를 위한 명상법',
      content: '편안하게 앉아 눈을 감고 숨만 세세요. 들숨 1, 날숨 2, 들숨 3... 10까지 세고 다시 1부터. 생각이 나도 괜찮아요.',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 79,
    },
    {
      id: 'meditation-5min-tip-2',
      habitId: 'meditation-5min',
      category: 'getting-started',
      title: '앱 활용하기',
      content: 'Calm, Headspace, 마보 같은 명상 앱의 가이드 명상을 따라하면 초보자도 쉽게 시작할 수 있습니다.',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 86,
    },
    {
      id: 'meditation-5min-tip-3',
      habitId: 'meditation-5min',
      category: 'consistency',
      title: '매일 같은 시간, 같은 장소',
      content: '아침 기상 직후나 저녁 취침 전, 항상 같은 장소에서 명상하면 습관화가 빠릅니다. 명상 쿠션이나 의자를 정해두세요.',
      difficulty: 'intermediate',
      timeOfDay: 'morning',
      successRate: 81,
    },
    {
      id: 'meditation-5min-tip-4',
      habitId: 'meditation-5min',
      category: 'motivation',
      title: '명상의 과학적 효과',
      content: '8주간의 명상은 뇌의 회백질을 증가시키고 편도체(불안 중추)를 축소시킵니다. 5분이면 충분합니다!',
      difficulty: 'beginner',
      timeOfDay: 'anytime',
      successRate: 89,
    },
  ],
};

// 동적 팁 생성 함수
export const generatePersonalizedTip = (
  habit: Habit,
  completions: HabitCompletion[]
): DynamicTip => {
  const now = new Date();
  const timeOfDay =
    now.getHours() < 12
      ? 'morning'
      : now.getHours() < 18
      ? 'afternoon'
      : 'evening';

  // 최근 7일 완료율 계산
  const last7Days = completions.slice(-7);
  const completedCount = last7Days.filter(c => c.completed).length;
  const completionRate = completedCount / 7;

  let recentPattern: 'consistent' | 'struggling' | 'improving';
  if (completionRate >= 0.7) recentPattern = 'consistent';
  else if (completionRate >= 0.4) recentPattern = 'improving';
  else recentPattern = 'struggling';

  const context: DynamicTipContext = {
    currentStreak: habit.streak,
    timeOfDay,
    recentPattern,
  };

  // 상황별 맞춤 팁 생성
  if (habit.streak === 0 && recentPattern === 'struggling') {
    return {
      message: `다시 시작하는 것이 중요해요! 오늘은 "${habit.name}"를 가볍게 시작해보세요. 작은 성공이 큰 변화를 만듭니다.`,
      type: 'encouragement',
      context,
    };
  }

  if (habit.streak >= 21) {
    return {
      message: `🎉 21일 연속 달성! "${habit.name}"이(가) 이제 자동화된 습관이 되었습니다. 뇌가 새로운 패턴을 완전히 받아들였어요!`,
      type: 'encouragement',
      context,
    };
  }

  if (habit.streak >= 7) {
    return {
      message: `일주일 연속 성공! "${habit.name}" 습관이 자리잡기 시작했어요. 이제 조금씩 강도를 높여볼까요?`,
      type: 'encouragement',
      context,
    };
  }

  if (habit.streak >= 3) {
    return {
      message: `3일 연속 성공! 이제 리듬이 생기고 있어요. "${habit.name}" 실천이 점점 쉬워질 거예요.`,
      type: 'encouragement',
      context,
    };
  }

  if (recentPattern === 'improving') {
    return {
      message: `점점 나아지고 있어요! 최근 "${habit.name}" 실천율이 상승 중입니다. 이 흐름을 유지해보세요.`,
      type: 'personal',
      context,
    };
  }

  if (timeOfDay === 'morning') {
    return {
      message: `좋은 아침이에요! 오늘도 "${habit.name}"(으)로 하루를 시작해보세요. 아침 습관이 하루를 결정합니다.`,
      type: 'practical',
      context,
    };
  }

  if (timeOfDay === 'evening') {
    return {
      message: `오늘 "${habit.name}"을(를) 아직 실천하지 않으셨네요. 지금 5분만 투자하면 하루를 완벽하게 마무리할 수 있어요!`,
      type: 'practical',
      context,
    };
  }

  return {
    message: `"${habit.name}"을(를) 꾸준히 실천하면 3주 후 눈에 띄는 변화를 느낄 수 있습니다. 하루하루가 소중한 투자예요!`,
    type: 'scientific',
    context,
  };
};

// 특정 습관의 모든 팁 가져오기
export const getTipsForHabit = (habitId: string): HabitTip[] => {
  return habitTipsDatabase[habitId] || [];
};

// 카테고리별 팁 필터링
export const getTipsByCategory = (habitId: string, category: string): HabitTip[] => {
  const tips = getTipsForHabit(habitId);
  return tips.filter(tip => tip.category === category);
};

// 시간대별 적합한 팁 추천
export const getTimeBasedTip = (habitId: string): HabitTip | null => {
  const tips = getTipsForHabit(habitId);
  const now = new Date();
  const timeOfDay =
    now.getHours() < 12
      ? 'morning'
      : now.getHours() < 18
      ? 'afternoon'
      : 'evening';

  const timeTips = tips.filter(
    tip => tip.timeOfDay === timeOfDay || tip.timeOfDay === 'anytime'
  );

  if (timeTips.length === 0) return null;
  return timeTips[Math.floor(Math.random() * timeTips.length)];
};

// 랜덤 팁 가져오기
export const getRandomTip = (habitId: string): HabitTip | null => {
  const tips = getTipsForHabit(habitId);
  if (tips.length === 0) return null;
  return tips[Math.floor(Math.random() * tips.length)];
};

// 오늘의 팁 (모든 활성 습관 중)
export const getDailyTip = (activeHabits: Habit[]): HabitTip | null => {
  if (activeHabits.length === 0) return null;

  // 랜덤 습관 선택
  const randomHabit = activeHabits[Math.floor(Math.random() * activeHabits.length)];

  // 해당 습관의 시간대별 팁 가져오기
  return getTimeBasedTip(randomHabit.id) || getRandomTip(randomHabit.id);
};
