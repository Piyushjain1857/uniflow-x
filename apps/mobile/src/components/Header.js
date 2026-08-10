import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { APP_CONFIG } from '@uniflow-x/constants';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{APP_CONFIG.APP_NAME}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>v{APP_CONFIG.VERSION}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0b0f19',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#38bdf8',
  },
  badge: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '600',
  },
});
