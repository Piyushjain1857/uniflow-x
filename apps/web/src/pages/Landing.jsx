import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '../components/Icon';
import { USER_ROLES, APP_CONFIG } from '@uniflow-x/constants';
import { formatRoleName } from '@uniflow-x/utils';

export function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Icon name="sparkles" size={16} />
          <span>Next-Generation Campus OS</span>
        </div>
        
        <h1 className="hero-main-title">
          The AI-Powered Digital Operating System for <span className="gradient-text">Universities</span>
        </h1>
        
        <p className="hero-lead">
          UniFlow X unifies academics, smart attendance, digital identity, campus life, and administrative governance into one intelligent, intuitive web shell.
        </p>

        <div className="hero-cta-group">
          <RouterLink to="/dashboard" className="btn-primary hero-btn">
            <span>Explore App Shell</span>
            <Icon name="arrowRight" size={18} />
          </RouterLink>
          
          <RouterLink to="/login" className="btn-secondary hero-btn">
            <Icon name="login" size={18} />
            <span>Sign In to Portal</span>
          </RouterLink>
        </div>

        <div className="hero-meta-stats">
          <div className="stat-pill">
            <span className="stat-value">15,000+</span>
            <span className="stat-label">Enrolled Students</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-value">99.9%</span>
            <span className="stat-label">System Uptime</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-value">Instant</span>
            <span className="stat-label">UniAI Response</span>
          </div>
        </div>
      </section>

      {/* Role Selector Showcase */}
      <section className="section-block">
        <div className="section-header">
          <span className="section-subtitle">Tailored Role Portals</span>
          <h2 className="section-title">Built for Every Member of Campus</h2>
        </div>

        <div className="roles-grid">
          <div className="role-card glass-panel">
            <div className="role-icon-wrap blue">
              <Icon name="profile" size={28} />
            </div>
            <span className="badge badge-blue">Student Portal</span>
            <h3>Student Workspace</h3>
            <p>Access course materials, log attendance, track grades, submit assignments, and manage digital student ID.</p>
            <RouterLink to="/dashboard" className="role-card-link">
              <span>Enter Student View</span>
              <Icon name="arrowRight" size={16} />
            </RouterLink>
          </div>

          <div className="role-card glass-panel">
            <div className="role-icon-wrap purple">
              <Icon name="faculty" size={28} />
            </div>
            <span className="badge badge-purple">Faculty Portal</span>
            <h3>Faculty Workspace</h3>
            <p>Manage course rosters, grade submissions, record lecture attendance, and publish syllabus updates.</p>
            <RouterLink to="/faculty" className="role-card-link">
              <span>Enter Faculty View</span>
              <Icon name="arrowRight" size={16} />
            </RouterLink>
          </div>

          <div className="role-card glass-panel">
            <div className="role-icon-wrap cyan">
              <Icon name="admin" size={28} />
            </div>
            <span className="badge badge-cyan">Admin Console</span>
            <h3>Admin Governance</h3>
            <p>University-wide analytics, department configuration, fee management, and system health monitoring.</p>
            <RouterLink to="/admin" className="role-card-link">
              <span>Enter Admin View</span>
              <Icon name="arrowRight" size={16} />
            </RouterLink>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="section-block">
        <div className="section-header">
          <span className="section-subtitle">Feature Overview</span>
          <h2 className="section-title">Everything You Need in One Unified Shell</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Icon name="uniAi" size={24} className="feature-icon glow-cyan" />
            <h4>UniAI Copilot</h4>
            <p>Context-aware assistant for schedule queries, exam reminders, and campus navigation guidance.</p>
          </div>

          <div className="feature-card">
            <Icon name="attendance" size={24} className="feature-icon glow-emerald" />
            <h4>Smart Attendance</h4>
            <p>Real-time attendance logging with threshold alerts, percentage analytics, and medical leave waivers.</p>
          </div>

          <div className="feature-card">
            <Icon name="digitalId" size={24} className="feature-icon glow-purple" />
            <h4>Digital Student ID</h4>
            <p>Instant NFC/QR pass for library checkout, cafeteria payments, and campus gate entry verification.</p>
          </div>

          <div className="feature-card">
            <Icon name="campusMap" size={24} className="feature-icon glow-amber" />
            <h4>Interactive Campus Map</h4>
            <p>Wayfinding for lecture halls, laboratories, administrative offices, and live shuttle location tracking.</p>
          </div>

          <div className="feature-card">
            <Icon name="exams" size={24} className="feature-icon glow-rose" />
            <h4>Exam Hall Tickets</h4>
            <p>Automated admit card generation, seating location finder, and instant grade publish notifications.</p>
          </div>

          <div className="feature-card">
            <Icon name="complaints" size={24} className="feature-icon glow-blue" />
            <h4>Grievance Desk</h4>
            <p>Transparent ticket tracking for hostel maintenance, IT support, and academic inquiries.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
