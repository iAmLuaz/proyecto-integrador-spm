// src/services/authService.js
// Servicio de autenticación con Firebase Auth
// Incluye validaciones de seguridad para email y contraseña

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from '@firebase/auth';
import { auth } from './firebase.js';

/**
 * VALIDACIÓN: Verifica formato de email
 * Previene intentos de login con datos malformados
 */
const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Formato de email inválido');
  }
};

/**
 * VALIDACIÓN: Verifica complejidad de contraseña
 * Requisitos mínimos de seguridad
 */
const validarPassword = (password) => {
  if (!password || password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }
};

/**
 * Login de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Usuario autenticado
 */
export const login = async (email, password) => {
  try {
    // SEGURIDAD: Validaciones previas
    validarEmail(email);
    validarPassword(password);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('✅ Login exitoso:', userCredential.user.email);
    return userCredential.user;

  } catch (error) {
    console.error('❌ Error en login:', error.code);
    
    // Mensajes de error amigables para el usuario
    switch (error.code) {
      case 'auth/invalid-email':
        throw new Error('Email inválido');
      case 'auth/user-not-found':
        throw new Error('Usuario no encontrado');
      case 'auth/wrong-password':
        throw new Error('Contraseña incorrecta');
      case 'auth/invalid-credential':
        throw new Error('Credenciales inválidas');
      default:
        throw new Error('Error al iniciar sesión');
    }
  }
};

/**
 * Registro de nuevo usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Usuario creado
 */
export const registro = async (email, password) => {
  try {
    validarEmail(email);
    validarPassword(password);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Registro exitoso:', userCredential.user.email);
    return userCredential.user;

  } catch (error) {
    console.error('❌ Error en registro:', error.code);
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        throw new Error('El email ya está registrado');
      case 'auth/weak-password':
        throw new Error('Contraseña muy débil');
      default:
        throw new Error('Error al registrarse');
    }
  }
};

/**
 * Cerrar sesión
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('✅ Sesión cerrada');
  } catch (error) {
    console.error('❌ Error al cerrar sesión:', error.message);
    throw error;
  }
};

/**
 * Observador de estado de autenticación
 * @param {Function} callback - Función a ejecutar cuando cambie el estado
 * @returns {Function} Función para cancelar la suscripción
 */
export const observarEstadoAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
