// src/services/firebase.js
// Configuración de Firebase para la aplicación de Gestión de Evaluaciones
// INSTRUCCIONES: Define credenciales en .env usando variables EXPO_PUBLIC_FIREBASE_*

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuración de Firebase desde variables de entorno.
// Expo expone en runtime solo variables con prefijo EXPO_PUBLIC_.
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
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

const missingFirebaseConfig = Object.entries(firebaseConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingFirebaseConfig.length > 0) {
  console.warn(
    `Firebase no está configurado aún. Faltan variables: ${missingFirebaseConfig.join(', ')}. ` +
    'Crea/actualiza el archivo .env con EXPO_PUBLIC_FIREBASE_* y reinicia Expo con --clear.'
  );
}

export default app;
