// src/components/ui/Toast.js
// Toast minimalista controlado por contexto.

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { PALETTE, RADIUS, SHADOW, SPACING, FONT } from '../../theme/theme.js';

const ToastContext = createContext({ show: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);

  const hide = useCallback(() => {
    Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setToast(null);
    });
  }, [opacity]);

  const show = useCallback(
    (message, type = 'success', duration = 2500) => {
      if (timer.current) clearTimeout(timer.current);
      setToast({ message, type });
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }).start();
      timer.current = setTimeout(hide, duration);
    },
    [hide, opacity]
  );

  useEffect(() => () => timer.current && clearTimeout(timer.current), []);

  const bg =
    toast?.type === 'error'
      ? PALETTE.danger
      : toast?.type === 'info'
        ? PALETTE.text
        : PALETTE.success;

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast ? (
        <Animated.View pointerEvents="none" style={[styles.wrap, { opacity }]}>
          <View style={[styles.toast, { backgroundColor: bg }]}>
            <Text style={styles.text}>{toast.message}</Text>
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toast: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    maxWidth: '90%',
    ...SHADOW.modal,
  },
  text: { color: '#FFFFFF', fontWeight: FONT.weight.semibold, fontSize: FONT.size.md },
});
