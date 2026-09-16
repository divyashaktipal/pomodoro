import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { ChipSelector } from '@/components/ChipSelector';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { useSettingsStore } from '@/modules/settings/store/useSettingsStore';
import { usePomodoroStore } from '@/modules/pomodoro/store/usePomodoroStore';
import { ThemeColors } from '@/constants/colors';
import { SPACING } from '@/styles/spacing';

export default function TimerSettingsScreen() {
  const { styles } = useThemedStyles(createStyles);
  const { triggerSelection } = useHaptics();

  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    updateSettings,
  } = useSettingsStore();

  const { status, mode, setMode } = usePomodoroStore();

  const focusOptions = [15, 20, 25, 30, 45, 50, 60] as const;
  const shortBreakOptions = [3, 5, 7, 10] as const;
  const longBreakOptions = [10, 15, 20, 25, 30] as const;
  const intervalOptions = [2, 3, 4, 5, 6] as const;

  const handleSelectFocus = (mins: number) => {
    triggerSelection();
    const duration = mins * 60;
    updateSettings({ focusDuration: duration });
    if (status === 'idle' && mode === 'focus') {
      setMode('focus', duration);
    }
  };

  const handleSelectShortBreak = (mins: number) => {
    triggerSelection();
    const duration = mins * 60;
    updateSettings({ shortBreakDuration: duration });
    if (status === 'idle' && mode === 'short_break') {
      setMode('short_break', duration);
    }
  };

  const handleSelectLongBreak = (mins: number) => {
    triggerSelection();
    const duration = mins * 60;
    updateSettings({ longBreakDuration: duration });
    if (status === 'idle' && mode === 'long_break') {
      setMode('long_break', duration);
    }
  };

  const handleSelectInterval = (count: number) => {
    triggerSelection();
    updateSettings({ longBreakInterval: count });
  };

  return (
    <View style={styles.container}>
      <Header title="Timer Durations" subtitle="Customize session intervals" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Focus Duration */}
        <Text style={styles.sectionTitle}>FOCUS DURATION (MINUTES)</Text>
        <Card style={styles.card}>
          <ChipSelector<number>
            options={focusOptions}
            selected={Math.round(focusDuration / 60)}
            onSelect={handleSelectFocus}
            getLabel={(mins) => `${mins}m`}
            variant="focus"
          />
        </Card>

        {/* Short Break */}
        <Text style={styles.sectionTitle}>SHORT BREAK DURATION (MINUTES)</Text>
        <Card style={styles.card}>
          <ChipSelector<number>
            options={shortBreakOptions}
            selected={Math.round(shortBreakDuration / 60)}
            onSelect={handleSelectShortBreak}
            getLabel={(mins) => `${mins}m`}
            variant="shortBreak"
          />
        </Card>

        {/* Long Break */}
        <Text style={styles.sectionTitle}>LONG BREAK DURATION (MINUTES)</Text>
        <Card style={styles.card}>
          <ChipSelector<number>
            options={longBreakOptions}
            selected={Math.round(longBreakDuration / 60)}
            onSelect={handleSelectLongBreak}
            getLabel={(mins) => `${mins}m`}
            variant="longBreak"
          />
        </Card>

        {/* Long Break Interval */}
        <Text style={styles.sectionTitle}>LONG BREAK INTERVAL (SESSIONS)</Text>
        <Card style={styles.card}>
          <ChipSelector<number>
            options={intervalOptions}
            selected={longBreakInterval}
            onSelect={handleSelectInterval}
            getLabel={(count) => `${count} sessions`}
            variant="accent"
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.huge,
    } as ViewStyle,
    sectionTitle: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.8,
      marginTop: SPACING.xl,
      marginBottom: SPACING.sm,
      marginLeft: SPACING.xs,
      color: colors.textSecondary,
    } as TextStyle,
    card: {
      padding: SPACING.md + 2,
    } as ViewStyle,
  });
