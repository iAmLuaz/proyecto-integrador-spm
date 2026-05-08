// src/services/notificationsService.js
// Recordatorio diario para registrar el entrenamiento.
// Solo iOS / Android nativo; en web es no-op.

import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const REMINDER_ID = 'gym-daily-reminder';

let configured = false;
const configure = () => {
  if (configured) return;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  configured = true;
};

export const supported = () =>
  Platform.OS !== 'web' && Device.isDevice !== false;

export const requestPermissions = async () => {
  if (!supported()) return false;
  configure();
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const { granted } = await Notifications.requestPermissionsAsync();
  return granted;
};

export const cancelDailyReminder = async () => {
  if (!supported()) return;
  try {
    await Notifications.cancelScheduledNotificationAsync(REMINDER_ID);
  } catch {
    // ignorar
  }
};

/**
 * Programa un recordatorio diario a la hora indicada.
 * Cancela el anterior antes de programar.
 */
export const scheduleDailyReminder = async ({ hour, minute, message }) => {
  if (!supported()) return false;
  const granted = await requestPermissions();
  if (!granted) return false;
  await cancelDailyReminder();
  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_ID,
    content: {
      title: '🏋️ Hora del gym',
      body: message || '¿Ya registraste tu entrenamiento de hoy?',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
  return true;
};
