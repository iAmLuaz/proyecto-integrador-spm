// src/screens/LoginScreen.js
// Pantalla de inicio de sesión con validaciones

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { login, registro } from '../services/authService.js';
import Button from '../components/Button.js';
import Input from '../components/Input.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * VALIDACIÓN: Verificar campos antes de enviar
   * Previene envío de datos vacíos o malformados
   */
  const validarCampos = () => {
    const nuevosErrores = {};

    // Validar email
    if (!email.trim()) {
      nuevosErrores.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nuevosErrores.email = 'Formato de email inválido';
    }

    // Validar contraseña
    if (!password) {
      nuevosErrores.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      nuevosErrores.password = 'Mínimo 6 caracteres';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejar inicio de sesión
  const handleLogin = async () => {
    if (!validarCampos()) return;

    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Manejar registro
  const handleRegistro = async () => {
    if (!validarCampos()) return;

    try {
      setLoading(true);
      await registro(email.trim(), password);
      Alert.alert('Éxito', 'Usuario registrado correctamente');
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              Evaluaciones UVM
            </Text>
            <Text style={styles.subtitle}>
              Sistema de Gestión de Evaluaciones
            </Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <Input
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              placeholder="usuario@ejemplo.com"
              keyboardType="email-address"
              error={errors.email}
            />

            <Input
              label="Contraseña"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              placeholder="••••••"
              secureTextEntry
              error={errors.password}
            />

            <View style={styles.buttonsContainer}>
              <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                loading={loading}
                variant="primary"
              />

              <View style={styles.buttonSpacing} />

              <Button
                title="Registrarse"
                onPress={handleRegistro}
                loading={loading}
                variant="secondary"
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Proyecto de Soluciones de Programación Móvil
            </Text>
            <Text style={styles.footerSubtext}>
              Universidad del Valle de México
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonsContainer: {
    marginTop: 16,
  },
  buttonSpacing: {
    height: 12,
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
  footerSubtext: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 4,
  },
});

export default LoginScreen;
