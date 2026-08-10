import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
};

export function Avatar({ source, name = 'User', size = 'md', status, style }) {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);

  const dimension = size === 'sm' ? 32 : size === 'lg' ? 56 : 42;
  const fontSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 15;

  return (
    <View style={[{ width: dimension, height: dimension, borderRadius: dimension / 2 }, styles.container, style]}>
      {source && !imageError ? (
        <Image
          source={typeof source === 'string' ? { uri: source } : source}
          onError={() => setImageError(true)}
          style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            { width: dimension, height: dimension, borderRadius: dimension / 2, backgroundColor: colors.accentIndigo },
          ]}
        >
          <Text style={[styles.initials, { fontSize }]}>{getInitials(name)}</Text>
        </View>
      )}

      {status && (
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor:
                status === 'online'
                  ? colors.accentEmerald
                  : status === 'busy'
                  ? colors.accentRose
                  : colors.accentAmber,
              borderColor: colors.bgDark,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#ffffff',
    fontWeight: '800',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
  },
});

export default Avatar;
