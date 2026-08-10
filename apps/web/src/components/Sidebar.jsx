import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const navigationSections = [
  {
    title: 'Core Workspace',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: 'dashboard', badge: 'Live' },
      { path: '/academics', label: 'Academics', icon: 'academics' },
      { path: '/attendance', label: 'Attendance', icon: 'attendance', badge: '92%' },
      { path: '/assignments', label: 'Assignments', icon: 'assignments', badge: '3 Due' },
      { path: '/exams', label: 'Exams & Results', icon: 'exams' },
      { path: '/timetable', label: 'Timetable', icon: 'timetable' },
      { path: '/calendar', label: 'Calendar', icon: 'calendar' }
    ]
  },
  {
    title: 'Campus Experience',
    items: [
      { path: '/campus', label: 'Campus Life', icon: 'campus' },
      { path: '/events', label: 'Events & Fest', icon: 'events', badge: '2 New' },
      { path: '/clubs', label: 'Societies & Clubs', icon: 'clubs' },
      { path: '/campus-map', label: 'Campus Map', icon: 'campusMap' },
      { path: '/complaints', label: 'Grievance Desk', icon: 'complaints' }
    ]
  },
  {
    title: 'AI & Services',
    items: [
      { path: '/uni-ai', label: 'UniAI Assistant', icon: 'uniAi', badge: 'AI' },
      { path: '/digital-id', label: 'Digital Student ID', icon: 'digitalId' },
      { path: '/notifications', label: 'Notifications', icon: 'notifications', badge: '5' }
    ]
  },
  {
    title: 'Portals & Admin',
    items: [
      { path: '/faculty', label: 'Faculty Portal', icon: 'faculty' },
      { path: '/admin', label: 'Admin Console', icon: 'admin' }
    ]
  },
  {
    title: 'Account',
    items: [
      { path: '/profile', label: 'Profile', icon: 'profile' },
      { path: '/settings', label: 'Settings', icon: 'settings' }
    ]
  }
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="brand-logo-icon">
              <Icon name="sparkles" size={22} />
            </span>
            <span className="brand-title">UniFlow <span className="highlight">X</span></span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {navigationSections.map((section) => (
            <div key={section.title} className="sidebar-group">
              <h4 className="sidebar-group-title">{section.title}</h4>
              <nav className="sidebar-nav">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon name={item.icon} size={18} />
                    <span className="sidebar-link-text">{item.label}</span>
                    {item.badge && (
                      <span className={`sidebar-badge ${item.badge === 'AI' ? 'badge-ai' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="user-mini-card">
            <div className="avatar-circle">PX</div>
            <div className="user-info">
              <span className="user-name">Alex Vance</span>
              <span className="user-role">CS Senior • 2026</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
