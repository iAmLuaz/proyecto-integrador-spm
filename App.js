// App.js
// Punto de entrada con carga de fuentes Inter y navegación animada
// (slide horizontal) entre Home y Settings.

import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { ToastProvider } from './src/components/ui/Toast';
import useGymSettings from './src/hooks/useGymSettings';
import LoadingScreen from './src/components/LoadingScreen';
import applyFontPatch from './src/utils/applyFontPatch';

const { width: SCREEN_W } = Dimensions.get('window');
const ANIM_DURATION = 320;

function Root() {
  const [route, setRoute] = useState('home'); // 'home' | 'settings'
  const { settings, loading, update } = useGymSettings();
  const slide = useRef(new Animated.Value(0)).current; // 0 home, 1 settings

  useEffect(() => {
    Animated.timing(slide, {
      toValue: route === 'settings' ? 1 : 0,
      duration: ANIM_DURATION,
      useNativeDriver: true,
    }).start();
  }, [route, slide]);

  if (loading || !settings) {
    return <LoadingScreen message="Cargando tu app..." />;
  }

  const translateX = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SCREEN_W],
  });

  return (
    <View style={styles.viewport}>
      <Animated.View style={[styles.track, { transform: [{ translateX }] }]}>
        <View style={styles.pane}>
          <HomeScreen onOpenSettings={() => setRoute('settings')} />
        </View>
        <View style={styles.pane}>
          <SettingsScreen
            settings={settings}
            onSave={update}
            onBack={() => setRoute('home')}
          />
        </View>
      </Animated.View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) applyFontPatch();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <LoadingScreen message="Preparando tipografía..." />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ToastProvider>
          <Root />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  viewport: { flex: 1, overflow: 'hidden' },
  track: { flexDirection: 'row', width: SCREEN_W * 2, flex: 1 },
  pane: { width: SCREEN_W, flex: 1 },
});
