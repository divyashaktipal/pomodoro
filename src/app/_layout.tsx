import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';

// Prevent auto-hiding the splash screen so the app doesn't flash white while hydrating
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading in dev or on web might reject, safe to ignore */
});

export default function RootLayout() {
  const { styles, colors, isDark } = useThemedStyles(createStyles);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-warm resources, fonts, or initial storage rehydration
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (e) {
        console.warn('Splash prepare error:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide splash only AFTER root content has laid out and painted its background color
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="tasks/index" />
          <Stack.Screen name="stats/index" />
          <Stack.Screen name="settings/index" />
          <Stack.Screen name="settings/timer" />
          <Stack.Screen name="settings/sound" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
  });
