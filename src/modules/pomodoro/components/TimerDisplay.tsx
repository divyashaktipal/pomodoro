import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { formatTime } from '@/utils/formatTime';
import { ThemeColors } from '@/constants/colors';
import { PomodoroMode, TimerStatus } from '../types/pomodoro.types';
import { SPACING } from '@/styles/spacing';

interface TimerDisplayProps {
  timeLeft: number;
  totalDuration: number;
  mode: PomodoroMode;
  status: TimerStatus;
  cycle: number;
  longBreakInterval: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  timeLeft,
  totalDuration,
  mode,
  status,
  cycle,
  longBreakInterval,
}) => {
  const { styles } = useThemedStyles(createStyles);
  const isRunning = status === 'running';

  const getStatusText = () => {
    if (status === 'paused') return 'PAUSED';
    switch (mode) {
      case 'focus':
        return 'STAY FOCUSED';
      case 'short_break':
        return 'SHORT BREAK';
      case 'long_break':
        return 'LONG BREAK';
    }
  };

  const progressPercent =
    totalDuration > 0 ? Math.round(((totalDuration - timeLeft) / totalDuration) * 100) : 0;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.outerRing,
          styles[`outerRing_${mode}`],
          isRunning && styles[`outerRingRunning_${mode}`],
        ]}
      >
        <View style={styles.innerCircle}>
          {/* Status Badge */}
          <View style={[styles.badge, styles[`badge_${mode}`]]}>
            <View style={[styles.pulsingDot, styles[`pulsingDot_${mode}`]]} />
            <Text style={[styles.badgeText, styles[`badgeText_${mode}`]]}>
              {getStatusText()}
            </Text>
          </View>

          {/* Time Countdown */}
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>

          {/* Progress Subtext */}
          <Text style={styles.progressText}>{progressPercent}% completed</Text>

          {/* Cycle Indicators */}
          <View style={styles.cyclesContainer}>
            {Array.from({ length: longBreakInterval }).map((_, idx) => {
              const isFilled = idx < cycle;
              return (
                <View
                  key={idx}
                  style={[
                    styles.cycleDot,
                    isFilled ? styles[`cycleDot_${mode}`] : styles.cycleDotInactive,
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: SPACING.lg + 2,
    } as ViewStyle,
    outerRing: {
      width: 290,
      height: 290,
      borderRadius: 145,
      borderWidth: 2,
      borderColor: colors.cardBorder,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,

    // Mode outer ring backgrounds & shadows
    outerRing_focus: {
      backgroundColor: colors.focusGlow,
      shadowColor: colors.focus,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 2,
    } as ViewStyle,
    outerRing_short_break: {
      backgroundColor: colors.shortBreakGlow,
      shadowColor: colors.shortBreak,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 2,
    } as ViewStyle,
    outerRing_long_break: {
      backgroundColor: colors.longBreakGlow,
      shadowColor: colors.longBreak,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 2,
    } as ViewStyle,

    // Running elevated states
    outerRingRunning_focus: {
      shadowOpacity: 0.35,
      elevation: 8,
    } as ViewStyle,
    outerRingRunning_short_break: {
      shadowOpacity: 0.35,
      elevation: 8,
    } as ViewStyle,
    outerRingRunning_long_break: {
      shadowOpacity: 0.35,
      elevation: 8,
    } as ViewStyle,

    innerCircle: {
      width: 260,
      height: 260,
      borderRadius: 130,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      padding: SPACING.lg,
    } as ViewStyle,

    // Badges
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs + 1,
      borderRadius: 20,
      borderWidth: 1,
      marginBottom: SPACING.sm + 2,
      gap: 6,
    } as ViewStyle,
    badge_focus: {
      backgroundColor: `${colors.focus}20`,
      borderColor: `${colors.focus}40`,
    } as ViewStyle,
    badge_short_break: {
      backgroundColor: `${colors.shortBreak}20`,
      borderColor: `${colors.shortBreak}40`,
    } as ViewStyle,
    badge_long_break: {
      backgroundColor: `${colors.longBreak}20`,
      borderColor: `${colors.longBreak}40`,
    } as ViewStyle,

    pulsingDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    } as ViewStyle,
    pulsingDot_focus: {
      backgroundColor: colors.focus,
    } as ViewStyle,
    pulsingDot_short_break: {
      backgroundColor: colors.shortBreak,
    } as ViewStyle,
    pulsingDot_long_break: {
      backgroundColor: colors.longBreak,
    } as ViewStyle,

    badgeText: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.8,
    } as TextStyle,
    badgeText_focus: {
      color: colors.focus,
    } as TextStyle,
    badgeText_short_break: {
      color: colors.shortBreak,
    } as TextStyle,
    badgeText_long_break: {
      color: colors.longBreak,
    } as TextStyle,

    timeText: {
      fontSize: 60,
      fontWeight: '800',
      letterSpacing: -1.5,
      fontVariant: ['tabular-nums'],
      color: colors.textPrimary,
    } as TextStyle,
    progressText: {
      fontSize: 13,
      marginTop: SPACING.xs,
      color: colors.textMuted,
    } as TextStyle,

    cyclesContainer: {
      flexDirection: 'row',
      gap: SPACING.sm,
      marginTop: SPACING.lg + 2,
    } as ViewStyle,
    cycleDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      borderWidth: 1,
    } as ViewStyle,
    cycleDot_focus: {
      backgroundColor: colors.focus,
      borderColor: colors.focus,
    } as ViewStyle,
    cycleDot_short_break: {
      backgroundColor: colors.shortBreak,
      borderColor: colors.shortBreak,
    } as ViewStyle,
    cycleDot_long_break: {
      backgroundColor: colors.longBreak,
      borderColor: colors.longBreak,
    } as ViewStyle,
    cycleDotInactive: {
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
    } as ViewStyle,
  });
