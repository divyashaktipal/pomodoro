import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

export type ChipVariant =
  | 'default'
  | 'focus'
  | 'shortBreak'
  | 'longBreak'
  | 'accent';

export interface ChipSelectorProps<T extends string | number> {
  options: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
  getLabel?: (value: T) => string;
  getKey?: (value: T) => string;
  variant?: ChipVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * 2. Generic Component in React
 * 
 * Enforces compile-time type safety across any string or number union type,
 * making selection chips fully reusable while preventing value mismatches.
 */
export function ChipSelector<T extends string | number>({
  options,
  selected,
  onSelect,
  getLabel,
  getKey,
  variant = 'default',
  style,
}: ChipSelectorProps<T>): React.ReactElement {
  const { styles } = useThemedStyles(createStyles);

  const getSelectedStyle = () => {
    switch (variant) {
      case 'focus':
        return styles.chipFocus;
      case 'shortBreak':
        return styles.chipShortBreak;
      case 'longBreak':
        return styles.chipLongBreak;
      case 'accent':
        return styles.chipAccent;
      default:
        return styles.chipDefaultSelected;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = option === selected;
        const key = getKey ? getKey(option) : String(option);
        const label = getLabel ? getLabel(option) : String(option);

        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(option)}
            activeOpacity={0.7}
            style={[
              styles.chip,
              isSelected ? getSelectedStyle() : styles.chipUnselected,
            ]}
          >
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelSelected : styles.labelUnselected,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SPACING.sm + 2,
    } as ViewStyle,
    chip: {
      paddingVertical: SPACING.sm + 2,
      paddingHorizontal: SPACING.lg,
      borderRadius: BORDER_RADIUS.md,
      borderWidth: 1,
    } as ViewStyle,
    chipUnselected: {
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
    } as ViewStyle,
    chipDefaultSelected: {
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
    } as ViewStyle,
    chipFocus: {
      backgroundColor: colors.focus,
      borderColor: colors.focus,
    } as ViewStyle,
    chipShortBreak: {
      backgroundColor: colors.shortBreak,
      borderColor: colors.shortBreak,
    } as ViewStyle,
    chipLongBreak: {
      backgroundColor: colors.longBreak,
      borderColor: colors.longBreak,
    } as ViewStyle,
    chipAccent: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    } as ViewStyle,
    label: {
      fontSize: 14,
      fontWeight: '600',
    } as TextStyle,
    labelSelected: {
      color: '#FFFFFF',
    } as TextStyle,
    labelUnselected: {
      color: colors.textPrimary,
    } as TextStyle,
  });
