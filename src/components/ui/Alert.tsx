import { BorderRadius, Colors, IconSizes, Shadows, Spacing, Typography } from '@/constants/theme';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number; // Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
}

const ALERT_CONFIG = {
  error: {
    Icon: XCircle,
    color: Colors.error,
    bgColor: 'rgba(26, 26, 26, 0.98)', // Dark solid background
    accentBg: 'rgba(239, 68, 68, 0.12)', // Subtle colored overlay
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  success: {
    Icon: CheckCircle,
    color: Colors.success,
    bgColor: 'rgba(26, 26, 26, 0.98)',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  warning: {
    Icon: AlertCircle,
    color: Colors.warning,
    bgColor: 'rgba(26, 26, 26, 0.98)',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  info: {
    Icon: Info,
    color: Colors.info,
    bgColor: 'rgba(26, 26, 26, 0.98)',
    accentBg: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
};

export function Alert({
  type,
  title,
  message,
  visible,
  onDismiss,
  duration = 4000,
}: AlertProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const dismissTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const config = ALERT_CONFIG[type];
  const Icon = config.Icon;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Slide down and fade in
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss if duration is set
      if (duration > 0) {
        dismissTimeoutRef.current = setTimeout(() => {
          handleDismiss();
        }, duration);
      }
    } else {
      // Slide up and fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Only unmount after animation completes
        setShouldRender(false);
      });
    }

    return () => {
      if (dismissTimeoutRef.current) {
        clearTimeout(dismissTimeoutRef.current);
      }
    };
  }, [visible, duration]);

  const handleDismiss = () => {
    if (dismissTimeoutRef.current) {
      clearTimeout(dismissTimeoutRef.current);
    }
    onDismiss();
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Pressable onPress={handleDismiss} style={styles.pressable}>
        <View
          style={[
            styles.alertCard,
            {
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
            },
          ]}
        >
          {/* Colored accent overlay */}
          <View
            style={[
              styles.accentOverlay,
              { backgroundColor: config.accentBg },
            ]}
          />

          {/* Content */}
          <View style={styles.content}>
            <Icon color={config.color} size={IconSizes.md} strokeWidth={2.5} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingTop: Platform.select({
      ios: 60, // Account for notch/status bar
      android: 50,
      default: 20,
    }),
    paddingHorizontal: Spacing.lg,
  },
  pressable: {
    width: '100%',
  },
  alertCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadows.level4,
  },
  accentOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  textContainer: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    color: Colors.textWhite,
    fontSize: Typography.label.fontSize,
    fontWeight: Typography.label.fontWeight,
    lineHeight: Typography.label.lineHeight,
  },
  message: {
    color: Colors.textGrayLight,
    fontSize: Typography.bodySmall.fontSize,
    fontWeight: Typography.bodySmall.fontWeight,
    lineHeight: Typography.bodySmall.lineHeight,
  },
});
