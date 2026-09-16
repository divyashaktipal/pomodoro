import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export function useHaptics() {
  const triggerImpact = async (style = Haptics.ImpactFeedbackStyle.Medium) => {
    if (Platform.OS === 'web') return;
    try {
      await Haptics.impactAsync(style);
    } catch {}
  };

  const triggerNotification = async (type = Haptics.NotificationFeedbackType.Success) => {
    if (Platform.OS === 'web') return;
    try {
      await Haptics.notificationAsync(type);
    } catch {}
  };

  const triggerSelection = async () => {
    if (Platform.OS === 'web') return;
    try {
      await Haptics.selectionAsync();
    } catch {}
  };

  return {
    triggerImpact,
    triggerNotification,
    triggerSelection,
  };
}
