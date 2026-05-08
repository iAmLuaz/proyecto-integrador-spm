// src/components/gym/MonthWinnerModal.js
// Anuncio del ganador del mes anterior.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppModal from '../ui/AppModal.js';
import Button from '../Button.js';
import Icon from '../Icon.js';
import { PALETTE, RADIUS, FONT, SPACING } from '../../theme/theme.js';
import { renderUserGlyph, hexToRgba } from './PersonBadge.js';

const Section = ({ icon, color, label, winner }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Icon name={icon} size={16} color={color} />
      <Text style={styles.sectionLabel}>{label}</Text>
    </View>
    {winner ? (
      <View
        style={[
          styles.winnerRow,
          {
            backgroundColor: hexToRgba(winner.user.color, 0.14),
            borderColor: winner.user.color,
          },
        ]}
      >
        {renderUserGlyph(winner.user.icon, winner.user.color, 22)}
        <Text style={styles.winnerName}>{winner.user.name}</Text>
      </View>
    ) : (
      <View style={styles.tieRow}>
        <Icon name="people-outline" size={14} color={PALETTE.textMuted} />
        <Text style={styles.tieText}>Empate</Text>
      </View>
    )}
  </View>
);

const MonthWinnerModal = ({ visible, data, onClose }) => {
  if (!data) return null;
  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      title="¡Cierre de mes!"
      subtitle={`Resumen de ${data.monthKey}`}
      footer={
        <Button
          title="¡A por el siguiente mes!"
          icon="rocket"
          gradient
          onPress={onClose}
          fullWidth
        />
      }
    >
      <View style={styles.heroRow}>
        <Icon name="trophy" size={28} color={PALETTE.accent} />
        <Text style={styles.heroText}>
          {data.totals.routines} rutinas en {data.totals.days} días registrados.
        </Text>
      </View>

      <Section
        icon="trophy"
        color={PALETTE.warning}
        label="Más constante (días)"
        winner={data.daysWinner}
      />
      <Section
        icon="barbell"
        color={PALETTE.accent}
        label="Más rutinas"
        winner={data.routinesWinner}
      />

      <View style={styles.statsBlock}>
        {data.stats.map((s) => (
          <View key={s.user.id} style={styles.statRow}>
            {renderUserGlyph(s.user.icon, s.user.color, 16)}
            <Text style={styles.statName}>{s.user.name}</Text>
            <Text style={styles.statMetric}>
              {s.days}d · {s.routines}r
            </Text>
          </View>
        ))}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  heroText: { color: PALETTE.text, fontSize: FONT.size.md, flex: 1 },
  section: { marginBottom: SPACING.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionLabel: {
    color: PALETTE.textMuted,
    fontSize: FONT.size.sm,
    fontWeight: FONT.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  winnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
  },
  winnerName: {
    color: PALETTE.text,
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
  },
  tieRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: PALETTE.border,
    backgroundColor: PALETTE.surfaceAlt,
  },
  tieText: { color: PALETTE.textMuted, fontWeight: FONT.weight.semibold },
  statsBlock: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
    gap: 6,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statName: { flex: 1, color: PALETTE.text, fontSize: FONT.size.md },
  statMetric: { color: PALETTE.textMuted, fontSize: FONT.size.sm },
});

export default MonthWinnerModal;
