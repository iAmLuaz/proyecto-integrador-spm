// src/components/calendar/CalendarDayCell.js
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, FONT } from '../../theme/theme.js';
import { hexToRgba } from '../gym/PersonBadge.js';

const MAX_DOTS = 4;

const CalendarDayCell = ({ cell, dayLogs, users, isSelected, onPress }) => {
  const isInactive = !cell.inMonth;

  // Mapa userId -> log
  const logsByUser = {};
  dayLogs.forEach((l) => {
    logsByUser[l.personId] = l;
  });

  const totalRoutines = dayLogs.reduce(
    (s, l) => s + (Number(l.routines) || 0),
    0
  );

  const visibleUsers = users.slice(0, MAX_DOTS);
  const overflow = users.length - MAX_DOTS;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cell,
        isSelected && styles.cellSelected,
        cell.isToday && !isSelected && styles.cellToday,
        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      <Text
        style={[
          styles.dayNumber,
          isInactive && styles.dayInactive,
          cell.isToday && styles.dayToday,
          isSelected && styles.daySelected,
        ]}
      >
        {cell.day}
      </Text>

      <View style={styles.dotsRow}>
        {visibleUsers.map((u) => {
          const active = !!logsByUser[u.id];
          return (
            <View
              key={u.id}
              style={[
                styles.dot,
                {
                  backgroundColor: active
                    ? isInactive
                      ? hexToRgba(u.color, 0.45)
                      : u.color
                    : '#E5E7EB',
                  borderColor: active ? hexToRgba(u.color, 0.5) : '#E5E7EB',
                },
              ]}
            />
          );
        })}
        {overflow > 0 ? (
          <Text style={styles.overflow}>+{overflow}</Text>
        ) : null}
      </View>

      {totalRoutines > 0 ? (
        <Text style={[styles.badge, isInactive && { opacity: 0.4 }]}>
          {totalRoutines}
        </Text>
      ) : (
        <Text style={styles.badgePlaceholder}> </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    aspectRatio: 0.95,
    margin: 2,
    borderRadius: RADIUS.md,
    backgroundColor: PALETTE.surface,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: PALETTE.border,
  },
  cellToday: { borderColor: PALETTE.accent, borderWidth: 1.5 },
  cellSelected: {
    backgroundColor: PALETTE.accentSoft,
    borderColor: PALETTE.accent,
    borderWidth: 1.5,
  },
  dayNumber: { fontSize: FONT.size.md, fontWeight: FONT.weight.semibold, color: PALETTE.text },
  dayInactive: { color: PALETTE.textSubtle },
  dayToday: { color: PALETTE.accent },
  daySelected: { color: PALETTE.accent },
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 3, flexWrap: 'wrap', justifyContent: 'center' },
  dot: { width: 7, height: 7, borderRadius: 4, borderWidth: 1 },
  overflow: { fontSize: 9, color: PALETTE.textMuted, fontWeight: FONT.weight.semibold, marginLeft: 2 },
  badge: { fontSize: FONT.size.xs, color: PALETTE.textMuted, fontWeight: FONT.weight.semibold },
  badgePlaceholder: { fontSize: FONT.size.xs, color: 'transparent' },
});

export default CalendarDayCell;
