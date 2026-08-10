import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';

export function StatCard({ label, value, change, changeType = 'neutral', icon, style }) {
  const { colors } = useTheme();

  const getChangeColor = () => {
    if (changeType === 'positive') return colors.accentEmerald;
    if (changeType === 'negative') return colors.accentRose;
    return colors.textMuted;
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border }, style]}>
      <View style={styles.topRow}>
        <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
        {icon && <Icon name={icon} size={18} color={colors.primary} />}
      </View>

      <Text style={[styles.value, { color: colors.textMain }]}>{value}</Text>

      {change && (
        <Text style={[styles.change, { color: getChangeColor() }]}>
          {changeType === 'positive' ? '▲ ' : changeType === 'negative' ? '▼ ' : ''}
          {change}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADII.md,
    borderWidth: 1,
    padding: SPACING.md,
    flex: 1,
    minWidth: 140,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
  value: {
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 2,
  },
  change: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default StatCard;
