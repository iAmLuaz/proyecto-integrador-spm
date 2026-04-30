// src/screens/DetalleScreen.js
// Pantalla para ver el detalle de una evaluación

import React from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { eliminarEvaluacion } from '../services/evaluacionesService.js';
import Button from '../components/Button.js';

const DetalleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { evaluacion } = route.params;

  const getEstatusStyles = (calificacion) => {
    if (calificacion >= 80) return { container: styles.statusGreen, text: styles.statusGreenText, texto: 'Excelente' };
    if (calificacion >= 60) return { container: styles.statusYellow, text: styles.statusYellowText, texto: 'Bueno' };
    return { container: styles.statusRed, text: styles.statusRedText, texto: 'Necesita Mejorar' };
  };

  const estatus = getEstatusStyles(evaluacion.calificacion);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'Sin fecha';
    return new Date(fecha).toLocaleString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditar = () => {
    navigation.navigate('Formulario', { evaluacion });
  };

  const handleEliminar = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar la evaluación de "${evaluacion.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarEvaluacion(evaluacion.id);
              Alert.alert('Éxito', 'Evaluación eliminada');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Detalle de Evaluación
        </Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        
        {/* Tarjeta principal */}
        <View style={styles.card}>
          
          {/* Nombre */}
          <View style={styles.section}>
            <Text style={styles.label}>Candidato</Text>
            <Text style={styles.nameText}>
              {evaluacion.nombre}
            </Text>
          </View>

          {/* Calificación */}
          <View style={styles.section}>
            <Text style={styles.label}>Calificación</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreNumber}>
                {evaluacion.calificacion}
              </Text>
              <Text style={styles.scoreMax}>
                / 100
              </Text>
            </View>
          </View>

          {/* Estatus */}
          <View style={styles.section}>
            <Text style={styles.label}>Estatus</Text>
            <View style={[styles.statusBadge, estatus.container]}>
              <Text style={[styles.statusText, estatus.text]}>
                {estatus.texto}
              </Text>
            </View>
          </View>

          {/* Fecha de registro */}
          <View style={styles.section}>
            <Text style={styles.label}>Fecha de Registro</Text>
            <Text style={styles.dateText}>
              {formatearFecha(evaluacion.fecha)}
            </Text>
          </View>

          {/* Última actualización */}
          {evaluacion.actualizado && (
            <View style={styles.lastSection}>
              <Text style={styles.label}>Última Actualización</Text>
              <Text style={styles.dateText}>
                {formatearFecha(evaluacion.actualizado)}
              </Text>
            </View>
          )}
        </View>

        {/* Estadísticas adicionales */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Análisis
          </Text>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Porcentaje de aprobación</Text>
            <Text style={styles.statsValue}>
              {evaluacion.calificacion >= 60 ? '✓ Aprobado' : '✗ No aprobado'}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Rendimiento</Text>
            <Text style={[styles.statsValue, estatus.text]}>
              {evaluacion.calificacion}%
            </Text>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <Button
            title="Editar Evaluación"
            onPress={handleEditar}
            variant="primary"
          />
          
          <View style={styles.buttonSpacing} />
          
          <Button
            title="Eliminar"
            onPress={handleEliminar}
            variant="danger"
          />

          <View style={styles.buttonSpacing} />

          <Button
            title="Volver al Dashboard"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  lastSection: {
    marginBottom: 0,
  },
  label: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  scoreMax: {
    fontSize: 24,
    color: '#9CA3AF',
    marginLeft: 8,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusGreen: {
    backgroundColor: '#D1FAE5',
  },
  statusGreenText: {
    color: '#059669',
  },
  statusYellow: {
    backgroundColor: '#FEF3C7',
  },
  statusYellowText: {
    color: '#D97706',
  },
  statusRed: {
    backgroundColor: '#FEE2E2',
  },
  statusRedText: {
    color: '#DC2626',
  },
  dateText: {
    color: '#374151',
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsLabel: {
    color: '#4B5563',
  },
  statsValue: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  actions: {
    paddingBottom: 24,
  },
  buttonSpacing: {
    height: 12,
  },
});

export default DetalleScreen;
