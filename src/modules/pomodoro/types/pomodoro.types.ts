export type PomodoroMode = 'focus' | 'short_break' | 'long_break';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface PomodoroCycleInfo {
  currentCycle: number; // e.g. 1, 2, 3, 4
  totalCyclesBeforeLongBreak: number; // e.g. 4
}

/**
 * Discriminated Union for Timer State:
 * Ensures state transitions are explicit and impossible states cannot exist.
 * - 'idle': timer is static; targetEndTime does not exist.
 * - 'running': timer is active; targetEndTime is guaranteed non-null.
 * - 'paused': timer is paused; contains pausedAt timestamp.
 * - 'completed': session finished milestone.
 */
export type TimerSnapshot =
  | { status: 'idle'; mode: PomodoroMode; timeLeft: number; totalDuration: number }
  | { status: 'running'; mode: PomodoroMode; timeLeft: number; totalDuration: number; targetEndTime: number }
  | { status: 'paused'; mode: PomodoroMode; timeLeft: number; totalDuration: number; pausedAt: number }
  | { status: 'completed'; mode: PomodoroMode; completedAt: number };

/**
 * Type guard for running timer state using discriminated union
 */
export function isTimerRunning(
  snapshot: TimerSnapshot
): snapshot is { status: 'running'; mode: PomodoroMode; timeLeft: number; totalDuration: number; targetEndTime: number } {
  return snapshot.status === 'running';
}
