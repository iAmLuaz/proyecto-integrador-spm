// src/hooks/useEvaluaciones.js
// Hook personalizado para manejo de evaluaciones

import { useState, useEffect, useCallback } from 'react';
import { obtenerEvaluaciones } from '../services/evaluacionesService.js';

/**
 * Hook para manejo del estado de evaluaciones
 * @param {boolean} autoLoad - Cargar automáticamente al montar
 * @returns {Object} Estado, datos y funciones
 */
const useEvaluaciones = (autoLoad = true) => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar evaluaciones
  const cargarEvaluaciones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerEvaluaciones();
      setEvaluaciones(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando evaluaciones:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar al montar si autoLoad está activo
  useEffect(() => {
    if (autoLoad) {
      cargarEvaluaciones();
    }
  }, [autoLoad, cargarEvaluaciones]);

  // Función para refrescar
  const refrescar = () => {
    cargarEvaluaciones();
  };

  return {
    evaluaciones,
    loading,
    error,
    refrescar,
    cargarEvaluaciones
  };
};

export default useEvaluaciones;
