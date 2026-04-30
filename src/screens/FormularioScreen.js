// src/screens/FormularioScreen.js
// Pantalla para crear o editar evaluaciones

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  StyleSheet
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { agregarEvaluacion, actualizarEvaluacion } from '../services/evaluacionesService.js';
import Input from '../components/Input.js';
import Button from '../components/Button.js';

const FormularioScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const evaluacionEditar = route.params?.evaluacion;
  const modoEdicion = !!evaluacionEditar;

  const [nombre, setNombre] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (modoEdicion) {
      setNombre(evaluacionEditar.nombre);
      setCalificacion(evaluacionEditar.calificacion.toString());
    }
  }, [modoEdicion, evaluacionEditar]);

  /**
   * VALIDACIÓN: Verificar campos antes de guardar
   * Implementa pruebas de seguridad estática
   */
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido';
    } else if (nombre.length > 100) {
      nuevosErrores.nombre = 'Máximo 100 caracteres';
    }

    if (!calificacion.trim()) {
      nuevosErrores.calificacion = 'La calificación es requerida';
    } else {
      const num = parseFloat(calificacion);
      if (isNaN(num)) {
        nuevosErrores.calificacion = 'Debe ser un número válido';
      } else if (num < 0 || num > 100) {
        nuevosErrores.calificacion = 'Debe estar entre 0 y 100';
      }
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleGuardar = async () => {
    if (!validarFormulario()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    try {
      setLoading(true);

      if (modoEdicion) {
        await actualizarEvaluacion(
          evaluacionEditar.id,
          nombre.trim(),
          parseFloat(calificacion)
        );
        Alert.alert('Éxito', 'Evaluación actualizada correctamente');
      } else {
        await agregarEvaluacion(nombre.trim(), parseFloat(calificacion));
        Alert.alert('Éxito', 'Evaluación creada correctamente');
      }

      navigation.goBack();

    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {modoEdicion ? 'Editar Evaluación' : 'Nueva Evaluación'}
          </Text>
          <Text style={styles.subtitle}>
            {modoEdicion ? 'Modifica los datos de la evaluación' : 'Ingresa los datos del candidato'}
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            
            <Input
              label="Nombre del Candidato"
              value={nombre}
              onChangeText={(text) => {
                setNombre(text);
                if (errors.nombre) setErrors({ ...errors, nombre: null });
              }}
              placeholder="Juan Pérez"
              error={errors.nombre}
            />

            <Input
              label="Calificación (0-100)"
              value={calificacion}
              onChangeText={(text) => {
                const filtrado = text.replace(/[^0-9.]/g, '');
                setCalificacion(filtrado);
                if (errors.calificacion) setErrors({ ...errors, calificacion: null });
              }}
              placeholder="85"
              keyboardType="numeric"
              error={errors.calificacion}
            />

            {/* Información de ayuda */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                💡 Criterios de Evaluación
              </Text>
              <Text style={styles.infoText}>
                • 80-100: Excelente{'\n'}
                • 60-79: Bueno{'\n'}
                • 0-59: Necesita mejorar
              </Text>
            </View>

            {/* Botones */}
            <View style={styles.buttonsContainer}>
              <Button
                title={modoEdicion ? 'Guardar Cambios' : 'Crear Evaluación'}
                onPress={handleGuardar}
                loading={loading}
                variant="primary"
              />

              <View style={styles.buttonSpacing} />

              <Button
                title="Cancelar"
                onPress={() => navigation.goBack()}
                variant="secondary"
                disabled={loading}
              />
            </View>

          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2563EB',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    color: '#BFDBFE',
    marginTop: 8,
  },
  formWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#1D4ED8',
    fontSize: 12,
  },
  buttonsContainer: {
    marginTop: 0,
  },
  buttonSpacing: {
    height: 12,
  },
});

export default FormularioScreen;
