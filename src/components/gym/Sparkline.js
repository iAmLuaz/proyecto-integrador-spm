// src/components/gym/Sparkline.js
// Mini gráfico de barras (rutinas por día) sin dependencias externas.

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PALETTE, FONT } from '../../theme/theme.js';
import { hexToRgba } from './PersonBadge.js';
import { pad2 } from '../../utils/dates.js';

const isoNDaysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const Sparkline = ({ logs, userId, color, days = 14, height = 40 }) => {
  const data = useMemo(() => {
    const arr = [];
    for (let i = days - 1; i >= 0; i--) {
      const iso = isoNDaysAgo(i);
      const log = (logs || []).find((l) => l.personId === userId && l.date === iso);
      arr.push({ iso, value: log?.routines || 0 });
    }
    return arr;
  }, [logs, userId, days]);

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <View>
      <View style={[styles.chart, { height }]}>
        {data.map((d, i) => {
          const h = d.value > 0 ? Math.max(4, (d.value / max) * height) : 3;
          return (
            <View key={i} style={styles.barWrap}>
              <View
                style={{
                  width: '100%',
                  height: h,
                  borderRadius: 3,
                  backgroundColor:
                    d.value > 0 ? color : hexToRgba(color, 0.18),
                }}
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.caption}>Últimos {days} días</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  barWrap: { flex: 1, justifyContent: 'flex-end' },
  caption: {
    marginTop: 6,
    fontSize: FONT.size.xs,
    color: PALETTE.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    fontWeight: FONT.weight.semibold,
  },
});

export default Sparkline;
