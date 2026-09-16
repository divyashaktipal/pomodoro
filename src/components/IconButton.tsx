import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useHaptics } from '@/hooks/useHaptics';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS } from '@/styles/spacing';

export type IconButtonVariant = 'surface' | 'card' | 'ghost' | 'primary';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  badgeCount?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'surface',
  size = 'md',
  badgeCount = 0,
  disabled = false,
  style,
  accessibilityLabel,
}) => {
  const { styles } = useThemedStyles(createStyles);
  const { triggerSelection } = useHaptics();

  const handlePress = () => {
    if (disabled) return;
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

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      disabled={disabled}
      style={containerStyle}
      accessibilityLabel={accessibilityLabel}
    >
      {icon}
      {badgeCount > 0 && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>
            {badgeCount > 9 ? '9+' : badgeCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.md,
      position: 'relative',
    } as ViewStyle,

    // Sizes
    sm: {
      width: 32,
      height: 32,
      borderRadius: BORDER_RADIUS.sm,
    } as ViewStyle,
    md: {
      width: 38,
      height: 38,
      borderRadius: BORDER_RADIUS.md,
    } as ViewStyle,
    lg: {
      width: 48,
      height: 48,
      borderRadius: BORDER_RADIUS.lg,
    } as ViewStyle,

    // Variants
    surface: {
      backgroundColor: colors.surface,
      borderColor: colors.cardBorder,
      borderWidth: 1,
    } as ViewStyle,
    card: {
      backgroundColor: colors.card,
      borderColor: colors.cardBorder,
      borderWidth: 1,
    } as ViewStyle,
    ghost: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    primary: {
      backgroundColor: colors.focus,
    } as ViewStyle,

    disabled: {
      opacity: 0.5,
    } as ViewStyle,

    // Badge
    badgeContainer: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.focus,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    } as ViewStyle,
    badgeText: {
      color: '#FFFFFF',
      fontSize: 9,
      fontWeight: '800',
    } as TextStyle,
  });
