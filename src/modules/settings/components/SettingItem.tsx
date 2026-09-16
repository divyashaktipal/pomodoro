import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

/**
 * 4. Interface Segregation Principle (ISP)
 * Separating static content descriptors from user interaction handlers.
 */
export interface SettingContentProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  subtitle?: string;
}

export interface SettingInteractionProps {
  rightElement?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
}

export type SettingItemProps = SettingContentProps & SettingInteractionProps;

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconColor,
  title,
  subtitle,
  rightElement,
  onPress,
  showChevron = false,
}) => {
  const { styles, colors } = useThemedStyles(createStyles);

  const ContainerComponent = onPress ? TouchableOpacity : View;

  return (
    <ContainerComponent
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        {icon && (
          <View
            style={[
              styles.iconWrapper,
              iconColor ? { backgroundColor: `${iconColor}15` } : styles.iconWrapperDefault,
            ]}
          >
            <Ionicons
              name={icon}
              size={18}
              color={iconColor || colors.accent}
            />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        {rightElement}
        {showChevron && (
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        )}
      </View>
    </ContainerComponent>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SPACING.md + 2,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.cardBorder,
    } as ViewStyle,
    left: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingRight: SPACING.md,
    } as ViewStyle,
    iconWrapper: {
      width: 36,
      height: 36,
      borderRadius: BORDER_RADIUS.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SPACING.md,
    } as ViewStyle,
    iconWrapperDefault: {
      backgroundColor: colors.surface,
    } as ViewStyle,
    textContainer: {
      flex: 1,
    } as ViewStyle,
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.textPrimary,
    } as TextStyle,
    subtitle: {
      fontSize: 12,
      marginTop: 2,
      color: colors.textSecondary,
    } as TextStyle,
    right: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
    } as ViewStyle,
  });
