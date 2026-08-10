import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function UniAI() {
  const { aiSuggestedPrompts } = mockData;
  const [activeHistoryId, setActiveHistoryId] = useState('h1');
  const [inputVal, setInputVal] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'user',
      text: "What's on my schedule today?",
      time: '08:55 AM',
    },
    {
      id: 'm2',
      sender: 'ai',
      text: "Good morning, Piyush. Here's what's on your schedule today.",
      time: '08:55 AM',
      scheduleItems: [
        { time: '09:00 AM', subject: 'Data Structures', room: 'Room 204', faculty: 'Dr. Aris Thorne' },
        { time: '11:00 AM', subject: 'Discrete Mathematics', room: 'Room 302', faculty: 'Prof. Elena Rostova' },
        { time: '02:00 PM', subject: 'Web Development', room: 'Lab 3', faculty: 'Dr. Marcus Vance' },
      ],
      noticeText: 'You also have 1 pending coursework assignment (React Auth) due tomorrow.',
    },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = { id: Date.now().toString(), sender: 'user', text: inputVal, time: 'Just now' };
    const replyMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: `I checked your academic records for "${inputVal}". Your schedule, attendance (82%), and course syllabi are synchronized.`,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg, replyMsg]);
    setInputVal('');
  };

  const historyToday = [
    { id: 'h1', title: 'Schedule & Assignments', time: '10 min ago', icon: 'timetable' },
    { id: 'h2', title: 'Attendance Check', time: '2 hrs ago', icon: 'attendance' },
  ];

  const historyYesterday = [
    { id: 'h3', title: 'Data Structures Syllabus', time: 'Yesterday', icon: 'academics' },
    { id: 'h4', title: 'Library Hours & Access', time: 'Yesterday', icon: 'campusMap' },
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
            <button className="btn btn-secondary sm-btn ai-new-chat-btn" onClick={() => setMessages([])}>
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
          <div className="ai-feed-container">
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
          </div>

          {/* Quick Prompt Chips */}
          <div className="ai-quick-prompts-bar">
            <span className="prompts-label">Quick prompts</span>
            <div className="prompts-chips-wrapper">
              {aiSuggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="prompt-chip"
                  onClick={() => setInputVal(prompt)}
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
              placeholder="Ask anything about your university..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="ai-composer-input"
            />
            <button type="submit" className="composer-send-btn" title="Send message">
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
