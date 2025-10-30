import { CalendarDay, CalendarDayStatus, CalendarStats, Habit, HabitCompletion } from './types';

// 날짜를 YYYY-MM-DD 형식으로 포맷
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// YYYY-MM-DD 문자열을 Date 객체로 변환
export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

// 오늘 날짜인지 확인
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// 미래 날짜인지 확인
export const isFuture = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date > today;
};

// 특정 월의 캘린더 날짜 배열 생성 (7x6 그리드)
export const generateCalendarDays = (year: number, month: number): Date[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 첫 날의 요일 (0: 일요일)
  const firstDayOfWeek = firstDay.getDay();

  // 시작일 계산 (이전 달 포함)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDayOfWeek);

  // 42일 (6주) 생성
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    days.push(date);
  }

  return days;
};

// 습관 완료 상태 맵 생성
export const createCompletionMap = (completions: HabitCompletion[]): { [date: string]: boolean } => {
  const map: { [date: string]: boolean } = {};

  completions.forEach(completion => {
    map[completion.date] = completion.completed;
  });

  return map;
};

// 날짜의 완료 상태 결정
export const getDateStatus = (
  date: Date,
  completionMap: { [date: string]: boolean },
  habit: Habit
): CalendarDayStatus => {
  const dateStr = formatDate(date);

  // 미래 날짜
  if (isFuture(date)) {
    return 'future';
  }

  // 습관 생성일 이전
  if (habit.createdAt && date < new Date(habit.createdAt)) {
    return 'future';
  }

  // 완료 여부 확인
  if (completionMap[dateStr] === true) {
    return 'completed';
  }

  // 놓친 날 (과거 + 미완료)
  if (completionMap[dateStr] === false || !completionMap[dateStr]) {
    return 'missed';
  }

  return 'missed';
};

// 캘린더 데이 객체 배열 생성
export const generateCalendarDayObjects = (
  year: number,
  month: number,
  habit: Habit,
  completions: HabitCompletion[]
): CalendarDay[] => {
  const dates = generateCalendarDays(year, month);
  const completionMap = createCompletionMap(completions);

  return dates.map(date => ({
    date,
    status: getDateStatus(date, completionMap, habit),
    isToday: isToday(date),
  }));
};

// 월간 통계 계산
export const calculateMonthlyStats = (
  year: number,
  month: number,
  habit: Habit,
  completions: HabitCompletion[]
): CalendarStats => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  // 이번 달 완료 기록만 필터링
  const monthCompletions = completions.filter(completion => {
    const date = parseDate(completion.date);
    return date >= firstDay && date <= lastDay;
  });

  // 완료된 날짜만
  const completedDays = monthCompletions.filter(c => c.completed).length;

  // 이번 달에서 오늘까지의 실제 경과일 (미래 제외)
  const endDate = lastDay > today ? today : lastDay;
  const totalDays = Math.max(
    1,
    Math.ceil((endDate.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );

  // 완료율
  const completionRate = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

  // 현재 스트릭 (전체 기록 기준)
  const currentStreak = calculateCurrentStreak(completions);

  // 최장 스트릭 (이번 달 기준)
  const longestStreak = calculateLongestStreak(monthCompletions);

  return {
    totalDays,
    completedDays,
    completionRate: Math.round(completionRate),
    currentStreak,
    longestStreak,
  };
};

// 현재 스트릭 계산 (연속 일수)
export const calculateCurrentStreak = (completions: HabitCompletion[]): number => {
  if (completions.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  let checkDate = new Date(today);

  // 오늘부터 거슬러 올라가며 확인
  while (true) {
    const dateStr = formatDate(checkDate);
    const completion = completions.find(c => c.date === dateStr);

    if (completion && completion.completed) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (checkDate.getTime() === today.getTime()) {
      // 오늘 아직 안 했으면 어제부터 확인
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // 연속 끊김
      break;
    }
  }

  return streak;
};

// 최장 스트릭 계산
export const calculateLongestStreak = (completions: HabitCompletion[]): number => {
  if (completions.length === 0) return 0;

  // 날짜순 정렬
  const sorted = [...completions]
    .filter(c => c.completed)
    .sort((a, b) => a.date.localeCompare(b.date));

  let maxStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  sorted.forEach(completion => {
    const currentDate = parseDate(completion.date);

    if (previousDate) {
      const dayDiff = Math.floor(
        (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff === 1) {
        // 연속
        currentStreak++;
      } else {
        // 끊김
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    previousDate = currentDate;
  });

  maxStreak = Math.max(maxStreak, currentStreak);
  return maxStreak;
};

// 주간 요일 이름 배열
export const getWeekDayNames = (): string[] => {
  return ['일', '월', '화', '수', '목', '금', '토'];
};

// 월 이름 가져오기
export const getMonthName = (month: number): string => {
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  return months[month];
};

// 이전 달 계산
export const getPreviousMonth = (year: number, month: number): { year: number; month: number } => {
  if (month === 0) {
    return { year: year - 1, month: 11 };
  }
  return { year, month: month - 1 };
};

// 다음 달 계산
export const getNextMonth = (year: number, month: number): { year: number; month: number } => {
  if (month === 11) {
    return { year: year + 1, month: 0 };
  }
  return { year, month: month + 1 };
};

// 특정 날짜가 현재 월에 속하는지 확인
export const isCurrentMonth = (date: Date, year: number, month: number): boolean => {
  return date.getFullYear() === year && date.getMonth() === month;
};
