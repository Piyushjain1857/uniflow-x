import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function UniAI() {
  const { aiSuggestedPrompts } = mockData;
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'user',
      text: "What's on my schedule today?",
    },
    {
      id: 'm2',
      sender: 'ai',
      text: 'Good morning Piyush. Here is your schedule for today:\n\n• **09:00 AM** — Data Structures (CS201) in Room 204\n• **11:00 AM** — Discrete Mathematics (MA202) in Room 302\n• **02:00 PM** — Web Development (CS204) in Lab 3\n\nYou also have a pending assignment for React Authentication due tomorrow.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = { id: Date.now().toString(), sender: 'user', text: inputVal };
    const replyMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: `UniAI Copilot: I checked your records for "${inputVal}". Everything is synced with your course schedule.`,
    };

    setMessages((prev) => [...prev, newMsg, replyMsg]);
    setInputVal('');
  };

  return (
    <PageContainer className="v2-uniai-page">
      <div className="v2-uniai-grid">
        {/* LEFT COLUMN: History (Desktop) */}
        <div className="uniai-history-col desktop-only">
          <div className="col-header">
            <h4>History</h4>
            <button className="new-thread-btn">+ New</button>
          </div>

          <div className="history-list">
            <div className="history-group-label">Today</div>
            <button className="history-item active">Schedule & Assignments</button>
            <div className="history-group-label" style={{ marginTop: '12px' }}>Yesterday</div>
            <button className="history-item">Data Structures Syllabus</button>
            <button className="history-item">Library Hours</button>
          </div>
        </div>

        {/* CENTER COLUMN: Chat Feed */}
        <div className="uniai-chat-col">
          <div className="chat-top-bar">
            <div className="ai-mark-sm">
              <Icon name="uniAi" size={16} />
            </div>
            <div>
              <h2 className="ai-title-text">UniAI Copilot</h2>
              <span className="ai-sub-text">Contextual University Assistant</span>
            </div>
          </div>

          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`msg-row ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
                <div className="msg-avatar">
                  {msg.sender === 'user' ? 'PJ' : <Icon name="uniAi" size={14} />}
                </div>
                <div className="msg-bubble">
                  <div className="msg-text">{msg.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-bottom-area">
            <div className="suggested-chips">
              {aiSuggestedPrompts.map((p, idx) => (
                <button key={idx} className="chip-btn" onClick={() => setInputVal(p)}>
                  {p}
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="v2-chat-form">
              <input
                type="text"
                placeholder="Ask anything..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="v2-chat-input"
              />
              <button type="submit" className="v2-chat-send">
                Send
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Context (Desktop) */}
        <div className="uniai-context-col desktop-only">
          <div className="col-header">
            <h4>Context</h4>
          </div>

          <div className="v2-surface-box context-box">
            <div className="ctx-row">
              <span className="ctx-lbl">Student</span>
              <span className="ctx-val">Piyush Jain</span>
            </div>
            <div className="ctx-row">
              <span className="ctx-lbl">Semester</span>
              <span className="ctx-val">B.Tech CSE · Sem 4</span>
            </div>
            <div className="ctx-row">
              <span className="ctx-lbl">Attendance</span>
              <span className="ctx-val">82% (Good)</span>
            </div>
            <div className="ctx-row">
              <span className="ctx-lbl">Pending Tasks</span>
              <span className="ctx-val">1 Due Tomorrow</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default UniAI;
