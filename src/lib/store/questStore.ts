import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ActiveQuestState, CompletedStep, Quest, QuestStep } from '../types';

interface QuestStore {
  activeQuest: Quest | null;
  activeSteps: QuestStep[];
  activeState: ActiveQuestState | null;
  _hasHydrated: boolean;

  setActiveQuest: (quest: Quest, steps: QuestStep[], userId: string) => void;
  advanceStep: () => void;
  completeStep: (step: CompletedStep) => void;
  clearActiveQuest: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useQuestStore = create<QuestStore>()(
  persist(
    (set) => ({
      activeQuest: null,
      activeSteps: [],
      activeState: null,
      _hasHydrated: false,

      setHasHydrated: (v) => set({ _hasHydrated: v }),

      setActiveQuest: (quest, steps, userId) =>
        set({
          activeQuest: quest,
          activeSteps: steps,
          activeState: {
            questId: quest.id,
            userId,
            startedAt: new Date().toISOString(),
            currentStepIndex: 0,
            completedSteps: [],
            totalPointsEarned: 0,
            status: 'in_progress',
          },
        }),

      advanceStep: () =>
        set((s) => {
          if (!s.activeState) return s;
          const next = s.activeState.currentStepIndex + 1;
          return {
            activeState: {
              ...s.activeState,
              currentStepIndex: next,
              status: next >= s.activeSteps.length ? 'completed' : 'in_progress',
            },
          };
        }),

      completeStep: (completed) =>
        set((s) => {
          if (!s.activeState) return s;
          return {
            activeState: {
              ...s.activeState,
              completedSteps: [...s.activeState.completedSteps, completed],
              totalPointsEarned: s.activeState.totalPointsEarned + completed.pointsEarned,
            },
          };
        }),

      clearActiveQuest: () =>
        set({ activeQuest: null, activeSteps: [], activeState: null }),
    }),
    {
      name: 'staq-quest-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
