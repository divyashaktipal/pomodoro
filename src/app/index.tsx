import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { usePomodoroTimer } from '@/modules/pomodoro/hooks/usePomodoroTimer';
import { ModeSelector } from '@/modules/pomodoro/components/ModeSelector';
import { TimerDisplay } from '@/modules/pomodoro/components/TimerDisplay';
import { TimerControls } from '@/modules/pomodoro/components/TimerControls';
import { ActiveTaskCard } from '@/modules/pomodoro/components/ActiveTaskCard';
import { TaskModal } from '@/modules/tasks/components/TaskModal';
import { Badge } from '@/components/Badge';
import { IconButton } from '@/components/IconButton';
import { useStatsStore } from '@/modules/stats/store/useStatsStore';
import { useTaskStore } from '@/modules/tasks/store/useTaskStore';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

export default function HomeScreen() {
  const router = useRouter();
  const { styles, colors } = useThemedStyles(createStyles);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [modalSessionKey, setModalSessionKey] = useState(0);

  const {
    mode,
    status,
    timeLeft,
    totalDuration,
    cycle,
    longBreakInterval,
    sessionKey,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    switchMode,
  } = usePomodoroTimer();

  const currentStreak = useStatsStore((s) => s.getCurrentStreak());
  const tasks = useTaskStore((s) => s.tasks);
  const incompleteCount = tasks.filter((t) => !t.isCompleted).length;

  const handleOpenTaskModal = () => {
    // Increment modalSessionKey to reset internal TaskModal state cleanly via key prop
    setModalSessionKey((prev) => prev + 1);
    setTaskModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <View style={styles.logoBadge}>
            <Ionicons name="timer" size={20} color={colors.focus} />
          </View>
          <Text style={styles.brandTitle}>POMODORO</Text>
        </View>

        <View style={styles.headerActions}>
          {/* Streak pill */}
          <Badge
            label={`${currentStreak}d`}
            icon={<Ionicons name="flame" size={16} color="#F97316" />}
            variant="surface"
            onPress={() => router.push('/stats' as any)}
          />

          {/* Tasks link */}
          <IconButton
            icon={<Ionicons name="checkbox-outline" size={19} color={colors.textPrimary} />}
            onPress={() => router.push('/tasks' as any)}
            badgeCount={incompleteCount}
            variant="surface"
            accessibilityLabel="View Tasks"
          />

          {/* Stats link */}
          <IconButton
            icon={<Ionicons name="bar-chart-outline" size={19} color={colors.textPrimary} />}
            onPress={() => router.push('/stats' as any)}
            variant="surface"
            accessibilityLabel="View Statistics"
          />

          {/* Settings link */}
          <IconButton
            icon={<Ionicons name="settings-outline" size={19} color={colors.textPrimary} />}
            onPress={() => router.push('/settings' as any)}
            variant="surface"
            accessibilityLabel="View Settings"
          />
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mode Selector */}
        <ModeSelector currentMode={mode} onSelectMode={switchMode} />

        {/* Circular Display: key prop resets internal component state on cycle or reset */}
        <TimerDisplay
          key={sessionKey}
          timeLeft={timeLeft}
          totalDuration={totalDuration}
          mode={mode}
          status={status}
          cycle={cycle}
          longBreakInterval={longBreakInterval}
        />

        {/* Controls */}
        <TimerControls
          status={status}
          mode={mode}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onSkip={skipPhase}
        />

        {/* Active Task Card */}
        <View style={styles.taskSection}>
          <ActiveTaskCard onOpenTasks={() => router.push('/tasks' as any)} />
        </View>
      </ScrollView>

      {/* Task Creation Modal: key prop resets internal form inputs when opened */}
      <TaskModal
        key={`task-modal-${modalSessionKey}`}
        visible={taskModalVisible}
        onClose={() => setTaskModalVisible(false)}
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md,
    } as ViewStyle,
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm + 2,
    } as ViewStyle,
    logoBadge: {
      width: 36,
      height: 36,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: `${colors.focus}20`,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    brandTitle: {
      fontSize: 18,
      fontWeight: '800',
      letterSpacing: 1.2,
      color: colors.textPrimary,
    } as TextStyle,
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingTop: SPACING.sm + 2,
      paddingBottom: SPACING.huge,
      alignItems: 'center',
    } as ViewStyle,
    taskSection: {
      width: '100%',
      maxWidth: 420,
      marginTop: SPACING.sm + 2,
    } as ViewStyle,
  });
