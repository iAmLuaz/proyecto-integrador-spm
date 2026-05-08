// src/services/gymLogService.js
// CRUD de registros con personId dinámico. Real-time via onSnapshot si hay Firestore.

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db, firebaseConfigured } from './firebase.js';

const COLLECTION = 'gym_logs';
const STORAGE_KEY = '@gym_logs_v2';

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

const validatePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload inválido.');
  }
  if (!payload.personId || typeof payload.personId !== 'string') {
    throw new Error('Persona inválida.');
  }
  if (!isoDateRegex.test(payload.date)) {
    throw new Error('Fecha inválida (YYYY-MM-DD).');
  }
  const routines = Number(payload.routines);
  if (!Number.isFinite(routines) || routines < 1 || routines > 50) {
    throw new Error('El número de rutinas debe ser un entero entre 1 y 50.');
  }
  const notes = (payload.notes ?? '').toString().slice(0, 500).trim();
  return {
    personId: payload.personId,
    date: payload.date,
    routines: Math.floor(routines),
    notes,
  };
};

// Migración suave: logs viejos guardaban `person: 'Yeli'|'Luis'`.
const normalizeLog = (raw) => {
  let personId = raw.personId;
  if (!personId && raw.person) {
    if (raw.person === 'Yeli') personId = 'usr_yeli';
    else if (raw.person === 'Luis') personId = 'usr_luis';
    else personId = `legacy_${raw.person}`;
  }
  return {
    id: raw.id,
    personId,
    date: raw.date,
    routines: Number(raw.routines) || 0,
    notes: raw.notes || '',
    createdAt: raw.createdAt || 0,
    updatedAt: raw.updatedAt || 0,
  };
};

const loadLocal = async () => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw).map(normalizeLog);
    const oldRaw = await AsyncStorage.getItem('@gym_logs_v1');
    if (oldRaw) {
      const migrated = JSON.parse(oldRaw).map(normalizeLog);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
    return [];
  } catch {
    return [];
  }
};

const saveLocal = async (logs) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
};

const localId = () =>
  `local_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export const getAll = async () => {
  if (firebaseConfigured && db) {
    const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => normalizeLog({ id: d.id, ...d.data() }));
  }
  const logs = await loadLocal();
  return [...logs].sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const create = async (payload) => {
  const data = validatePayload(payload);
  const existing = await getAll();
  const dup = existing.find(
    (l) => l.personId === data.personId && l.date === data.date
  );
  if (dup) {
    const err = new Error(
      `Ya existe un registro para esta persona en ${data.date}. Edítalo en lugar de crear otro.`
    );
    err.code = 'DUPLICATE';
    err.existingId = dup.id;
    throw err;
  }

  if (firebaseConfigured && db) {
    const ref = await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { id: ref.id, ...data };
  }
  const now = Date.now();
  const newLog = { id: localId(), ...data, createdAt: now, updatedAt: now };
  const next = [...(await loadLocal()), newLog];
  await saveLocal(next);
  return newLog;
};

export const update = async (id, payload) => {
  if (!id) throw new Error('ID requerido.');
  const data = validatePayload(payload);
  const existing = await getAll();
  const dup = existing.find(
    (l) => l.id !== id && l.personId === data.personId && l.date === data.date
  );
  if (dup) {
    const err = new Error(
      `Ya existe un registro para esta persona en ${data.date}.`
    );
    err.code = 'DUPLICATE';
    err.existingId = dup.id;
    throw err;
  }

  if (firebaseConfigured && db) {
    await updateDoc(doc(db, COLLECTION, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
    return { id, ...data };
  }
  const all = await loadLocal();
  const next = all.map((l) =>
    l.id === id ? { ...l, ...data, updatedAt: Date.now() } : l
  );
  await saveLocal(next);
  return next.find((l) => l.id === id);
};

export const remove = async (id) => {
  if (!id) throw new Error('ID requerido.');
  if (firebaseConfigured && db) {
    await deleteDoc(doc(db, COLLECTION, id));
    return;
  }
  const all = await loadLocal();
  await saveLocal(all.filter((l) => l.id !== id));
};

/**
 * Suscripción en tiempo real. Devuelve función para cancelar.
 */
export const subscribe = (onChange) => {
  if (!firebaseConfigured || !db) return () => {};
  const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const logs = snap.docs.map((d) => normalizeLog({ id: d.id, ...d.data() }));
      onChange(logs);
    },
    (err) => console.warn('[logs] onSnapshot error:', err.message)
  );
};
