import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';
import PrimaryButton from './PrimaryButton';

export function EmptyState({
  icon = 'sparkles',
  title = 'No Data Available',
  description = 'There are no items or records to display at this moment.',
  actionText,
  onAction,
  style,
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.bgGlass }]}>
        <Icon name={icon} size={32} color={colors.primary} />
      </View>
      <Text style={[styles.title, { color: colors.textMain }]}>{title}</Text>
      <Text style={[styles.desc, { color: colors.textMuted }]}>{description}</Text>
      {actionText && onAction ? (
        <PrimaryButton
          title={actionText}
          size="sm"
          onPress={onAction}
          style={{ marginTop: 14 }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  desc: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});

export default EmptyState;
