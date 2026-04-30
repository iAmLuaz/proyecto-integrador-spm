// src/components/Button.js
// Componente de botón reutilizable con estilos nativos

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * Botón personalizado reutilizable
 * @param {string} title - Texto del botón
 * @param {Function} onPress - Función a ejecutar al presionar
 * @param {string} variant - Estilo del botón (primary, secondary, danger, success)
 * @param {boolean} loading - Mostrar indicador de carga
 * @param {boolean} disabled - Deshabilitar botón
 * @param {boolean} fullWidth - Ancho completo
 */
const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false,
  disabled = false,
  fullWidth = true 
}) => {
  
  const variantColors = {
    primary: '#2563EB',
    secondary: '#4B5563',
    danger: '#DC2626',
    success: '#16A34A',
  };

  const buttonStyle = [
    styles.button,
    { backgroundColor: variantColors[variant] },
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Button;
