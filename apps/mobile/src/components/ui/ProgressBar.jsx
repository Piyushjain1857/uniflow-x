import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';

export function ProgressBar({
  progress = 0,
  color,
  label,
  showPercentage = false,
  style,
}) {
  const { colors } = useTheme();
  const clamped = Math.min(Math.max(0, progress), 1);
  const percentage = Math.round(clamped * 100);
  const barColor = color || colors.primary;

  return (
    <View style={[styles.container, style]}>
      {(label || showPercentage) && (
        <View style={styles.labelRow}>
          {label && <Text style={[styles.label, { color: colors.textMain }]}>{label}</Text>}
          {showPercentage && <Text style={[styles.val, { color: colors.textMuted }]}>{percentage}%</Text>}
        </View>
      )}

      <View style={[styles.track, { backgroundColor: colors.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }]}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  val: {
    fontSize: 12,
    fontWeight: '700',
  },
  track: {
    height: 8,
    borderRadius: RADII.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADII.pill,
  },
});

export default ProgressBar;
