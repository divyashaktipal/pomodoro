import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TIMER_DEFAULTS } from '@/constants/defaults';
import { zustandStorage } from '@/services/storageService';
import { TimerSettings } from '../types/settings.types';

interface SettingsState extends TimerSettings {
  updateSettings: (settings: Partial<TimerSettings>) => void;
  resetToDefaults: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      focusDuration: TIMER_DEFAULTS.focusDuration,
      shortBreakDuration: TIMER_DEFAULTS.shortBreakDuration,
      longBreakDuration: TIMER_DEFAULTS.longBreakDuration,
      longBreakInterval: TIMER_DEFAULTS.longBreakInterval,
      autoStartBreaks: TIMER_DEFAULTS.autoStartBreaks,
      autoStartPomodoros: TIMER_DEFAULTS.autoStartPomodoros,
      soundEnabled: TIMER_DEFAULTS.soundEnabled,
      hapticsEnabled: TIMER_DEFAULTS.hapticsEnabled,
      soundVolume: TIMER_DEFAULTS.soundVolume,

      updateSettings: (newSettings) =>
        set((state) => ({ ...state, ...newSettings })),

      resetToDefaults: () =>
        set({
          focusDuration: TIMER_DEFAULTS.focusDuration,
          shortBreakDuration: TIMER_DEFAULTS.shortBreakDuration,
          longBreakDuration: TIMER_DEFAULTS.longBreakDuration,
          longBreakInterval: TIMER_DEFAULTS.longBreakInterval,
          autoStartBreaks: TIMER_DEFAULTS.autoStartBreaks,
          autoStartPomodoros: TIMER_DEFAULTS.autoStartPomodoros,
          soundEnabled: TIMER_DEFAULTS.soundEnabled,
          hapticsEnabled: TIMER_DEFAULTS.hapticsEnabled,
          soundVolume: TIMER_DEFAULTS.soundVolume,
        }),
    }),
    {
      name: 'pomodoro-settings-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
