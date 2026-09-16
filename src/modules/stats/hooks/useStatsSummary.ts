import { useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { useStatsStore } from '../store/useStatsStore';
import { PomodoroSession } from '../types/stats.types';

/**
 * 1. Single Responsibility Principle (SRP)
 * Encapsulates statistics aggregation, metric computations, and clearing logic.
 * The consuming UI component (StatsScreen) remains purely focused on rendering.
 */
export function useStatsSummary() {
  const {
    sessions,
    clearHistory,
    getTodayFocusMinutes,
    getTotalFocusHours,
    getCurrentStreak,
  } = useStatsStore();

  const metrics = useMemo(() => {
    return {
      todayMinutes: getTodayFocusMinutes(),
      totalHours: getTotalFocusHours(),
      streak: getCurrentStreak(),
      totalFocusSessions: sessions.filter((s: PomodoroSession) => s.mode === 'focus').length,
    };
  }, [sessions, getTodayFocusMinutes, getTotalFocusHours, getCurrentStreak]);

  const confirmClearHistory = useCallback(() => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your session history? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearHistory },
      ]
    );
  }, [clearHistory]);

  return {
    sessions,
    hasSessions: sessions.length > 0,
    metrics,
    clearHistory: confirmClearHistory,
  };
}
