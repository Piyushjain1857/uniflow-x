import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';

export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon = 'chevronRight',
  onPress,
  badge,
  isLast = false,
  style,
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.bgCard,
          borderBottomColor: colors.border,
          borderBottomWidth: isLast ? 0 : 1,
        },
        style,
      ]}
    >
      {leftIcon && (
        <View style={[styles.iconWrap, { backgroundColor: colors.bgGlass }]}>
          <Icon name={leftIcon} size={18} color={colors.primary} />
        </View>
      )}

      <View style={styles.textWrap}>
        <Text style={[styles.title, { color: colors.textMain }]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>}
      </View>

      {badge && (
        <View style={[styles.badge, { backgroundColor: colors.primaryGlow }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>{badge}</Text>
        </View>
      )}

      {rightIcon && <Icon name={rightIcon} size={18} color={colors.textDim} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: RADII.pill,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default ListItem;
