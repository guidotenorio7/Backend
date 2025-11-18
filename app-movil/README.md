# App Móvil - React Native + Expo

## 🎯 Descripción

App móvil completa con:
- ✅ **React Navigation Drawer** - Menú lateral deslizable
- ✅ **Contexto de Sesión** - Gestión de login/logout
- ✅ **Pantallas** - Inicio, Usuarios, Acerca de
- ✅ **Autenticación** - Sistema de login integrado

## 📁 Estructura del Proyecto

```
app-movil/
├── App.jsx                          # Punto de entrada
├── app.json                         # Configuración Expo
├── package.json
├── assets/
└── src/
    ├── Layout.jsx                   # Drawer Navigation
    ├── context/
    │   └── SessionContext.jsx       # Context de sesión
    ├── components/
    │   └── (componentes reutilizables)
    └── screens/
        ├── IndexScreen.jsx          # Pantalla principal
        ├── LoginScreen.jsx          # Login
        ├── UsersScreen.jsx          # Lista de usuarios
        └── AboutScreen.jsx          # Acerca de
```

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias
```bash
cd app-movil
npm install
```

### 2. Iniciar el servidor
```bash
npm start
# o
npx expo start
```

### 3. Opciones de ejecución

**En el navegador web:**
```bash
# En la terminal, presiona 'w'
# O abre: http://localhost:8081
```

**En el celular con Expo Go:**
- Instala "Expo Go" desde Google Play (Android) o App Store (iPhone)
- En la terminal, presiona 'a' (Android) o 'i' (iPhone)
- O escanea el código QR con tu celular

**En Android nativo (emulador):**
```bash
npm run android
```

**En iPhone nativo (macOS solo):**
```bash
npm run ios
```

## 🔑 Características

### SessionContext
- Gestión centralizada de sesión (login/logout)
- Usuario y token almacenados en el contexto
- Hook `useSession()` para acceder desde cualquier componente

### Layout con Drawer
- Menú lateral con opciones (Inicio, Usuarios, Acerca de)
- Muestra datos del usuario en el header
- Botón "Cerrar Sesión" al pie del menú
- Redirige a LoginScreen si no hay sesión activa

### Pantallas
- **LoginScreen** - Formulario de login con campos usuario/contraseña
- **IndexScreen** - Pantalla principal con bienvenida
- **UsersScreen** - Lista de usuarios (mock data)
- **AboutScreen** - Información de la app

## 🔗 Integración con tu Backend

Para conectar con tu API (`http://localhost:3000`):

### 1. Actualizar SessionContext.jsx
En `src/context/SessionContext.jsx`, reemplaza la función `login()`:

```jsx
const login = async (username, password) => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login fallido');
    }

    const data = await response.json();
    
    setUser(data.user);
    setToken(data.token);
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  } finally {
    setLoading(false);
  }
};
```

### 2. Usar el token en otras peticiones
```jsx
const { token } = useSession();

const fetchUsers = async () => {
  const response = await fetch('http://localhost:3000/api/user', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};
```

## 🧪 Credenciales de Prueba

En LoginScreen:
- **Usuario:** admin
- **Contraseña:** 12345

## 📱 Testing en Celular

1. **Instala Expo Go**
   - Android: Google Play
   - iPhone: App Store

2. **En la terminal local, presiona 'a' o 'i'**
   - O escanea el código QR

3. **Prueba la navegación**
   - Abre el menú (swipe desde la izquierda)
   - Navega entre pantallas

## 🔄 Hot Reload

Cualquier cambio que hagas en el código se recarga automáticamente en:
- Navegador web
- Expo Go (celular)

Presiona `r` en la terminal para recargar manualmente.

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Cannot find module" | Ejecuta `npm install` nuevamente |
| Metro no inicia | Intenta `npx expo start --clear` |
| Errores en el celular | Presiona `m` → "Clear JavaScript cache" en Expo Go |
| Puerto 8081 ocupado | Usa `npx expo start --port 8082` |

## 📚 Recursos

- [React Navigation Docs](https://reactnavigation.org/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)

---

**¿Necesitás agregar más pantallas o funcionalidades?** Consulta el [README del backend](../backend/FACTURADOR_README.md) para información sobre los endpoints disponibles.
