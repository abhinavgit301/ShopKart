import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  getCurrentCustomer,
  loginCustomer,
  logoutCustomer,
  registerCustomer,
} from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const customer = await getCurrentCustomer();
      setUser(customer);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await loginCustomer(credentials);
    setUser(response.customer);
    return response;
  };

  const register = async (formData) => {
    const response = await registerCustomer(formData);
    return response;
  };

  const logout = async () => {
    try {
      await logoutCustomer();
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      checkAuth,
      login,
      register,
      logout,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
