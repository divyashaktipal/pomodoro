import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { ThemeColors } from '@/constants/colors';
import { PomodoroMode, TimerStatus } from '../types/pomodoro.types';
import { SPACING } from '@/styles/spacing';

interface TimerControlsProps {
  status: TimerStatus;
  mode: PomodoroMode;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  status,
  mode,
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const { styles, colors } = useThemedStyles(createStyles);
  const { triggerSelection } = useHaptics();

  const isRunning = status === 'running';

  const handleMainButton = () => {
    triggerSelection();
    if (isRunning) {
      onPause();
    } else {
      onStart();
    }
  };

  return (
    <View style={styles.container}>
      {/* Reset button */}
      <TouchableOpacity
        onPress={onReset}
        activeOpacity={0.7}
        style={styles.secondaryButton}
      >
        <Ionicons name="refresh" size={22} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Play / Pause button */}
      <TouchableOpacity
        onPress={handleMainButton}
        activeOpacity={0.85}
        style={[styles.mainButton, styles[`mainButton_${mode}`]]}
      >
        <Ionicons
          name={isRunning ? 'pause' : 'play'}
          size={34}
          color="#FFFFFF"
          style={isRunning ? styles.pauseIcon : styles.playIcon}
        />
      </TouchableOpacity>

      {/* Skip button */}
      <TouchableOpacity
        onPress={onSkip}
        activeOpacity={0.7}
        style={styles.secondaryButton}
      >
        <Ionicons name="play-skip-forward" size={22} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.xxl,
      marginVertical: SPACING.lg,
    } as ViewStyle,
    mainButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 16,
      elevation: 8,
    } as ViewStyle,
    mainButton_focus: {
      backgroundColor: colors.focus,
      shadowColor: colors.focus,
    } as ViewStyle,
    mainButton_short_break: {
      backgroundColor: colors.shortBreak,
      shadowColor: colors.shortBreak,
    } as ViewStyle,
    mainButton_long_break: {
      backgroundColor: colors.longBreak,
      shadowColor: colors.longBreak,
    } as ViewStyle,
    playIcon: {
      marginLeft: 4,
    } as TextStyle,
    pauseIcon: {
      marginLeft: 0,
    } as TextStyle,
    secondaryButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
  });
