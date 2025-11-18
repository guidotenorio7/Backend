import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useSession } from '../components/Session';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { loginService } from '../services/auth';

export default function LoginScreen() {
  const { setIsInitiated, setToken, setUser } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const result = await loginService.login(username, password);
      
      if (result.success) {
        setToken(result.token);
        setUser(result.user);
        setIsInitiated(true);
      } else {
        Alert.alert('Error de inicio de sesión', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen title="Iniciar Sesión">
      <TextField
        label="Usuario"
        placeholder="Ingresa tu usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextField
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Iniciando sesión...' : 'Ingresar'}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

