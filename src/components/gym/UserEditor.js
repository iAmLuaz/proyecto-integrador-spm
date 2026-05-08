// src/components/gym/UserEditor.js
// Editor para una persona dentro de Settings: nombre, icono (emoji o ion),
// color. Soporta eliminación si hay más de 1 usuario.

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Input from '../Input.js';
import Button from '../Button.js';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, SHADOW, FONT, SPACING } from '../../theme/theme.js';
import {
  COLOR_PRESETS,
  ICON_PRESETS,
  ICON_LIBRARY,
} from '../../types/gym.js';
import { renderUserGlyph, hexToRgba, ION_PREFIX } from './PersonBadge.js';

const TABS = [
  { key: 'emoji', label: 'Emojis', icon: 'happy-outline' },
  { key: 'icon', label: 'Iconos', icon: 'sparkles-outline' },
];

const UserEditor = ({ user, otherUsers, onChange, onRemove, canRemove }) => {
  const [tab, setTab] = useState(
    user?.icon?.startsWith?.(ION_PREFIX) ? 'icon' : 'emoji'
  );

  const colorTaken = (c) =>
    otherUsers.some((u) => u.color.toLowerCase() === c.toLowerCase());
  const nameTaken = (n) =>
    otherUsers.some(
      (u) => u.name.trim().toLowerCase() === n.trim().toLowerCase()
    );

  const nameError =
    !user.name.trim()
      ? 'Nombre requerido.'
      : nameTaken(user.name)
        ? 'Ese nombre ya existe.'
        : null;

  const list = tab === 'emoji' ? ICON_PRESETS : ICON_LIBRARY;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={[styles.preview, { backgroundColor: hexToRgba(user.color, 0.18), borderColor: user.color }]}>
          {renderUserGlyph(user.icon, user.color, 22)}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{user.name || 'Sin nombre'}</Text>
          <Text style={styles.subtitle}>Personaliza nombre, icono y color.</Text>
        </View>
      </View>

      <Input
        label="Nombre"
        value={user.name}
        onChangeText={(t) => onChange({ ...user, name: t.slice(0, 30) })}
        placeholder="Ej. Yeli"
        error={nameError}
      />

      <Text style={styles.label}>Icono</Text>
      <View style={styles.tabs}>
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key)}
              style={[
                styles.tab,
                active && {
                  backgroundColor: PALETTE.accent,
                  borderColor: PALETTE.accent,
                },
              ]}
            >
              <Ionicons
                name={t.icon}
                size={14}
                color={active ? '#FFFFFF' : PALETTE.textMuted}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: active ? '#FFFFFF' : PALETTE.textMuted },
                ]}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.gridRow}>
        {list.map((g) => {
          const active = user.icon === g;
          return (
            <Pressable
              key={g}
              onPress={() => onChange({ ...user, icon: g })}
              style={[
                styles.glyphCell,
                active && {
                  borderColor: user.color,
                  backgroundColor: hexToRgba(user.color, 0.15),
                },
              ]}
            >
              {renderUserGlyph(g, user.color, 18)}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Color</Text>
      <View style={styles.gridRow}>
        {COLOR_PRESETS.map((c) => {
          const active = user.color.toLowerCase() === c.toLowerCase();
          const taken = !active && colorTaken(c);
          return (
            <Pressable
              key={c}
              disabled={taken}
              onPress={() => onChange({ ...user, color: c })}
              style={[
                styles.colorSwatch,
                {
                  backgroundColor: c,
                  opacity: taken ? 0.25 : 1,
                  borderColor: active ? PALETTE.text : 'transparent',
                  borderWidth: active ? 3 : 0,
                },
              ]}
            />
          );
        })}
      </View>

      {canRemove ? (
        <View style={{ marginTop: SPACING.md }}>
          <Button
            title="Eliminar persona"
            variant="dangerSoft"
            icon="trash-outline"
            onPress={onRemove}
            size="sm"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  preview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  title: { fontSize: FONT.size.xl, fontWeight: FONT.weight.bold, color: PALETTE.text },
  subtitle: { fontSize: FONT.size.sm, color: PALETTE.textMuted, marginTop: 2 },
  label: {
    color: PALETTE.text,
    fontWeight: FONT.weight.semibold,
    fontSize: FONT.size.md,
    marginTop: SPACING.sm,
    marginBottom: 6,
  },
  tabs: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: PALETTE.border,
    backgroundColor: PALETTE.surfaceAlt,
  },
  tabLabel: { fontWeight: FONT.weight.semibold, fontSize: FONT.size.sm },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  glyphCell: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: PALETTE.border,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSwatch: { width: 36, height: 36, borderRadius: 18 },
});

export default UserEditor;
