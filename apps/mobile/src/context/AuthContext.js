import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockLogin, mockRegister, mockForgotPassword, mockResetPassword } from '@uniflow-x/utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from async storage on mount
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('uniflow_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user', e);
      }
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  const login = async (email, password) => {
    const res = await mockLogin(email, password);
    setUser(res.user);
    await AsyncStorage.setItem('uniflow_user', JSON.stringify(res.user));
    await AsyncStorage.setItem('uniflow_token', res.token);
    return res.user;
  };

  const register = async (userData) => {
    const res = await mockRegister(userData);
    setUser(res.user);
    await AsyncStorage.setItem('uniflow_user', JSON.stringify(res.user));
    await AsyncStorage.setItem('uniflow_token', res.token);
    return res.user;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('uniflow_user');
    await AsyncStorage.removeItem('uniflow_token');
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
