// src/utils/dates.js
// Helpers de fecha sin dependencias.

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const WEEKDAY_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const pad2 = (n) => String(n).padStart(2, '0');

export const toISODate = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

export const todayISO = () => toISODate(new Date());

export const parseISODate = (iso) => {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const isSameISODate = (a, b) => a && b && a === b;

export const monthLabel = (year, monthIndex) =>
  `${MONTH_NAMES[monthIndex]} ${year}`;

export const weekdayHeaders = () => WEEKDAY_SHORT;

/**
 * Devuelve un array de 6 semanas x 7 días con los ISO dates a renderizar
 * (incluye días del mes anterior/siguiente para llenar la grilla).
 * Semana inicia en lunes.
 */
export const buildMonthGrid = (year, monthIndex) => {
  const first = new Date(year, monthIndex, 1);
  // getDay: 0=Dom..6=Sáb. Convertir a 0=Lun..6=Dom
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, monthIndex, 1 - offset);

  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    cells.push({
      iso: toISODate(d),
      day: d.getDate(),
      inMonth: d.getMonth() === monthIndex,
      isToday: toISODate(d) === todayISO(),
      date: d,
    });
  }
  return cells;
};

export const formatLongDate = (iso) => {
  const d = parseISODate(iso);
  if (!d) return '';
  return `${WEEKDAY_SHORT[(d.getDay() + 6) % 7]}, ${d.getDate()} de ${MONTH_NAMES[d.getMonth()].toLowerCase()} ${d.getFullYear()}`;
};

export const addMonths = (year, monthIndex, delta) => {
  const d = new Date(year, monthIndex + delta, 1);
  return { year: d.getFullYear(), monthIndex: d.getMonth() };
};
