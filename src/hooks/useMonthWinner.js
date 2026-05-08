// src/hooks/useMonthWinner.js
// Detecta cuando entras a un mes nuevo y calcula al ganador del mes anterior.
// Persiste el último mes mostrado en AsyncStorage.

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pad2 } from '../utils/dates.js';

const KEY = '@gym_last_winner_month_v1';

const monthKey = (y, m) => `${y}-${pad2(m + 1)}`;

const computeWinner = (logs, users, year, monthIndex) => {
  const prefix = monthKey(year, monthIndex);
  const monthLogs = (logs || []).filter((l) => l.date?.startsWith(prefix));
  if (monthLogs.length === 0) return null;

  const stats = users.map((u) => {
    const list = monthLogs.filter((l) => l.personId === u.id);
    return {
      user: u,
      days: new Set(list.map((l) => l.date)).size,
      routines: list.reduce((s, l) => s + (Number(l.routines) || 0), 0),
    };
  });

  if (stats.every((s) => s.days === 0)) return null;

  const byDays = [...stats].sort((a, b) => b.days - a.days);
  const byRoutines = [...stats].sort((a, b) => b.routines - a.routines);

  const tieDays = byDays.filter((s) => s.days === byDays[0].days).length > 1;
  const tieRoutines =
    byRoutines.filter((s) => s.routines === byRoutines[0].routines).length > 1;

  return {
    monthKey: prefix,
    daysWinner: tieDays ? null : byDays[0],
    routinesWinner: tieRoutines ? null : byRoutines[0],
    totals: {
      days: stats.reduce((s, x) => s + x.days, 0),
      routines: stats.reduce((s, x) => s + x.routines, 0),
    },
    stats,
  };
};

const useMonthWinner = (logs, users, ready) => {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    if (!ready) return;
    if (!Array.isArray(users) || users.length === 0) return;

    let cancelled = false;
    (async () => {
      const now = new Date();
      const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const prevKey = monthKey(prevDate.getFullYear(), prevDate.getMonth());

      const lastShown = await AsyncStorage.getItem(KEY);
      if (lastShown === prevKey) return;

      const data = computeWinner(logs, users, prevDate.getFullYear(), prevDate.getMonth());
      if (!data) return;
      if (!cancelled) setAnnouncement(data);
    })();

    return () => {
      cancelled = true;
    };
  }, [logs, users, ready]);

  const dismiss = async () => {
    if (announcement) {
      await AsyncStorage.setItem(KEY, announcement.monthKey);
      setAnnouncement(null);
    }
  };

  return { announcement, dismiss };
};

export default useMonthWinner;
