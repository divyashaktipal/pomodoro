import React, { forwardRef } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

/**
 * 4. Interface Segregation Principle (ISP)
 * Segregating input concerns into granular, focused interfaces
 * so callers and sub-elements only depend on what they strictly need.
 */
export interface InputLabelProps {
  label?: string;
  required?: boolean;
}

export interface InputValidationProps {
  error?: string | null;
  touched?: boolean;
  helperText?: string;
}

export interface InputAdornmentProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightAction?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
}

/**
 * 3. Liskov Substitution Principle (LSP)
 * ThemedTextInputProps extends standard TextInputProps directly,
 * guaranteeing ThemedTextInput can be substituted anywhere a React Native TextInput is expected.
 */
export interface ThemedTextInputProps
  extends TextInputProps,
    InputLabelProps,
    InputValidationProps,
    InputAdornmentProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * TextInput with useRef + forwardRef support, adhering to:
 * - SRP: Handles input rendering, adornments, and focused border state
 * - OCP: Open to extension via leftIcon, rightAction, and all TextInputProps
 * - LSP: Fully substitutable for standard React Native TextInput
 * - ISP: Uses segregated prop interfaces
 */
export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  (
    {
      label,
      required,
      error,
      touched,
      helperText,
      leftIcon,
      rightAction,
      showClearButton,
      onClear,
      containerStyle,
      inputStyle,
      value,
      ...textInputProps
    },
    ref
  ) => {
    const { styles, colors } = useThemedStyles(createStyles);
    const [isFocused, setIsFocused] = React.useState(false);

    const hasError = Boolean(touched && error);

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label ? (
          <View style={styles.labelRow}>
            <Text style={styles.label}>{label}</Text>
            {required ? <Text style={styles.requiredStar}>*</Text> : null}
          </View>
        ) : null}

        <View
          style={[
            styles.inputContainer,
            isFocused ? styles.inputFocused : null,
            hasError ? styles.inputError : null,
          ]}
        >
          {leftIcon ? (
            <Ionicons
              name={leftIcon}
              size={18}
              color={isFocused ? colors.focus : colors.textMuted}
              style={styles.leftIcon}
            />
          ) : null}

          <TextInput
            ref={ref}
            value={value}
            placeholderTextColor={colors.textMuted}
            style={[styles.input, inputStyle]}
            onFocus={(e) => {
              setIsFocused(true);
              textInputProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              textInputProps.onBlur?.(e);
            }}
            {...textInputProps}
          />

          {showClearButton && value && value.length > 0 && onClear ? (
            <TouchableOpacity
              onPress={onClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}

          {rightAction ? (
            <View style={styles.rightAction}>{rightAction}</View>
          ) : null}
        </View>

        {hasError ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
      </View>
    );
  }
);

ThemedTextInput.displayName = 'ThemedTextInput';

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
    } as ViewStyle,
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.xs + 2,
    } as ViewStyle,
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textSecondary,
    } as TextStyle,
    requiredStar: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.danger,
      marginLeft: 2,
    } as TextStyle,
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surface,
      paddingHorizontal: SPACING.md,
      minHeight: 48,
    } as ViewStyle,
    inputFocused: {
      borderColor: colors.focus,
    } as ViewStyle,
    inputError: {
      borderColor: colors.danger,
    } as ViewStyle,
    input: {
      flex: 1,
      color: colors.textPrimary,
      fontSize: 15,
      paddingVertical: SPACING.md,
    } as TextStyle,
    leftIcon: {
      marginRight: SPACING.sm + 2,
    } as TextStyle,
    clearButton: {
      padding: SPACING.xs,
      marginLeft: SPACING.xs,
    } as ViewStyle,
    rightAction: {
      marginLeft: SPACING.xs,
    } as ViewStyle,
    errorText: {
      fontSize: 12,
      color: colors.danger,
      marginTop: SPACING.xs,
    } as TextStyle,
    helperText: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: SPACING.xs,
    } as TextStyle,
  });
