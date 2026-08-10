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
      { path: '/attendance', label: 'Attendance', icon: 'attendance' },
      { path: '/assignments', label: 'Assignments', icon: 'assignments' },
      { path: '/exams', label: 'Exams', icon: 'exams' },
      { path: '/timetable', label: 'Timetable', icon: 'timetable' },
    ],
  },
  {
    title: 'CAMPUS',
    items: [
      { path: '/events', label: 'Events', icon: 'events' },
      { path: '/clubs', label: 'Clubs', icon: 'clubs' },
      { path: '/campus-map', label: 'Campus Map', icon: 'campusMap' },
      { path: '/campus', label: 'Services', icon: 'campus' },
    ],
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { path: '/uni-ai', label: 'UniAI', icon: 'uniAi' },
    ],
  },
];

const bottomItems = [
  { path: '/notifications', label: 'Notifications', icon: 'notifications' },
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
        className={`v2-sidebar ${isOpen ? 'sidebar-open' : ''} ${isCollapsed ? 'sidebar-collapsed' : ''}`}
        aria-label="Main Sidebar Navigation"
      >
        {/* Brand Header */}
        <div className="v2-sidebar-header">
          <NavLink to="/dashboard" className="v2-brand-link" onClick={onClose}>
            <div className="v2-brand-mark">
              <Icon name="sparkles" size={14} />
            </div>
            {!isCollapsed && (
              <div className="v2-brand-text">
                <span className="brand-uniflow">UNIFLOW</span>
                <span className="brand-x">X</span>
              </div>
            )}
          </NavLink>

          <button className="v2-close-btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Scrollable Groups */}
        <div className="v2-sidebar-body">
          {navigationGroups.map((group) => (
            <div key={group.title} className="v2-nav-group">
              {!isCollapsed && <span className="v2-group-title">{group.title}</span>}
              <nav className="v2-nav-list">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`v2-nav-item ${isActive ? 'active' : ''}`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon name={item.icon} size={15} className="v2-nav-icon" />
                      {!isCollapsed && <span className="v2-nav-label">{item.label}</span>}
                      {isActive && <span className="v2-active-dot" />}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom Pinned Footer */}
        <div className="v2-sidebar-footer">
          <nav className="v2-nav-list">
            {bottomItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`v2-nav-item ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon name={item.icon} size={15} className="v2-nav-icon" />
                  {!isCollapsed && <span className="v2-nav-label">{item.label}</span>}
                  {isActive && <span className="v2-active-dot" />}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile Tile */}
          <NavLink to="/profile" className="v2-user-tile" onClick={onClose}>
            <div className="v2-user-avatar">PJ</div>
            {!isCollapsed && (
              <div className="v2-user-details">
                <span className="v2-user-name">Piyush Jain</span>
                <span className="v2-user-sub">B.Tech CSE · Sem 4</span>
              </div>
            )}
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
