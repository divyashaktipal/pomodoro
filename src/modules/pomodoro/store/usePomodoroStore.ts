import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TIMER_DEFAULTS } from '@/constants/defaults';
import { zustandStorage } from '@/services/storageService';
import { PomodoroMode, TimerStatus } from '../types/pomodoro.types';

interface PomodoroState {
  mode: PomodoroMode;
  status: TimerStatus;
  timeLeft: number; // in seconds
  totalDuration: number; // in seconds for current mode
  cycle: number; // 1 to longBreakInterval
  targetEndTime: number | null; // ms timestamp

  setMode: (mode: PomodoroMode, duration: number) => void;
  start: (targetEndTime: number) => void;
  pause: () => void;
  resume: (targetEndTime: number) => void;
  reset: (duration: number) => void;
  tick: (timeLeft: number) => void;
  setCycle: (cycle: number) => void;
  incrementCycle: (maxCycles: number) => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      mode: 'focus',
      status: 'idle',
      timeLeft: TIMER_DEFAULTS.focusDuration,
      totalDuration: TIMER_DEFAULTS.focusDuration,
      cycle: 1,
      targetEndTime: null,

      setMode: (mode, duration) =>
        set({
          mode,
          status: 'idle',
          timeLeft: duration,
          totalDuration: duration,
          targetEndTime: null,
        }),

      start: (targetEndTime) =>
        set({
          status: 'running',
          targetEndTime,
        }),

      pause: () =>
        set({
          status: 'paused',
          targetEndTime: null,
        }),

      resume: (targetEndTime) =>
        set({
          status: 'running',
          targetEndTime,
        }),

      reset: (duration) =>
        set({
          status: 'idle',
          timeLeft: duration,
          totalDuration: duration,
          targetEndTime: null,
        }),

      tick: (timeLeft) =>
        set({
          timeLeft: Math.max(0, timeLeft),
        }),

      setCycle: (cycle) => set({ cycle }),

      incrementCycle: (maxCycles) => {
        const current = get().cycle;
        const next = current >= maxCycles ? 1 : current + 1;
        set({ cycle: next });
      },
    }),
    {
      name: 'pomodoro-timer-storage',
      storage: createJSONStorage(() => zustandStorage),
      // Do not restore a running status as actively running after app kill
      partialize: (state) => ({
        mode: state.mode,
        timeLeft: state.timeLeft,
        totalDuration: state.totalDuration,
        cycle: state.cycle,
        status: state.status === 'running' ? 'paused' : state.status,
      }),
    }
  )
);
