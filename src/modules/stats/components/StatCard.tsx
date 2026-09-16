import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  value: string | number;
  label: string;
  sublabel?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconColor,
  value,
  label,
  sublabel,
}) => {
  const { styles } = useThemedStyles(createStyles);

  return (
    <Card style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
    </Card>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      flex: 1,
      minWidth: 140,
      alignItems: 'center',
      paddingVertical: SPACING.lg + 2,
    } as ViewStyle,
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SPACING.sm + 2,
    } as ViewStyle,
    value: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: -0.5,
      color: colors.textPrimary,
    } as TextStyle,
    label: {
      fontSize: 13,
      fontWeight: '500',
      marginTop: 2,
      textAlign: 'center',
      color: colors.textSecondary,
    } as TextStyle,
    sublabel: {
      fontSize: 11,
      marginTop: 2,
      color: colors.textMuted,
    } as TextStyle,
  });
