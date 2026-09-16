import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  rightAction,
}) => {
  const router = useRouter();
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {rightAction && <View style={styles.rightContainer}>{rightAction}</View>}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.md + 2,
    } as ViewStyle,
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
    } as ViewStyle,
    backButton: {
      width: 38,
      height: 38,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    title: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: -0.4,
      color: colors.textPrimary,
    } as TextStyle,
    subtitle: {
      fontSize: 13,
      marginTop: 2,
      color: colors.textSecondary,
    } as TextStyle,
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
  });
