// src/components/gym/GymLogForm.js
// Formulario reutilizable para crear o editar un registro de gym.

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Input from '../Input.js';
import { Ionicons } from '@expo/vector-icons';
import { PALETTE, RADIUS, FONT, SPACING } from '../../theme/theme.js';
import { todayISO } from '../../utils/dates.js';
import { renderUserGlyph, hexToRgba } from './PersonBadge.js';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const GymLogForm = forwardRef(function GymLogForm(
  {
    initial = null,
    users = [],
    defaultDate = todayISO(),
    defaultPersonId = null,
    onSubmit,
    onValidityChange,
  },
  ref
) {
  const [personId, setPersonId] = useState(
    initial?.personId || defaultPersonId || users[0]?.id || ''
  );
  const [date, setDate] = useState(initial?.date || defaultDate);
  const [routines, setRoutines] = useState(
    initial?.routines ? String(initial.routines) : '1'
  );
  const [notes, setNotes] = useState(initial?.notes || '');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!personId && users.length > 0) setPersonId(users[0].id);
  }, [users, personId]);

  const validate = useMemo(() => {
    return () => {
      const next = {};
      if (!personId) next.personId = 'Selecciona una persona.';
      if (!isoDateRegex.test(date)) next.date = 'Formato YYYY-MM-DD.';
      const r = Number(routines);
      if (!Number.isFinite(r) || r < 1 || r > 50)
        next.routines = 'Entre 1 y 50.';
      return next;
    };
  }, [personId, date, routines]);

  useEffect(() => {
    const e = validate();
    setErrors(e);
    if (onValidityChange) onValidityChange(Object.keys(e).length === 0);
  }, [personId, date, routines, validate, onValidityChange]);

  const submit = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return false;
    try {
      setSubmitting(true);
      await onSubmit({
        personId,
        date,
        routines: Number(routines),
        notes: notes.trim(),
      });
      return true;
    } finally {
      setSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({ submit, submitting }), [submit, submitting]);

  const adjustRoutines = (delta) => {
    const n = Math.max(1, Math.min(50, (Number(routines) || 0) + delta));
    setRoutines(String(n));
  };

  return (
    <View>
      <Text style={styles.label}>Persona</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.personRow}
      >
        {users.map((u) => {
          const active = u.id === personId;
          return (
            <Pressable
              key={u.id}
              onPress={() => setPersonId(u.id)}
              style={[
                styles.personChip,
                {
                  backgroundColor: active
                    ? hexToRgba(u.color, 0.18)
                    : PALETTE.surface,
                  borderColor: active ? u.color : PALETTE.border,
                  borderWidth: active ? 2 : 1,
                },
              ]}
            >
              {renderUserGlyph(u.icon, u.color, 16)}
              <Text style={[styles.personName, { color: PALETTE.text }]}>
                {u.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {errors.personId ? (
        <Text style={styles.errorText}>{errors.personId}</Text>
      ) : null}

      <View style={{ height: SPACING.md }} />

      <View style={styles.dateRow}>
        <View style={{ flex: 1 }}>
          <Input
            label="Fecha"
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            error={errors.date}
          />
        </View>
        <Pressable
          onPress={() => setDate(todayISO())}
          style={styles.todayBtn}
          hitSlop={6}
        >
          <Ionicons name="calendar" size={14} color={PALETTE.accent} />
          <Text style={styles.todayBtnText}>Hoy</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Rutinas</Text>
      <View style={styles.stepperRow}>
        <Pressable
          onPress={() => adjustRoutines(-1)}
          style={styles.stepBtn}
          hitSlop={6}
        >
          <Ionicons name="remove" size={20} color={PALETTE.text} />
        </Pressable>
        <View style={styles.stepValueWrap}>
          <Input
            value={routines}
            onChangeText={(t) => setRoutines(t.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            error={errors.routines}
          />
        </View>
        <Pressable
          onPress={() => adjustRoutines(1)}
          style={styles.stepBtn}
          hitSlop={6}
        >
          <Ionicons name="add" size={20} color={PALETTE.text} />
        </Pressable>
      </View>

      <Input
        label="Notas (opcional)"
        value={notes}
        onChangeText={setNotes}
        placeholder="¿Qué entrenaron hoy?"
        multiline
        hint={`${notes.length}/500`}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    color: PALETTE.text,
    fontWeight: FONT.weight.semibold,
    fontSize: FONT.size.md,
    marginBottom: 6,
  },
  personRow: { gap: SPACING.sm, paddingVertical: 4, paddingRight: SPACING.md },
  personChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.pill,
  },
  personName: { fontWeight: FONT.weight.semibold, fontSize: FONT.size.md },
  errorText: { color: PALETTE.danger, fontSize: FONT.size.sm, marginTop: 4 },
  dateRow: { flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.sm },
  todayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 24,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: PALETTE.borderStrong,
    backgroundColor: PALETTE.surface,
  },
  todayBtnText: {
    color: PALETTE.accent,
    fontWeight: FONT.weight.bold,
    fontSize: FONT.size.sm,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  stepBtn: {
    width: 44,
    height: 48,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: PALETTE.border,
    backgroundColor: PALETTE.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValueWrap: { flex: 1 },
});

export default GymLogForm;
