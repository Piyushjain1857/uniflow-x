import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';

export function SecondaryButton({
  title,
  icon,
  onPress,
  disabled = false,
  size = 'md',
  style,
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: colors.bgGlass,
          borderColor: colors.border,
        },
        size === 'sm' && styles.sm,
        size === 'lg' && styles.lg,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} color={colors.textMain} />}

      <Text
        style={[
          styles.text,
          { color: colors.textMain },
          size === 'sm' && styles.textSm,
          size === 'lg' && styles.textLg,
          disabled && styles.textDisabled,
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
    borderWidth: 1,
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
    fontSize: 15,
    fontWeight: '600',
  },
  textSm: {
    fontSize: 13,
  },
  textLg: {
    fontSize: 17,
  },
  textDisabled: {
    opacity: 0.6,
  },
});

export default SecondaryButton;
