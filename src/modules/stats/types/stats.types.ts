import { PomodoroMode } from '@/modules/pomodoro/types/pomodoro.types';

export interface PomodoroSession {
  id: string;
  mode: PomodoroMode;
  durationSeconds: number;
  completedAt: number; // timestamp
  taskId?: string;
  taskTitle?: string;
}

export interface StatsSummary {
  todayFocusMinutes: number;
  totalFocusHours: number;
  completedSessions: number;
  currentStreak: number;
}
