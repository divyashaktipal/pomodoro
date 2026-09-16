import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { typography } from '@/styles/typography';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'badge'
  | 'timer'
  | 'brand';

export type TextColorVariant =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'focus'
  | 'accent'
  | 'success'
  | 'white';

export interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  colorVariant?: TextColorVariant;
  children: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body',
  colorVariant = 'primary',
  style,
  children,
  ...rest
}) => {
  const { styles } = useThemedStyles(createStyles);

  const variantStyle = typography[variant === 'timer' ? 'timerDisplay' : variant === 'brand' ? 'brandTitle' : variant];
  const colorStyle = styles[colorVariant];

  return (
    <Text style={[variantStyle, colorStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    primary: {
      color: colors.textPrimary,
    } as TextStyle,
    secondary: {
      color: colors.textSecondary,
    } as TextStyle,
    muted: {
      color: colors.textMuted,
    } as TextStyle,
    focus: {
      color: colors.focus,
    } as TextStyle,
    accent: {
      color: colors.accent,
    } as TextStyle,
    success: {
      color: colors.success,
    } as TextStyle,
    white: {
      color: '#FFFFFF',
    } as TextStyle,
  });
