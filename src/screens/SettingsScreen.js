// src/screens/SettingsScreen.js
// Pantalla de Settings — se muestra como segundo pane del slider en App.js.
// Permite gestionar usuarios y notificaciones.

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  PALETTE,
  RADIUS,
  SHADOW,
  SPACING,
  FONT,
  GRADIENTS,
} from '../theme/theme.js';
import Button from '../components/Button.js';
import Input from '../components/Input.js';
import Icon from '../components/Icon.js';
import UserEditor from '../components/gym/UserEditor.js';
import ConfirmDialog from '../components/ui/ConfirmDialog.js';
import { useToast } from '../components/ui/Toast.js';
import { COLOR_PRESETS, ICON_PRESETS, newUserId } from '../types/gym.js';

const SettingsScreen = ({ settings, onSave, onBack }) => {
  const toast = useToast();
  const [draft, setDraft] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [removeId, setRemoveId] = useState(null);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  if (!draft) return null;

  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);

  const updateUser = (id, next) => {
    setDraft({
      ...draft,
      users: draft.users.map((u) => (u.id === id ? next : u)),
    });
  };

  const addUser = () => {
    if (draft.users.length >= 6) {
      toast.show('Máximo 6 personas.', 'info');
      return;
    }
    const usedColors = draft.users.map((u) => u.color.toLowerCase());
    const color =
      COLOR_PRESETS.find((c) => !usedColors.includes(c.toLowerCase())) ||
      COLOR_PRESETS[0];
    const usedIcons = draft.users.map((u) => u.icon);
    const icon = ICON_PRESETS.find((i) => !usedIcons.includes(i)) || '👤';
    setDraft({
      ...draft,
      users: [
        ...draft.users,
        {
          id: newUserId(),
          name: '',
          icon,
          color,
          createdAt: Date.now(),
        },
      ],
    });
  };

  const removeUser = () => {
    if (!removeId) return;
    setDraft({
      ...draft,
      users: draft.users.filter((u) => u.id !== removeId),
    });
    setRemoveId(null);
  };

  const setNotif = (next) => {
    setDraft({ ...draft, notifications: { ...draft.notifications, ...next } });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(draft);
      toast.show('Cambios guardados', 'success');
      onBack();
    } catch (e) {
      toast.show(e.message || 'Error al guardar', 'error');
    } finally {
      setSaving(false);
    }
  };

  const adjustHour = (d) => {
    const h = (draft.notifications.hour + d + 24) % 24;
    setNotif({ hour: h });
  };
  const adjustMinute = (d) => {
    const m = (draft.notifications.minute + d * 5 + 60) % 60;
    setNotif({ minute: m });
  };

  return (
    <View style={{ flex: 1, backgroundColor: PALETTE.bg }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <LinearGradient
          colors={GRADIENTS.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroRow}>
            <Pressable onPress={onBack} style={styles.backBtn} hitSlop={8}>
              <Icon name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Configuración</Text>
              <Text style={styles.heroSubtitle}>
                Personas, recordatorios y más
              </Text>
            </View>
            <Icon name="settings-outline" size={26} color="#FFFFFF" />
          </View>
        </LinearGradient>

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Sección personas */}
          <View style={styles.sectionHeader}>
            <Icon name="people-outline" size={16} color={PALETTE.textMuted} />
            <Text style={styles.sectionLabel}>Personas</Text>
          </View>

          {draft.users.map((u) => (
            <UserEditor
              key={u.id}
              user={u}
              otherUsers={draft.users.filter((x) => x.id !== u.id)}
              onChange={(next) => updateUser(u.id, next)}
              onRemove={() => setRemoveId(u.id)}
              canRemove={draft.users.length > 1}
            />
          ))}

          <Button
            title="Agregar persona"
            icon="person-add"
            variant="secondary"
            onPress={addUser}
            fullWidth
          />

          {/* Sección notificaciones */}
          <View style={[styles.sectionHeader, { marginTop: SPACING.xl }]}>
            <Icon name="notifications-outline" size={16} color={PALETTE.textMuted} />
            <Text style={styles.sectionLabel}>Recordatorios</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Recordatorio diario</Text>
                <Text style={styles.rowMeta}>
                  Te avisaremos para registrar tu entrenamiento.
                </Text>
              </View>
              <Switch
                value={draft.notifications.enabled}
                onValueChange={(v) => setNotif({ enabled: v })}
                trackColor={{ true: PALETTE.accent, false: PALETTE.border }}
                thumbColor="#FFFFFF"
              />
            </View>

            {draft.notifications.enabled ? (
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>Hora</Text>
                <View style={styles.timeStepper}>
                  <Pressable
                    style={styles.timeBtn}
                    onPress={() => adjustHour(-1)}
                  >
                    <Icon name="remove" size={16} color={PALETTE.text} />
                  </Pressable>
                  <Text style={styles.timeValue}>
                    {String(draft.notifications.hour).padStart(2, '0')}
                  </Text>
                  <Pressable
                    style={styles.timeBtn}
                    onPress={() => adjustHour(1)}
                  >
                    <Icon name="add" size={16} color={PALETTE.text} />
                  </Pressable>
                </View>
                <Text style={styles.timeSep}>:</Text>
                <View style={styles.timeStepper}>
                  <Pressable
                    style={styles.timeBtn}
                    onPress={() => adjustMinute(-1)}
                  >
                    <Icon name="remove" size={16} color={PALETTE.text} />
                  </Pressable>
                  <Text style={styles.timeValue}>
                    {String(draft.notifications.minute).padStart(2, '0')}
                  </Text>
                  <Pressable
                    style={styles.timeBtn}
                    onPress={() => adjustMinute(1)}
                  >
                    <Icon name="add" size={16} color={PALETTE.text} />
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Footer fijo */}
        <View style={styles.footer}>
          <View style={{ flex: 1 }}>
            <Button
              title="Cancelar"
              variant="secondary"
              onPress={onBack}
              fullWidth
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Guardar"
              icon="checkmark"
              gradient
              disabled={!dirty}
              loading={saving}
              onPress={handleSave}
              fullWidth
            />
          </View>
        </View>
      </SafeAreaView>

      <ConfirmDialog
        visible={!!removeId}
        title="¿Eliminar persona?"
        message="Sus registros existentes se mantendrán en el historial."
        confirmLabel="Eliminar"
        onConfirm={removeUser}
        onCancel={() => setRemoveId(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: FONT.size.xxl,
    fontWeight: FONT.weight.bold,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: FONT.size.sm,
    marginTop: 2,
  },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    color: PALETTE.textMuted,
    fontSize: FONT.size.sm,
    fontWeight: FONT.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  card: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.lg,
    ...SHADOW.card,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  rowTitle: {
    color: PALETTE.text,
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
  },
  rowMeta: { color: PALETTE.textMuted, fontSize: FONT.size.sm, marginTop: 2 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  timeLabel: { color: PALETTE.text, fontSize: FONT.size.md, fontWeight: FONT.weight.semibold },
  timeStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surfaceAlt,
    borderRadius: RADIUS.md,
    paddingHorizontal: 6,
    gap: 6,
  },
  timeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PALETTE.surface,
  },
  timeValue: {
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
    color: PALETTE.text,
    minWidth: 24,
    textAlign: 'center',
  },
  timeSep: {
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
    color: PALETTE.text,
  },
  footer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
    backgroundColor: PALETTE.surface,
  },
});

export default SettingsScreen;
