import React from 'react';
import { useHaptics } from '@/hooks/useHaptics';

export interface WithHapticsOptions {
  feedbackType?: 'impact' | 'selection' | 'notification';
}

/**
 * 2. Open/Closed Principle (OCP)
 * Higher-Order Component (HOC) that extends any pressable component
 * with tactile haptic feedback without altering its original implementation.
 */
export function withHaptics<P extends { onPress?: () => void }>(
  WrappedComponent: React.ComponentType<P>,
  options: WithHapticsOptions = {}
) {
  const ComponentWithHaptics = (props: P) => {
    const { triggerImpact, triggerSelection, triggerNotification } = useHaptics();

    const handlePress = () => {
      switch (options.feedbackType) {
        case 'notification':
          triggerNotification();
          break;
        case 'impact':
          triggerImpact();
          break;
        case 'selection':
        default:
          triggerSelection();
          break;
      }
      props.onPress?.();
    };

    return <WrappedComponent {...props} onPress={handlePress} />;
  };

  ComponentWithHaptics.displayName = `WithHaptics(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return ComponentWithHaptics;
}
