import { StyleSheet, TextStyle } from 'react-native';

export const typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  } as TextStyle,
  h2: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.4,
  } as TextStyle,
  h3: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  } as TextStyle,
  title: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  body: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  } as TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '400',
  } as TextStyle,
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  } as TextStyle,
  badge: {
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,
  timerDisplay: {
    fontSize: 60,
    fontWeight: '800',
    letterSpacing: -1.5,
    fontVariant: ['tabular-nums'],
  } as TextStyle,
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.2,
  } as TextStyle,
});
