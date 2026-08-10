import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII } from '../../theme/theme';

export function Badge({ label, variant = 'primary', hasDot = false, style }) {
  const { colors } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.3)', text: colors.accentEmerald };
      case 'warning':
        return { bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.3)', text: colors.accentAmber };
      case 'danger':
        return { bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)', text: colors.accentRose };
      case 'secondary':
        return { bg: colors.bgGlass, border: colors.border, text: colors.textMuted };
      default:
        return { bg: colors.primaryGlow, border: colors.borderActive, text: colors.primary };
    }
  };

  const vStyle = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: vStyle.bg, borderColor: vStyle.border }, style]}>
      {hasDot && <View style={[styles.dot, { backgroundColor: vStyle.text }]} />}
      <Text style={[styles.text, { color: vStyle.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: RADII.pill,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default Badge;
