// src/services/firebase.js
// Configuración de Firebase para la aplicación de Gestión de Evaluaciones
// INSTRUCCIONES: Crear un proyecto en Firebase Console y reemplazar las credenciales

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase - IMPORTANTE: Reemplazar con tus credenciales reales
// Obtén estas credenciales desde Firebase Console > Project Settings > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyAAa_hosXGyc89Ybsj8Jje-WxzBH04IxOI",
  authDomain: "app-web-spm.firebaseapp.com",
  projectId: "app-web-spm",
  storageBucket: "app-web-spm.firebasestorage.app",
  messagingSenderId: "288606809093",
  appId: "1:288606809093:web:eaccd0491def59112c006c"
};

// Evita errores en Fast Refresh de Expo por re-inicializar la app.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Inicializar servicios
export const db = getFirestore(app);

const buildAuth = () => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (error) {
    // Si ya existe por Fast Refresh, reutiliza la instancia actual.
    return getAuth(app);
  }
};

export const auth = buildAuth();

if (
  firebaseConfig.apiKey === 'AIzaSyDEMO_KEY_REEMPLAZAR' ||
  firebaseConfig.projectId === 'tu-proyecto-id'
) {
  console.warn(
    'Firebase no está configurado aún. Actualiza firebaseConfig en src/services/firebase.js'
  );
}

export default app;
