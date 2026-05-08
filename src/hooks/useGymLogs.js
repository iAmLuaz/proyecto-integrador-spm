// src/hooks/useGymLogs.js
import { useCallback, useEffect, useState } from 'react';
import * as gymLogService from '../services/gymLogService.js';

const useGymLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await gymLogService.getAll();
      setLogs(data);
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los registros.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const unsub = gymLogService.subscribe((data) => {
      setLogs(data);
      setLoading(false);
    });
    return unsub;
  }, [refresh]);

  const create = useCallback(
    async (payload) => {
      const created = await gymLogService.create(payload);
      await refresh();
      return created;
    },
    [refresh]
  );

  const update = useCallback(
    async (id, payload) => {
      const updated = await gymLogService.update(id, payload);
      await refresh();
      return updated;
    },
    [refresh]
  );

  const remove = useCallback(
    async (id) => {
      await gymLogService.remove(id);
      await refresh();
    },
    [refresh]
  );

  return { logs, loading, error, refresh, create, update, remove };
};

export default useGymLogs;
