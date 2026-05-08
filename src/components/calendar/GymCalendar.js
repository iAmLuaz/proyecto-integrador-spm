// src/components/calendar/GymCalendar.js
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PALETTE, RADIUS, SHADOW, SPACING, FONT } from '../../theme/theme.js';
import {
  buildMonthGrid,
  monthLabel,
  weekdayHeaders,
  todayISO,
} from '../../utils/dates.js';
import CalendarDayCell from './CalendarDayCell.js';

const GymCalendar = ({
  year,
  monthIndex,
  logs,
  users,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const cells = useMemo(() => buildMonthGrid(year, monthIndex), [year, monthIndex]);
  const headers = weekdayHeaders();

  const logsByDate = useMemo(() => {
    const map = {};
    (logs || []).forEach((l) => {
      if (!map[l.date]) map[l.date] = [];
      map[l.date].push(l);
    });
    return map;
  }, [logs]);

  const today = todayISO();
  const isCurrentMonth =
    today.startsWith(`${year}-${String(monthIndex + 1).padStart(2, '0')}`);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable onPress={onPrevMonth} style={styles.navBtn} hitSlop={8}>
          <Text style={styles.navText}>‹</Text>
        </Pressable>
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={styles.monthLabel}>{monthLabel(year, monthIndex)}</Text>
          {!isCurrentMonth ? (
            <Pressable onPress={onToday} hitSlop={6}>
              <Text style={styles.todayLink}>Volver a hoy</Text>
            </Pressable>
          ) : null}
        </View>
        <Pressable onPress={onNextMonth} style={styles.navBtn} hitSlop={8}>
          <Text style={styles.navText}>›</Text>
        </Pressable>
      </View>

      <View style={styles.weekHeader}>
        {headers.map((h) => (
          <Text key={h} style={styles.weekHeaderText}>
            {h}
          </Text>
        ))}
      </View>

      {[0, 1, 2, 3, 4, 5].map((row) => (
        <View key={row} style={styles.weekRow}>
          {cells.slice(row * 7, row * 7 + 7).map((cell) => (
            <CalendarDayCell
              key={cell.iso}
              cell={cell}
              dayLogs={logsByDate[cell.iso] || []}
              users={users}
              isSelected={cell.iso === selectedDate}
              onPress={() => onSelectDate(cell.iso)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: PALETTE.border,
    padding: SPACING.md,
    ...SHADOW.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PALETTE.surfaceAlt,
  },
  navText: { fontSize: 22, color: PALETTE.text, lineHeight: 24, fontWeight: FONT.weight.semibold },
  monthLabel: { fontSize: FONT.size.xl, fontWeight: FONT.weight.bold, color: PALETTE.text },
  todayLink: { color: PALETTE.accent, fontSize: FONT.size.sm, marginTop: 2 },
  weekHeader: { flexDirection: 'row', marginBottom: 4 },
  weekHeaderText: {
    flex: 1,
    textAlign: 'center',
    color: PALETTE.textMuted,
    fontSize: FONT.size.xs,
    fontWeight: FONT.weight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  weekRow: { flexDirection: 'row' },
});

export default GymCalendar;
