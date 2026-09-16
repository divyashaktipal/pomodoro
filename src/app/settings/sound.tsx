import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { soundEffects } from '@/utils';
import { useSettingsStore } from '@/modules/settings/store/useSettingsStore';
import { SettingItem } from '@/modules/settings/components/SettingItem';
import { ThemeColors } from '@/constants/colors';
import { SPACING } from '@/styles/spacing';

export default function SoundSettingsScreen() {
  const { styles, colors } = useThemedStyles(createStyles);
  const { triggerNotification } = useHaptics();

  const {
    soundEnabled,
    hapticsEnabled,
    updateSettings,
  } = useSettingsStore();

  const handleTestSound = () => {
    soundEffects.playSessionComplete();
  };

  const handleTestHaptics = () => {
    triggerNotification();
  };

  return (
    <View style={styles.container}>
      <Header title="Sound & Haptics" subtitle="Configure audio and vibration alerts" showBack />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Audio Alerts */}
        <Text style={styles.sectionTitle}>AUDIO NOTIFICATIONS</Text>
        <Card style={styles.card}>
          <SettingItem
            icon="volume-high-outline"
            iconColor={colors.focus}
            title="Completion Chime"
            subtitle="Plays a soothing chord when any session completes"
            rightElement={
              <Switch
                value={soundEnabled}
                onValueChange={(val) => updateSettings({ soundEnabled: val })}
                trackColor={{ false: colors.surface, true: colors.focus }}
              />
            }
          />
          <View style={styles.previewContainer}>
            <Button
              title="Test Chime Sound"
              variant="secondary"
              size="sm"
              icon={<Ionicons name="musical-note" size={16} color={colors.textPrimary} />}
              onPress={handleTestSound}
            />
          </View>
        </Card>

        {/* Tactile Feedback */}
        <Text style={styles.sectionTitle}>TACTILE FEEDBACK</Text>
        <Card style={styles.card}>
          <SettingItem
            icon="phone-portrait-outline"
            iconColor={colors.accent}
            title="Haptic Vibrations"
            subtitle="Subtle vibration when buttons and milestones are triggered"
            rightElement={
              <Switch
                value={hapticsEnabled}
                onValueChange={(val) => updateSettings({ hapticsEnabled: val })}
                trackColor={{ false: colors.surface, true: colors.accent }}
              />
            }
          />
          <View style={styles.previewContainer}>
            <Button
              title="Test Vibration"
              variant="secondary"
              size="sm"
              icon={<Ionicons name="pulse" size={16} color={colors.textPrimary} />}
              onPress={handleTestHaptics}
            />
          </View>
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
    sectionTitle: {
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
    previewContainer: {
      paddingVertical: SPACING.md + 2,
      alignItems: 'flex-start',
    } as ViewStyle,
  });
