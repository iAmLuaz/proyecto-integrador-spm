// src/hooks/useNotifications.js
// Sincroniza la configuración de recordatorio con notificaciones del sistema.

import { useEffect } from 'react';
import * as notificationsService from '../services/notificationsService.js';

const useNotifications = (settings, users) => {
  useEffect(() => {
    if (!settings) return;
    const cfg = settings.notifications;
    const userNames =
      users && users.length > 0
        ? users.map((u) => u.name).slice(0, 3).join(', ')
        : '';
    if (cfg?.enabled) {
      const message = userNames
        ? `${userNames}: ¿ya registraron su entreno de hoy?`
        : '¿Ya registraste tu entrenamiento de hoy?';
      notificationsService
        .scheduleDailyReminder({ hour: cfg.hour, minute: cfg.minute, message })
        .catch((e) => console.warn('[notifications] error programando:', e.message));
    } else {
      notificationsService
        .cancelDailyReminder()
        .catch(() => {});
    }
  }, [settings, users]);
};

export default useNotifications;
