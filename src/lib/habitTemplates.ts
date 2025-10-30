import { HabitTemplate } from './types';

// 기본 제공 습관 템플릿 라이브러리
export const habitTemplates: HabitTemplate[] = [
  // 수분 섭취
  {
    id: 'water-2l',
    name: '물 2L 마시기',
    category: 'water',
    description: '하루에 충분한 수분을 섭취하여 신진대사를 활성화하고 노폐물을 배출합니다.',
    tips: [
      '500ml 물병 4개로 목표 달성하기',
      '기상 직후 물 한 잔부터 시작',
      '식사 30분 전 물 마시는 습관',
      '텀블러를 항상 가지고 다니기'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['수분', '건강', '신진대사'],
  },
  {
    id: 'water-morning',
    name: '아침 공복에 물 한 잔',
    category: 'water',
    description: '기상 직후 미지근한 물 한 잔으로 신진대사를 깨우고 장 활동을 촉진합니다.',
    tips: [
      '침대 옆 물병 준비해두기',
      '미지근한 물이 가장 효과적',
      '레몬 조각 추가로 비타민C 보충'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['수분', '아침', '신진대사'],
  },

  // 운동
  {
    id: 'walk-10min',
    name: '10분 걷기',
    category: 'exercise',
    description: '가벼운 유산소 운동으로 혈액순환을 개선하고 심폐기능을 강화합니다.',
    tips: [
      '점심시간 10분 활용하기',
      '계단 이용하기',
      '한 정거장 먼저 내려서 걷기',
      '전화 통화하면서 걷기'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['운동', '유산소', '건강'],
  },
  {
    id: 'walk-30min',
    name: '30분 빠르게 걷기',
    category: 'exercise',
    description: '빠른 걸음으로 심박수를 올려 효과적인 유산소 운동을 합니다.',
    tips: [
      '팔을 크게 흔들며 걷기',
      '보폭을 평소보다 10cm 늘리기',
      '음악 들으며 리듬 맞춰 걷기',
      '공원이나 트랙에서 걷기'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'weekly', days: 5 },
    tags: ['운동', '유산소', '체력'],
  },
  {
    id: 'stretch-morning',
    name: '아침 스트레칭 5분',
    category: 'exercise',
    description: '기상 후 간단한 스트레칭으로 몸을 깨우고 유연성을 키웁니다.',
    tips: [
      '침대에서 바로 시작하기',
      '목→어깨→허리→다리 순서로',
      '천천히 호흡하며 스트레칭',
      '통증 느끼지 않는 범위에서'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['운동', '스트레칭', '유연성'],
  },
  {
    id: 'squat-20',
    name: '스쿼트 20개',
    category: 'exercise',
    description: '하체 근력을 강화하고 기초대사량을 높입니다.',
    tips: [
      '발을 어깨너비로 벌리기',
      '무릎이 발끝을 넘지 않게',
      '엉덩이를 뒤로 빼며 앉기',
      '10개씩 2세트로 나누기'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'weekly', days: 3 },
    tags: ['운동', '근력', '하체'],
  },

  // 영양
  {
    id: 'breakfast-lowgi',
    name: '저혈당 아침식사',
    category: 'nutrition',
    description: '혈당을 천천히 올리는 아침 식사로 하루 에너지를 안정적으로 유지합니다.',
    tips: [
      '통곡물+단백질+채소 조합',
      '흰 빵 대신 통밀빵 선택',
      '과일은 식사 후에 소량',
      '천천히 씹어먹기 (20번 이상)'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'daily' },
    tags: ['영양', '혈당', '아침'],
  },
  {
    id: 'vegetable-3serving',
    name: '채소 3접시 먹기',
    category: 'nutrition',
    description: '다양한 색깔의 채소로 항산화 성분과 식이섬유를 충분히 섭취합니다.',
    tips: [
      '빨강, 초록, 노랑 다양한 색깔',
      '생채소와 익힌 채소 섞어서',
      '식사 때마다 1접시씩',
      '냉장고에 손질한 채소 준비'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'daily' },
    tags: ['영양', '채소', '항산화'],
  },
  {
    id: 'protein-every-meal',
    name: '매 끼 단백질 섭취',
    category: 'nutrition',
    description: '근육량 유지와 포만감을 위해 매 끼니 충분한 단백질을 섭취합니다.',
    tips: [
      '손바닥 크기만큼의 단백질',
      '계란, 두부, 닭가슴살, 생선 등',
      '식물성+동물성 단백질 골고루',
      '간식으로 견과류나 그릭요거트'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'daily' },
    tags: ['영양', '단백질', '근육'],
  },

  // 수면
  {
    id: 'sleep-11pm',
    name: '11시 전 잠자리',
    category: 'sleep',
    description: '충분한 수면 시간을 확보하고 성장호르몬 분비를 최적화합니다.',
    tips: [
      '10시부터 잠잘 준비 시작',
      '침실 조명 어둡게 하기',
      '스마트폰 침실 밖에 두기',
      '매일 같은 시간에 자기'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'daily' },
    tags: ['수면', '휴식', '호르몬'],
  },
  {
    id: 'sleep-7hours',
    name: '7시간 이상 숙면',
    category: 'sleep',
    description: '최소 7시간의 양질의 수면으로 신체 회복과 면역력을 강화합니다.',
    tips: [
      '취침 2시간 전 저녁 식사',
      '침실 온도 18-20도 유지',
      '암막커튼으로 빛 차단',
      '낮잠은 20분 이내로'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'daily' },
    tags: ['수면', '회복', '면역력'],
  },
  {
    id: 'sleep-routine',
    name: '수면 루틴 지키기',
    category: 'sleep',
    description: '일정한 수면 패턴으로 생체리듬을 안정시킵니다.',
    tips: [
      '취침 1시간 전 책 읽기',
      '따뜻한 물로 샤워하기',
      '스트레칭이나 명상',
      '주말에도 같은 시간에'
    ],
    difficulty: 'medium',
    recommendedFrequency: { type: 'daily' },
    tags: ['수면', '루틴', '생체리듬'],
  },

  // 스트레스 관리
  {
    id: 'meditation-5min',
    name: '명상 5분',
    category: 'stress',
    description: '짧은 명상으로 마음을 진정시키고 스트레스를 해소합니다.',
    tips: [
      '편안한 자세로 앉기',
      '호흡에만 집중하기',
      '생각이 떠올라도 괜찮아요',
      '명상 앱 활용하기 (Calm, Headspace)'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['명상', '스트레스', '마음'],
  },
  {
    id: 'breathing-exercise',
    name: '심호흡 운동',
    category: 'stress',
    description: '깊은 호흡으로 자율신경을 안정시키고 긴장을 풀어줍니다.',
    tips: [
      '4초 들이마시기',
      '7초 참기',
      '8초 내쉬기',
      '5회 반복하기'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['호흡', '스트레스', '이완'],
  },
  {
    id: 'gratitude-journal',
    name: '감사일기 쓰기',
    category: 'stress',
    description: '하루의 감사한 일 3가지를 적으며 긍정적 마인드를 키웁니다.',
    tips: [
      '아무리 작은 일이라도 괜찮아요',
      '매일 같은 시간에 쓰기',
      '구체적으로 표현하기',
      '손글씨로 쓰면 더 효과적'
    ],
    difficulty: 'easy',
    recommendedFrequency: { type: 'daily' },
    tags: ['감사', '긍정', '마음'],
  },
  {
    id: 'digital-detox',
    name: '디지털 디톡스 1시간',
    category: 'stress',
    description: '스마트폰과 전자기기를 멀리하고 뇌를 휴식시킵니다.',
    tips: [
      '식사 시간에는 폰 보지 않기',
      '취침 1시간 전 스크린 끄기',
      '알림 최소화하기',
      '대신 책 읽기나 산책하기'
    ],
    difficulty: 'hard',
    recommendedFrequency: { type: 'daily' },
    tags: ['디지털', '휴식', '집중력'],
  },
];

// 카테고리별 필터링
export const getTemplatesByCategory = (category: string) => {
  return habitTemplates.filter(template => template.category === category);
};

// 난이도별 필터링
export const getTemplatesByDifficulty = (difficulty: string) => {
  return habitTemplates.filter(template => template.difficulty === difficulty);
};

// 태그별 검색
export const searchTemplatesByTag = (tag: string) => {
  return habitTemplates.filter(template =>
    template.tags.some(t => t.includes(tag))
  );
};

// 텍스트 검색
export const searchTemplates = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return habitTemplates.filter(template =>
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
