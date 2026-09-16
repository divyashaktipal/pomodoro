import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { PomodoroMode } from '../types/pomodoro.types';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

interface ModeSelectorProps {
  currentMode: PomodoroMode;
  onSelectMode: (mode: PomodoroMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const { styles } = useThemedStyles(createStyles);

  const modes: { key: PomodoroMode; label: string }[] = [
    { key: 'focus', label: 'Focus' },
    { key: 'short_break', label: 'Short Break' },
    { key: 'long_break', label: 'Long Break' },
  ];

  const getActivePillStyle = (mode: PomodoroMode) => {
    switch (mode) {
      case 'focus':
        return styles.pillActiveFocus;
      case 'short_break':
        return styles.pillActiveShortBreak;
      case 'long_break':
        return styles.pillActiveLongBreak;
    }
  };

  return (
    <View style={styles.container}>
      {modes.map((item) => {
        const isSelected = currentMode === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => onSelectMode(item.key)}
            activeOpacity={0.7}
            style={[
              styles.pill,
              isSelected ? getActivePillStyle(item.key) : null,
            ]}
          >
            <Text
              style={[
                styles.label,
                isSelected ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.xs,
      borderWidth: 1,
      alignSelf: 'center',
      marginBottom: SPACING.xxl,
    } as ViewStyle,
    pill: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.lg,
      borderRadius: BORDER_RADIUS.md,
    } as ViewStyle,
    pillActiveFocus: {
      backgroundColor: colors.focus,
      shadowColor: colors.focus,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,
    pillActiveShortBreak: {
      backgroundColor: colors.shortBreak,
      shadowColor: colors.shortBreak,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,
    pillActiveLongBreak: {
      backgroundColor: colors.longBreak,
      shadowColor: colors.longBreak,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,
    label: {
      fontSize: 14,
    } as TextStyle,
    labelActive: {
      color: '#FFFFFF',
      fontWeight: '700',
    } as TextStyle,
    labelInactive: {
      color: colors.textSecondary,
      fontWeight: '500',
    } as TextStyle,
  });
