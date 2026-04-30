# 📚 Índice de Documentación

## Bienvenido al Sistema de Gestión de Evaluaciones UVM

Este proyecto incluye documentación completa organizada en varios archivos. Usa este índice para encontrar rápidamente lo que necesitas.

---

## 🚀 Para Empezar (Lee PRIMERO)

### [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
**⏱️ 15-20 minutos | 📊 Nivel: Principiante**

Guía paso a paso para tener la app funcionando rápidamente:
- ✅ Instalación de dependencias
- ✅ Configuración de Firebase (con screenshots)
- ✅ Ejecutar la aplicación
- ✅ Primeras pruebas
- ✅ Checklist de verificación

**👉 Empieza aquí si es tu primera vez**

---

## 📖 Documentación Técnica

### [README.md](README.md)
**📊 Nivel: Todos**

Documentación completa del proyecto:
- Características principales
- Estructura del proyecto
- Stack tecnológico
- CRUD completo explicado
- Validaciones de seguridad
- Troubleshooting detallado
- Reglas de Firestore

**👉 Lee esto para entender el proyecto completo**

---

## 🔧 Instalación y Configuración

### [GUIA_INSTALACION.md](GUIA_INSTALACION.md)
**⏱️ 30 minutos | 📊 Nivel: Principiante**

Guía detallada con instrucciones paso a paso:
- Requisitos previos
- Crear proyecto en Firebase (con capturas)
- Configurar autenticación
- Crear base de datos Firestore
- Obtener credenciales
- Ejecutar en emulador/dispositivo
- Solución de problemas comunes

**👉 Usa esto si necesitas instrucciones más detalladas**

---

## 🛡️ Validaciones de Seguridad

### [PRUEBAS_SEGURIDAD.md](PRUEBAS_SEGURIDAD.md)
**📊 Nivel: Avanzado | 🎯 Para la entrega 3.3**

Documentación de validaciones para el reporte:
- ✅ Validaciones de tipos de datos implementadas
- ✅ Pruebas estáticas con ESLint
- ✅ 11 casos de prueba dinámicos documentados
- ✅ Software de seguridad (Snyk)
- ✅ Tabla de resumen de validaciones
- ✅ Plantilla para evidencias

**👉 ESENCIAL para el punto 3.3 de la entrega**

---

## 📄 Resumen del Proyecto

### [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md)
**⏱️ 5 minutos | 📊 Nivel: Todos**

Resumen ejecutivo del proyecto:
- Requisitos cumplidos (checklist)
- Estructura del proyecto
- Stack tecnológico
- Funcionalidades principales
- Evidencias sugeridas
- Puntos clave para el reporte

**👉 Perfecto para tener una visión general rápida**

---

## ⚙️ Archivos de Configuración

### [.env.example](.env.example)
Plantilla de variables de entorno para Firebase.

### [package.json](package.json)
Dependencias y scripts del proyecto.

### [app.json](app.json)
Configuración de Expo.

### [.eslintrc.js](.eslintrc.js)
Configuración de ESLint para análisis estático.

### [tailwind.config.js](tailwind.config.js)
Configuración de NativeWind (Tailwind CSS).

---

## �️ Solución de Problemas

### [SOLUCION_ERRORES.md](SOLUCION_ERRORES.md)
**📊 Nivel: Troubleshooting**

Soluciones a errores comunes de Expo en Windows:
- ✅ Error "ENOENT: node:sea" resuelto
- ✅ Configuración de Metro para Windows
- ✅ Comandos de limpieza de caché
- ✅ Errores comunes y sus soluciones

**👉 Consulta esto si tienes errores al ejecutar `npm start`**

---

## �📂 Estructura del Código

```
src/
├── components/           # Componentes reutilizables
│   ├── Button.js        # Botón personalizado
│   ├── Input.js         # Input con validaciones
│   ├── Card.js          # Tarjeta de evaluación
│   └── LoadingScreen.js # Pantalla de carga
│
├── screens/             # Pantallas principales
│   ├── LoginScreen.js   # Autenticación
│   ├── DashboardScreen.js    # Lista de evaluaciones
│   ├── FormularioScreen.js   # Crear/Editar
│   └── DetalleScreen.js      # Ver detalle
│
├── navigation/          # Configuración de navegación
│   └── AppNavigator.js  # Stack Navigator
│
├── services/            # Lógica de negocio
│   ├── firebase.js      # Configuración Firebase
│   ├── authService.js   # Autenticación
│   └── evaluacionesService.js # CRUD completo
│
└── hooks/               # Hooks personalizados
    ├── useAuth.js       # Hook de autenticación
    └── useEvaluaciones.js # Hook de evaluaciones
```

---

## 🎯 Guías por Objetivo

### 🎓 Para Entregar el Proyecto
1. Lee [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md) - Visión general
2. Lee [PRUEBAS_SEGURIDAD.md](PRUEBAS_SEGURIDAD.md) - Para punto 3.3
3. Toma capturas de pantalla siguiendo [INICIO_RAPIDO.md](INICIO_RAPIDO.md)
4. Copia fragmentos de código relevantes de los servicios

### 💻 Para Ejecutar la App
1. Sigue [INICIO_RAPIDO.md](INICIO_RAPIDO.md) - 5 pasos simples
2. Si tienes problemas, consulta [GUIA_INSTALACION.md](GUIA_INSTALACION.md)
3. Revisa sección de Troubleshooting en [README.md](README.md)

### 🔍 Para Entender el Código
1. Lee [README.md](README.md) - Arquitectura general
2. Abre [src/services/evaluacionesService.js](src/services/evaluacionesService.js) - CRUD
3. Abre [src/services/authService.js](src/services/authService.js) - Auth
4. Revisa las pantallas en [src/screens/](src/screens/)

### 🛡️ Para Documentar Seguridad
1. Lee [PRUEBAS_SEGURIDAD.md](PRUEBAS_SEGURIDAD.md) completo
2. Ejecuta `npx eslint src/` (ver README)
3. Realiza los 11 casos de prueba documentados
4. Toma capturas de errores de validación

---

## 📱 Archivos Principales del Código

### Servicios (Lógica de Negocio)

**[src/services/firebase.js](src/services/firebase.js)**
- Configuración de Firebase
- Inicialización de Firestore y Auth
- **👉 IMPORTANTE: Aquí debes poner tus credenciales**

**[src/services/evaluacionesService.js](src/services/evaluacionesService.js)**
- CRUD completo (Create, Read, Update, Delete)
- Validaciones de tipos de datos
- Manejo de errores
- **👉 Código clave para el reporte**

**[src/services/authService.js](src/services/authService.js)**
- Login y registro
- Validaciones de email y contraseña
- Manejo de sesión
- **👉 Validaciones importantes para seguridad**

### Pantallas

**[src/screens/LoginScreen.js](src/screens/LoginScreen.js)**
- Pantalla de inicio de sesión
- Validaciones de formulario
- Registro de usuarios

**[src/screens/DashboardScreen.js](src/screens/DashboardScreen.js)**
- Lista de evaluaciones
- Pull-to-refresh
- Navegación

**[src/screens/FormularioScreen.js](src/screens/FormularioScreen.js)**
- Crear nueva evaluación
- Editar evaluación existente
- Validaciones en tiempo real
- **👉 Ver validaciones de inputs**

**[src/screens/DetalleScreen.js](src/screens/DetalleScreen.js)**
- Ver detalle completo
- Opciones de editar y eliminar
- Sistema de colores

### Componentes Reutilizables

**[src/components/Button.js](src/components/Button.js)**
- Botón personalizado con NativeWind

**[src/components/Input.js](src/components/Input.js)**
- Input con validaciones visuales

**[src/components/Card.js](src/components/Card.js)**
- Tarjeta de evaluación

---

## 🔗 Enlaces Útiles

### Firebase
- [Firebase Console](https://console.firebase.google.com/)
- [Documentación de Firestore](https://firebase.google.com/docs/firestore)
- [Documentación de Auth](https://firebase.google.com/docs/auth)

### React Native / Expo
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind Docs](https://www.nativewind.dev/)

### Herramientas de Seguridad
- [ESLint](https://eslint.org/)
- [Snyk](https://snyk.io/)

---

## 📞 Ayuda Rápida

### ❓ Tengo un error...

| Error | Documento a consultar |
|-------|----------------------|
| No puedo instalar dependencias | [GUIA_INSTALACION.md](GUIA_INSTALACION.md) → Troubleshooting |
| Firebase no funciona | [INICIO_RAPIDO.md](INICIO_RAPIDO.md) → Paso 2 y 3 |
| No entiendo el código | [README.md](README.md) → Estructura |
| ¿Qué validaciones hay? | [PRUEBAS_SEGURIDAD.md](PRUEBAS_SEGURIDAD.md) |
| ¿Cómo ejecuto la app? | [INICIO_RAPIDO.md](INICIO_RAPIDO.md) → Paso 4 |

---

## ✅ Checklist de Documentos Leídos

Marca los que ya revisaste:

- [ ] INICIO_RAPIDO.md - Para ejecutar rápido
- [ ] README.md - Documentación completa
- [ ] PRUEBAS_SEGURIDAD.md - Para punto 3.3
- [ ] RESUMEN_EJECUTIVO.md - Visión general
- [ ] GUIA_INSTALACION.md - Instrucciones detalladas

---

## 🎓 Para la Entrega UVM

### Documentos ESENCIALES:
1. ✅ [PRUEBAS_SEGURIDAD.md](PRUEBAS_SEGURIDAD.md) - Para entrega 3.3
2. ✅ [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md) - Resumen del proyecto

### Documentos de APOYO:
3. ✅ [README.md](README.md) - Documentación técnica
4. ✅ [INICIO_RAPIDO.md](INICIO_RAPIDO.md) - Guía de ejecución

### Archivos de CÓDIGO a revisar:
5. ✅ `src/services/evaluacionesService.js` - CRUD + Validaciones
6. ✅ `src/services/authService.js` - Autenticación
7. ✅ `src/screens/FormularioScreen.js` - Validaciones de UI

---

## 🚀 Inicio Rápido (TL;DR)

```bash
# 1. Instalar
npm install

# 2. Configurar Firebase
# Editar: src/services/firebase.js (línea 9)

# 3. Ejecutar
npm start

# 4. Escanear QR con Expo Go
```

**Listo!** 🎉

---

**Proyecto desarrollado para la materia Soluciones de Programación Móvil - UVM**

¿Necesitas ayuda? Consulta el documento correspondiente según tu objetivo.
