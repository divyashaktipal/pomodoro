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
import { ChipSelector } from '@/components/ChipSelector';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useTaskOperations, TaskFilter } from '@/modules/tasks/hooks/useTaskOperations';
import { TaskItem } from '@/modules/tasks/components/TaskItem';
import { TaskModal } from '@/modules/tasks/components/TaskModal';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

const filterOptions: readonly TaskFilter[] = ['all', 'active', 'completed'] as const;

/**
 * 1. Single Responsibility Principle (SRP)
 * TasksScreen delegates data fetching, filtering, and mutation logic
 * to useTaskOperations(), focusing strictly on layout and UI orchestration.
 */
export default function TasksScreen() {
  const { styles, colors } = useThemedStyles(createStyles);

  const {
    tasks,
    pendingCount,
    activeTaskId,
    filter,
    setFilter,
    modalVisible,
    modalKey,
    openModal,
    closeModal,
    toggleTask,
    deleteTask,
    setActiveTask,
  } = useTaskOperations();

  return (
    <View style={styles.container}>
      <Header
        title="Tasks"
        subtitle={`${pendingCount} pending`}
        showBack
        rightAction={
          <TouchableOpacity
            onPress={openModal}
            activeOpacity={0.7}
            style={styles.addButton}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>New Task</Text>
          </TouchableOpacity>
        }
      />

      {/* Generic Filter Tabs Component */}
      <View style={styles.filterRow}>
        <ChipSelector<TaskFilter>
          options={filterOptions}
          selected={filter}
          onSelect={setFilter}
          getLabel={(tab) => tab.charAt(0).toUpperCase() + tab.slice(1)}
          variant="default"
        />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            isActive={item.id === activeTaskId}
            onToggle={() => toggleTask(item.id)}
            onSelect={() => setActiveTask(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="clipboard-outline" size={32} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>
              {filter === 'completed' ? 'No completed tasks yet' : 'No tasks created yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              Break your work into focus blocks to supercharge productivity.
            </Text>
          </View>
        }
      />

      {/* Create Task Modal: Key prop resets state on open */}
      <TaskModal
        key={`task-modal-${modalKey}`}
        visible={modalVisible}
        onClose={closeModal}
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
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm - 1,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.focus,
      gap: 4,
    } as ViewStyle,
    addButtonText: {
      color: '#FFF',
      fontSize: 13,
      fontWeight: '700',
    } as TextStyle,
    filterRow: {
      paddingHorizontal: SPACING.xl,
      marginBottom: SPACING.md,
    } as ViewStyle,
    listContent: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.huge,
    } as ViewStyle,
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 80,
      paddingHorizontal: SPACING.huge,
    } as ViewStyle,
    emptyIconCircle: {
      width: 68,
      height: 68,
      borderRadius: 34,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SPACING.lg,
    } as ViewStyle,
    emptyTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: SPACING.xs + 2,
      color: colors.textPrimary,
    } as TextStyle,
    emptySubtitle: {
      fontSize: 13,
      textAlign: 'center',
      lineHeight: 18,
      color: colors.textSecondary,
    } as TextStyle,
  });
