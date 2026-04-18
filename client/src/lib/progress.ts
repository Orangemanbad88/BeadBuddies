const STORAGE_KEY = "tied-together:progress:v1";
const CHANGE_EVENT = "tied-together:progress-change";

export type TutorialProgress = {
  stepsDone: number[];
  materialsDone: number[];
  completedAt: string | null;
  startedAt: string;
};

export type ProgressState = {
  tutorials: Record<string, TutorialProgress>;
  favorites: string[];
};

const empty: ProgressState = { tutorials: {}, favorites: [] };

const read = (): ProgressState => {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      tutorials: parsed.tutorials ?? {},
      favorites: parsed.favorites ?? [],
    };
  } catch {
    return empty;
  }
};

const write = (next: ProgressState) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
};

const ensureTutorial = (state: ProgressState, id: string): ProgressState => {
  if (state.tutorials[id]) return state;
  return {
    ...state,
    tutorials: {
      ...state.tutorials,
      [id]: {
        stepsDone: [],
        materialsDone: [],
        completedAt: null,
        startedAt: new Date().toISOString(),
      },
    },
  };
};

export const getState = (): ProgressState => read();

export const getTutorialProgress = (id: string): TutorialProgress | null => {
  return read().tutorials[id] ?? null;
};

export const toggleStep = (id: string, stepIdx: number, totalSteps: number) => {
  const state = ensureTutorial(read(), id);
  const current = state.tutorials[id];
  const has = current.stepsDone.includes(stepIdx);
  const stepsDone = has
    ? current.stepsDone.filter((i) => i !== stepIdx)
    : [...current.stepsDone, stepIdx].sort((a, b) => a - b);
  const completedAt =
    stepsDone.length === totalSteps ? new Date().toISOString() : null;
  write({
    ...state,
    tutorials: {
      ...state.tutorials,
      [id]: { ...current, stepsDone, completedAt },
    },
  });
};

export const toggleMaterial = (id: string, idx: number) => {
  const state = ensureTutorial(read(), id);
  const current = state.tutorials[id];
  const has = current.materialsDone.includes(idx);
  const materialsDone = has
    ? current.materialsDone.filter((i) => i !== idx)
    : [...current.materialsDone, idx];
  write({
    ...state,
    tutorials: {
      ...state.tutorials,
      [id]: { ...current, materialsDone },
    },
  });
};

export const resetTutorial = (id: string) => {
  const state = read();
  const { [id]: _, ...rest } = state.tutorials;
  write({ ...state, tutorials: rest });
};

export const toggleFavorite = (galleryId: string) => {
  const state = read();
  const has = state.favorites.includes(galleryId);
  const favorites = has
    ? state.favorites.filter((f) => f !== galleryId)
    : [...state.favorites, galleryId];
  write({ ...state, favorites });
};

export const isFavorite = (galleryId: string): boolean => {
  return read().favorites.includes(galleryId);
};

export const getCompletedTutorialIds = (): string[] => {
  const state = read();
  return Object.entries(state.tutorials)
    .filter(([, p]) => p.completedAt)
    .map(([id]) => id);
};

export const getInProgressTutorialIds = (): string[] => {
  const state = read();
  return Object.entries(state.tutorials)
    .filter(([, p]) => !p.completedAt && p.stepsDone.length > 0)
    .map(([id]) => id);
};

export const subscribe = (listener: () => void): (() => void) => {
  if (typeof window === "undefined") return () => {};
  const handler = () => listener();
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
};
