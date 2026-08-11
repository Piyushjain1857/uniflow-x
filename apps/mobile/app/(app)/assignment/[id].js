import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Icon from '../../../src/components/Icon';
import { getAssignmentDetails, submitAssignment } from '@uniflow-x/utils/assignments';

export default function AssignmentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [repoUrl, setRepoUrl] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function loadSubject() {
      try {
        const data = await getAssignmentDetails(id);
        setAssignment(data);
        if (data.submissionState) {
          setRepoUrl(data.submissionState.url || '');
          setComments(data.submissionState.comments || '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadSubject();
  }, [id]);

  const handleSubmit = async () => {
    if (!repoUrl) return; // Basic validation
    setIsSubmitting(true);
    try {
      await submitAssignment(id, { url: repoUrl, comments });
      setSubmitSuccess(true);
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (loading || !assignment) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Assignment Details" showBack />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {loading ? <ActivityIndicator size="large" color={COLORS.primary} /> : <Text style={{ color: COLORS.textMain }}>Assignment Not Found</Text>}
        </View>
      </SafeAreaView>
    );
  }

  if (submitSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SPACING.lg }}>
          <View style={styles.successCircle}>
            <Icon name="check" size={40} color={COLORS.accentEmerald} />
          </View>
          <Text style={styles.successTitle}>Submission Successful!</Text>
          <Text style={styles.successText}>Your assignment has been securely uploaded.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Details" showBack />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <View style={{ flex: 1, paddingRight: 16 }}>
                <Text style={styles.title}>{assignment.title}</Text>
                <Text style={styles.subject}>{assignment.courseCode} • {assignment.subject}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.marks}>{assignment.marks} Pts</Text>
                <Text style={[styles.dueDate, assignment.status === 'Overdue' && { color: COLORS.accentRose }]}>
                  Due: {assignment.dueDate}
                </Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Description</Text>
              <Text style={styles.infoText}>{assignment.description}</Text>
              
              <View style={{ height: 12 }} />
              
              <Text style={styles.infoLabel}>Instructions</Text>
              <Text style={styles.infoText}>{assignment.instructions}</Text>
            </View>
          </View>

          {assignment.status === 'Submitted' ? (
            <View style={styles.submittedCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Icon name="check" size={18} color={COLORS.accentEmerald} />
                <Text style={styles.submittedTitle}>Submitted on {assignment.submissionState.date}</Text>
              </View>
              {assignment.submissionState.url ? (
                <Text style={styles.submittedDetail}>
                  <Text style={{ fontWeight: '700' }}>Repository:</Text> {assignment.submissionState.url}
                </Text>
              ) : null}
              {assignment.submissionState.comments ? (
                <Text style={styles.submittedDetail}>
                  <Text style={{ fontWeight: '700' }}>Comments:</Text> {assignment.submissionState.comments}
                </Text>
              ) : null}
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Submit Assignment</Text>
              
              <Text style={styles.inputLabel}>Repository URL / External Link</Text>
              <TextInput 
                style={styles.input}
                placeholder="https://github.com/..."
                placeholderTextColor={COLORS.textDim}
                value={repoUrl}
                onChangeText={setRepoUrl}
                editable={!isSubmitting}
                autoCapitalize="none"
              />

              <Text style={styles.inputLabel}>Additional Comments</Text>
              <TextInput 
                style={[styles.input, { height: 80 }]}
                placeholder="Any notes for the reviewer..."
                placeholderTextColor={COLORS.textDim}
                value={comments}
                onChangeText={setComments}
                multiline
                editable={!isSubmitting}
              />

              <TouchableOpacity style={styles.attachBtn}>
                <Icon name="attendance" size={16} color={COLORS.primary} />
                <Text style={styles.attachText}>Attach File</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.submitBtn, (!repoUrl || isSubmitting) && { opacity: 0.5 }]} 
                onPress={handleSubmit}
                disabled={!repoUrl || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <Text style={styles.submitBtnText}>Submit Assignment</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADII.lg,
    padding: SPACING.md,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  subject: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  marks: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  dueDate: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: COLORS.surface1,
    padding: 16,
    borderRadius: RADII.md,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.sm,
    padding: 12,
    color: COLORS.textMain,
    fontSize: 14,
    marginBottom: 16,
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderRadius: RADII.sm,
    justifyContent: 'center',
    marginBottom: 24,
  },
  attachText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: RADII.md,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
  },
  submittedCard: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
    borderRadius: RADII.md,
    padding: SPACING.md,
  },
  submittedTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.accentEmerald,
  },
  submittedDetail: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 6,
    lineHeight: 20,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textMain,
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  }
});
