export const TIMER_DEFAULTS = {
  focusDuration: 25 * 60, // 25 minutes in seconds
  shortBreakDuration: 5 * 60, // 5 minutes in seconds
  longBreakDuration: 15 * 60, // 15 minutes in seconds
  longBreakInterval: 4, // Number of focus sessions before a long break
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  hapticsEnabled: true,
  tickingSound: false,
  soundVolume: 0.8,
};

export const POMODORO_MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
} as const;
