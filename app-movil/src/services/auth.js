// Configurar con tu URL de backend
const API_URL = 'http://10.200.33.205:3000/api';

export const loginService = {
  async login(username, password) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales inválidas');
      }

      const data = await response.json();
      return {
        success: true,
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
