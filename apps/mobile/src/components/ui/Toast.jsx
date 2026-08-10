import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING, SHADOWS } from '../../theme/theme';
import Icon from '../Icon';

export function Toast({ visible = false, message, type = 'info', onDismiss, style }) {
  const { colors } = useTheme();

  if (!visible) return null;

  const getTypeColor = () => {
    switch (type) {
      case 'success':
        return colors.accentEmerald;
      case 'danger':
        return colors.accentRose;
      case 'warning':
        return colors.accentAmber;
      default:
        return colors.primary;
    }
  };

  const accentColor = getTypeColor();

  return (
    <View
      style={[
        styles.toast,
        { backgroundColor: colors.bgSurface, borderColor: colors.border },
        SHADOWS.large,
        style,
      ]}
    >
      <View style={[styles.indicator, { backgroundColor: accentColor }]} />
      <Text style={[styles.message, { color: colors.textMain }]}>{message}</Text>

      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
          <Icon name="close" size={14} color={colors.textDim} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: RADII.md,
    borderWidth: 1,
    gap: 10,
    zIndex: 999,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  message: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 4,
  },
});

export default Toast;
