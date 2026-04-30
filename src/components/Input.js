// src/components/Input.js
// Componente de input reutilizable con validaciones visuales

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/**
 * Input personalizado con validación visual
 * @param {string} label - Etiqueta del campo
 * @param {string} value - Valor actual
 * @param {Function} onChangeText - Función para cambiar el valor
 * @param {string} placeholder - Texto placeholder
 * @param {boolean} secureTextEntry - Ocultar texto (para contraseñas)
 * @param {string} keyboardType - Tipo de teclado
 * @param {string} error - Mensaje de error para mostrar
 */
const Input = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = null,
  multiline = false,
  editable = true
}) => {

  const inputStyle = [
    styles.input,
    error ? styles.inputError : styles.inputNormal,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      
      <TextInput
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        editable={editable}
      />

      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputNormal: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  inputError: {
    borderWidth: 2,
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;
