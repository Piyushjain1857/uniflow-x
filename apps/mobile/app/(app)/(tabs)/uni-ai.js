import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Modal, SafeAreaView } from 'react-native';
import { COLORS, RADII, SPACING } from '../../../src/theme/theme';
import Icon from '../../../src/components/Icon';
import { generateAIResponse, quickPrompts } from '@uniflow-x/utils/uniai';

export default function UniAiScreen() {
  const [messages, setMessages] = useState([
    { id: 'm1', sender: 'ai', text: 'Hello Piyush! I am UniAI, your context-aware campus assistant. How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const scrollViewRef = useRef(null);

  const handleSend = async (textOverride = null) => {
    const query = textOverride !== null ? textOverride : inputText;
    if (!query.trim() || isTyping) return;

    const newMsg = { id: Date.now().toString(), sender: 'user', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await generateAIResponse(query);
      const replyMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        scheduleItems: response.scheduleItems,
        noticeText: response.noticeText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      { id: Date.now().toString(), sender: 'ai', text: "Started a new conversation. What's on your mind?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setShowHistory(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => setShowHistory(true)}>
          <Icon name="menu" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>UniAI</Text>
          <View style={styles.statusBox}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.headerIconBtn} onPress={() => setShowContext(true)}>
          <Icon name="profile" size={24} color={COLORS.textMain} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.chatScroll}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {/* Quick Prompts */}
          {messages.length === 1 && (
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.promptHeader}>Suggested Queries</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {quickPrompts.map((prompt, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.promptChip}
                    onPress={() => handleSend(prompt)}
                  >
                    <Text style={styles.promptText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Messages */}
          <View style={styles.msgList}>
            {messages.map((msg) => (
              <View key={msg.id} style={[styles.msgRow, msg.sender === 'user' ? styles.userRow : styles.aiRow]}>
                {msg.sender === 'ai' && (
                  <View style={styles.aiBadgeIcon}>
                    <Icon name="uniAi" size={16} color="#000" />
                  </View>
                )}
                
                <View style={[styles.msgBubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
                  <Text style={[styles.msgText, msg.sender === 'user' ? styles.userMsgText : styles.aiMsgText]}>
                    {msg.text}
                  </Text>
                  
                  {msg.scheduleItems && (
                    <View style={styles.scheduleWidget}>
                      {msg.scheduleItems.map((s, idx) => (
                        <View key={idx} style={styles.scheduleItem}>
                          <Text style={styles.scheduleTime}>{s.time}</Text>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.scheduleSubject}>{s.subject}</Text>
                            <Text style={styles.scheduleMeta}>{s.room} · {s.faculty}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {msg.noticeText && (
                    <View style={styles.noticeWidget}>
                      <Text style={styles.noticeText}>{msg.noticeText}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
            
            {isTyping && (
              <View style={[styles.msgRow, styles.aiRow]}>
                <View style={styles.aiBadgeIcon}>
                  <Icon name="sparkles" size={16} color="#000" />
                </View>
                <View style={[styles.msgBubble, styles.aiBubble, { paddingVertical: 12, paddingHorizontal: 16 }]}>
                  <Text style={[styles.aiMsgText, { fontStyle: 'italic', color: COLORS.textMuted }]}>Thinking...</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn}>
            <Icon name="close" size={16} color={COLORS.textMain} style={{ transform: [{ rotate: '45deg' }] }} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything..."
            placeholderTextColor={COLORS.textDim}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend()}
            editable={!isTyping}
          />
          <TouchableOpacity style={[styles.sendBtn, (!inputText.trim() || isTyping) && { opacity: 0.5 }]} onPress={() => handleSend()} disabled={!inputText.trim() || isTyping}>
            <Icon name="arrowRight" size={18} color="#000" style={{ transform: [{ rotate: '-90deg' }] }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* History Menu Modal */}
      <Modal visible={showHistory} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.historyMenu}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: COLORS.textMain }}>Chat History</Text>
              <TouchableOpacity onPress={() => setShowHistory(false)}>
                <Icon name="close" size={24} color={COLORS.textMain} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.newChatBtn} onPress={handleNewChat}>
              <Text style={styles.newChatBtnText}>+ New Chat</Text>
            </TouchableOpacity>

            <Text style={styles.historyGroupTitle}>TODAY</Text>
            <TouchableOpacity style={styles.historyRow} onPress={() => setShowHistory(false)}>
              <Icon name="timetable" size={16} color={COLORS.textMuted} />
              <Text style={styles.historyRowText}>Schedule & Assignments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyRow} onPress={() => setShowHistory(false)}>
              <Icon name="attendance" size={16} color={COLORS.textMuted} />
              <Text style={styles.historyRowText}>Attendance Check</Text>
            </TouchableOpacity>

            <Text style={styles.historyGroupTitle}>YESTERDAY</Text>
            <TouchableOpacity style={styles.historyRow} onPress={() => setShowHistory(false)}>
              <Icon name="academics" size={16} color={COLORS.textMuted} />
              <Text style={styles.historyRowText}>Data Structures Syllabus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyRow} onPress={() => setShowHistory(false)}>
              <Icon name="campusMap" size={16} color={COLORS.textMuted} />
              <Text style={styles.historyRowText}>Library Hours</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Context Bottom Sheet Modal */}
      <Modal visible={showContext} animationType="slide" transparent={true}>
        <View style={[styles.modalOverlay, { justifyContent: 'flex-end' }]}>
          <View style={styles.contextSheet}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: COLORS.textMain }}>Your Context</Text>
              <TouchableOpacity onPress={() => setShowContext(false)}>
                <Icon name="close" size={24} color={COLORS.textMain} />
              </TouchableOpacity>
            </View>

            <View style={styles.contextCard}>
              <View style={styles.ctxRow}>
                <Text style={styles.ctxLbl}>Student</Text>
                <Text style={[styles.ctxVal, { fontWeight: '800' }]}>Piyush Jain</Text>
              </View>
              <View style={styles.ctxRow}>
                <Text style={styles.ctxLbl}>Program</Text>
                <Text style={styles.ctxVal}>B.Tech CSE</Text>
              </View>
              <View style={styles.ctxRow}>
                <Text style={styles.ctxLbl}>Semester</Text>
                <Text style={styles.ctxVal}>4</Text>
              </View>
              <View style={styles.ctxRow}>
                <Text style={styles.ctxLbl}>Attendance</Text>
                <Text style={[styles.ctxVal, { color: COLORS.success, fontWeight: '800' }]}>82%</Text>
              </View>
              <View style={styles.ctxRow}>
                <Text style={styles.ctxLbl}>Pending Tasks</Text>
                <Text style={[styles.ctxVal, { color: COLORS.accentAmber, fontWeight: '800' }]}>1 Due Tomorrow</Text>
              </View>
            </View>

            <View style={styles.nextClassCard}>
              <Text style={styles.nextClassLbl}>NEXT CLASS</Text>
              <Text style={styles.nextClassTitle}>Data Structures</Text>
              <Text style={styles.nextClassMeta}>09:00 AM · Room 204</Text>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  chatScroll: {
    padding: SPACING.md,
    paddingBottom: 24,
  },
  promptHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  promptChip: {
    backgroundColor: COLORS.surface1,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADII.pill,
  },
  promptText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  msgList: {
    gap: 16,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  aiRow: {
    justifyContent: 'flex-start',
    paddingRight: 40,
  },
  userRow: {
    justifyContent: 'flex-end',
    paddingLeft: 40,
  },
  aiBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  msgBubble: {
    padding: 12,
    borderRadius: RADII.md,
  },
  aiBubble: {
    backgroundColor: COLORS.surface1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  aiMsgText: {
    color: COLORS.textMain,
  },
  userMsgText: {
    color: '#040914',
    fontWeight: '600',
  },
  scheduleWidget: {
    marginTop: 12,
    gap: 8,
    backgroundColor: COLORS.bgDark,
    padding: 12,
    borderRadius: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  scheduleTime: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    width: 65,
  },
  scheduleSubject: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMain,
  },
  scheduleMeta: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  noticeWidget: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.primary,
  },
  noticeText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 24 : SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bgCard,
    gap: 10,
  },
  attachBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface1,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: COLORS.textMain,
    fontSize: 14,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  historyMenu: {
    backgroundColor: COLORS.surface1,
    flex: 1,
    width: '80%',
    padding: SPACING.lg,
    paddingTop: 60,
  },
  newChatBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: RADII.md,
    alignItems: 'center',
    marginBottom: 24,
  },
  newChatBtnText: {
    color: COLORS.textMain,
    fontWeight: '800',
  },
  historyGroupTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textDim,
    marginBottom: 12,
    marginTop: 16,
    letterSpacing: 1,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  historyRowText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  contextSheet: {
    backgroundColor: COLORS.surface1,
    borderTopLeftRadius: RADII.xl,
    borderTopRightRadius: RADII.xl,
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  contextCard: {
    backgroundColor: COLORS.bgDark,
    borderRadius: RADII.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  ctxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ctxLbl: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  ctxVal: {
    color: COLORS.textMain,
    fontSize: 14,
  },
  nextClassCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADII.md,
    padding: SPACING.md,
  },
  nextClassLbl: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  nextClassTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  nextClassMeta: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  }
});
