import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

const getPageTitle = (pathname) => {
  const map = {
    '/dashboard': 'Dashboard',
    '/academics': 'Academic Overview',
    '/attendance': 'Attendance Analytics',
    '/assignments': 'Assignments & Submissions',
    '/exams': 'Exams & Hall Tickets',
    '/timetable': 'Weekly Timetable',
    '/campus': 'Campus Services & Life',
    '/events': 'University Events',
    '/clubs': 'Student Societies & Clubs',
    '/campus-map': 'Campus Map',
    '/complaints': 'Grievance & Support Desk',
    '/uni-ai': 'UniAI Intelligence Studio',
    '/digital-id': 'Digital Student ID',
    '/notifications': 'Notifications',
    '/profile': 'Student Profile',
    '/settings': 'System Settings',
  };
  return map[pathname] || 'UniFlow X';
};

export function Topbar({ onToggleSidebar, theme = 'dark', onToggleTheme }) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
        >
          <Icon name="menu" size={20} />
        </button>

        <h1 className="topbar-page-title">{pageTitle}</h1>
      </div>

      <div className="topbar-right">
        {/* Command Search Button ⌘ K */}
        <button
          className="command-search-btn"
          onClick={() => setSearchOpen(true)}
          title="Search or launch command palette (⌘ K)"
        >
          <Icon name="search" size={15} />
          <span className="search-text">Search...</span>
          <kbd className="search-kbd">⌘ K</kbd>
        </button>

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            className="topbar-icon-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            <Icon name="sparkles" size={16} />
          </button>
        )}

        {/* Notification Bell */}
        <Link to="/notifications" className="topbar-icon-btn notification-btn" title="Notifications">
          <Icon name="notifications" size={18} />
          <span className="notification-badge-dot">3</span>
        </Link>

        {/* User Avatar & Name */}
        <Link to="/profile" className="topbar-user-pill" title="Piyush Jain Profile">
          <div className="user-avatar-circle">PJ</div>
          <span className="user-name-text">Piyush Jain</span>
        </Link>
      </div>

      {/* Command Search Modal Mock */}
      {searchOpen && (
        <div className="ui-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="ui-modal-dialog ui-modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ui-modal-header">
              <h3 className="ui-modal-title">Command Search (⌘ K)</h3>
              <button className="ui-modal-close-btn" onClick={() => setSearchOpen(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="ui-modal-body">
              <input
                type="text"
                autoFocus
                placeholder="Type to search subjects, assignments, exams, or ask UniAI..."
                className="ui-input"
              />
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Quick Links:</span>
                <Link to="/dashboard" onClick={() => setSearchOpen(false)} className="sidebar-link">Dashboard</Link>
                <Link to="/attendance" onClick={() => setSearchOpen(false)} className="sidebar-link">Attendance Overview (82%)</Link>
                <Link to="/assignments" onClick={() => setSearchOpen(false)} className="sidebar-link">Assignments (3 Due)</Link>
                <Link to="/uni-ai" onClick={() => setSearchOpen(false)} className="sidebar-link">Ask UniAI</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;
