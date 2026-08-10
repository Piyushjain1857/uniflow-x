import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { APP_CONFIG, USER_ROLES } from '@uniflow-x/constants';
import { formatRoleName } from '@uniflow-x/utils';
import Header from '../components/Header';

export default function HomeScreen() {
  return (
    <View style={styles.flex}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{APP_CONFIG.APP_NAME}</Text>
          <Text style={styles.heroSubtitle}>{APP_CONFIG.DESCRIPTION}</Text>
        </View>

        <View style={styles.rolesSection}>
          <Text style={styles.sectionTitle}>Supported Personas</Text>
          <View style={styles.rolesGrid}>
            {Object.values(USER_ROLES).map((role) => (
              <View key={role} style={styles.roleTag}>
                <Text style={styles.roleText}>{formatRoleName(role)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mobile Operating System</Text>
          <Text style={styles.cardText}>
            Built with React Native & Expo using JavaScript and React Native StyleSheet.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#38bdf8',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
  rolesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 12,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleTag: {
    backgroundColor: '#161f30',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  roleText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#161f30',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 14,
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
});
