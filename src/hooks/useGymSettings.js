// src/hooks/useGymSettings.js
import { useCallback, useEffect, useState } from 'react';
import * as gymSettingsService from '../services/gymSettingsService.js';

const useGymSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const s = await gymSettingsService.get();
    setSettings(s);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
    const unsub = gymSettingsService.subscribe((remote) => {
      setSettings(remote);
      setLoading(false);
    });
    return unsub;
  }, [refresh]);

  const update = useCallback(async (next) => {
    const saved = await gymSettingsService.update(next);
    setSettings(saved);
    return saved;
  }, []);

  return { settings, loading, refresh, update };
};

export default useGymSettings;
