// src/components/Input.js
// Input base con estilo premium y manejo de error.

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { PALETTE, RADIUS, FONT, SPACING } from '../theme/theme.js';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error = null,
  multiline = false,
  editable = true,
  hint,
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          error ? styles.inputError : null,
          !editable && styles.disabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PALETTE.textSubtle}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        editable={editable}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: SPACING.md },
  label: {
    color: PALETTE.text,
    fontWeight: FONT.weight.semibold,
    marginBottom: 6,
    fontSize: FONT.size.md,
  },
  input: {
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: FONT.size.lg,
    color: PALETTE.text,
    backgroundColor: PALETTE.surface,
    borderWidth: 1,
    borderColor: PALETTE.border,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  inputError: { borderColor: PALETTE.danger, backgroundColor: PALETTE.dangerSoft },
  disabled: { backgroundColor: PALETTE.surfaceAlt, color: PALETTE.textMuted },
  errorText: { color: PALETTE.danger, fontSize: FONT.size.sm, marginTop: 4 },
  hint: { color: PALETTE.textMuted, fontSize: FONT.size.sm, marginTop: 4 },
});

export default Input;
