// src/components/LoadingScreen.js
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { PALETTE, FONT } from '../theme/theme.js';

const LoadingScreen = ({ message = 'Cargando…' }) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={PALETTE.accent} />
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.bg,
  },
  message: { color: PALETTE.textMuted, marginTop: 16, fontSize: FONT.size.lg },
});

export default LoadingScreen;
