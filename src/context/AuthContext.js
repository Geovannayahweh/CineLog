// AuthContext — gerenciamento de estado global de autenticação.
// Disponibiliza user, login, register, logout para toda a aplicação
// via hook useAuth().

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaura sessão ao carregar a app
  useEffect(() => {
    const current = authService.getCurrentUser();
    setUser(current);
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const session = await authService.login(credentials);
    setUser(session);
    return session;
  }, []);

  const register = useCallback(async (data) => {
    const session = await authService.register(data);
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>.');
  }
  return ctx;
}
