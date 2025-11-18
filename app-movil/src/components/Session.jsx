import { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [isInitiated, setIsInitiated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <SessionContext.Provider value={{ isInitiated, setIsInitiated, token, setToken, user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
