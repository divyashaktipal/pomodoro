import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ThemeMode } from '@/constants/colors';
import { zustandStorage } from '@/services/storageService';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      setMode: (mode) => set({ mode }),
      toggleTheme: () => {
        const current = get().mode;
        set({ mode: current === 'dark' ? 'light' : 'dark' });
      },
    }),
    {
      name: 'pomodoro-theme-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
