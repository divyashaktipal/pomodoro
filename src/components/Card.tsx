import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

/**
 * 2. Open/Closed Principle (OCP)
 * Card component is open for extension via composition, slots (header, footer),
 * and render props (renderHeader, renderFooter) without modifying core layout code.
 */
export interface CardProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  renderHeader,
  renderFooter,
  style,
}) => {
  const { styles } = useThemedStyles(createStyles);

  return (
    <View style={[styles.card, style]}>
      {header ? header : renderHeader ? renderHeader() : null}
      {children}
      {footer ? footer : renderFooter ? renderFooter() : null}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderColor: colors.cardBorder,
      borderRadius: BORDER_RADIUS.xl,
      borderWidth: 1,
      padding: SPACING.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
    } as ViewStyle,
  });
