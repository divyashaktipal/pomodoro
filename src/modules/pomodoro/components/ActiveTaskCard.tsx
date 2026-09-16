import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { useTaskStore } from '@/modules/tasks/store/useTaskStore';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

interface ActiveTaskCardProps {
  onOpenTasks: () => void;
}

export const ActiveTaskCard: React.FC<ActiveTaskCardProps> = ({ onOpenTasks }) => {
  const { styles, colors } = useThemedStyles(createStyles);
  const { triggerNotification } = useHaptics();
  const { tasks, activeTaskId, toggleTask } = useTaskStore();

  const activeTask = tasks.find((t) => t.id === activeTaskId);

  const handleToggle = () => {
    if (activeTask) {
      triggerNotification();
      toggleTask(activeTask.id);
    }
  };

  return (
    <Card style={styles.card}>
      {activeTask ? (
        <View style={styles.content}>
          <TouchableOpacity
            onPress={handleToggle}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={[
              styles.checkbox,
              activeTask.isCompleted ? styles.checkboxCompleted : styles.checkboxIncomplete,
            ]}
          >
            {activeTask.isCompleted && (
              <Ionicons name="checkmark" size={14} color="#FFF" />
            )}
          </TouchableOpacity>

          <View style={styles.info}>
            <Text style={styles.heading}>CURRENT FOCUS TASK</Text>
            <Text
              style={[
                styles.title,
                activeTask.isCompleted ? styles.titleCompleted : styles.titleActive,
              ]}
              numberOfLines={1}
            >
              {activeTask.title}
            </Text>
          </View>

          <View style={styles.right}>
            <View style={styles.badge}>
              <Ionicons name="flame" size={14} color={colors.focus} />
              <Text style={styles.badgeText}>
                {activeTask.completedPomodoros}/{activeTask.estimatedPomodoros}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onOpenTasks}
              style={styles.switchButton}
            >
              <Ionicons name="swap-horizontal" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={onOpenTasks}
          activeOpacity={0.7}
          style={styles.emptyContainer}
        >
          <View style={styles.emptyIconWrapper}>
            <Ionicons name="add" size={18} color={colors.accent} />
          </View>
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyTitle}>Select a task to focus on</Text>
            <Text style={styles.emptySubtitle}>Link your session with goals</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </Card>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: '100%',
      padding: SPACING.md + 2,
    } as ViewStyle,
    content: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    checkbox: {
      width: 22,
      height: 22,
      borderRadius: BORDER_RADIUS.xs,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.md,
    } as ViewStyle,
    checkboxCompleted: {
      borderColor: colors.success,
      backgroundColor: colors.success,
    } as ViewStyle,
    checkboxIncomplete: {
      borderColor: colors.textMuted,
      backgroundColor: 'transparent',
    } as ViewStyle,
    info: {
      flex: 1,
      paddingRight: SPACING.sm,
    } as ViewStyle,
    heading: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.6,
      marginBottom: 2,
      color: colors.textMuted,
    } as TextStyle,
    title: {
      fontSize: 15,
      fontWeight: '600',
    } as TextStyle,
    titleActive: {
      color: colors.textPrimary,
      textDecorationLine: 'none',
    } as TextStyle,
    titleCompleted: {
      color: colors.textMuted,
      textDecorationLine: 'line-through',
    } as TextStyle,
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    } as ViewStyle,
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      borderRadius: BORDER_RADIUS.sm,
      backgroundColor: colors.surface,
      gap: 4,
    } as ViewStyle,
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
    } as TextStyle,
    switchButton: {
      padding: SPACING.xs,
    } as ViewStyle,
    emptyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.xs,
    } as ViewStyle,
    emptyIconWrapper: {
      width: 36,
      height: 36,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.md,
    } as ViewStyle,
    emptyTextContainer: {
      flex: 1,
    } as ViewStyle,
    emptyTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
    } as TextStyle,
    emptySubtitle: {
      fontSize: 12,
      marginTop: 2,
      color: colors.textMuted,
    } as TextStyle,
  });
