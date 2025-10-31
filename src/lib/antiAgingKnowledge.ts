/**
 * 저속노화 전문지식 데이터베이스
 * Anti-Aging Knowledge Database
 */

export interface KnowledgePrinciple {
  principles: string[];
  source: string;
  tags: string[];
}

export interface AntiAgingKnowledge {
  nutrition: {
    [key: string]: KnowledgePrinciple;
  };
  exercise: {
    [key: string]: KnowledgePrinciple;
  };
  sleep: {
    [key: string]: KnowledgePrinciple;
  };
  stress: {
    [key: string]: KnowledgePrinciple;
  };
  water: {
    [key: string]: KnowledgePrinciple;
  };
}

export const antiAgingKnowledge: AntiAgingKnowledge = {
  nutrition: {
    bloodSugar: {
      principles: [
        '아침 식사의 혈당 스파이크는 하루 종일 대사에 영향을 미칩니다',
        '섬유질, 단백질, 건강한 지방의 조합이 혈당을 안정화시킵니다',
        '식사 순서(섬유질 → 단백질 → 탄수화물)가 혈당 반응을 조절합니다',
        '혈당 급등은 인슐린 저항성과 노화를 가속화합니다',
      ],
      source: '정희원, 《저속노화 식사법》, 2024',
      tags: ['혈당관리', '식사순서', '대사건강'],
    },
    intermittentFasting: {
      principles: [
        '16:8 간헐적 단식은 오토파지를 활성화시킵니다',
        '공복 시간이 길수록 세포 재생이 활발해집니다',
        '마지막 식사 후 12-16시간의 공복이 이상적입니다',
        '간헐적 단식은 염증 수치를 낮추고 장수 유전자를 활성화합니다',
      ],
      source: 'Dr. Valter Longo, 《The Longevity Diet》',
      tags: ['간헐적단식', '오토파지', '세포재생'],
    },
    protein: {
      principles: [
        '체중 1kg당 1-1.2g의 단백질 섭취가 근육 유지에 필수적입니다',
        '식사마다 20-30g의 단백질 분산 섭취가 효과적입니다',
        '동물성과 식물성 단백질의 균형이 중요합니다',
        '단백질은 포만감을 높이고 근감소증을 예방합니다',
      ],
      source: 'American Journal of Clinical Nutrition',
      tags: ['단백질', '근육유지', '영양균형'],
    },
    antioxidants: {
      principles: [
        '컬러풀한 채소와 과일은 항산화 물질이 풍부합니다',
        '베리류, 녹차, 다크 초콜릿은 강력한 항산화 식품입니다',
        '항산화 물질은 세포 손상과 노화를 방지합니다',
        '하루 7-9가지 색깔의 채소를 섭취하는 것이 이상적입니다',
      ],
      source: 'Harvard Health Publishing',
      tags: ['항산화', '채소', '노화방지'],
    },
  },

  exercise: {
    resistance: {
      principles: [
        '30세 이후 연간 3-8%의 근육량이 감소합니다',
        '주 2-3회 저항 운동이 근감소증을 예방합니다',
        '큰 근육군을 우선적으로 운동하는 것이 효과적입니다',
        '근력 운동은 골밀도 증가와 대사율 향상에 필수적입니다',
      ],
      source: 'American College of Sports Medicine Guidelines',
      tags: ['근력운동', '근감소증예방', '골밀도'],
    },
    cardio: {
      principles: [
        '유산소 운동은 심혈관 건강과 장수에 직결됩니다',
        '주 150분의 중강도 또는 75분의 고강도 운동이 권장됩니다',
        'HIIT(고강도 인터벌 트레이닝)는 미토콘드리아 기능을 향상시킵니다',
        '걷기만으로도 사망률을 30% 감소시킬 수 있습니다',
      ],
      source: 'WHO Physical Activity Guidelines',
      tags: ['유산소운동', '심혈관건강', 'HIIT'],
    },
    consistency: {
      principles: [
        '운동의 일관성이 강도보다 중요합니다',
        '하루 10분의 운동도 누적 효과가 있습니다',
        '규칙적인 신체 활동은 노화 관련 질병을 50% 이상 예방합니다',
        '앉아있는 시간을 줄이는 것만으로도 건강 효과가 큽니다',
      ],
      source: 'British Journal of Sports Medicine',
      tags: ['운동습관', '일관성', '건강수명'],
    },
  },

  sleep: {
    circadianRhythm: {
      principles: [
        '일정한 수면 시간이 생체 리듬을 안정화시킵니다',
        '밤 10시-새벽 2시 사이의 숙면이 성장호르몬 분비에 중요합니다',
        '아침 햇빛 노출은 멜라토닌 리듬을 조절합니다',
        '불규칙한 수면은 대사 장애와 면역력 저하를 유발합니다',
      ],
      source: 'Matthew Walker, 《Why We Sleep》',
      tags: ['생체리듬', '수면시간', '멜라토닌'],
    },
    sleepQuality: {
      principles: [
        '7-9시간의 수면이 성인에게 이상적입니다',
        '수면 부족은 치매 위험을 높이고 노화를 가속화합니다',
        '깊은 수면 단계에서 뇌의 노폐물이 제거됩니다',
        '수면의 질이 양보다 중요합니다',
      ],
      source: 'National Sleep Foundation',
      tags: ['수면시간', '수면의질', '뇌건강'],
    },
    blueLight: {
      principles: [
        '블루라이트는 멜라토닌 분비를 억제합니다',
        '잠들기 2-3시간 전부터 스크린 시간을 줄여야 합니다',
        '침실은 어둡고 시원하게 유지하는 것이 좋습니다',
        '오렌지색 조명은 수면에 방해가 되지 않습니다',
      ],
      source: 'Harvard Health Publishing, Sleep Medicine Reviews',
      tags: ['블루라이트', '멜라토닌', '수면환경'],
    },
  },

  stress: {
    chronic: {
      principles: [
        '만성 스트레스는 텔로미어를 단축시켜 노화를 가속화합니다',
        '코르티솔 수치가 높으면 복부 비만과 염증이 증가합니다',
        '스트레스 관리는 면역 체계 강화에 필수적입니다',
        '하루 10-20분의 명상이 스트레스 호르몬을 낮춥니다',
      ],
      source: 'Dr. Elissa Epel, 《The Telomere Effect》',
      tags: ['만성스트레스', '텔로미어', '코르티솔'],
    },
    mindfulness: {
      principles: [
        '마음챙김은 뇌의 회백질 밀도를 증가시킵니다',
        '규칙적인 명상은 혈압과 심박수를 낮춥니다',
        '호흡 조절만으로도 부교감신경을 활성화할 수 있습니다',
        '감사 일기는 정신 건강과 수면의 질을 향상시킵니다',
      ],
      source: 'Journal of Neuroscience',
      tags: ['마음챙김', '명상', '호흡조절'],
    },
  },

  water: {
    hydration: {
      principles: [
        '체중의 2% 수분 손실만으로도 인지 기능이 저하됩니다',
        '하루 2-3L의 물 섭취가 권장됩니다',
        '아침 공복에 물 한 잔은 대사를 활성화합니다',
        '충분한 수분은 피부 탄력과 노폐물 배출에 필수적입니다',
      ],
      source: 'European Journal of Clinical Nutrition',
      tags: ['수분섭취', '대사활성화', '피부건강'],
    },
    timing: {
      principles: [
        '식사 30분 전 물 섭취는 포만감을 높입니다',
        '운동 전후 충분한 수분 보충이 중요합니다',
        '카페인 음료 섭취 시 물을 함께 마셔야 합니다',
        '수분 섭취는 하루 종일 고르게 분산하는 것이 좋습니다',
      ],
      source: 'Journal of Human Nutrition and Dietetics',
      tags: ['수분타이밍', '운동수분', '식사수분'],
    },
  },
};

/**
 * 특정 카테고리의 지식 가져오기
 */
export const getKnowledgeByCategory = (
  category: keyof AntiAgingKnowledge,
  topic?: string
): KnowledgePrinciple | KnowledgePrinciple[] => {
  if (topic && antiAgingKnowledge[category][topic]) {
    return antiAgingKnowledge[category][topic];
  }
  return Object.values(antiAgingKnowledge[category]);
};

/**
 * 태그로 지식 검색
 */
export const searchKnowledgeByTag = (tag: string): KnowledgePrinciple[] => {
  const results: KnowledgePrinciple[] = [];

  Object.values(antiAgingKnowledge).forEach((category) => {
    Object.values(category).forEach((knowledge) => {
      const kp = knowledge as KnowledgePrinciple;
      if (kp.tags.some((t) => t.includes(tag))) {
        results.push(kp);
      }
    });
  });

  return results;
};
