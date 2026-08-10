import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';

export function Alert({ title, message, variant = 'info', onDismiss, style }) {
  const { colors } = useTheme();

  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return { bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)', icon: colors.accentEmerald };
      case 'warning':
        return { bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)', icon: colors.accentAmber };
      case 'danger':
        return { bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)', icon: colors.accentRose };
      default:
        return { bg: colors.primaryGlow, border: colors.borderActive, icon: colors.primary };
    }
  };

  const vColors = getVariantColors();

  return (
    <View
      style={[
        styles.alert,
        { backgroundColor: vColors.bg, borderColor: vColors.border },
        style,
      ]}
    >
      <Icon name="sparkles" size={20} color={vColors.icon} />

      <View style={styles.textWrap}>
        {title && <Text style={[styles.title, { color: colors.textMain }]}>{title}</Text>}
        {message && <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>}
      </View>

      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeBtn}>
          <Icon name="close" size={16} color={colors.textDim} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: SPACING.md,
    borderRadius: RADII.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  message: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  closeBtn: {
    padding: 2,
  },
});

export default Alert;
