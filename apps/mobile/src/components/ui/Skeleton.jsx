import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII } from '../../theme/theme';

export function Skeleton({ width, height, borderRadius, variant = 'text', style }) {
  const { colors } = useTheme();

  const getRadius = () => {
    if (borderRadius !== undefined) return borderRadius;
    if (variant === 'circle') return typeof height === 'number' ? height / 2 : 20;
    return RADII.xs;
  };

  return (
    <View
      style={[
        styles.skeleton,
        {
          backgroundColor: colors.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
          width: width || (variant === 'circle' ? height : '100%'),
          height: height || (variant === 'text' ? 16 : 60),
          borderRadius: getRadius(),
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    marginVertical: 4,
  },
});

export default Skeleton;
