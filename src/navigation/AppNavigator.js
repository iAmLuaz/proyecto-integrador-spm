// src/navigation/AppNavigator.js
// Configuración de navegación con Stack Navigator

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen.js';
import FormularioScreen from '../screens/FormularioScreen.js';
import DetalleScreen from '../screens/DetalleScreen.js';

const Stack = createStackNavigator();

/**
 * Navegador principal de la aplicación (cuando el usuario está autenticado)
 * Usa Stack Navigator para navegación entre pantallas
 */
const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Ocultar header por defecto (usamos headers personalizados)
        cardStyle: { backgroundColor: '#F9FAFB' }
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
      />
      <Stack.Screen 
        name="Formulario" 
        component={FormularioScreen}
        options={{
          presentation: 'modal' // Mostrar como modal en iOS
        }}
      />
      <Stack.Screen 
        name="Detalle" 
        component={DetalleScreen} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
