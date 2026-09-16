import { useState, useEffect, useRef, useCallback } from 'react';
import { usePomodoroStore } from '../store/usePomodoroStore';
import { useSettingsStore } from '@/modules/settings/store/useSettingsStore';
import { useTaskStore } from '@/modules/tasks/store/useTaskStore';
import { useStatsStore } from '@/modules/stats/store/useStatsStore';
import { useHaptics } from '@/hooks/useHaptics';
import { soundEffects } from '@/utils/soundEffects';
import { PomodoroMode } from '../types/pomodoro.types';

export function usePomodoroTimer() {
  const [sessionKey, setSessionKey] = useState<string>('timer-session-0');
  const {
    mode,
    status,
    timeLeft,
    totalDuration,
    cycle,
    targetEndTime,
    start,
    pause,
    resume,
    reset,
    tick,
    setMode,
    incrementCycle,
  } = usePomodoroStore();

  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    soundEnabled,
    hapticsEnabled,
  } = useSettingsStore();

  const { activeTaskId, tasks, incrementTaskPomodoro } = useTaskStore();
  const { logSession } = useStatsStore();
  const { triggerNotification, triggerImpact } = useHaptics();

  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const intervalRef = useRef<any>(null);

  // Determine duration for a specific mode based on user settings
  const getDurationForMode = useCallback(
    (targetMode: PomodoroMode): number => {
      switch (targetMode) {
        case 'focus':
          return focusDuration;
        case 'short_break':
          return shortBreakDuration;
        case 'long_break':
          return longBreakDuration;
        default:
          return focusDuration;
      }
    },
    [focusDuration, shortBreakDuration, longBreakDuration]
  );

  // Switch mode directly
  const switchMode = useCallback(
    (newMode: PomodoroMode) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const duration = getDurationForMode(newMode);
      setMode(newMode, duration);
      setSessionKey(`timer-${newMode}-${Date.now()}`);
      if (hapticsEnabled) triggerImpact();
    },
    [getDurationForMode, setMode, hapticsEnabled, triggerImpact]
  );

  // Reset current timer
  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const duration = getDurationForMode(mode);
    reset(duration);
    setSessionKey(`timer-${mode}-${Date.now()}`);
    if (hapticsEnabled) triggerImpact();
  }, [getDurationForMode, mode, reset, hapticsEnabled, triggerImpact]);

  // Start / Resume timer
  const startTimer = useCallback(() => {
    const end = Date.now() + timeLeft * 1000;
    if (status === 'paused') {
      resume(end);
    } else {
      start(end);
    }

    if (soundEnabled) soundEffects.playStart();
    if (hapticsEnabled) triggerImpact();
  }, [timeLeft, status, resume, start, soundEnabled, hapticsEnabled, triggerImpact]);

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    pause();
    if (soundEnabled) soundEffects.playPause();
    if (hapticsEnabled) triggerImpact();
  }, [pause, soundEnabled, hapticsEnabled, triggerImpact]);

  // Handle session completion logic
  const handleSessionComplete = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (soundEnabled) soundEffects.playSessionComplete();
    if (hapticsEnabled) triggerNotification();

    // 1. Log completed session in stats
    logSession({
      mode,
      durationSeconds: totalDuration,
      taskId: activeTask?.id,
      taskTitle: activeTask?.title,
    });

    // 2. If focus session, increment task progress
    if (mode === 'focus' && activeTaskId) {
      incrementTaskPomodoro(activeTaskId);
    }

    // 3. Compute next mode and cycle
    let nextMode: PomodoroMode = 'focus';
    let shouldAutoStart = false;

    if (mode === 'focus') {
      const willBeLongBreak = cycle >= longBreakInterval;
      if (willBeLongBreak) {
        nextMode = 'long_break';
      } else {
        nextMode = 'short_break';
      }
      shouldAutoStart = autoStartBreaks;
    } else {
      // Completed break
      if (mode === 'long_break') {
        incrementCycle(longBreakInterval);
      } else {
        incrementCycle(longBreakInterval);
      }
      nextMode = 'focus';
      shouldAutoStart = autoStartPomodoros;
    }

    const nextDuration = getDurationForMode(nextMode);
    setMode(nextMode, nextDuration);
    setSessionKey(`timer-${nextMode}-${Date.now()}`);

    if (shouldAutoStart) {
      const newEnd = Date.now() + nextDuration * 1000;
      start(newEnd);
    }
  }, [
    soundEnabled,
    hapticsEnabled,
    triggerNotification,
    logSession,
    mode,
    totalDuration,
    activeTask,
    activeTaskId,
    incrementTaskPomodoro,
    cycle,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    getDurationForMode,
    setMode,
    incrementCycle,
    start,
  ]);

  // Skip to next phase manually
  const skipPhase = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let nextMode: PomodoroMode = 'focus';
    if (mode === 'focus') {
      nextMode = cycle >= longBreakInterval ? 'long_break' : 'short_break';
    } else {
      incrementCycle(longBreakInterval);
      nextMode = 'focus';
    }

    const nextDuration = getDurationForMode(nextMode);
    setMode(nextMode, nextDuration);
    setSessionKey(`timer-${nextMode}-${Date.now()}`);
    if (hapticsEnabled) triggerImpact();
  }, [
    mode,
    cycle,
    longBreakInterval,
    incrementCycle,
    getDurationForMode,
    setMode,
    hapticsEnabled,
    triggerImpact,
  ]);

  // Precision countdown interval
  useEffect(() => {
    if (status === 'running' && targetEndTime) {
      intervalRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((targetEndTime - Date.now()) / 1000));
        tick(remaining);

        if (remaining <= 0) {
          handleSessionComplete();
        }
      }, 250);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, targetEndTime, tick, handleSessionComplete]);

  return {
    mode,
    status,
    timeLeft,
    totalDuration,
    cycle,
    longBreakInterval,
    activeTask,
    sessionKey,
    startTimer,
    pauseTimer,
    resetTimer,
    skipPhase,
    switchMode,
  };
}
