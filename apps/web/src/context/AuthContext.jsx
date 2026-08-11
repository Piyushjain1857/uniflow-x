import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockLogin, mockRegister, mockForgotPassword, mockResetPassword } from '@uniflow-x/utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('uniflow_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await mockLogin(email, password);
    setUser(res.user);
    localStorage.setItem('uniflow_user', JSON.stringify(res.user));
    localStorage.setItem('uniflow_token', res.token);
    return res.user;
  };

  const register = async (userData) => {
    const res = await mockRegister(userData);
    setUser(res.user);
    localStorage.setItem('uniflow_user', JSON.stringify(res.user));
    localStorage.setItem('uniflow_token', res.token);
    return res.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uniflow_user');
    localStorage.removeItem('uniflow_token');
  };

  const forgotPassword = async (email) => {
    return await mockForgotPassword(email);
  };

  const resetPassword = async (newPassword, confirmPassword) => {
    return await mockResetPassword(newPassword, confirmPassword);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
