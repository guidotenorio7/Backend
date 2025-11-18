import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      // Aquí iría la llamada a tu API backend
      // const response = await fetch('http://localhost:3000/api/login', { ... })
      // Por ahora simulamos:
      const mockUser = {
        id: '1',
        username,
        fullName: 'Usuario de Prueba',
        roles: ['user'],
      };
      const mockToken = 'mock-token-12345';

      setUser(mockUser);
      setToken(mockToken);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;

  return (
    <SessionContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe usarse dentro de SessionProvider');
  }
  return context;
};
