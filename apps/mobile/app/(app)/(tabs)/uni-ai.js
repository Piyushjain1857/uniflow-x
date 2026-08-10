import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Header from '../../../src/components/Header';
import Icon from '../../../src/components/Icon';

const samplePrompts = [
  'What is my class schedule today?',
  'Calculate my required attendance for Math301',
  'Summarize upcoming assignment deadlines',
  'Where is Hall B-201 located on campus map?',
];

export default function UniAiScreen() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello Alex! I am UniAI, your context-aware campus assistant. How can I help you today?' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: `Based on your Fall 2026 record, "${query}" is processed. You have 2 lectures scheduled today and your CS401 assignment is due in 48 hours.`,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="UniAI Assistant" subtitle="AI Copilot v3.6" showBack={false} />

      <ScrollView contentContainerStyle={styles.chatScroll}>
        {/* Sample Prompt Chips */}
        <Text style={styles.promptHeader}>Suggested Queries</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptScroll}>
          {samplePrompts.map((prompt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.promptChip}
              onPress={() => handleSend(prompt)}
            >
              <Text style={styles.promptText}>{prompt}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Messages */}
        <View style={styles.msgList}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.msgBubble,
                msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              {msg.sender === 'ai' && (
                <View style={styles.aiBadgeIcon}>
                  <Icon name="sparkles" size={14} color="#000" />
                </View>
              )}
              <Text
                style={[
                  styles.msgText,
                  msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ask UniAI anything..."
          placeholderTextColor={COLORS.textDim}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend()}>
          <Icon name="arrowRight" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  chatScroll: {
    padding: SPACING.md,
  },
  promptHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  promptScroll: {
    marginBottom: 16,
  },
  promptChip: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADII.pill,
    marginRight: 8,
  },
  promptText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  msgList: {
    gap: 12,
  },
  msgBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: RADII.md,
  },
  aiBubble: {
    backgroundColor: COLORS.bgCard,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  aiBadgeIcon: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  msgText: {
    fontSize: 13,
    lineHeight: 19,
  },
  aiMsgText: {
    color: COLORS.textMain,
  },
  userMsgText: {
    color: '#040914',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bgSurface,
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLORS.textMain,
    fontSize: 14,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
