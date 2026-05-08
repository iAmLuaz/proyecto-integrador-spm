// src/components/ui/ConfirmDialog.js
// Diálogo de confirmación reutilizable. Acciones en footer pegado.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppModal from './AppModal.js';
import Button from '../Button.js';
import { PALETTE, FONT, SPACING } from '../../theme/theme.js';

const ConfirmDialog = ({
  visible,
  title = '¿Confirmar?',
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}) => (
  <AppModal
    visible={visible}
    onClose={onCancel}
    title={title}
    scrollable={false}
    footer={
      <View style={styles.actions}>
        <View style={{ flex: 1 }}>
          <Button title={cancelLabel} variant="secondary" onPress={onCancel} fullWidth />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title={confirmLabel}
            variant={variant}
            gradient
            onPress={onConfirm}
            loading={loading}
            fullWidth
          />
        </View>
      </View>
    }
  >
    {message ? <Text style={styles.message}>{message}</Text> : null}
  </AppModal>
);

const styles = StyleSheet.create({
  message: { color: PALETTE.text, fontSize: FONT.size.lg, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: SPACING.sm },
});

export default ConfirmDialog;
