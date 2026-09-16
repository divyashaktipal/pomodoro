export interface ThemeColors {
  background: string;
  card: string;
  cardBorder: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentGradient: readonly [string, string];
  focus: string;
  focusGlow: string;
  shortBreak: string;
  shortBreakGlow: string;
  longBreak: string;
  longBreakGlow: string;
  success: string;
  warning: string;
  danger: string;
}

export const COLORS: Record<'dark' | 'light', ThemeColors> = {
  dark: {
    background: '#0F1117',
    card: '#1A1D27',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    surface: '#242838',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    accent: '#6366F1', // Indigo
    accentGradient: ['#6366F1', '#8B5CF6'],
    focus: '#EF4444', // Warm Pomodoro Red
    focusGlow: 'rgba(239, 68, 68, 0.25)',
    shortBreak: '#10B981', // Refreshing Emerald
    shortBreakGlow: 'rgba(16, 185, 129, 0.25)',
    longBreak: '#3B82F6', // Relaxing Ocean Blue
    longBreakGlow: 'rgba(59, 130, 246, 0.25)',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#F43F5E',
  },
  light: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    cardBorder: 'rgba(0, 0, 0, 0.06)',
    surface: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    accent: '#4F46E5',
    accentGradient: ['#4F46E5', '#7C3AED'],
    focus: '#E11D48',
    focusGlow: 'rgba(225, 29, 72, 0.15)',
    shortBreak: '#059669',
    shortBreakGlow: 'rgba(5, 150, 105, 0.15)',
    longBreak: '#2563EB',
    longBreakGlow: 'rgba(37, 99, 235, 0.15)',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#E11D48',
  },
};

export type ThemeMode = 'dark' | 'light' | 'system';
