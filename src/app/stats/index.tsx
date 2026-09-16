import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useStatsSummary } from '@/modules/stats/hooks/useStatsSummary';
import { StatCard } from '@/modules/stats/components/StatCard';
import { formatTimeOfDay, formatFriendlyDate } from '@/utils/formatDate';
import { formatDurationHuman } from '@/utils/formatTime';
import { PomodoroSession } from '@/modules/stats/types/stats.types';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

/**
 * 1. Single Responsibility Principle (SRP)
 * StatsScreen delegates aggregation and metric computations to useStatsSummary(),
 * focusing entirely on rendering the statistical overview.
 */
export default function StatsScreen() {
  const { styles, colors } = useThemedStyles(createStyles);
  const { sessions, hasSessions, metrics, clearHistory } = useStatsSummary();

  const getModeLabel = (session: PomodoroSession) => {
    switch (session.mode) {
      case 'focus':
        return 'Focus Session';
      case 'short_break':
        return 'Short Break';
      case 'long_break':
        return 'Long Break';
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Statistics"
        subtitle="Track your focus progress"
        showBack
        rightAction={
          hasSessions ? (
            <TouchableOpacity
              onPress={clearHistory}
              activeOpacity={0.7}
              style={styles.clearButton}
            >
              <Ionicons name="trash-outline" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : undefined
        }
      />

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerComponent}>
            {/* 2x2 Grid of StatCards */}
            <View style={styles.grid}>
              <StatCard
                icon="flame"
                iconColor="#F97316"
                value={`${metrics.streak} ${metrics.streak === 1 ? 'day' : 'days'}`}
                label="Current Streak"
                sublabel="Consecutive focus days"
              />
              <StatCard
                icon="today"
                iconColor={colors.focus}
                value={`${metrics.todayMinutes}m`}
                label="Today's Focus"
                sublabel="Productive time today"
              />
            </View>
            <View style={styles.grid}>
              <StatCard
                icon="time"
                iconColor={colors.accent}
                value={`${metrics.totalHours}h`}
                label="Total Focus"
                sublabel="All-time recorded"
              />
              <StatCard
                icon="checkmark-circle"
                iconColor={colors.success}
                value={metrics.totalFocusSessions}
                label="Completed Cycles"
                sublabel="Focus intervals finished"
              />
            </View>

            <Text style={styles.sectionTitle}>Session History</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.sessionCard}>
            <View style={styles.sessionLeft}>
              <View
                style={[
                  styles.sessionDot,
                  styles[`sessionDot_${item.mode}`],
                ]}
              />
              <View>
                <Text style={styles.sessionMode}>{getModeLabel(item)}</Text>
                {item.taskTitle ? (
                  <Text style={styles.sessionTask} numberOfLines={1}>
                    {item.taskTitle}
                  </Text>
                ) : null}
              </View>
            </View>

            <View style={styles.sessionRight}>
              <Text style={styles.sessionDuration}>
                {formatDurationHuman(item.durationSeconds)}
              </Text>
              <Text style={styles.sessionTime}>
                {formatFriendlyDate(item.completedAt)}, {formatTimeOfDay(item.completedAt)}
              </Text>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bar-chart-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No session data yet</Text>
            <Text style={styles.emptySubtitle}>
              Complete your first Pomodoro session to unlock productivity insights.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
    clearButton: {
      width: 36,
      height: 36,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.huge,
    } as ViewStyle,
    headerComponent: {
      paddingBottom: SPACING.lg,
    } as ViewStyle,
    grid: {
      flexDirection: 'row',
      gap: SPACING.md,
      marginBottom: SPACING.md,
    } as ViewStyle,
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginTop: SPACING.lg + 2,
      marginBottom: SPACING.md,
      color: colors.textPrimary,
    } as TextStyle,
    sessionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.md + 2,
      marginBottom: SPACING.sm,
    } as ViewStyle,
    sessionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      flex: 1,
      paddingRight: SPACING.sm + 2,
    } as ViewStyle,
    sessionDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    } as ViewStyle,
    sessionDot_focus: {
      backgroundColor: colors.focus,
    } as ViewStyle,
    sessionDot_short_break: {
      backgroundColor: colors.shortBreak,
    } as ViewStyle,
    sessionDot_long_break: {
      backgroundColor: colors.longBreak,
    } as ViewStyle,
    sessionMode: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
    } as TextStyle,
    sessionTask: {
      fontSize: 12,
      marginTop: 2,
      color: colors.textSecondary,
    } as TextStyle,
    sessionRight: {
      alignItems: 'flex-end',
    } as ViewStyle,
    sessionDuration: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textPrimary,
    } as TextStyle,
    sessionTime: {
      fontSize: 11,
      marginTop: 2,
      color: colors.textMuted,
    } as TextStyle,
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
      paddingHorizontal: SPACING.xl,
      gap: SPACING.sm,
    } as ViewStyle,
    emptyTitle: {
      fontSize: 15,
      fontWeight: '600',
      marginTop: 6,
      color: colors.textPrimary,
    } as TextStyle,
    emptySubtitle: {
      fontSize: 12,
      textAlign: 'center',
      color: colors.textSecondary,
    } as TextStyle,
  });
