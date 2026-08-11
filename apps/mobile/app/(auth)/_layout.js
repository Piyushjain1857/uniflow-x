import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../src/theme/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.bgDark },
      }}
    />
  );
}
