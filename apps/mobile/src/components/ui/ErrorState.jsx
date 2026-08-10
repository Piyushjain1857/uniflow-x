import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { RADII, SPACING } from '../../theme/theme';
import Icon from '../Icon';
import PrimaryButton from './PrimaryButton';

export function ErrorState({
  icon = 'alertTriangle',
  title = 'Something Went Wrong',
  message = 'An unexpected exception occurred while processing.',
  onRetry,
  retryText = 'Try Again',
  style,
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconWrap, { backgroundColor: 'rgba(244, 63, 94, 0.15)' }]}>
        <Icon name={icon} size={32} color={colors.accentRose} />
      </View>
      <Text style={[styles.title, { color: colors.textMain }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
      {onRetry && (
        <PrimaryButton
          title={retryText}
          size="sm"
          onPress={onRetry}
          style={{ marginTop: 14 }}
        />
      )}
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
  message: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});

export default ErrorState;
