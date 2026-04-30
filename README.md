# 📱 Sistema de Gestión de Evaluaciones UVM

Aplicación móvil desarrollada con **React Native + Expo** para la gestión de evaluaciones de candidatos. Proyecto final de la materia **Soluciones de Programación Móvil** - Universidad del Valle de México.

## 🎯 Características Principales

### ✅ CRUD Completo
- **Create**: Agregar nuevos candidatos con nombre y calificación
- **Read**: Listar todas las evaluaciones en el Dashboard
- **Update**: Editar información de candidatos existentes
- **Delete**: Eliminar evaluaciones con confirmación

### 🔐 Autenticación
- Login y registro de usuarios con Firebase Auth
- Validación de credenciales (email y contraseña)
- Cierre de sesión seguro

### 🎨 Interfaz Profesional
- Diseño moderno con **NativeWind** (Tailwind CSS para móvil)
- Componentes reutilizables (Button, Input, Card)
- Sistema de colores basado en calificaciones
- Navegación fluida con React Navigation

### 🛡️ Seguridad
- Validación de tipos de datos (strings, números)
- Verificación de rangos (calificaciones 0-100)
- Manejo de errores robusto
- Sanitización de inputs

## 📁 Estructura del Proyecto

```
/src
  /components          # Componentes reutilizables
    ├── Button.js      # Botón personalizado
    ├── Input.js       # Input con validaciones
    ├── Card.js        # Tarjeta de evaluación
    └── LoadingScreen.js
  
  /screens            # Pantallas de la aplicación
    ├── LoginScreen.js        # Autenticación
    ├── DashboardScreen.js    # Lista de evaluaciones
    ├── FormularioScreen.js   # Crear/Editar
    └── DetalleScreen.js      # Ver detalle
  
  /navigation         # Configuración de navegación
    └── AppNavigator.js
  
  /services           # Lógica de negocio
    ├── firebase.js           # Configuración Firebase
    ├── authService.js        # Autenticación
    └── evaluacionesService.js # CRUD
  
  /hooks              # Hooks personalizados
    ├── useAuth.js
    └── useEvaluaciones.js

App.js                # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js (v16 o superior)
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Cuenta de Firebase (gratuita)

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Authentication** > Email/Password
4. Crea una base de datos **Firestore**
5. En configuración del proyecto, obtén las credenciales
6. Abre `src/services/firebase.js` y reemplaza con tus credenciales:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Paso 3: Ejecutar la aplicación
```bash
# Iniciar el servidor de desarrollo
npm start

# O directamente en Android
npm run android

# O en iOS
npm run ios
```

## 📱 Uso de la Aplicación

### 1. Registro e Inicio de Sesión
- Abre la app
- Registra un nuevo usuario (email + contraseña min. 6 caracteres)
- Inicia sesión con tus credenciales

### 2. Crear Evaluación
- Presiona **"+ Nueva Evaluación"**
- Ingresa nombre del candidato
- Ingresa calificación (0-100)
- Presiona **"Crear Evaluación"**

### 3. Ver y Editar
- Toca una evaluación del Dashboard para ver detalles
- Presiona **"Editar Evaluación"** para modificar
- Los cambios se guardan automáticamente

### 4. Eliminar
- Desde el Dashboard, presiona **"Eliminar"** en una tarjeta
- Confirma la eliminación
- O desde la pantalla de detalle

## 🔒 Validaciones de Seguridad Implementadas

### Validaciones Estáticas (Código)
✅ Verificación de tipos de datos (typeof)  
✅ Validación de rangos numéricos (0-100)  
✅ Límites de caracteres (nombre max 100)  
✅ Formato de email con regex  
✅ Longitud mínima de contraseña (6 chars)  

### Validaciones Dinámicas (Tiempo de Ejecución)
✅ Inputs vacíos no permitidos  
✅ Solo números en calificación  
✅ Mensajes de error descriptivos  
✅ Try-catch en todas las operaciones  
✅ Sanitización de espacios en blanco  

### Herramientas de Seguridad Utilizadas

#### ESLint (Análisis Estático)
```bash
# Ver problemas de código
npx eslint src/
```
- Detecta errores de sintaxis
- Variables no utilizadas
- Malas prácticas de código

#### Snyk (Análisis de Vulnerabilidades)
```bash
# Instalar Snyk CLI
npm install -g snyk

# Autenticar
snyk auth

# Escanear vulnerabilidades
snyk test
```

## 🧪 Pruebas de Seguridad

### Pruebas Estáticas
1. Abre VS Code
2. Instala extensión "ESLint"
3. Revisa la pestaña **Problems** para ver advertencias
4. Documento las advertencias en tu reporte

### Pruebas Dinámicas (Casos de Prueba)

| Caso | Input | Resultado Esperado |
|------|-------|-------------------|
| Campo vacío | Nombre: "" | Error: "El nombre es requerido" |
| Calificación texto | Calificación: "abc" | Error: "Debe ser un número válido" |
| Calificación fuera de rango | Calificación: 150 | Error: "Debe estar entre 0 y 100" |
| Email inválido | Email: "test@" | Error: "Formato de email inválido" |
| Contraseña corta | Password: "123" | Error: "Mínimo 6 caracteres" |

### Documentar Pruebas para el Reporte
1. Toma capturas de pantalla de los errores
2. Ejecuta `npx eslint src/` y guarda el output
3. Ejecuta `snyk test` y documenta vulnerabilidades encontradas

## 📊 Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| React Native | Framework móvil multiplataforma |
| Expo | Herramientas de desarrollo y build |
| NativeWind | Estilos (Tailwind CSS para móvil) |
| Firebase Auth | Autenticación de usuarios |
| Firestore | Base de datos NoSQL en tiempo real |
| React Navigation | Navegación entre pantallas |
| ESLint | Análisis estático de código |

## 📝 Reglas de Firestore (Opcional)

Para mayor seguridad en Firebase Console > Firestore > Reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /evaluaciones/{document=**} {
      // Solo usuarios autenticados pueden leer y escribir
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🎓 Información del Proyecto

**Materia**: Soluciones de Programación Móvil  
**Institución**: Universidad del Valle de México (UVM)  
**Tipo**: Proyecto Final - MVP  

## 📌 Entregables para la UVM

### 3.3 Archivo de Código (20%)
✅ Código fuente completo en esta carpeta  
✅ Estructura organizada y comentada  
✅ Configuraciones incluidas  

### Validaciones de Seguridad
✅ Validación de tipos de datos implementada  
✅ Manejo de errores robusto  
✅ ESLint configurado (pruebas estáticas)  
✅ Casos de prueba documentados (pruebas dinámicas)  
✅ Recomendación de Snyk (software de seguridad)  

## 🐛 Troubleshooting

### Error: "Firebase not configured"
- Verifica que las credenciales en `firebase.js` sean correctas
- Asegúrate de haber habilitado Firestore y Auth en Firebase Console

### Error al compilar NativeWind
```bash
# Limpiar caché
expo start -c
```

### No aparecen los estilos
- Verifica que `tailwind.config.js` esté en la raíz
- Revisa que NativeWind esté en `babel.config.js`

## 📞 Soporte

Para dudas sobre el código, revisar los comentarios en cada archivo:
- Los servicios están documentados en `/src/services/`
- Las validaciones están marcadas con `// VALIDACIÓN:` y `// SEGURIDAD:`

## ✨ Características Adicionales Implementadas

- 🔄 Pull-to-refresh en Dashboard
- 🎨 Sistema de colores dinámico según calificación
- 📅 Timestamps automáticos de creación y actualización
- ⚡ Loading states en todas las operaciones
- 🚨 Alertas de confirmación antes de eliminar
- 📱 Diseño responsive y moderno

---

**Desarrollado con ❤️ para la UVM**
