import { StyleSheet, ViewStyle } from 'react-native';
import { SPACING, BORDER_RADIUS } from './spacing';

export const globalStyles = StyleSheet.create({
  // Flexbox Layouts
  flex1: {
    flex: 1,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
  } as ViewStyle,
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  alignCenter: {
    alignItems: 'center',
  } as ViewStyle,
  justifyCenter: {
    justifyContent: 'center',
  } as ViewStyle,
  column: {
    flexDirection: 'column',
  } as ViewStyle,

  // Common Layout Wrappers
  screenContainer: {
    flex: 1,
  } as ViewStyle,
  contentContainer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.huge,
  } as ViewStyle,
  cardBase: {
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.lg,
  } as ViewStyle,

  // Shadows
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  } as ViewStyle,
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  } as ViewStyle,
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 6,
  } as ViewStyle,
});
