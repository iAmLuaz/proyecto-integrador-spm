// App.js
// Punto de entrada de la aplicación

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuth from './src/hooks/useAuth';
import AppNavigator from './src/navigation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import LoadingScreen from './src/components/LoadingScreen';

export default function App() {
  const { user, loading } = useAuth();

  // Mostrar pantalla de carga mientras verifica autenticación
  if (loading) {
    return <LoadingScreen message="Inicializando..." />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="light" />
        
        {/* Mostrar Login o App según estado de autenticación */}
        {user ? <AppNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
