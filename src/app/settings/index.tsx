import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useSettingsStore } from '@/modules/settings/store/useSettingsStore';
import { SettingItem } from '@/modules/settings/components/SettingItem';
import { ThemeColors } from '@/constants/colors';
import { SPACING } from '@/styles/spacing';

export default function SettingsScreen() {
  const router = useRouter();
  const { styles, colors, isDark } = useThemedStyles(createStyles);
  const toggleTheme = useSettingsStore((s) => s.updateSettings); // Or toggle in useTheme

  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    soundEnabled,
    hapticsEnabled,
    updateSettings,
    resetToDefaults,
  } = useSettingsStore();

  const handleReset = () => {
    Alert.alert(
      'Reset Settings',
      'Reset all timer preferences to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetToDefaults },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" subtitle="Customize your focus experience" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Timer Durations Section */}
        <Text style={styles.sectionHeader}>TIMER PREFERENCES</Text>
        <Card style={styles.card}>
          <SettingItem
            icon="timer-outline"
            iconColor={colors.focus}
            title="Timer Durations"
            subtitle={`${Math.round(focusDuration / 60)}m Focus • ${Math.round(
              shortBreakDuration / 60
            )}m Short • ${Math.round(longBreakDuration / 60)}m Long`}
            onPress={() => router.push('/settings/timer' as any)}
            showChevron
          />
          <SettingItem
            icon="repeat-outline"
            iconColor={colors.accent}
            title="Long Break Interval"
            subtitle={`Every ${longBreakInterval} focus sessions`}
            onPress={() => router.push('/settings/timer' as any)}
            showChevron
          />
        </Card>

        {/* Automation Section */}
        <Text style={styles.sectionHeader}>AUTOMATION</Text>
        <Card style={styles.card}>
          <SettingItem
            icon="play-forward-outline"
            iconColor={colors.shortBreak}
            title="Auto-start Breaks"
            subtitle="Automatically begin break when focus session ends"
            rightElement={
              <Switch
                value={autoStartBreaks}
                onValueChange={(val) => updateSettings({ autoStartBreaks: val })}
                trackColor={{ false: colors.surface, true: colors.shortBreak }}
              />
            }
          />
          <SettingItem
            icon="flame-outline"
            iconColor={colors.focus}
            title="Auto-start Pomodoros"
            subtitle="Automatically begin next focus when break ends"
            rightElement={
              <Switch
                value={autoStartPomodoros}
                onValueChange={(val) => updateSettings({ autoStartPomodoros: val })}
                trackColor={{ false: colors.surface, true: colors.focus }}
              />
            }
          />
        </Card>

        {/* Sound & Haptics */}
        <Text style={styles.sectionHeader}>FEEDBACK & ALERTS</Text>
        <Card style={styles.card}>
          <SettingItem
            icon="volume-high-outline"
            iconColor={colors.accent}
            title="Sound & Notifications"
            subtitle={soundEnabled ? 'Chime sound enabled' : 'Muted'}
            onPress={() => router.push('/settings/sound' as any)}
            showChevron
          />
          <SettingItem
            icon="phone-portrait-outline"
            iconColor="#EC4899"
            title="Vibration & Haptics"
            subtitle="Haptic tactile feedback on touch & alerts"
            rightElement={
              <Switch
                value={hapticsEnabled}
                onValueChange={(val) => updateSettings({ hapticsEnabled: val })}
                trackColor={{ false: colors.surface, true: colors.accent }}
              />
            }
          />
        </Card>

        {/* Appearance */}
        <Text style={styles.sectionHeader}>APPEARANCE</Text>
        <Card style={styles.card}>
          <SettingItem
            icon={isDark ? 'moon' : 'sunny'}
            iconColor={isDark ? colors.accent : '#F59E0B'}
            title="Dark Mode"
            subtitle={isDark ? 'Deep contrast OLED dark' : 'Crisp clean light mode'}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={() => {
                  // Toggle dark / light mode in useTheme
                  const { useThemeStore } = require('@/store/useThemeStore');
                  useThemeStore.getState().toggleTheme();
                }}
                trackColor={{ false: colors.surface, true: colors.accent }}
              />
            }
          />
        </Card>

        {/* Reset */}
        <Card style={styles.resetCard}>
          <SettingItem
            icon="refresh-outline"
            iconColor={colors.danger}
            title="Reset to Defaults"
            subtitle="Restore 25m/5m/15m standard settings"
            onPress={handleReset}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
    scrollContent: {
      paddingHorizontal: SPACING.xl,
      paddingBottom: SPACING.huge,
    } as ViewStyle,
    sectionHeader: {
      fontSize: 11,
      fontWeight: '700',
      letterSpacing: 0.8,
      marginTop: SPACING.xl,
      marginBottom: SPACING.sm,
      marginLeft: SPACING.xs,
      color: colors.textSecondary,
    } as TextStyle,
    card: {
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.lg,
    } as ViewStyle,
    resetCard: {
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.lg,
      marginTop: SPACING.md + 2,
    } as ViewStyle,
  });
