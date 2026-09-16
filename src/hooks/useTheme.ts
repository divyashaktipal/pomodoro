import { useColorScheme } from 'react-native';
import { COLORS } from '@/constants/colors';
import { useThemeStore } from '@/store/useThemeStore';

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const { mode, setMode, toggleTheme } = useThemeStore();

  const isDark =
    mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark') || (!mode && true);

  const colors = isDark ? COLORS.dark : COLORS.light;

  return {
    isDark,
    colors,
    mode,
    setMode,
    toggleTheme,
  };
}
