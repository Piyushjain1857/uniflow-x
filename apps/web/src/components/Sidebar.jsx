import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';

const mainNavigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/academics', label: 'Academics', icon: 'academics' },
  { path: '/attendance', label: 'Attendance', icon: 'attendance', badge: '92%' },
  { path: '/assignments', label: 'Assignments', icon: 'assignments', badge: '3' },
  { path: '/exams', label: 'Exams', icon: 'exams' },
  { path: '/timetable', label: 'Timetable', icon: 'timetable' },
  { path: '/calendar', label: 'Calendar', icon: 'calendar' },
  { path: '/campus', label: 'Campus', icon: 'campus' },
  { path: '/events', label: 'Events', icon: 'events', badge: 'New' },
  { path: '/clubs', label: 'Clubs', icon: 'clubs' },
  { path: '/campus-map', label: 'Campus Map', icon: 'campusMap' },
  { path: '/complaints', label: 'Complaints', icon: 'complaints' },
  { path: '/uni-ai', label: 'UniAI', icon: 'uniAi', isAi: true },
  { path: '/digital-id', label: 'Digital ID', icon: 'digitalId' },
  { path: '/notifications', label: 'Notifications', icon: 'notifications', badge: '3' },
];

const bottomNavigationItems = [
  { path: '/profile', label: 'Profile', icon: 'profile' },
  { path: '/settings', label: 'Settings', icon: 'settings' },
];

export function Sidebar({ isOpen = false, isCollapsed = false, onClose, onToggleCollapse }) {
  const location = useLocation();

  // Keyboard Esc key handling for mobile drawer dismissal
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
      {/* Mobile Drawer Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside
        className={`sidebar ${isOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Main Navigation Sidebar"
      >
        {/* Sidebar Brand Header */}
        <div className="sidebar-header">
          <NavLink to="/dashboard" className="sidebar-brand" onClick={onClose}>
            <span className="brand-logo-icon">
              <Icon name="sparkles" size={20} />
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

        {/* Scrollable Navigation Menu */}
        <div className="sidebar-scroll">
          <nav className="sidebar-nav">
            <span className="sidebar-section-label">{!isCollapsed && 'Navigation'}</span>
            {mainNavigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`sidebar-link ${isActive ? 'active' : ''} ${item.isAi ? 'ai-link' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon name={item.icon} size={18} />
                  {!isCollapsed && <span className="sidebar-link-text">{item.label}</span>}
                  {!isCollapsed && item.badge && (
                    <span className={`sidebar-badge ${item.isAi ? 'badge-ai' : ''}`}>{item.badge}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Pinned Bottom Section: Profile & Settings & Collapse Toggle */}
        <div className="sidebar-footer">
          <nav className="sidebar-bottom-nav">
            {bottomNavigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon name={item.icon} size={18} />
                  {!isCollapsed && <span className="sidebar-link-text">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile Mini Pill */}
          <div className="user-mini-card">
            <div className="avatar-circle">PX</div>
            {!isCollapsed && (
              <div className="user-info">
                <span className="user-name">Alex Vance</span>
                <span className="user-role">CS Senior</span>
              </div>
            )}
          </div>

          {/* Desktop/Tablet Sidebar Collapse Toggle */}
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="sidebar-collapse-btn"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'chevronRight' : 'close'} size={16} />
              {!isCollapsed && <span className="collapse-text">Collapse Menu</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
