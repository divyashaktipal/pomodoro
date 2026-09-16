import { useMemo } from 'react';
import { useTheme } from './useTheme';
import { ThemeColors } from '@/constants/colors';

/**
 * Hook to memoize StyleSheet.create() styles tied to current theme colors.
 * Prevents redundant recalculations and garbage collection churn on re-renders.
 */
export function useThemedStyles<T>(
  styleFactory: (colors: ThemeColors, isDark: boolean) => T
): { styles: T; colors: ThemeColors; isDark: boolean } {
  const { colors, isDark } = useTheme();

  const styles = useMemo(() => {
    return styleFactory(colors, isDark);
  }, [colors, isDark, styleFactory]);

  return { styles, colors, isDark };
}
