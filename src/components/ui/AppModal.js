// src/components/ui/AppModal.js
// Modal con header, body scrollable y footer pegado abajo.
// Indica visualmente cuando hay más contenido por debajo.

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PALETTE, RADIUS, SHADOW, SPACING, FONT } from '../../theme/theme.js';

const AppModal = ({ visible, onClose, title, subtitle, children, footer, scrollable = true }) => {
  const [showHint, setShowHint] = useState(false);

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const atBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 8;
    setShowHint(!atBottom);
  };

  const handleContentSize = (_w, h) => {
    if (h > 380) setShowHint(true);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalWrap}
        >
          <View style={styles.modal}>
            <View style={styles.headerRow}>
              <View style={{ flex: 1 }}>
                {title ? <Text style={styles.title}>{title}</Text> : null}
                {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
              </View>
              <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={8}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            <View style={{ position: 'relative' }}>
              {scrollable ? (
                <ScrollView
                  style={{ maxHeight: 480 }}
                  contentContainerStyle={{ paddingBottom: SPACING.lg }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator
                  onScroll={handleScroll}
                  onContentSizeChange={handleContentSize}
                  scrollEventThrottle={32}
                >
                  {children}
                </ScrollView>
              ) : (
                <View>{children}</View>
              )}

              {showHint ? (
                <LinearGradient
                  pointerEvents="none"
                  colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']}
                  style={styles.fade}
                >
                  <Text style={styles.hint}>↓ Desliza para ver más</Text>
                </LinearGradient>
              ) : null}
            </View>

            {footer ? <View style={styles.footer}>{footer}</View> : null}
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: PALETTE.overlay,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  modalWrap: { width: '100%', maxWidth: 520, alignSelf: 'center' },
  modal: {
    backgroundColor: PALETTE.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOW.modal,
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: SPACING.md },
  title: { fontSize: FONT.size.xl, fontWeight: FONT.weight.bold, color: PALETTE.text },
  subtitle: { fontSize: FONT.size.sm, color: PALETTE.textMuted, marginTop: 2 },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PALETTE.surfaceAlt,
  },
  closeText: { fontSize: 16, color: PALETTE.textMuted },
  footer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: PALETTE.border,
    gap: SPACING.sm,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 48,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  hint: {
    fontSize: FONT.size.xs,
    color: PALETTE.accent,
    fontWeight: FONT.weight.semibold,
    letterSpacing: 0.4,
  },
});

export default AppModal;
