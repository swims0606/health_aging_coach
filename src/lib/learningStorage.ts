import { LearningProgress } from './types';

const STORAGE_KEY = 'healthy-aging-learning-progress';

// Save learning progress to localStorage
export const saveLearningProgress = (progress: LearningProgress[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save learning progress:', error);
  }
};

// Load learning progress from localStorage
export const loadLearningProgress = (): LearningProgress[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const progress = JSON.parse(stored);
    return progress.map((p: any) => ({
      ...p,
      completedAt: p.completedAt ? new Date(p.completedAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to load learning progress:', error);
    return [];
  }
};

// Get progress for specific content
export const getContentProgress = (
  contentId: string,
  progressList: LearningProgress[]
): LearningProgress | undefined => {
  return progressList.find((p) => p.contentId === contentId);
};

// Check if content is completed
export const isContentCompleted = (
  contentId: string,
  progressList: LearningProgress[]
): boolean => {
  const progress = getContentProgress(contentId, progressList);
  return progress ? (progress.watchedVideo || progress.readText) : false;
};

// Update or create progress
export const updateProgress = (
  contentId: string,
  updates: Partial<LearningProgress>,
  progressList: LearningProgress[]
): LearningProgress[] => {
  const existingIndex = progressList.findIndex((p) => p.contentId === contentId);

  if (existingIndex >= 0) {
    // Update existing
    const updated = [...progressList];
    updated[existingIndex] = {
      ...updated[existingIndex],
      ...updates,
    };
    return updated;
  } else {
    // Create new
    return [
      ...progressList,
      {
        contentId,
        watchedVideo: false,
        readText: false,
        timeSpent: 0,
        ...updates,
      },
    ];
  }
};
