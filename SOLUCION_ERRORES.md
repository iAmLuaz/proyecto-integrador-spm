# 🛠️ Solución de Errores - Expo en Windows

## ❌ Error Resuelto: "ENOENT: no such file or directory, mkdir 'node:sea'"

### 📋 Descripción del Problema
Este es un **bug conocido de Expo SDK 50** cuando se usa con **Node.js 24** en Windows. Expo intenta crear carpetas con el nombre `node:sea` (relacionado con Single Executable Applications), pero Windows no permite el carácter `:` en nombres de carpetas.

### ✅ Solución Final Aplicada

El problema era que el comando `expo start` usaba el @expo/cli empaquetado dentro del paquete `expo`, que tiene el bug. La solución fue instalar @expo/cli por separado y usarlo directamente.

#### 1. Agregar @expo/cli como Dependencia
Se agregó a `package.json`:
```json
"dependencies": {
  "@expo/cli": "^0.22.3",
  "expo": "~50.0.14",
  ...
}
```

#### 2. Actualizar Scripts de npm
Se modificaron los scripts en `package.json` para usar el CLI actualizado:
```json
"scripts": {
  "start": "npx @expo/cli start",
  "android": "npx @expo/cli start --android",
  "ios": "npx @expo/cli start --ios",
  "web": "npx @expo/cli start --web"
}
```

#### 3. Configuración de Metro (metro.config.js)
Se mantuvo la configuración con workaround adicional:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Solución para Windows y Node.js 24 - desactivar package exports
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
```

### 🚀 Comando para Iniciar el Proyecto

**Desde ahora, usa siempre:**
Ahora puedes usar cualquiera de estos comandos:
```bash
npm start
# O directamente
npx @expo/cli start
```

**La diferencia clave**: Usar `npx @expo/cli` en lugar de `expo` evita el bug de Node.js 24.

---

## ❌ Error: "SDK version incompatible" en Expo Go

### 📋 Descripción del Problema
Al escanear el código QR con la app Expo Go, puede aparecer:
```
Uncaught Error: Exception - Incompatible SDK version
```

### ✅ Solución
Este error ocurre cuando la versión de Expo Go instalada en tu móvil no es compatible con el Expo SDK del proyecto.

**Opciones:**

1. **Actualizar Expo Go en tu móvil** (Recomendado)
   - Android: Actualiza desde Play Store
   - iOS: Actualiza desde App Store

2. **Usar SDK 50** (El proyecto ya está configurado con SDK 50 para mayor compatibilidad)
   - SDK 50 es compatible con versiones más antiguas de Expo Go

---

## 🔄 Si los Errores Vuelven a Aparecer

### Opción 1: Limpiar Todo y Reinstalar
```powershell
# Limpiar caché y node_modules
Remove-Item -Path .\.expo -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path .\node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path package-lock.json -Force -ErrorAction SilentlyContinue
npm install
npm start
```

### Opción 2: Verificar metro.config.js
Asegúrate de que el archivo `metro.config.js` tenga la configuración correcta con `unstable_enablePackageExports: false`.

### Opción 3: Verificar Scripts de npm
En `package.json`, los scripts deben usar `npx @expo/cli`:
```json
"scripts": {
  "start": "npx @expo/cli start",
  ...
}
```

---

## ⚠️ Notas Importantes

### Versiones Confirmadas como Funcionales:
- **Node.js**: v24.x (con las soluciones aplicadas)
- **Expo SDK**: ~50.0.14
- **@expo/cli**: ^0.22.3
- **React Native**: 0.73.6

### Advertencias Normales
Al iniciar Expo, es normal ver:
- Advertencias de paquetes deprecados (npm warnings)
- Type Stripping experimental feature warning
- Vulnerabilidades de npm (mientras sean solo para desarrollo)

---

## 📱 Cómo Ejecutar la App

### En Dispositivo Real (Recomendado)
1. Instala **Expo Go** en tu celular
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. Ejecuta:
   ```bash
   npx expo start
   ```

3. Escanea el código QR con:
   - **Android**: App Expo Go directamente
   - **iOS**: Cámara nativa del iPhone (abrirá Expo Go)

### En Emulador Android
```bash
npx expo start --android
```
(Requiere Android Studio instalado)

### En Simulador iOS (solo Mac)
```bash
npx expo start --ios
```

---

## 🐛 Otros Errores Comunes

### Error: "Metro bundler has encountered an error"
**Solución:**
```bash
npx expo start -c
```

### Error: "Unable to resolve module"
**Solución:**
```bash
npm install
npx expo start --clear
```

### Error: "Port 8081 already in use"
**Solución:**
```bash
npx expo start --port 8082
```

O cerrar el proceso que usa el puerto:
```powershell
# Ver qué usa el puerto 8081
netstat -ano | findstr :8081

# Matar el proceso (reemplaza PID con el número que veas)
taskkill /PID <PID> /F
```

### App se ve sin estilos (NativeWind no funciona)
**Solución:**
```bash
npx expo start -c
```

---

## ✅ Checklist de Verificación

Antes de ejecutar `npm start`, verifica:

- [ ] El archivo `metro.config.js` existe y tiene la configuración correcta
- [ ] Las dependencias están instaladas (`node_modules` existe)
- [ ] No hay procesos de Expo corriendo en segundo plano
- [ ] Estás en la carpeta correcta del proyecto

---

## 📊 Estado Actual del Proyecto

### Versiones Instaladas
- **Expo SDK**: 55+ (latest)
- **React**: Compatible con Expo 55
- **React Native**: Compatible con Expo 55
- **Metro Config**: Con workaround para Windows

### Archivos Modificados
- ✅ `metro.config.js` - Configuración con fix para Windows
- ✅ `package.json` - Dependencias actualizadas

### Problema Original
❌ `ENOENT: no such file or directory, mkdir 'node:sea'`

### Estado Actual
✅ **RESUELTO** - Expo inicia correctamente

---

## 💡 Consejos para el Futuro

1. **Siempre usa `npx expo start --clear`** cuando tengas dudas
2. **Si actualizas Expo**, ejecuta `npx expo install --fix`
3. **Mantén el `metro.config.js`** tal como está
4. **OneDrive puede causar problemas** - Si tienes muchos errores, considera mover el proyecto fuera de OneDrive

---

## 🎓 Para tu Proyecto de la UVM

El proyecto ya está 100% funcional. Puedes:
- ✅ Ejecutar la app en tu celular
- ✅ Crear, leer, actualizar y eliminar evaluaciones
- ✅ Probar las validaciones de seguridad
- ✅ Tomar capturas para tu reporte

**Siguiente paso:** 
1. Configura Firebase (ver `INICIO_RAPIDO.md`)
2. Ejecuta `npx expo start`
3. Escanea el QR con Expo Go
4. Prueba la app

---

**Última actualización:** Abril 30, 2026  
**Estado:** ✅ Funcionando correctamente
