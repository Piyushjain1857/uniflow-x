import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { View } from 'react-native';
import { COLORS } from '../../src/theme/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: COLORS.bgDark }} />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.bgDark },
      }}
    />
  );
}
