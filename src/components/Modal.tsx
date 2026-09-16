import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { ThemeColors } from '@/constants/colors';
import { BORDER_RADIUS, SPACING } from '@/styles/spacing';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const { styles, colors } = useThemedStyles(createStyles);

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.keyboardContainer}
            >
              <View style={styles.modalContent}>
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity
                    onPress={onClose}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={18} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.body}>{children}</View>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: SPACING.xl,
    } as ViewStyle,
    keyboardContainer: {
      width: '100%',
      maxWidth: 440,
    } as ViewStyle,
    modalContent: {
      width: '100%',
      backgroundColor: colors.card,
      borderColor: colors.cardBorder,
      borderRadius: BORDER_RADIUS.xxl,
      borderWidth: 1,
      padding: SPACING.xl,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 8,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.lg + 2,
    } as ViewStyle,
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textPrimary,
    } as TextStyle,
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    body: {
      width: '100%',
    } as ViewStyle,
  });
