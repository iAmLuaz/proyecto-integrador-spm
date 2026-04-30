// src/screens/DashboardScreen.js
// Pantalla principal con lista de evaluaciones

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  RefreshControl,
  Alert,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useEvaluaciones from '../hooks/useEvaluaciones.js';
import { eliminarEvaluacion } from '../services/evaluacionesService.js';
import { logout } from '../services/authService.js';
import Card from '../components/Card.js';
import Button from '../components/Button.js';
import LoadingScreen from '../components/LoadingScreen.js';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const { evaluaciones, loading, refrescar } = useEvaluaciones();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refrescar();
    setRefreshing(false);
  };

  const handleNuevaEvaluacion = () => {
    navigation.navigate('Formulario');
  };

  const handleVerDetalle = (evaluacion) => {
    navigation.navigate('Detalle', { evaluacion });
  };

  const handleEliminar = (id, nombre) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar la evaluación de "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarEvaluacion(id);
              Alert.alert('Éxito', 'Evaluación eliminada');
              refrescar();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  if (loading && evaluaciones.length === 0) {
    return <LoadingScreen message="Cargando evaluaciones..." />;
  }

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>
            Dashboard
          </Text>
          <TouchableOpacity 
            onPress={handleCerrarSesion}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.subtitle}>
          {evaluaciones.length} evaluaciones registradas
        </Text>
      </View>

      {/* Lista de evaluaciones */}
      <View style={styles.content}>
        {evaluaciones.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              No hay evaluaciones aún
            </Text>
            <Text style={styles.emptySubtitle}>
              Presiona &quot;Nueva Evaluación&quot; para comenzar
            </Text>
          </View>
        ) : (
          <FlatList
            data={evaluaciones}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                evaluacion={item}
                onPress={() => handleVerDetalle(item)}
                onDelete={() => handleEliminar(item.id, item.nombre)}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#2563EB']}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Botón flotante */}
      <View style={styles.footer}>
        <Button
          title="+ Nueva Evaluación"
          onPress={handleNuevaEvaluacion}
          variant="primary"
        />
      </View>

    </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
  subtitle: {
    color: '#BFDBFE',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#9CA3AF',
    fontSize: 18,
    marginBottom: 16,
  },
  emptySubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});

export default DashboardScreen;
