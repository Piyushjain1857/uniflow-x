import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification } from '@uniflow-x/utils/notifications';

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const loadData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const unreadCount = notifications.filter((n) => n.isUnread).length;
  const highPriorityCount = notifications.filter((n) => n.isHighPriority).length;

  const handleMarkAllRead = async () => {
    const data = await markAllAsRead();
    setNotifications(data);
  };

  const handleToggleRead = async (id, isUnread) => {
    if (!isUnread) return; // Don't un-read it if it's already read (based on reqs, usually it's one-way)
    const data = await markAsRead(id);
    setNotifications(data);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent clicking row
    const data = await deleteNotification(id);
    setNotifications(data);
  };

  const handleRowClick = async (notif) => {
    if (notif.isUnread) {
      const data = await markAsRead(notif.id);
      setNotifications(data);
    }
    if (notif.link) {
      navigate(notif.link);
    }
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'Unread') return item.isUnread;
    if (activeFilter === 'Academic') return item.category === 'Academic';
    if (activeFilter === 'Campus') return item.category === 'Campus';
    if (activeFilter === 'System') return item.category === 'System';
    return true;
  });

  const todayNotifications = filteredNotifications.filter((n) => n.group === 'TODAY');
  const yesterdayNotifications = filteredNotifications.filter((n) => n.group === 'YESTERDAY');

  if (loading) {
    return (
      <PageContainer>
        <div style={{ padding: 48, textAlign: 'center' }}>Loading Notifications...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="v2-notifications-page">
      {/* Header & Mark All Read */}
      <div className="v2-page-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="v2-title">Notifications</h1>
          <p className="v2-subtitle">Stay updated with important university alerts.</p>
        </div>
        <div className="page-header-actions">
          <Button variant="secondary" icon="checkCircle" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: 32, alignItems: 'start' }}>
        
        {/* Left Column: Summary & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Summary Box */}
          <div className="v2-surface-box" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Unread</span>
                <span className="badge badge-primary">{unreadCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>High Priority</span>
                <span className="badge badge-warning">{highPriorityCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Push Sync</span>
                <span className="badge badge-success">Enabled</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="v2-surface-box" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Filters</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['All', 'Unread', 'Academic', 'Campus', 'System'].map((filter) => (
                <Button 
                  key={filter} 
                  variant={activeFilter === filter ? 'primary' : 'ghost'}
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Notification List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {filteredNotifications.length === 0 ? (
            <div className="v2-surface-box" style={{ textAlign: 'center', padding: 48 }}>
              <Icon name="checkCircle" size={48} color="var(--success)" className="mx-auto mb-4" />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>All caught up!</h3>
              <p style={{ color: 'var(--text-muted)' }}>You have no notifications matching this filter.</p>
            </div>
          ) : (
            <div className="v2-surface-box" style={{ padding: 0 }}>
              
              {todayNotifications.length > 0 && (
                <>
                  <div style={{ padding: '16px 24px', backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
                    <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>Today</h4>
                  </div>
                  <div className="v2-divider-list">
                    {todayNotifications.map(notif => (
                      <NotificationRow 
                        key={notif.id} 
                        notif={notif} 
                        onClick={() => handleRowClick(notif)} 
                        onDelete={(e) => handleDelete(e, notif.id)} 
                      />
                    ))}
                  </div>
                </>
              )}

              {yesterdayNotifications.length > 0 && (
                <>
                  <div style={{ padding: '16px 24px', backgroundColor: 'var(--surface-2)', borderBottom: '1px solid var(--border)', borderTop: todayNotifications.length > 0 ? '1px solid var(--border)' : 'none' }}>
                    <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>Yesterday</h4>
                  </div>
                  <div className="v2-divider-list">
                    {yesterdayNotifications.map(notif => (
                      <NotificationRow 
                        key={notif.id} 
                        notif={notif} 
                        onClick={() => handleRowClick(notif)} 
                        onDelete={(e) => handleDelete(e, notif.id)} 
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </PageContainer>
  );
}

function NotificationRow({ notif, onClick, onDelete }) {
  return (
    <div 
      className="list-row" 
      onClick={onClick}
      style={{ 
        padding: '20px 24px', 
        display: 'flex', 
        gap: 16, 
        alignItems: 'flex-start',
        cursor: notif.link ? 'pointer' : 'default',
        backgroundColor: notif.isUnread ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
        transition: 'background-color 0.2s'
      }}
    >
      <div style={{ 
        width: 40, height: 40, borderRadius: '50%', 
        backgroundColor: notif.isHighPriority ? 'rgba(239, 68, 68, 0.1)' : 'var(--surface-3)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0
      }}>
        <Icon name={notif.icon} size={20} color={notif.isHighPriority ? 'var(--danger)' : 'var(--primary)'} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: notif.isUnread ? 'var(--text)' : 'var(--text-secondary)' }}>
            {notif.title}
          </span>
          {notif.isUnread && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }} />}
          {notif.isHighPriority && <span className="badge badge-warning" style={{ padding: '2px 6px', fontSize: 10 }}>Priority</span>}
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>{notif.timestamp}</span>
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 8 }}>
          {notif.description}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {notif.category}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="ghost" icon="close" style={{ padding: 8, color: 'var(--text-muted)' }} onClick={onDelete} title="Delete notification" />
      </div>
    </div>
  );
}

export default Notifications;
