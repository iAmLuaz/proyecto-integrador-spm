# Guía Paso a Paso para Ejecutar el Proyecto

## 📋 Requisitos Previos

1. **Node.js instalado** (v16 o superior)
   - Descargar de: https://nodejs.org/
   - Verificar instalación: `node --version`

2. **Expo CLI instalado globalmente**
   ```bash
   npm install -g expo-cli
   ```

3. **App de Expo Go en tu teléfono** (opcional, para probar en dispositivo real)
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

## 🔥 Configuración de Firebase

### Paso 1: Crear Proyecto en Firebase

1. Ve a https://console.firebase.google.com/
2. Click en **"Agregar proyecto"**
3. Nombre del proyecto: `evaluaciones-uvm` (o el que prefieras)
4. Desactiva Google Analytics (opcional)
5. Click en **"Crear proyecto"**

### Paso 2: Configurar Autenticación

1. En el menú lateral, ve a **Authentication**
2. Click en **"Comenzar"**
3. En la pestaña **"Sign-in method"**
4. Habilita **"Correo electrónico/Contraseña"**
5. Guarda los cambios

### Paso 3: Crear Base de Datos Firestore

1. En el menú lateral, ve a **Firestore Database**
2. Click en **"Crear base de datos"**
3. Selecciona **"Empezar en modo de prueba"**
4. Elige una ubicación cercana (ej: us-central)
5. Click en **"Habilitar"**

### Paso 4: Obtener Credenciales

1. Ve a **Configuración del proyecto** (ícono de engranaje)
2. En la sección **"Tus apps"**, click en el ícono **</>** (Web)
3. Registra la app con el nombre: `app-evaluaciones`
4. Copia las credenciales que aparecen (firebaseConfig)

### Paso 5: Configurar en el Proyecto

1. Abre el archivo: `src/services/firebase.js`
2. Reemplaza las credenciales con las tuyas:

```javascript
const firebaseConfig = {
  apiKey: "PEGA_AQUI_TU_API_KEY",
  authDomain: "PEGA_AQUI_TU_AUTH_DOMAIN",
  projectId: "PEGA_AQUI_TU_PROJECT_ID",
  storageBucket: "PEGA_AQUI_TU_STORAGE_BUCKET",
  messagingSenderId: "PEGA_AQUI_TU_SENDER_ID",
  appId: "PEGA_AQUI_TU_APP_ID"
};
```

## 🚀 Ejecución del Proyecto

### Paso 1: Abrir Terminal en VS Code

1. Abre VS Code
2. Ve a **Terminal** > **Nueva Terminal**
3. Asegúrate de estar en la carpeta del proyecto

### Paso 2: Instalar Dependencias

```bash
npm install
```

⏱️ Esto tomará unos minutos. Espera a que termine.

### Paso 3: Iniciar el Servidor de Desarrollo

```bash
npm start
```

Se abrirá **Expo Dev Tools** en tu navegador.

### Paso 4: Ejecutar en Emulador o Dispositivo

**Opción A: Dispositivo Real (Recomendado para principiantes)**
1. Abre la app **Expo Go** en tu teléfono
2. Escanea el código QR que aparece en la terminal
3. Espera a que cargue la aplicación

**Opción B: Emulador Android**
```bash
npm run android
```
(Requiere Android Studio instalado)

**Opción C: Simulador iOS** (solo Mac)
```bash
npm run ios
```

## 📱 Primeros Pasos en la App

### 1. Registrar un Usuario

1. La app abrirá en la pantalla de Login
2. Ingresa un email: `test@uvm.edu`
3. Ingresa una contraseña: `123456` (mínimo 6 caracteres)
4. Presiona **"Registrarse"**
5. Espera el mensaje de éxito
6. Presiona **"Iniciar Sesión"** con las mismas credenciales

### 2. Crear tu Primera Evaluación

1. Una vez dentro, verás el Dashboard vacío
2. Presiona **"+ Nueva Evaluación"**
3. Llena el formulario:
   - Nombre: `Juan Pérez`
   - Calificación: `85`
4. Presiona **"Crear Evaluación"**
5. Verás la evaluación en el Dashboard

### 3. Probar otras Funcionalidades

- **Ver detalle**: Toca una evaluación para ver más información
- **Editar**: En el detalle, presiona "Editar Evaluación"
- **Eliminar**: Presiona el botón rojo "Eliminar" (te pedirá confirmación)
- **Refrescar**: Desliza hacia abajo en el Dashboard (pull-to-refresh)

## 🧪 Realizar Pruebas de Seguridad (Para el Reporte)

### Pruebas Estáticas con ESLint

```bash
# Ver problemas de código
npx eslint src/
```

Toma captura de pantalla de los resultados.

### Pruebas Dinámicas - Casos de Prueba

Prueba estos casos y documenta los resultados:

1. **Campo vacío**: Intenta crear evaluación sin nombre → Debe mostrar error
2. **Calificación inválida**: Ingresa "abc" en calificación → Debe mostrar error
3. **Calificación fuera de rango**: Ingresa "150" → Debe mostrar error
4. **Email inválido**: Intenta login con "test@" → Debe mostrar error
5. **Contraseña corta**: Intenta registrar con "123" → Debe mostrar error

## 🐛 Solución de Problemas Comunes

### Error: "Command not found: expo"
**Solución:**
```bash
npm install -g expo-cli
```

### Error: "Network response timed out"
**Solución:**
- Asegúrate de estar conectado a internet
- Desactiva VPN si tienes una activa
- Reinicia: `npm start` o presiona `Ctrl+C` y vuelve a ejecutar

### Error: "Firebase: Error (auth/invalid-api-key)"
**Solución:**
- Revisa que copiaste bien las credenciales de Firebase
- No debe haber espacios extra al inicio o final

### La app se ve sin estilos
**Solución:**
```bash
# Limpiar caché de Expo
expo start -c
```

### "Module not found" después de npm install
**Solución:**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

## 📸 Capturas para el Reporte

Toma estas capturas de pantalla para tu documentación:

1. ✅ Pantalla de Login
2. ✅ Dashboard con evaluaciones
3. ✅ Formulario de nueva evaluación
4. ✅ Pantalla de detalle
5. ✅ Mensaje de validación de error
6. ✅ Resultado de ESLint en terminal
7. ✅ Estructura de archivos en VS Code

## ✅ Checklist Final

Antes de entregar, verifica:

- [ ] Firebase configurado correctamente
- [ ] La app corre sin errores
- [ ] CRUD completo funciona (Crear, Leer, Actualizar, Eliminar)
- [ ] Login y registro funcionan
- [ ] Validaciones muestran mensajes de error
- [ ] ESLint ejecutado y documentado
- [ ] README.md revisado
- [ ] Capturas de pantalla tomadas

## 🎓 Para el Reporte de la UVM

Incluye en tu documento:

1. **Arquitectura**: Explica la estructura de carpetas
2. **CRUD**: Describe cómo implementaste cada operación
3. **Seguridad**: Menciona las validaciones y ESLint
4. **Capturas**: Inserta las pantallas de la app funcionando
5. **Código**: Anexa fragmentos importantes (servicios, validaciones)

---

¡Listo! Si sigues esta guía, tendrás la app funcionando en menos de 30 minutos. 🚀
