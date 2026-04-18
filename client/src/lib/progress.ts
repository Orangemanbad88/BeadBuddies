const STORAGE_KEY = "tied-together:progress:v1";
const CHANGE_EVENT = "tied-together:progress-change";

export type TutorialProgress = {
  stepsDone: number[];
  materialsDone: number[];
  completedAt: string | null;
  startedAt: string;
};

export type Design = {
  id: string;
  name: string;
  beads: string[];
  createdAt: string;
};

export type CharacterState = {
  userName: string | null;
  introSeen: boolean;
  equippedAccessory: string | null;
  unlockedAccessories: string[];
  challengeWins: number;
  highestChallengeLevel: number;
};

export type ProgressState = {
  tutorials: Record<string, TutorialProgress>;
  favorites: string[];
  designs: Design[];
  character: CharacterState;
};

const emptyCharacter: CharacterState = {
  userName: null,
  introSeen: false,
  equippedAccessory: null,
  unlockedAccessories: [],
  challengeWins: 0,
  highestChallengeLevel: 0,
};

const empty: ProgressState = {
  tutorials: {},
  favorites: [],
  designs: [],
  character: emptyCharacter,
};

const read = (): ProgressState => {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      tutorials: parsed.tutorials ?? {},
      favorites: parsed.favorites ?? [],
      designs: parsed.designs ?? [],
      character: { ...emptyCharacter, ...(parsed.character ?? {}) },
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

const pickNextUnlock = (unlocked: string[], pool: string[]): string | null => {
  const remaining = pool.filter((a) => !unlocked.includes(a));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
};

export const toggleStep = (
  id: string,
  stepIdx: number,
  totalSteps: number,
  accessoryPool: string[] = [],
): string | null => {
  const state = ensureTutorial(read(), id);
  const current = state.tutorials[id];
  const wasComplete = Boolean(current.completedAt);
  const has = current.stepsDone.includes(stepIdx);
  const stepsDone = has
    ? current.stepsDone.filter((i) => i !== stepIdx)
    : [...current.stepsDone, stepIdx].sort((a, b) => a - b);
  const nowComplete = stepsDone.length === totalSteps;
  const completedAt = nowComplete ? new Date().toISOString() : null;

  let character = state.character;
  let awarded: string | null = null;
  if (nowComplete && !wasComplete && accessoryPool.length > 0) {
    awarded = pickNextUnlock(character.unlockedAccessories, accessoryPool);
    if (awarded) {
      character = {
        ...character,
        unlockedAccessories: [...character.unlockedAccessories, awarded],
      };
    }
  }

  write({
    ...state,
    character,
    tutorials: {
      ...state.tutorials,
      [id]: { ...current, stepsDone, completedAt },
    },
  });
  return awarded;
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

export const saveDesign = (name: string, beads: string[]): Design => {
  const state = read();
  const design: Design = {
    id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim() || "Untitled design",
    beads,
    createdAt: new Date().toISOString(),
  };
  write({ ...state, designs: [design, ...state.designs] });
  return design;
};

export const deleteDesign = (id: string) => {
  const state = read();
  write({ ...state, designs: state.designs.filter((d) => d.id !== id) });
};

export const renameDesign = (id: string, name: string) => {
  const state = read();
  write({
    ...state,
    designs: state.designs.map((d) =>
      d.id === id ? { ...d, name: name.trim() || d.name } : d
    ),
  });
};

export const setUserName = (name: string) => {
  const state = read();
  write({
    ...state,
    character: {
      ...state.character,
      userName: name.trim() || null,
      introSeen: true,
    },
  });
};

export const markIntroSeen = () => {
  const state = read();
  write({ ...state, character: { ...state.character, introSeen: true } });
};

export const equipAccessory = (accessoryId: string | null) => {
  const state = read();
  write({
    ...state,
    character: { ...state.character, equippedAccessory: accessoryId },
  });
};

export const recordChallengeWin = (
  level: number,
  accessoryPool: string[],
): string | null => {
  const state = read();
  const awarded = pickNextUnlock(
    state.character.unlockedAccessories,
    accessoryPool,
  );
  write({
    ...state,
    character: {
      ...state.character,
      challengeWins: state.character.challengeWins + 1,
      highestChallengeLevel: Math.max(
        state.character.highestChallengeLevel,
        level,
      ),
      unlockedAccessories: awarded
        ? [...state.character.unlockedAccessories, awarded]
        : state.character.unlockedAccessories,
    },
  });
  return awarded;
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
