import React from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '../../src/theme/theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.bgDark },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" />
      
      {/* Secondary Screens */}
      <Stack.Screen name="attendance" />
      <Stack.Screen name="assignments" />
      <Stack.Screen name="exams" />
      <Stack.Screen name="timetable" />
      <Stack.Screen name="events" />
      <Stack.Screen name="clubs" />
      <Stack.Screen name="campus-map" />
      <Stack.Screen name="complaints" />
      <Stack.Screen name="digital-id" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
