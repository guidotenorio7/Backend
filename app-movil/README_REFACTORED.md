# App Móvil - React Native + Expo - Refactorizada

## 🎯 Descripción

App móvil refactorizada con:
- ✅ **Componente Screen** - Wrapper estándar para pantallas
- ✅ **Componente TextField** - Input personalizado con etiqueta
- ✅ **Servicio de Auth** - Integración real con backend
- ✅ **Login Funcional** - Conecta con `http://localhost:3000/api/login`
- ✅ **Drawer Navigation** - Menú lateral simple

## 📁 Estructura Refactorizada

```
app-movil/
├── App.jsx
├── app.json
├── package.json
└── src/
    ├── Layout.jsx
    ├── components/
    │   ├── Session.jsx      # Context simple (isInitiated)
    │   ├── Screen.jsx       # Componente base (title + children)
    │   └── TextField.jsx    # Input personalizado
    ├── services/
    │   └── auth.js          # Servicio de autenticación
    └── screens/
        ├── LoginScreen.jsx  # Login con TextField y backend
        ├── IndexScreen.jsx  # Usa Screen
        ├── UsersScreen.jsx  # Usa Screen
        └── AboutScreen.jsx  # Usa Screen
```

## 🚀 Ejecución

### Backend (en otra terminal)
```bash
cd backend
npm start
# Corre en http://localhost:3000
```

### App Móvil
```bash
cd app-movil
npm start

# Opciones:
# Presiona 'w' para web
# Presiona 'a' para Android
# Presiona 'i' para iPhone
# O escanea QR con Expo Go
```

## 🔐 Login

**Usuario:** admin  
**Contraseña:** 12345

Hace POST a `http://localhost:3000/api/login`

## 📝 Cambios Principales

### 1. Componente Screen
```jsx
<Screen title="Inicio">
  {/* Contenido aquí */}
</Screen>
```

### 2. Componente TextField
```jsx
<TextField
  label="Usuario"
  placeholder="Ingresa tu usuario"
  value={username}
  onChangeText={setUsername}
/>
```

### 3. Servicio auth.js
```jsx
import { loginService } from '../services/auth';

const result = await loginService.login(username, password);
// { success: true, token, user } o { success: false, error }
```

## 🧪 Credenciales de Prueba

Backend en MongoDB:
- **Usuario:** admin
- **Contraseña:** 12345

## 📱 Probar en Celular

1. Instala **Expo Go** (Android o iPhone)
2. Backend corriendo en tu PC
3. Escanea el QR desde Expo Go
4. **Importante:** Celular y PC en la misma red WiFi

## 🔄 Hot Reload

Cambios en el código se recargan automáticamente.  
Presiona `r` para forzar recarga.

## 📚 Recursos

- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native](https://reactnative.dev/)

---

**App lista para ampliar con más funcionalidades** ✨
