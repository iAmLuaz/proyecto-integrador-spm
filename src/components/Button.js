// src/components/Button.js
// Botón base reutilizable con variantes (incluye gradiente).

import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING, GRADIENTS } from '../theme/theme.js';

const VARIANTS = {
  primary: {
    bg: PALETTE.accent,
    fg: '#FFFFFF',
    border: PALETTE.accent,
    gradient: GRADIENTS.primary,
  },
  secondary: { bg: PALETTE.surfaceAlt, fg: PALETTE.text, border: PALETTE.border },
  ghost: { bg: 'transparent', fg: PALETTE.text, border: 'transparent' },
  danger: {
    bg: PALETTE.danger,
    fg: '#FFFFFF',
    border: PALETTE.danger,
    gradient: GRADIENTS.danger,
  },
  dangerSoft: { bg: PALETTE.dangerSoft, fg: PALETTE.danger, border: '#F5C6BD' },
  success: {
    bg: PALETTE.success,
    fg: '#FFFFFF',
    border: PALETTE.success,
    gradient: GRADIENTS.success,
  },
};

const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  size = 'md',
  gradient = false,
}) => {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const blocked = disabled || loading;
  const useGradient = gradient && Array.isArray(v.gradient);
  const pad =
    size === 'sm'
      ? { paddingVertical: 9, paddingHorizontal: 14 }
      : { paddingVertical: 13, paddingHorizontal: 20 };

  const content = loading ? (
    <ActivityIndicator color={v.fg} />
  ) : (
    <View style={styles.row}>
      {icon ? (
        typeof icon === 'string' ? (
          <Ionicons
            name={icon}
            size={size === 'sm' ? 15 : 17}
            color={v.fg}
            style={styles.icon}
          />
        ) : (
          icon
        )
      ) : null}
      <Text style={[styles.label, { color: v.fg, fontSize: size === 'sm' ? 13 : 15 }]}>
        {title}
      </Text>
    </View>
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={blocked}
      style={({ pressed }) => [
        styles.base,
        pad,
        useGradient
          ? { backgroundColor: 'transparent', borderColor: 'transparent' }
          : { backgroundColor: v.bg, borderColor: v.border },
        useGradient && styles.shadowed,
        {
          opacity: blocked ? 0.55 : pressed ? 0.92 : 1,
          width: fullWidth ? '100%' : undefined,
          transform: pressed && !blocked ? [{ scale: 0.98 }] : [{ scale: 1 }],
        },
      ]}
    >
      {useGradient ? (
        <LinearGradient
          colors={v.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: RADIUS.md }]}
        />
      ) : null}
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shadowed: {
    shadowColor: '#FF5757',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { fontWeight: FONT.weight.bold, letterSpacing: 0.2 },
  icon: { marginRight: 8 },
});

export default Button;
