import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING, SHADOWS } from '../../theme/theme';
import Icon from '../Icon';

export function PrimaryButton({
  title,
  icon,
  onPress,
  disabled = false,
  loading = false,
  size = 'md',
  style,
}) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        { backgroundColor: colors.primary },
        size === 'sm' && styles.sm,
        size === 'lg' && styles.lg,
        isDisabled && styles.disabled,
        SHADOWS.small,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#040914" size="small" />
      ) : icon ? (
        <Icon name={icon} size={size === 'sm' ? 16 : 18} color="#040914" />
      ) : null}

      <Text
        style={[
          styles.text,
          size === 'sm' && styles.textSm,
          size === 'lg' && styles.textLg,
          isDisabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADII.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: SPACING.md,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#040914',
    fontSize: 15,
    fontWeight: '700',
  },
  textSm: {
    fontSize: 13,
  },
  textLg: {
    fontSize: 17,
  },
  textDisabled: {
    color: 'rgba(4, 9, 20, 0.6)',
  },
});

export default PrimaryButton;
