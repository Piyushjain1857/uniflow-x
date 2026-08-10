import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Landing() {
  const { student, attendance, nextClass } = mockData;

  return (
    <div className="landing-container">
      {/* Top Navbar */}
      <nav className="landing-nav">
        <div className="brand-logo">
          <span className="brand-icon-wrap">
            <Icon name="sparkles" size={18} />
          </span>
          <span>UniFlow <span style={{ color: 'var(--color-primary)' }}>X</span></span>
        </div>

        <div className="nav-links">
          <Link to="/dashboard" className="nav-item">Product Tour</Link>
          <Link to="/academics" className="nav-item">Academics</Link>
          <Link to="/uni-ai" className="nav-item">UniAI Studio</Link>
          <Link to="/login" className="ui-btn ui-btn-primary ui-btn-sm">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="hero-pill-badge">
          <Icon name="sparkles" size={14} />
          <span>Next-Generation University Platform</span>
        </div>

        <h1 className="hero-heading">
          Your University. <br />
          <span className="text-primary-gradient">One Intelligent OS.</span>
        </h1>

        <p className="hero-subtext">
          A unified digital platform connecting academics, campus life, communication, services, and intelligent assistance.
        </p>

        <div className="hero-cta-row">
          <Link to="/login" className="ui-btn ui-btn-primary ui-btn-lg">
            <span>Get Started</span>
            <Icon name="arrowRight" size={18} />
          </Link>
          <Link to="/dashboard" className="ui-btn ui-btn-secondary ui-btn-lg">
            <span>Explore UniFlow</span>
          </Link>
        </div>

        {/* Realistic Interactive Product Preview Window */}
        <div className="product-preview-frame">
          <div className="preview-window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="window-title">UniFlow X — Student Workspace (Piyush Jain)</span>
          </div>

          <div className="preview-body-grid">
            {/* Dashboard Mock Shell */}
            <div className="preview-card main-hero-preview">
              <div className="preview-header">
                <span className="preview-badge">Next Class</span>
                <span className="preview-countdown">{nextClass.countdown}</span>
              </div>
              <h3 className="preview-title">{nextClass.subject} ({nextClass.code})</h3>
              <p className="preview-meta">{nextClass.time} • {nextClass.room} • {nextClass.faculty}</p>
            </div>

            <div className="preview-card attendance-preview">
              <div className="preview-header">
                <span>Overall Attendance</span>
                <span className="preview-percentage">{attendance.overallPercentage}%</span>
              </div>
              <div className="preview-progress-bar">
                <div className="preview-progress-fill" style={{ width: `${attendance.overallPercentage}%` }} />
              </div>
              <p className="preview-note">Satisfactory • 78/95 lectures attended</p>
            </div>

            <div className="preview-card assignments-preview">
              <div className="preview-header">
                <span>Pending Assignment</span>
                <span className="preview-urgent">Due Tomorrow</span>
              </div>
              <h4 className="preview-sub">Data Structures Assignment 3</h4>
              <p className="preview-desc">AVL Tree Rotations & Heap Implementation</p>
            </div>

            <div className="preview-card uniai-preview">
              <div className="preview-header">
                <Icon name="uniAi" size={16} />
                <span>UniAI Intelligence</span>
              </div>
              <p className="preview-ai-msg">"You have 3 upcoming assignments. Data Structures is due tomorrow at 11:59 PM."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="landing-features">
        <div className="feature-block">
          <Icon name="dashboard" size={24} className="feature-icon" />
          <h3>Intelligent Dashboard</h3>
          <p>Real-time class countdowns, attendance metrics, and priority deadline alerts in one view.</p>
        </div>

        <div className="feature-block">
          <Icon name="attendance" size={24} className="feature-icon" />
          <h3>Smart Attendance</h3>
          <p>Automated threshold monitoring and intelligent prediction algorithms for lecture tracking.</p>
        </div>

        <div className="feature-block">
          <Icon name="uniAi" size={24} className="feature-icon" />
          <h3>UniAI Copilot</h3>
          <p>Context-aware assistant for schedule queries, exam reminders, and campus navigation.</p>
        </div>
      </section>
    </div>
  );
}

export default Landing;
