// src/components/calendar/DayDetailModal.js
// Modal con el detalle de un día: lista de usuarios con su log o un CTA de
// "agregar". Permite editar/borrar.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppModal from '../ui/AppModal.js';
import Button from '../Button.js';
import { PALETTE, RADIUS, FONT, SPACING } from '../../theme/theme.js';
import {
  renderUserGlyph,
  hexToRgba,
} from '../gym/PersonBadge.js';
import { formatLongDate } from '../../utils/dates.js';

const PersonRow = ({ user, log, onAdd, onEdit, onDelete }) => (
  <View
    style={[
      styles.row,
      { borderColor: hexToRgba(user.color, 0.3) },
    ]}
  >
    <View
      style={[
        styles.avatar,
        {
          backgroundColor: hexToRgba(user.color, 0.18),
          borderColor: user.color,
        },
      ]}
    >
      {renderUserGlyph(user.icon, user.color, 18)}
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.name}>{user.name}</Text>
      {log ? (
        <Text style={styles.meta}>
          {log.routines} rutina{log.routines === 1 ? '' : 's'}
          {log.notes ? ` · ${log.notes}` : ''}
        </Text>
      ) : (
        <Text style={styles.metaMuted}>Sin registro</Text>
      )}
    </View>
    <View style={styles.actions}>
      {log ? (
        <>
          <Button
            title="Editar"
            icon="pencil"
            variant="secondary"
            size="sm"
            onPress={() => onEdit(log)}
          />
          <Button
            title=""
            icon="trash-outline"
            variant="dangerSoft"
            size="sm"
            onPress={() => onDelete(log)}
          />
        </>
      ) : (
        <Button
          title="Agregar"
          icon="add"
          size="sm"
          onPress={() => onAdd(user)}
        />
      )}
    </View>
  </View>
);

const DayDetailModal = ({
  visible,
  date,
  users,
  logs,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}) => {
  if (!date) return null;
  const logsByUser = {};
  (logs || []).forEach((l) => {
    if (l.date === date) logsByUser[l.personId] = l;
  });

  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      title={formatLongDate(date)}
      subtitle="Detalle del día"
      footer={
        <Button
          title="Cerrar"
          variant="secondary"
          onPress={onClose}
          fullWidth
        />
      }
    >
      <View style={{ gap: SPACING.sm }}>
        {users.map((u) => (
          <PersonRow
            key={u.id}
            user={u}
            log={logsByUser[u.id]}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    backgroundColor: PALETTE.surface,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  name: { color: PALETTE.text, fontSize: FONT.size.lg, fontWeight: FONT.weight.bold },
  meta: { color: PALETTE.textMuted, fontSize: FONT.size.sm, marginTop: 2 },
  metaMuted: { color: PALETTE.textSubtle, fontSize: FONT.size.sm, fontStyle: 'italic' },
  actions: { flexDirection: 'row', gap: 6 },
});

export default DayDetailModal;
