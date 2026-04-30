// src/components/Card.js
// Componente de tarjeta reutilizable para mostrar evaluaciones

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Tarjeta para mostrar información de evaluación
 * @param {Object} evaluacion - Datos de la evaluación
 * @param {Function} onPress - Función al presionar la tarjeta
 * @param {Function} onDelete - Función para eliminar
 */
const Card = ({ evaluacion, onPress, onDelete }) => {
  
  // Determinar color según calificación
  const getCalificacionStyles = (calificacion) => {
    if (calificacion >= 80) return { container: styles.scoreGreen, text: styles.scoreGreenText };
    if (calificacion >= 60) return { container: styles.scoreYellow, text: styles.scoreYellowText };
    return { container: styles.scoreRed, text: styles.scoreRedText };
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    return new Date(fecha).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const scoreStyles = getCalificacionStyles(evaluacion.calificacion);

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name}>
            {evaluacion.nombre}
          </Text>
          <Text style={styles.date}>
            {formatearFecha(evaluacion.fecha)}
          </Text>
        </View>

        {/* Calificación */}
        <View style={[styles.scoreContainer, scoreStyles.container]}>
          <Text style={[styles.scoreText, scoreStyles.text]}>
            {evaluacion.calificacion}
          </Text>
        </View>
      </View>

      {/* Botón de eliminar */}
      {onDelete && (
        <TouchableOpacity 
          onPress={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>
            Eliminar
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  scoreContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scoreText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  scoreGreen: {
    backgroundColor: '#D1FAE5',
  },
  scoreGreenText: {
    color: '#059669',
  },
  scoreYellow: {
    backgroundColor: '#FEF3C7',
  },
  scoreYellowText: {
    color: '#D97706',
  },
  scoreRed: {
    backgroundColor: '#FEE2E2',
  },
  scoreRedText: {
    color: '#DC2626',
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Card;
