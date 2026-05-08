// src/components/gym/GymStatsCards.js
// Tarjetas con métricas mensuales por usuario + sparkline.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, SHADOW, FONT, SPACING } from '../../theme/theme.js';
import { renderUserGlyph, hexToRgba } from './PersonBadge.js';
import Sparkline from './Sparkline.js';
import Icon from '../Icon.js';

const Metric = ({ value, label, color }) => (
  <View style={styles.metric}>
    <Text style={[styles.metricValue, { color }]}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const UserCard = ({ user, stats, logs }) => (
  <View
    style={[
      styles.card,
      { borderColor: hexToRgba(user.color, 0.4) },
    ]}
  >
    <View style={styles.cardHeader}>
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
      <Text style={styles.cardName}>{user.name}</Text>
      {stats.streak > 0 ? (
        <View
          style={[
            styles.streak,
            { backgroundColor: hexToRgba(user.color, 0.15) },
          ]}
        >
          <Icon name="flame" size={12} color={user.color} />
          <Text style={[styles.streakText, { color: user.color }]}>
            {stats.streak}d
          </Text>
        </View>
      ) : null}
    </View>

    <View style={styles.metricsRow}>
      <Metric value={stats.days} label="Días" color={user.color} />
      <View style={styles.divider} />
      <Metric value={stats.routines} label="Rutinas" color={user.color} />
    </View>

    <Sparkline logs={logs} userId={user.id} color={user.color} />
  </View>
);

const GymStatsCards = ({ users, perUser, logs }) => (
  <View style={styles.row}>
    {users.map((u) => (
      <UserCard
        key={u.id}
        user={u}
        stats={perUser[u.id] || { days: 0, routines: 0, streak: 0 }}
        logs={logs}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  card: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: PALETTE.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  cardName: {
    flex: 1,
    color: PALETTE.text,
    fontSize: FONT.size.lg,
    fontWeight: FONT.weight.bold,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  streakText: { fontWeight: FONT.weight.bold, fontSize: FONT.size.xs },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.surfaceAlt,
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    marginBottom: SPACING.sm,
  },
  metric: { flex: 1, alignItems: 'center' },
  metricValue: { fontSize: FONT.size.xxl, fontWeight: FONT.weight.bold },
  metricLabel: {
    fontSize: FONT.size.xs,
    color: PALETTE.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: FONT.weight.semibold,
    marginTop: 2,
  },
  divider: { width: 1, height: 28, backgroundColor: PALETTE.border },
});

export default GymStatsCards;
