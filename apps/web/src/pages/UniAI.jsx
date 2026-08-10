import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Card, Button, Badge } from '../components/ui';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function UniAI() {
  const { aiConversation } = mockData;
  const [messages, setMessages] = useState(aiConversation.messages);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: inputVal };
    const aiReply = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: `UniAI Intelligence Response: I received your request regarding "${inputVal}". Checking course schedule & campus records...`,
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    setInputVal('');
  };

  return (
    <PageContainer className="uniai-page">
      <div className="uniai-3col-layout">
        {/* Left Conversation Threads Sidebar (Desktop) */}
        <div className="uniai-threads-sidebar desktop-only">
          <div className="threads-header">
            <h3>UniAI Threads</h3>
            <Button variant="outline" size="sm" icon="sparkles">+ New Thread</Button>
          </div>

          <div className="threads-list">
            {aiConversation.threads.map((t) => (
              <button key={t.id} className="thread-item active">
                <Icon name="sparkles" size={14} />
                <div className="thread-text">
                  <span className="thread-title">{t.title}</span>
                  <span className="thread-time">{t.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Main Chat Panel */}
        <div className="uniai-chat-panel">
          <div className="chat-header-bar">
            <div className="ai-brand-badge">
              <Icon name="uniAi" size={20} />
              <div>
                <h2>UniAI Intelligence Studio</h2>
                <span className="sub">Context-Aware Campus OS Model v2.4</span>
              </div>
            </div>
            <Badge variant="primary" size="sm">Online</Badge>
          </div>

          {/* Messages Feed */}
          <div className="messages-feed">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble-row ${msg.sender === 'user' ? 'is-user' : 'is-ai'}`}>
                <div className="avatar-bubble">
                  {msg.sender === 'user' ? 'PJ' : <Icon name="uniAi" size={16} />}
                </div>

                <div className="message-content-box">
                  <span className="sender-label">{msg.sender === 'user' ? 'Piyush Jain' : 'UniAI Copilot'}</span>
                  <div className="message-text">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Prompt Form */}
          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              placeholder="Ask UniAI about assignments, exam schedule, or campus services..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="chat-text-input"
            />
            <Button type="submit" variant="primary" size="md" icon="arrowRight">
              Send
            </Button>
          </form>
        </div>

        {/* Right Context Panel (Desktop) */}
        <div className="uniai-context-panel desktop-only">
          <Card>
            <div className="context-card-header">
              <Icon name="profile" size={18} />
              <h4>Active Student Context</h4>
            </div>
            <div className="context-item">
              <span className="lbl">Student:</span>
              <span className="val">Piyush Jain</span>
            </div>
            <div className="context-item">
              <span className="lbl">Program:</span>
              <span className="val">B.Tech CSE (Sem 4)</span>
            </div>
            <div className="context-item">
              <span className="lbl">Attendance:</span>
              <span className="val">82% Overall</span>
            </div>
            <div className="context-item">
              <span className="lbl">Pending Tasks:</span>
              <span className="val">3 Assignments Due</span>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default UniAI;
