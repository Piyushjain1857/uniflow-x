import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';

const initialNotifications = [
  {
    id: 'n1',
    category: 'Academic',
    title: 'Assignment Alert',
    description: 'CS401 Assignment #4 (Tree Traversal Algorithms) is due in 48 hours.',
    timestamp: '2 hours ago',
    group: 'TODAY',
    isUnread: true,
    isHighPriority: true,
    icon: 'academics',
  },
  {
    id: 'n2',
    category: 'Attendance',
    title: 'Attendance Logged',
    description: 'Prof. Jenkins marked your attendance for CS402 Data Structures.',
    timestamp: '4 hours ago',
    group: 'TODAY',
    isUnread: true,
    isHighPriority: false,
    icon: 'attendance',
  },
  {
    id: 'n3',
    category: 'Campus',
    title: 'Event Reminder',
    description: 'UniHack 2026 Orientation session starts at 05:00 PM in Main Auditorium.',
    timestamp: '5 hours ago',
    group: 'TODAY',
    isUnread: true,
    isHighPriority: true,
    icon: 'campus',
  },
  {
    id: 'n4',
    category: 'System',
    title: 'University Maintenance',
    description: 'Campus Wi-Fi and portal maintenance scheduled for tonight at 11:00 PM.',
    timestamp: 'Yesterday',
    group: 'YESTERDAY',
    isUnread: false,
    isHighPriority: false,
    icon: 'settings',
  },
  {
    id: 'n5',
    category: 'Academic',
    title: 'Grade Published',
    description: 'Final score for Data Structures Lab Quiz #2 has been verified (Grade A).',
    timestamp: 'Yesterday',
    group: 'YESTERDAY',
    isUnread: false,
    isHighPriority: false,
    icon: 'sparkles',
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('All');

  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const highPriorityCount = notifications.filter((n) => n.isHighPriority).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: !n.isUnread } : n))
    );
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'Unread') return item.isUnread;
    if (activeFilter === 'Academic') return item.category === 'Academic' || item.category === 'Attendance';
    if (activeFilter === 'Campus') return item.category === 'Campus';
    return true;
  });

  const todayNotifications = filteredNotifications.filter((n) => n.group === 'TODAY');
  const yesterdayNotifications = filteredNotifications.filter((n) => n.group === 'YESTERDAY');

  return (
    <PageContainer className="v2-notifications-page">
      {/* Header & Mark All Read */}
      <div className="notif-page-header">
        <div>
          <h1 className="notif-heading">Notifications</h1>
          <p className="notif-subheading">
            Stay on top of academics, campus activity and university updates.
          </p>
        </div>

        <button className="btn btn-secondary sm-btn" onClick={handleMarkAllRead}>
          Mark all as read
        </button>
      </div>

      {/* Summary Metrics */}
      <div className="notif-summary-row">
        <div className="notif-metric-badge primary">
          <span className="metric-val">{unreadCount}</span>
          <span className="metric-lbl">Unread</span>
        </div>
        <div className="notif-metric-badge warning">
          <span className="metric-val">{highPriorityCount}</span>
          <span className="metric-lbl">High Priority</span>
        </div>
        <div className="notif-metric-badge success">
          <span className="status-dot green" />
          <span className="metric-lbl">Push Sync Enabled</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="notif-filter-bar">
        <div className="notif-filter-tabs">
          {['All', 'Unread', 'Academic', 'Campus'].map((filter) => (
            <button
              key={filter}
              className={`notif-tab-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Notification List */}
      <div className="notif-timeline-list">
        {todayNotifications.length > 0 && (
          <div className="notif-group-section">
            <span className="notif-group-title">TODAY</span>
            <div className="notif-items-wrap">
              {todayNotifications.map((item) => (
                <div
                  key={item.id}
                  className={`notif-item-row ${item.isUnread ? 'unread' : ''}`}
                  onClick={() => handleToggleRead(item.id)}
                >
                  <div className="notif-icon-col">
                    <Icon name={item.icon} size={16} />
                  </div>

                  <div className="notif-main-col">
                    <div className="notif-top-meta">
                      <span className="notif-cat-tag">{item.category}</span>
                      <span className="notif-time">{item.timestamp}</span>
                    </div>
                    <h4 className="notif-title">{item.title}</h4>
                    <p className="notif-desc">{item.description}</p>
                  </div>

                  {item.isUnread && <span className="notif-unread-dot" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {yesterdayNotifications.length > 0 && (
          <div className="notif-group-section" style={{ marginTop: '28px' }}>
            <span className="notif-group-title">YESTERDAY</span>
            <div className="notif-items-wrap">
              {yesterdayNotifications.map((item) => (
                <div
                  key={item.id}
                  className={`notif-item-row ${item.isUnread ? 'unread' : ''}`}
                  onClick={() => handleToggleRead(item.id)}
                >
                  <div className="notif-icon-col">
                    <Icon name={item.icon} size={16} />
                  </div>

                  <div className="notif-main-col">
                    <div className="notif-top-meta">
                      <span className="notif-cat-tag">{item.category}</span>
                      <span className="notif-time">{item.timestamp}</span>
                    </div>
                    <h4 className="notif-title">{item.title}</h4>
                    <p className="notif-desc">{item.description}</p>
                  </div>

                  {item.isUnread && <span className="notif-unread-dot" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredNotifications.length === 0 && (
          <div className="notif-empty-state">
            <Icon name="notifications" size={24} className="empty-icon" />
            <p>No notifications found for filter "{activeFilter}".</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

export default Notifications;
