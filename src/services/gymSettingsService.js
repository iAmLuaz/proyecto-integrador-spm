// src/services/gymSettingsService.js
// Settings (usuarios y notificaciones) sincronizado entre dispositivos cuando
// hay Firestore. Usa AsyncStorage como caché local + fallback offline.
//
// Esquema Firestore:
//   gym_settings/main  ->  { users: [...], notifications: {...}, updatedAt }

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db, firebaseConfigured } from './firebase.js';
import {
  DEFAULT_USERS,
  DEFAULT_NOTIFICATIONS,
  newUserId,
} from '../types/gym.js';

const KEY = '@gym_settings_v2';
const DOC_PATH = ['gym_settings', 'main'];

const buildDefaults = () => ({
  users: DEFAULT_USERS(),
  notifications: DEFAULT_NOTIFICATIONS(),
});

const clampNumber = (v, min, max, fallback) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(n)));
};

const sanitize = (raw) => {
  const def = buildDefaults();
  const users =
    Array.isArray(raw?.users) && raw.users.length > 0
      ? raw.users.map((u) => ({
          id: u.id || newUserId(),
          name: (u.name || 'Sin nombre').toString().slice(0, 30),
          icon: (u.icon || '👤').toString().slice(0, 32),
          color: u.color || '#FF5757',
          createdAt: Number(u.createdAt) || Date.now(),
        }))
      : def.users;
  const notifications = {
    enabled: !!raw?.notifications?.enabled,
    hour: clampNumber(raw?.notifications?.hour, 0, 23, def.notifications.hour),
    minute: clampNumber(raw?.notifications?.minute, 0, 59, def.notifications.minute),
  };
  return { users, notifications };
};

const readLocal = async () => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
};

const writeLocal = async (settings) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(settings));
};

export const get = async () => {
  const local = await readLocal();
  if (firebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, ...DOC_PATH));
      if (snap.exists()) {
        const remote = sanitize(snap.data());
        await writeLocal(remote);
        return remote;
      }
      const seed = local || buildDefaults();
      await setDoc(doc(db, ...DOC_PATH), {
        ...seed,
        updatedAt: serverTimestamp(),
      });
      await writeLocal(seed);
      return seed;
    } catch (e) {
      console.warn('[settings] Lectura remota falló, usando local.', e.message);
    }
  }
  return local || buildDefaults();
};

export const update = async (next) => {
  const clean = sanitize(next);

  const colors = clean.users.map((u) => u.color.toLowerCase());
  if (new Set(colors).size !== colors.length) {
    throw new Error('Cada persona debe tener un color distinto.');
  }
  const names = clean.users.map((u) => u.name.trim().toLowerCase());
  if (names.some((n) => n.length === 0)) {
    throw new Error('Todos los nombres deben tener al menos 1 carácter.');
  }
  if (new Set(names).size !== names.length) {
    throw new Error('No puede haber dos personas con el mismo nombre.');
  }
  if (clean.users.length === 0) {
    throw new Error('Debe existir al menos una persona.');
  }

  await writeLocal(clean);
  if (firebaseConfigured && db) {
    await setDoc(doc(db, ...DOC_PATH), {
      ...clean,
      updatedAt: serverTimestamp(),
    });
  }
  return clean;
};

/**
 * Suscripción en tiempo real. Devuelve función para cancelar.
 */
export const subscribe = (onChange) => {
  if (!firebaseConfigured || !db) return () => {};
  return onSnapshot(
    doc(db, ...DOC_PATH),
    (snap) => {
      if (snap.exists()) {
        const remote = sanitize(snap.data());
        writeLocal(remote);
        onChange(remote);
      }
    },
    (err) => console.warn('[settings] onSnapshot error:', err.message)
  );
};
