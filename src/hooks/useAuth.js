// src/hooks/useAuth.js
// Hook personalizado para manejo de autenticaciÃ³n

import { useState, useEffect } from 'react';
import { observarEstadoAuth } from '../services/authService.js';

/**
 * Hook para manejo del estado de autenticaciÃ³n
 * @returns {Object} Estado y usuario actual
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribirse al cambio de estado de autenticaciÃ³n
    const unsubscribe = observarEstadoAuth((usuario) => {
      setUser(usuario);
      setLoading(false);
    });

    // Limpiar suscripciÃ³n al desmontar
    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;

