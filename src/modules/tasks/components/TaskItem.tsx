import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { Task } from '../types/task.types';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

/**
 * 4. Interface Segregation Principle (ISP)
 * Segregating presentation concerns from action handlers so components
 * are decoupled and depend solely on the interfaces they require.
 */
export interface TaskDisplayProps {
  task: Task;
  isActive: boolean;
}

export interface TaskActionProps {
  onToggle: () => void;
  onSelect: () => void;
  onDelete: () => void;
}

export type TaskItemProps = TaskDisplayProps & TaskActionProps;

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isActive,
  onToggle,
  onSelect,
  onDelete,
}) => {
  const { styles, colors } = useThemedStyles(createStyles);
  const { triggerSelection, triggerNotification } = useHaptics();

  const handleToggle = () => {
    triggerNotification();
    onToggle();
  };

  const handleSelect = () => {
    triggerSelection();
    onSelect();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleSelect}
      style={[
        styles.container,
        isActive ? styles.containerActive : styles.containerInactive,
      ]}
    >
      <TouchableOpacity
        onPress={handleToggle}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={[
          styles.checkbox,
          task.isCompleted ? styles.checkboxCompleted : styles.checkboxIncomplete,
        ]}
      >
        {task.isCompleted && <Ionicons name="checkmark" size={14} color="#FFF" />}
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            task.isCompleted ? styles.titleCompleted : styles.titleActive,
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
      </View>

      <View style={styles.badges}>
        <View style={styles.pomodoroBadge}>
          <Ionicons name="flame" size={13} color={colors.focus} />
          <Text style={styles.badgeText}>
            {task.completedPomodoros}/{task.estimatedPomodoros}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onDelete}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SPACING.md + 2,
      borderRadius: BORDER_RADIUS.lg,
      marginBottom: SPACING.sm + 2,
      backgroundColor: colors.card,
    } as ViewStyle,
    containerActive: {
      borderColor: colors.focus,
      borderWidth: 1.5,
    } as ViewStyle,
    containerInactive: {
      borderColor: colors.cardBorder,
      borderWidth: 1,
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
    titleContainer: {
      flex: 1,
      paddingRight: SPACING.sm,
    } as ViewStyle,
    title: {
      fontSize: 15,
      fontWeight: '500',
    } as TextStyle,
    titleActive: {
      color: colors.textPrimary,
      textDecorationLine: 'none',
    } as TextStyle,
    titleCompleted: {
      color: colors.textMuted,
      textDecorationLine: 'line-through',
    } as TextStyle,
    badges: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    } as ViewStyle,
    pomodoroBadge: {
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
    deleteButton: {
      padding: SPACING.xs,
    } as ViewStyle,
  });
