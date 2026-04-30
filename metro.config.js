const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// En Windows + Expo + Firebase Auth, forzamos la resolución clásica para
// respetar el campo react-native de dependencias como @firebase/auth.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
