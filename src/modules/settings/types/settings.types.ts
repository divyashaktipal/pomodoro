export interface TimerSettings {
  focusDuration: number; // in seconds
  shortBreakDuration: number; // in seconds
  longBreakDuration: number; // in seconds
  longBreakInterval: number; // sessions count
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  soundVolume: number;
}
