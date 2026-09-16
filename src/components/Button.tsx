import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  children,
}) => {
  const { styles } = useThemedStyles(createStyles);
  const { triggerSelection } = useHaptics();

  const handlePress = () => {
    if (disabled || loading) return;
    triggerSelection();
    onPress();
  };

  const containerStyle = [
    styles.base,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    icon ? styles.textWithIcon : null,
    textStyle,
  ];

  const indicatorColor =
    variant === 'secondary' || variant === 'ghost'
      ? styles[`${variant}Text`].color
      : '#FFFFFF';

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      disabled={disabled || loading}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        <>
          {icon ? icon : null}
          {title ? <Text style={labelStyle}>{title}</Text> : children}
        </>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.lg,
    } as ViewStyle,
    text: {
      fontWeight: '600',
      textAlign: 'center',
    } as TextStyle,
    textWithIcon: {
      marginLeft: SPACING.sm,
    } as TextStyle,

    // Sizes
    sm: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md + 2,
    } as ViewStyle,
    smText: {
      fontSize: 13,
    } as TextStyle,

    md: {
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.xl,
    } as ViewStyle,
    mdText: {
      fontSize: 15,
    } as TextStyle,

    lg: {
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xxxl - 4,
    } as ViewStyle,
    lgText: {
      fontSize: 17,
    } as TextStyle,

    // Variants
    primary: {
      backgroundColor: colors.focus,
    } as ViewStyle,
    primaryText: {
      color: '#FFFFFF',
    } as TextStyle,

    accent: {
      backgroundColor: colors.accent,
    } as ViewStyle,
    accentText: {
      color: '#FFFFFF',
    } as TextStyle,

    secondary: {
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
      borderWidth: 1,
    } as ViewStyle,
    secondaryText: {
      color: colors.textPrimary,
    } as TextStyle,

    danger: {
      backgroundColor: colors.danger,
    } as ViewStyle,
    dangerText: {
      color: '#FFFFFF',
    } as TextStyle,

    ghost: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    ghostText: {
      color: colors.textSecondary,
    } as TextStyle,

    // Disabled
    disabled: {
      backgroundColor: colors.cardBorder,
      opacity: 0.6,
    } as ViewStyle,
    disabledText: {
      color: colors.textMuted,
    } as TextStyle,
  });
