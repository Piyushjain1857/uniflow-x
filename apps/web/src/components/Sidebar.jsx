import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';

const navigationGroups = [
  {
    title: 'OVERVIEW',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    ],
  },
  {
    title: 'ACADEMICS',
    items: [
      { path: '/academics', label: 'Subjects', icon: 'academics' },
      { path: '/attendance', label: 'Attendance', icon: 'attendance', badge: '82%' },
      { path: '/assignments', label: 'Assignments', icon: 'assignments', badge: '3' },
      { path: '/exams', label: 'Exams', icon: 'exams' },
      { path: '/timetable', label: 'Timetable', icon: 'timetable' },
    ],
  },
  {
    title: 'CAMPUS',
    items: [
      { path: '/events', label: 'Events', icon: 'events', badge: 'New' },
      { path: '/clubs', label: 'Clubs', icon: 'clubs' },
      { path: '/campus-map', label: 'Campus Map', icon: 'campusMap' },
      { path: '/campus', label: 'Services', icon: 'campus' },
    ],
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { path: '/uni-ai', label: 'UniAI', icon: 'uniAi', isAi: true },
    ],
  },
];

const bottomItems = [
  { path: '/notifications', label: 'Notifications', icon: 'notifications', badge: '3' },
  { path: '/profile', label: 'Profile', icon: 'profile' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

export function Sidebar({ isOpen = false, isCollapsed = false, onClose, onToggleCollapse }) {
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Brand Header */}
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-brand" onClick={onClose}>
            <span className="brand-logo-icon">
              <Icon name="sparkles" size={18} />
            </span>
            {!isCollapsed && (
              <span className="brand-title">
                UniFlow <span className="highlight">X</span>
              </span>
            )}
          </NavLink>

          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close navigation drawer">
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Scrollable Groups */}
        <div className="sidebar-scroll">
          {navigationGroups.map((group) => (
            <div key={group.title} className="sidebar-group">
              {!isCollapsed && <span className="sidebar-section-label">{group.title}</span>}
              <nav className="sidebar-nav">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`sidebar-link ${isActive ? 'active' : ''} ${item.isAi ? 'ai-link' : ''}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon name={item.icon} size={16} />
                      {!isCollapsed && <span className="sidebar-link-text">{item.label}</span>}
                      {!isCollapsed && item.badge && (
                        <span className={`sidebar-badge ${item.isAi ? 'badge-ai' : ''}`}>{item.badge}</span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Items */}
        <div className="sidebar-footer">
          <nav className="sidebar-bottom-nav">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon name={item.icon} size={16} />
                  {!isCollapsed && <span className="sidebar-link-text">{item.label}</span>}
                  {!isCollapsed && item.badge && (
                    <span className="sidebar-badge">{item.badge}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Student Profile Mini Card */}
          <div className="user-mini-card">
            <div className="avatar-circle">PJ</div>
            {!isCollapsed && (
              <div className="user-info">
                <span className="user-name">Piyush Jain</span>
                <span className="user-role">B.Tech CSE • Sem 4</span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="sidebar-collapse-btn"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'chevronRight' : 'close'} size={14} />
              {!isCollapsed && <span className="collapse-text">Collapse</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
