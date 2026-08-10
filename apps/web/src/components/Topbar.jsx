import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

const getPageTitle = (pathname) => {
  const map = {
    '/dashboard': 'Dashboard',
    '/academics': 'Academics',
    '/attendance': 'Attendance',
    '/assignments': 'Assignments',
    '/exams': 'Exams',
    '/timetable': 'Timetable',
    '/campus': 'Campus',
    '/events': 'Events',
    '/clubs': 'Clubs',
    '/campus-map': 'Campus Map',
    '/uni-ai': 'UniAI',
    '/notifications': 'Notifications',
    '/profile': 'Profile',
    '/settings': 'Settings',
  };
  return map[pathname] || 'UniFlow X';
};

export function Topbar({ onToggleSidebar, theme = 'dark', onToggleTheme }) {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="v2-top-header">
      <div className="v2-header-left">
        <button
          className="v2-mobile-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Icon name="menu" size={18} />
        </button>

        <h1 className="v2-page-title">{pageTitle}</h1>
      </div>

      {/* Command Center Search Button */}
      <div className="v2-header-center">
        <button
          className="v2-command-bar"
          onClick={() => setSearchOpen(true)}
          title="Search UniFlow (⌘ K)"
        >
          <kbd className="command-kbd">⌘ K</kbd>
          <span className="command-text">Search UniFlow...</span>
        </button>
      </div>

      <div className="v2-header-right">
        {onToggleTheme && (
          <button
            className="v2-icon-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            <Icon name="sparkles" size={15} />
          </button>
        )}

        <Link to="/notifications" className="v2-icon-btn" title="Notifications">
          <Icon name="notifications" size={16} />
          <span className="v2-badge-dot" />
        </Link>

        <Link to="/profile" className="v2-profile-avatar" title="Piyush Jain">
          PJ
        </Link>
      </div>

      {/* Command Palette Modal Mock */}
      {searchOpen && (
        <div className="ui-modal-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="ui-modal-dialog ui-modal-md" onClick={(e) => e.stopPropagation()}>
            <div className="ui-modal-header">
              <h3 className="ui-modal-title">Command Center (⌘ K)</h3>
              <button className="ui-modal-close-btn" onClick={() => setSearchOpen(false)}>
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="ui-modal-body">
              <input
                type="text"
                autoFocus
                placeholder="Search courses, classes, assignments, or ask UniAI..."
                className="ui-input"
              />
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Quick Actions:</span>
                <Link to="/dashboard" onClick={() => setSearchOpen(false)} className="sidebar-link">Go to Dashboard</Link>
                <Link to="/attendance" onClick={() => setSearchOpen(false)} className="sidebar-link">Check Attendance (82%)</Link>
                <Link to="/assignments" onClick={() => setSearchOpen(false)} className="sidebar-link">Assignments (1 Due Tomorrow)</Link>
                <Link to="/uni-ai" onClick={() => setSearchOpen(false)} className="sidebar-link">Open UniAI</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;
