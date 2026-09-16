import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { SPACING, BORDER_RADIUS } from '@/styles/spacing';

export type BadgeVariant =
  | 'surface'
  | 'focus'
  | 'accent'
  | 'shortBreak'
  | 'longBreak'
  | 'outline';

export interface BadgeProps {
  label: string | number;
  icon?: React.ReactNode;
  variant?: BadgeVariant;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  icon,
  variant = 'surface',
  onPress,
  style,
  textStyle,
}) => {
  const { styles } = useThemedStyles(createStyles);

  const containerStyle = [styles.base, styles[variant], style];
  const labelStyle = [styles.label, styles[`${variant}Text`], textStyle];

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.75}
        style={containerStyle}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={labelStyle}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SPACING.sm + 2,
      paddingVertical: SPACING.xs + 2,
      borderRadius: BORDER_RADIUS.md,
    } as ViewStyle,
    icon: {
      marginRight: SPACING.xs,
    } as ViewStyle,
    label: {
      fontSize: 12,
      fontWeight: '700',
    } as TextStyle,

    // Container Variants
    surface: {
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
      borderWidth: 1,
    } as ViewStyle,
    focus: {
      backgroundColor: `${colors.focus}15`,
      borderColor: `${colors.focus}30`,
      borderWidth: 1,
    } as ViewStyle,
    accent: {
      backgroundColor: `${colors.accent}15`,
      borderColor: `${colors.accent}30`,
      borderWidth: 1,
    } as ViewStyle,
    shortBreak: {
      backgroundColor: `${colors.shortBreak}15`,
      borderColor: `${colors.shortBreak}30`,
      borderWidth: 1,
    } as ViewStyle,
    longBreak: {
      backgroundColor: `${colors.longBreak}15`,
      borderColor: `${colors.longBreak}30`,
      borderWidth: 1,
    } as ViewStyle,
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.cardBorder,
      borderWidth: 1,
    } as ViewStyle,

    // Text Variants
    surfaceText: {
      color: colors.textPrimary,
    } as TextStyle,
    focusText: {
      color: colors.focus,
    } as TextStyle,
    accentText: {
      color: colors.accent,
    } as TextStyle,
    shortBreakText: {
      color: colors.shortBreak,
    } as TextStyle,
    longBreakText: {
      color: colors.longBreak,
    } as TextStyle,
    outlineText: {
      color: colors.textSecondary,
    } as TextStyle,
  });
