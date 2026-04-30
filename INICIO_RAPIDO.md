# 🎯 INICIO RÁPIDO - 5 Pasos para Ejecutar tu App

## ⏱️ Tiempo estimado: 15-20 minutos

---

## 📋 PASO 1: Instalar Dependencias (5 minutos)

### Abrir terminal en VS Code
1. Presiona `Ctrl + Ñ` (o ve a Terminal > Nueva Terminal)
2. Asegúrate de estar en la carpeta del proyecto

### Ejecutar instalación
```bash
npm install
```

⏳ **Espera a que termine** (puede tomar 3-5 minutos)

✅ **Verás algo como:**
```
added 1234 packages in 3m
```

---

## 🔥 PASO 2: Crear Proyecto en Firebase (5 minutos)

### A. Crear cuenta y proyecto
1. Ve a: https://console.firebase.google.com/
2. Click en **"Agregar proyecto"**
3. Nombre: `evaluaciones-uvm-tunombre`
4. Desactiva Google Analytics
5. Click **"Crear proyecto"**
6. Espera 30 segundos

### B. Habilitar Autenticación
1. En menú lateral: **Authentication**
2. Click **"Comenzar"**
3. Click en **"Correo electrónico/Contraseña"**
4. Activa el primer switch (Correo electrónico/Contraseña)
5. Click **"Guardar"**

### C. Crear Base de Datos
1. En menú lateral: **Firestore Database**
2. Click **"Crear base de datos"**
3. Selecciona **"Empezar en modo de prueba"**
4. Ubicación: `us-central` (o la más cercana)
5. Click **"Habilitar"**
6. Espera 1 minuto

### D. Obtener Credenciales
1. Click en ⚙️ (Configuración del proyecto)
2. Baja hasta **"Tus apps"**
3. Click en el ícono **</>** (Web)
4. Nombre de app: `app-evaluaciones`
5. Click **"Registrar app"**
6. **COPIA el bloque firebaseConfig** (lo necesitarás en el siguiente paso)

Ejemplo de lo que debes copiar:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "evaluaciones-uvm-123.firebaseapp.com",
  projectId: "evaluaciones-uvm-123",
  storageBucket: "evaluaciones-uvm-123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## ⚙️ PASO 3: Configurar Firebase en el Código (2 minutos)

1. En VS Code, abre: `src/services/firebase.js`
2. Busca la línea 9 donde dice `const firebaseConfig = {`
3. **Reemplaza** el objeto completo con el que copiaste de Firebase
4. **Guarda el archivo** (Ctrl + S)

### ✅ Debe verse así:
```javascript
// Antes (Demo)
const firebaseConfig = {
  apiKey: "AIzaSyDEMO_KEY_REEMPLAZAR",
  // ...
};

// Después (Tus credenciales reales)
const firebaseConfig = {
  apiKey: "AIzaSyD1a2b3c4d5e6f7...",  // ← Tu API Key real
  authDomain: "tu-proyecto-real.firebaseapp.com",
  // ... resto de tus credenciales
};
```

---

## 🚀 PASO 4: Ejecutar la Aplicación (3 minutos)

### Opción A: En Dispositivo Real (RECOMENDADO)

#### 1. Instalar Expo Go en tu celular
- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent
- **iOS**: https://apps.apple.com/app/expo-go/id982107779

#### 2. Iniciar servidor
En la terminal de VS Code:
```bash
npm start
```

⏳ Espera a que aparezca el código QR (30 segundos aprox)

#### 3. Escanear código QR
- **Android**: Abre Expo Go → Escanear QR
- **iOS**: Abre Cámara nativa → Escanea el QR

✅ La app se cargará en tu teléfono

### Opción B: En Emulador Android

```bash
npm run android
```

(Requiere Android Studio instalado)

---

## 📱 PASO 5: Probar la Aplicación (5 minutos)

### 1. Registrar Usuario
Cuando abra la app:
- Email: `prueba@uvm.edu`
- Contraseña: `123456`
- Click en **"Registrarse"**
- Mensaje de éxito ✅

### 2. Iniciar Sesión
- Usa las mismas credenciales
- Click en **"Iniciar Sesión"**
- Debes ver el Dashboard vacío

### 3. Crear Primera Evaluación
- Click en **"+ Nueva Evaluación"**
- Nombre: `Juan Pérez`
- Calificación: `85`
- Click en **"Crear Evaluación"**
- Verás la evaluación en el Dashboard con color verde

### 4. Ver Detalle
- Toca la tarjeta de evaluación
- Verás toda la información

### 5. Editar
- En detalle, click **"Editar Evaluación"**
- Cambia calificación a `95`
- Guarda
- Verás el cambio reflejado

### 6. Eliminar
- Click en **"Eliminar"**
- Confirma
- La evaluación desaparece

---

## 🧪 Probar Validaciones (Para el Reporte)

### Test 1: Campo Vacío
1. Click **"+ Nueva Evaluación"**
2. Deja nombre vacío
3. Calificación: `80`
4. Click **"Crear Evaluación"**
5. ❌ **Debe mostrar**: "El nombre es requerido"

### Test 2: Calificación Inválida
1. Nombre: `Test`
2. Calificación: `abc`
3. Click **"Crear Evaluación"**
4. ❌ **Debe mostrar**: "Debe ser un número válido"

### Test 3: Fuera de Rango
1. Nombre: `Test`
2. Calificación: `150`
3. Click **"Crear Evaluación"**
4. ❌ **Debe mostrar**: "Debe estar entre 0 y 100"

📸 **IMPORTANTE**: Toma capturas de estos errores para tu reporte

---

## 📊 Ejecutar ESLint (Para el Reporte)

En la terminal:
```bash
npx eslint src/
```

📋 **Copia el resultado** y pégalo en tu documento de reporte.

Ejemplo de output esperado:
```
✓ src/components/Button.js (0 problems)
✓ src/components/Input.js (0 problems)
✓ src/services/firebase.js (0 problems)

Total: 0 errors, 0 warnings
```

---

## ✅ Checklist de Verificación

Antes de entregar, asegúrate de:

- [ ] ✅ Firebase configurado con tus credenciales
- [ ] ✅ `npm install` ejecutado sin errores
- [ ] ✅ App ejecutándose en celular o emulador
- [ ] ✅ Puedes registrarte e iniciar sesión
- [ ] ✅ Puedes crear, ver, editar y eliminar evaluaciones
- [ ] ✅ Validaciones funcionan y muestran errores
- [ ] ✅ ESLint ejecutado y resultado guardado
- [ ] ✅ Capturas de pantalla tomadas

---

## 🆘 Problemas Comunes

### Error: "Command not found: npm"
**Solución:** Instala Node.js desde https://nodejs.org/

### Error: "Firebase: Error (auth/invalid-api-key)"
**Solución:** Verifica que copiaste bien las credenciales en `firebase.js`

### Error: "Unable to resolve module"
**Solución:**
```bash
rm -rf node_modules
npm install
```

### La app no carga en el celular
**Solución:**
- Asegúrate de estar en la misma red WiFi
- Cierra Expo Go y vuelve a escanear el QR
- Reinicia: `Ctrl+C` en terminal, luego `npm start`

### Pantalla en blanco
**Solución:**
```bash
expo start -c
```
(Esto limpia la caché)

---

## 🎓 Listo para Entregar

### Tu entrega debe incluir:

1. **Carpeta del proyecto completa** (`app-web-spm`)
2. **Capturas de pantalla:**
   - Login
   - Dashboard con evaluaciones
   - Formulario
   - Detalle
   - Errores de validación
3. **Output de ESLint** (copiado en documento)
4. **Tabla de pruebas** (de PRUEBAS_SEGURIDAD.md)

### Documentos ya listos que puedes adjuntar:
- ✅ README.md (documentación técnica)
- ✅ PRUEBAS_SEGURIDAD.md (validaciones para punto 3.3)
- ✅ RESUMEN_EJECUTIVO.md (resumen del proyecto)

---

## 🏆 ¡Felicidades!

Si llegaste hasta aquí y todo funciona, tienes una aplicación móvil profesional lista para entregar.

### Ventajas de este proyecto:
- ✅ Cumple 100% con requisitos de la UVM
- ✅ Código limpio y comentado
- ✅ Fácil de explicar y defender
- ✅ Documentación completa
- ✅ Validaciones de seguridad implementadas

---

**¿Dudas?** Revisa los archivos de documentación:
- 📖 README.md - Documentación completa
- 🔧 GUIA_INSTALACION.md - Instrucciones detalladas
- 🛡️ PRUEBAS_SEGURIDAD.md - Validaciones

**¡Éxito en tu entrega! 🚀**
