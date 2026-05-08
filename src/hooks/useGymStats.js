// src/hooks/useGymStats.js
// Métricas derivadas de los logs por usuario para el mes dado.

import { useMemo } from 'react';
import { todayISO, pad2 } from '../utils/dates.js';

const monthPrefix = (year, monthIndex) => `${year}-${pad2(monthIndex + 1)}`;

const useGymStats = (logs, users, year, monthIndex) => {
  return useMemo(() => {
    if (!Array.isArray(users)) {
      return { perUser: {}, leaderboard: [], totals: { days: 0, routines: 0 } };
    }
    const prefix = monthPrefix(year, monthIndex);
    const monthLogs = (logs || []).filter((l) => l.date?.startsWith(prefix));

    const perUser = {};
    let totalRoutines = 0;
    users.forEach((u) => {
      const list = monthLogs.filter((l) => l.personId === u.id);
      const days = new Set(list.map((l) => l.date)).size;
      const routines = list.reduce((s, l) => s + (Number(l.routines) || 0), 0);
      const streak = streakFor(logs, u.id);
      perUser[u.id] = { user: u, days, routines, streak };
      totalRoutines += routines;
    });

    // Leaderboards
    const byDays = [...users].sort(
      (a, b) => perUser[b.id].days - perUser[a.id].days
    );
    const byRoutines = [...users].sort(
      (a, b) => perUser[b.id].routines - perUser[a.id].routines
    );

    const winner = (sorted, metric) => {
      if (sorted.length === 0) return { label: '—', color: null };
      const top = sorted[0];
      const tied = sorted.filter((u) => perUser[u.id][metric] === perUser[top.id][metric]);
      if (perUser[top.id][metric] === 0) return { label: 'Sin actividad', color: null };
      if (tied.length > 1) return { label: 'Empate', color: null };
      return { label: top.name, color: top.color };
    };

    return {
      perUser,
      leaderboard: { byDays, byRoutines },
      winners: {
        days: winner(byDays, 'days'),
        routines: winner(byRoutines, 'routines'),
      },
      totals: {
        days: Object.values(perUser).reduce((s, p) => s + p.days, 0),
        routines: totalRoutines,
      },
    };
  }, [logs, users, year, monthIndex]);
};

const streakFor = (logs, userId) => {
  const dates = new Set(
    (logs || []).filter((l) => l.personId === userId).map((l) => l.date)
  );
  if (dates.size === 0) return 0;
  let streak = 0;
  const cursor = new Date();
  if (!dates.has(todayISO())) cursor.setDate(cursor.getDate() - 1);
  while (true) {
    const iso = `${cursor.getFullYear()}-${pad2(cursor.getMonth() + 1)}-${pad2(cursor.getDate())}`;
    if (dates.has(iso)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
};

export default useGymStats;
