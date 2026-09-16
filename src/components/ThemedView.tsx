import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { globalStyles } from '@/styles/globalStyles';

export type ViewVariant = 'background' | 'surface' | 'card' | 'transparent';

export interface ThemedViewProps extends ViewProps {
  variant?: ViewVariant;
  flex?: boolean;
  center?: boolean;
  row?: boolean;
  rowBetween?: boolean;
  children?: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  variant = 'background',
  flex = false,
  center = false,
  row = false,
  rowBetween = false,
  style,
  children,
  ...rest
}) => {
  const { styles } = useThemedStyles(createStyles);

  return (
    <View
      style={[
        styles[variant],
        flex && globalStyles.flex1,
        center && globalStyles.center,
        row && globalStyles.rowCenter,
        rowBetween && globalStyles.rowBetween,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.background,
    } as ViewStyle,
    surface: {
      backgroundColor: colors.surface,
    } as ViewStyle,
    card: {
      backgroundColor: colors.card,
      borderColor: colors.cardBorder,
      borderWidth: 1,
    } as ViewStyle,
    transparent: {
      backgroundColor: 'transparent',
    } as ViewStyle,
  });
