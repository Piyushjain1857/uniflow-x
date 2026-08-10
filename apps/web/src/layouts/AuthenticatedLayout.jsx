import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MobileBottomNav from '../components/MobileBottomNav';
import Icon from '../components/Icon';

const getBreadcrumbTitle = (pathname) => {
  const map = {
    '/dashboard': { title: 'Student Workspace Dashboard', section: 'Core' },
    '/academics': { title: 'Academic Courses & Credits', section: 'Core' },
    '/attendance': { title: 'Smart Attendance Tracker', section: 'Core' },
    '/assignments': { title: 'Assignments & Submissions', section: 'Core' },
    '/exams': { title: 'Exams & Hall Tickets', section: 'Core' },
    '/timetable': { title: 'Weekly Interactive Timetable', section: 'Core' },
    '/calendar': { title: 'Academic Calendar & Events', section: 'Core' },
    '/campus': { title: 'Campus Community Feed', section: 'Campus' },
    '/events': { title: 'University Events & Fests', section: 'Campus' },
    '/clubs': { title: 'Student Clubs & Societies', section: 'Campus' },
    '/campus-map': { title: 'Interactive Campus Map', section: 'Campus' },
    '/complaints': { title: 'Grievance & Helpdesk', section: 'Campus' },
    '/uni-ai': { title: 'UniAI Copilot Assistant', section: 'AI Tools' },
    '/digital-id': { title: 'Digital Student ID Card', section: 'AI Tools' },
    '/notifications': { title: 'Notification Center', section: 'Account' },
    '/profile': { title: 'User Account Profile', section: 'Account' },
    '/settings': { title: 'System Preferences', section: 'Account' },
    '/faculty': { title: 'Faculty Operations Console', section: 'Portals' },
    '/admin': { title: 'University Admin Control Center', section: 'Portals' },
  };
  return map[pathname] || { title: 'UniFlow X Shell', section: 'Workspace' };
};

function AuthenticatedLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const pageMeta = getBreadcrumbTitle(location.pathname);

  return (
    <div className={`authenticated-layout ${sidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="authenticated-main-wrap">
        {/* Topbar Header */}
        <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Sub-header Breadcrumb Banner */}
        <div className="app-breadcrumb-header">
          <div className="breadcrumb-info">
            <div className="breadcrumb-trail">
              <Link to="/dashboard">UniFlow</Link>
              <Icon name="chevronRight" size={14} />
              <span className="breadcrumb-section">{pageMeta.section}</span>
              <Icon name="chevronRight" size={14} />
              <span className="breadcrumb-current">{pageMeta.title}</span>
            </div>
            <h1 className="page-header-title">{pageMeta.title}</h1>
          </div>

          <div className="breadcrumb-actions">
            <span className="live-clock-badge">
              <span className="pulse-dot green" />
              <span>Fall Semester 2026</span>
            </span>
          </div>
        </div>

        {/* Main Content View */}
        <main className="app-content">
          <Outlet />
        </main>
      </div>

      {/* 5-Tab Mobile Bottom Navigation Bar (< 768px) */}
      <MobileBottomNav />
    </div>
  );
}

export default AuthenticatedLayout;
