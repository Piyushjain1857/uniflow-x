import React, { useState, useRef, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { generateAIResponse, quickPrompts } from '@uniflow-x/utils/uniai';

export function UniAI() {
  const [activeHistoryId, setActiveHistoryId] = useState('h1');
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Piyush! I am UniAI, your context-aware campus assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e, textOverride = null) => {
    if (e) e.preventDefault();
    const query = textOverride !== null ? textOverride : inputVal;
    if (!query.trim()) return;

    const newMsg = { 
      id: Date.now().toString(), 
      sender: 'user', 
      text: query, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
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
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Started a new conversation. What's on your mind?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const historyToday = [
    { id: 'h1', title: 'Schedule & Assignments', icon: 'timetable' },
    { id: 'h2', title: 'Attendance Check', icon: 'attendance' },
  ];

  const historyYesterday = [
    { id: 'h3', title: 'Data Structures Syllabus', icon: 'academics' },
    { id: 'h4', title: 'Library Hours & Access', icon: 'campusMap' },
  ];

  return (
    <PageContainer className="v2-uniai-workspace-page">
      <div className="ai-workspace-grid">
        
        {/* 1. LEFT PANEL: Chat History (240px) */}
        <aside className="ai-history-panel">
          <div className="ai-panel-header">
            <div className="ai-brand-badge">
              <Icon name="uniAi" size={16} />
              <span className="brand-title">UniAI</span>
            </div>
            <button className="btn btn-secondary sm-btn ai-new-chat-btn" onClick={handleNewChat}>
              + New chat
            </button>
          </div>

          <div className="ai-history-body">
            <div className="ai-history-group">
              <span className="history-group-label">TODAY</span>
              {historyToday.map((item) => (
                <button
                  key={item.id}
                  className={`history-row ${activeHistoryId === item.id ? 'active' : ''}`}
                  onClick={() => setActiveHistoryId(item.id)}
                >
                  <Icon name={item.icon} size={14} className="history-icon" />
                  <span className="history-title">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="ai-history-group">
              <span className="history-group-label">YESTERDAY</span>
              {historyYesterday.map((item) => (
                <button
                  key={item.id}
                  className={`history-row ${activeHistoryId === item.id ? 'active' : ''}`}
                  onClick={() => setActiveHistoryId(item.id)}
                >
                  <Icon name={item.icon} size={14} className="history-icon" />
                  <span className="history-title">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* 2. CENTER PANEL: AI Conversation Feed & Sticky Composer */}
        <main className="ai-chat-main">
          <header className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar-badge">
                <Icon name="uniAi" size={18} />
              </div>
              <div>
                <h2 className="ai-copilot-title">UniAI Copilot</h2>
                <p className="ai-copilot-sub">Your contextual university assistant</p>
              </div>
            </div>
            <div className="ai-status-indicator">
              <span className="status-dot green" />
              <span>Online</span>
            </div>
          </header>

          {/* Conversation Stream */}
          <div className="ai-feed-container" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
                {msg.sender === 'ai' && (
                  <div className="ai-msg-avatar">
                    <Icon name="uniAi" size={15} />
                  </div>
                )}

                <div className="ai-msg-content">
                  <div className="ai-msg-bubble">
                    <p className="msg-text-paragraph">{msg.text}</p>

                    {/* Render Structured Schedule Items if present */}
                    {msg.scheduleItems && (
                      <div className="ai-structured-schedule">
                        {msg.scheduleItems.map((s, idx) => (
                          <div key={idx} className="schedule-card-item">
                            <div className="sch-time">{s.time}</div>
                            <div className="sch-main">
                              <h4 className="sch-subject">{s.subject}</h4>
                              <p className="sch-meta">{s.room} · {s.faculty}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {msg.noticeText && (
                      <p className="msg-notice-text">{msg.noticeText}</p>
                    )}
                  </div>
                  <span className="msg-time-stamp">{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message-row ai-row">
                <div className="ai-msg-avatar">
                  <Icon name="sparkles" size={15} />
                </div>
                <div className="ai-msg-content">
                  <div className="ai-msg-bubble" style={{ padding: '12px 16px' }}>
                    <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="ai-quick-prompts-bar">
            <span className="prompts-label">Quick prompts</span>
            <div className="prompts-chips-wrapper">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="prompt-chip"
                  onClick={() => handleSend(null, prompt)}
                  disabled={isTyping}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Sticky Message Composer */}
          <form onSubmit={handleSend} className="ai-composer-bar">
            <button type="button" className="composer-action-btn" title="Add attachment / context">
              +
            </button>
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="ai-composer-input"
              disabled={isTyping}
            />
            <button type="submit" className="composer-send-btn" title="Send message" disabled={isTyping || !inputVal.trim()}>
              ↑
            </button>
          </form>
        </main>

        {/* 3. RIGHT PANEL: Student Context Panel (280px) */}
        <aside className="ai-context-panel">
          <div className="ai-panel-header">
            <h4 className="context-panel-title">CURRENT CONTEXT</h4>
          </div>

          <div className="context-card-box">
            <div className="ctx-info-row">
              <span className="ctx-lbl">Student</span>
              <span className="ctx-val font-bold">Piyush Jain</span>
            </div>
            <div className="ctx-info-row">
              <span className="ctx-lbl">Program</span>
              <span className="ctx-val">B.Tech CSE</span>
            </div>
            <div className="ctx-info-row">
              <span className="ctx-lbl">Semester</span>
              <span className="ctx-val">4</span>
            </div>
            <div className="ctx-info-row">
              <span className="ctx-lbl">Attendance</span>
              <span className="ctx-val highlight-green">82%</span>
            </div>
            <div className="ctx-info-row">
              <span className="ctx-lbl">Pending Tasks</span>
              <span className="ctx-val highlight-amber">1 Due Tomorrow</span>
            </div>
          </div>

          <div className="context-next-class-box">
            <span className="next-class-lbl">NEXT CLASS</span>
            <h4 className="next-class-name">Data Structures</h4>
            <p className="next-class-meta">09:00 AM · Room 204</p>
          </div>

          <div className="context-shortcuts-list">
            <span className="shortcuts-lbl">SHORTCUTS</span>
            <button className="shortcut-btn"><Icon name="timetable" size={14} /> Schedule</button>
            <button className="shortcut-btn"><Icon name="academics" size={14} /> Academics</button>
            <button className="shortcut-btn"><Icon name="attendance" size={14} /> Attendance</button>
          </div>
        </aside>

      </div>
    </PageContainer>
  );
}

export default UniAI;
