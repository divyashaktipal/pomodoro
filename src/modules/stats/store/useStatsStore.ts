import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@/services/storageService';
import { PomodoroSession } from '../types/stats.types';

interface StatsState {
  sessions: PomodoroSession[];
  logSession: (sessionData: {
    mode: PomodoroSession['mode'];
    durationSeconds: number;
    taskId?: string;
    taskTitle?: string;
  }) => void;
  clearHistory: () => void;
  getTodayFocusMinutes: () => number;
  getTotalFocusHours: () => number;
  getCurrentStreak: () => number;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set, get) => ({
      sessions: [],

      logSession: (sessionData) => {
        const newSession: PomodoroSession = {
          id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
          mode: sessionData.mode,
          durationSeconds: sessionData.durationSeconds,
          completedAt: Date.now(),
          taskId: sessionData.taskId,
          taskTitle: sessionData.taskTitle,
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
        }));
      },

      clearHistory: () => set({ sessions: [] }),

      getTodayFocusMinutes: () => {
        const now = new Date();
        const startOfToday = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ).getTime();

        const todayFocusSessions = get().sessions.filter(
          (s) => s.mode === 'focus' && s.completedAt >= startOfToday
        );

        const totalSeconds = todayFocusSessions.reduce(
          (acc, s) => acc + s.durationSeconds,
          0
        );

        return Math.round(totalSeconds / 60);
      },

      getTotalFocusHours: () => {
        const focusSessions = get().sessions.filter((s) => s.mode === 'focus');
        const totalSeconds = focusSessions.reduce(
          (acc, s) => acc + s.durationSeconds,
          0
        );
        return parseFloat((totalSeconds / 3600).toFixed(1));
      },

      getCurrentStreak: () => {
        const sessions = get().sessions.filter((s) => s.mode === 'focus');
        if (sessions.length === 0) return 0;

        // Group by distinct YYYY-MM-DD
        const sessionDays = new Set(
          sessions.map((s) => new Date(s.completedAt).toISOString().split('T')[0])
        );

        const todayStr = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // If no session today or yesterday, streak is 0
        if (!sessionDays.has(todayStr) && !sessionDays.has(yesterdayStr)) {
          return 0;
        }

        let streak = 0;
        let checkDate = sessionDays.has(todayStr) ? new Date() : yesterday;

        while (true) {
          const dateStr = checkDate.toISOString().split('T')[0];
          if (sessionDays.has(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        return streak;
      },
    }),
    {
      name: 'pomodoro-stats-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
