import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useForm } from '@/hooks/useForm';
import { FormValidators } from '@/types/form.types';
import { useTaskStore } from '../store/useTaskStore';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

interface TaskFormValues {
  title: string;
  estimatedPomodoros: number;
}

const validators: FormValidators<TaskFormValues> = {
  title: (value) => {
    if (!value || !value.trim()) return 'Task title is required';
    if (value.trim().length > 60) return 'Task title must be under 60 characters';
    return null;
  },
  estimatedPomodoros: (value) => {
    if (value < 1 || value > 10) return 'Estimate must be between 1 and 10';
    return null;
  },
};

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ visible, onClose }) => {
  const { styles, colors } = useThemedStyles(createStyles);
  const { addTask } = useTaskStore();

  /**
   * useRef for Better TextInput Handling:
   * Programmatic focus management, keyboard control, and imperative actions
   */
  const titleInputRef = useRef<TextInput>(null);

  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
  } = useForm<TaskFormValues>({
    initialValues: {
      title: '',
      estimatedPomodoros: 2,
    },
    validators,
    onSubmit: (formValues) => {
      addTask(formValues.title.trim(), formValues.estimatedPomodoros);
      titleInputRef.current?.blur();
      resetForm();
      onClose();
    },
  });

  // Programmatically focus input when modal becomes visible
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal visible={visible} onClose={onClose} title="Add New Task">
      <View style={styles.content}>
        {/* ThemedTextInput utilizing useRef (LSP + ISP + SRP) */}
        <ThemedTextInput
          ref={titleInputRef}
          label="What are you working on?"
          required
          value={values.title}
          onChangeText={(val) => setFieldValue('title', val)}
          onBlur={() => setFieldTouched('title')}
          placeholder="e.g. Design app architecture"
          leftIcon="create-outline"
          showClearButton
          onClear={() => {
            setFieldValue('title', '');
            titleInputRef.current?.focus();
          }}
          error={errors.title}
          touched={touched.title}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />

        <Text style={styles.labelWithMargin}>
          Estimated Pomodoros (25m sessions)
        </Text>
        <View style={styles.counterRow}>
          <TouchableOpacity
            onPress={() =>
              setFieldValue(
                'estimatedPomodoros',
                Math.max(1, values.estimatedPomodoros - 1)
              )
            }
            style={styles.counterButton}
          >
            <Ionicons name="remove" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.estimateValue}>
            <Ionicons name="flame" size={20} color={colors.focus} />
            <Text style={styles.estimateNumber}>{values.estimatedPomodoros}</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              setFieldValue(
                'estimatedPomodoros',
                Math.min(10, values.estimatedPomodoros + 1)
              )
            }
            style={styles.counterButton}
          >
            <Ionicons name="add" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <Button
            title="Create Task"
            onPress={handleSubmit}
            disabled={!values.title.trim()}
            style={styles.submitButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      width: '100%',
    } as ViewStyle,
    labelWithMargin: {
      fontSize: 13,
      fontWeight: '600',
      marginBottom: SPACING.sm,
      marginTop: SPACING.lg,
      color: colors.textSecondary,
    } as TextStyle,
    counterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.lg,
      marginVertical: SPACING.md,
    } as ViewStyle,
    counterButton: {
      width: 44,
      height: 44,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    estimateValue: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.sm,
      minWidth: 60,
      justifyContent: 'center',
    } as ViewStyle,
    estimateNumber: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.textPrimary,
    } as TextStyle,
    actions: {
      marginTop: SPACING.xl,
    } as ViewStyle,
    submitButton: {
      width: '100%',
    } as ViewStyle,
  });
