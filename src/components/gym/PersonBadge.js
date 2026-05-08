// src/components/gym/PersonBadge.js
// Chip con icono y nombre. El icono puede ser un emoji o "ion:nombre".

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT } from '../../theme/theme.js';

export const ION_PREFIX = 'ion:';

export const hexToRgba = (hex, alpha) => {
  const h = (hex || '#FF5757').replace('#', '');
  const bigint = parseInt(
    h.length === 3 ? h.split('').map((c) => c + c).join('') : h,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const renderUserGlyph = (icon, color, size = 14) => {
  if (typeof icon === 'string' && icon.startsWith(ION_PREFIX)) {
    return <Ionicons name={icon.slice(ION_PREFIX.length)} size={size + 2} color={color} />;
  }
  return <Text style={{ fontSize: size }}>{icon}</Text>;
};

const PersonBadge = ({ user, size = 'md' }) => {
  if (!user) return null;
  const small = size === 'sm';
  const glyphSize = small ? 12 : 14;
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: hexToRgba(user.color, 0.12),
          borderColor: hexToRgba(user.color, 0.4),
          paddingVertical: small ? 4 : 6,
          paddingHorizontal: small ? 8 : 12,
        },
      ]}
    >
      {renderUserGlyph(user.icon, user.color, glyphSize)}
      <Text
        style={[
          styles.label,
          { color: PALETTE.text, fontSize: small ? FONT.size.sm : FONT.size.md },
        ]}
        numberOfLines={1}
      >
        {user.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    gap: 6,
    maxWidth: 200,
  },
  label: { fontWeight: FONT.weight.semibold },
});

export default PersonBadge;
