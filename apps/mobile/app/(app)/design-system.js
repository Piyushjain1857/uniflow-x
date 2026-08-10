import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme/ThemeContext';
import { SPACING, RADII } from '../../src/theme/theme';
import Header from '../../src/components/Header';
import {
  PrimaryButton,
  SecondaryButton,
  TextInput,
  Card,
  Badge,
  Avatar,
  Modal,
  BottomSheet,
  Alert,
  Toast,
  Skeleton,
  EmptyState,
  ErrorState,
  ProgressBar,
  StatCard,
  ListItem,
} from '../../src/components/ui';

export default function MobileDesignSystemScreen() {
  const { mode, toggleTheme, colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [textVal, setTextVal] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgDark }]}>
      <Header
        title="Mobile Design System"
        subtitle="16 Reusable Native UI Components"
        showBack
        rightIcon="sparkles"
        onRightPress={toggleTheme}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Theme Mode Toggle Banner */}
        <TouchableOpacity
          style={[styles.themeBanner, { backgroundColor: colors.bgCard, borderColor: colors.border }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeText, { color: colors.textMain }]}>
            Active Theme: <Text style={{ color: colors.primary, fontWeight: '800' }}>{mode.toUpperCase()}</Text>
          </Text>
          <Text style={{ fontSize: 11, color: colors.textMuted }}>Tap to switch Light / Dark mode</Text>
        </TouchableOpacity>

        {/* 1. Buttons */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>1. Buttons & Triggers</Text>
        <View style={styles.row}>
          <PrimaryButton title="Primary Button" icon="sparkles" onPress={() => setToastVisible(true)} />
          <SecondaryButton title="Secondary" onPress={() => setSheetVisible(true)} />
        </View>

        {/* 2. Text Input */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>2. Text Input</Text>
        <TextInput
          label="Student Email"
          placeholder="netid@university.edu"
          startIcon="profile"
          value={textVal}
          onChangeText={setTextVal}
        />

        {/* 3. Badges & Avatars */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>3. Badges & Avatars</Text>
        <View style={[styles.row, { flexWrap: 'wrap' }]}>
          <Badge label="Primary" variant="primary" hasDot />
          <Badge label="Success" variant="success" hasDot />
          <Badge label="Warning" variant="warning" />
          <Badge label="Danger" variant="danger" />
          <Badge label="Secondary" variant="secondary" />
        </View>

        <View style={[styles.row, { marginVertical: 12 }]}>
          <Avatar name="Alex Vance" size="sm" status="online" />
          <Avatar name="Sarah Jenkins" size="md" status="busy" />
          <Avatar name="Mark Davis" size="lg" status="away" />
        </View>

        {/* 4. Cards & ListItems */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>4. Cards & List Items</Text>
        <Card title="CS401 Distributed Systems" subtitle="Lecture 09:00 AM" badge="Active">
          <Text style={{ fontSize: 12, color: colors.textMuted }}>Prof. Mark Davis • Room 304B</Text>
        </Card>

        <ListItem title="Notifications Center" subtitle="3 unread alerts" leftIcon="notifications" badge="New" />
        <ListItem title="App System Preferences" subtitle="Theme & Security" leftIcon="settings" isLast />

        {/* 5. StatCards & Progress */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>5. Analytics & Progress</Text>
        <View style={styles.row}>
          <StatCard label="GPA" value="3.88" change="+0.12" changeType="positive" icon="academics" />
          <StatCard label="Attendance" value="92.4%" change="Safe" changeType="positive" icon="attendance" />
        </View>

        <ProgressBar progress={0.85} label="Semester Progress" showPercentage style={{ marginTop: 10 }} />

        {/* 6. Overlays */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>6. Overlays & Alerts</Text>
        <Alert title="System Info" message="Midterm exams schedule published." variant="info" />

        <View style={styles.row}>
          <SecondaryButton title="Open Modal" onPress={() => setModalVisible(true)} />
          <SecondaryButton title="Open BottomSheet" onPress={() => setSheetVisible(true)} />
        </View>

        {/* 7. Skeleton & States */}
        <Text style={[styles.sectionTitle, { color: colors.textMain }]}>7. Skeletons & States</Text>
        <Skeleton height={20} width="70%" />
        <Skeleton height={50} style={{ marginTop: 6 }} />

        <EmptyState title="No Unread Notifications" description="You are all caught up!" />
        <ErrorState title="Connection Fault" message="Unable to reach database node." onRetry={() => {}} />
      </ScrollView>

      {/* Modal Demo */}
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title="Native Modal Dialog">
        <Text style={{ color: colors.textMain, marginBottom: 12 }}>
          Reusable Native Modal component for iOS and Android.
        </Text>
        <PrimaryButton title="Close Modal" onPress={() => setModalVisible(false)} />
      </Modal>

      {/* BottomSheet Demo */}
      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)} title="Action Sheet Panel">
        <Text style={{ color: colors.textMain, marginBottom: 12 }}>
          Slide-up bottom sheet panel for quick contextual options.
        </Text>
        <PrimaryButton title="Dismiss Panel" onPress={() => setSheetVisible(false)} />
      </BottomSheet>

      {/* Toast Notification */}
      <Toast visible={toastVisible} message="Design System Toast Triggered!" onDismiss={() => setToastVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: SPACING.md },
  themeBanner: {
    padding: SPACING.md,
    borderRadius: RADII.md,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  themeText: { fontSize: 14, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginTop: 16, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'center' },
});
