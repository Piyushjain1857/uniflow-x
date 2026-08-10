import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockData } from '../data/mockData';

export function Landing() {
  const { student, nextClass, attendance } = mockData;

  return (
    <div className="v2-landing-page">
      {/* Top Navbar */}
      <header className="v2-landing-nav">
        <div className="v2-brand-link">
          <div className="v2-brand-mark">
            <Icon name="sparkles" size={16} />
          </div>
          <div className="v2-brand-text">
            <span className="brand-uniflow">UNIFLOW</span>
            <span className="brand-x">X</span>
          </div>
        </div>

        <nav className="landing-links desktop-only">
          <Link to="/dashboard" className="link-item">Product</Link>
          <Link to="/academics" className="link-item">Academics</Link>
          <Link to="/uni-ai" className="link-item">UniAI</Link>
          <Link to="/login" className="v2-btn-primary sm-btn">Sign in</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="v2-landing-hero">
        <span className="hero-pill-tag">
          <Icon name="sparkles" size={12} /> Modern University Operating System
        </span>

        <h1 className="hero-v2-title">
          UNIFLOW X <br />
          <span className="text-muted">Your University.</span> <br />
          One Intelligent OS.
        </h1>

        <p className="hero-v2-sub">
          A unified platform for academics, campus life, communication, services and intelligent assistance.
        </p>

        <div className="hero-btn-group">
          <Link to="/login" className="v2-btn-primary lg-btn">Get Started</Link>
          <Link to="/dashboard" className="v2-btn-secondary lg-btn">Explore platform</Link>
        </div>

        {/* Dashboard Realistic Product Preview Frame */}
        <div className="v2-preview-frame">
          <div className="preview-top-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="preview-url">uniflow.edu/dashboard</span>
          </div>

          <div className="preview-workspace-preview">
            <div className="preview-greeting">
              <span className="preview-greeting-muted">Good morning,</span>
              <h2 className="preview-greeting-bold">{student.name}.</h2>
              <span className="preview-date">{student.dateFormatted}</span>
            </div>

            <div className="preview-hero-row">
              <div className="preview-box">
                <span className="preview-tag">NEXT CLASS</span>
                <h3 className="preview-class-title">{nextClass.subject}</h3>
                <p className="preview-class-sub">{nextClass.time} · {nextClass.room}</p>
                <span className="preview-timer">{nextClass.countdown}</span>
              </div>

              <div className="preview-box">
                <span className="preview-tag">ATTENDANCE</span>
                <h3 className="preview-class-title">{attendance.overallPercentage}%</h3>
                <div className="v2-progress-track" style={{ height: '6px', margin: '8px 0' }}>
                  <div className="v2-progress-fill" style={{ width: `${attendance.overallPercentage}%` }} />
                </div>
                <p className="preview-class-sub">{attendance.missableClassesText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="v2-features-section">
        <h2 className="v2-section-heading">FEATURES</h2>
        <div className="v2-features-grid">
          <div className="feature-item">
            <Icon name="academics" size={20} className="feat-icon" />
            <h3>Academic Intelligence</h3>
            <p>Subject rosters, assignment submission deadlines, and automated attendance predictions.</p>
          </div>

          <div className="feature-item">
            <Icon name="campus" size={20} className="feat-icon" />
            <h3>Campus Ecosystem</h3>
            <p>Unified discovery for campus events, societies, vector wayfinding maps, and services.</p>
          </div>

          <div className="feature-item">
            <Icon name="uniAi" size={20} className="feat-icon" />
            <h3>AI Assistant</h3>
            <p>Contextual copilot trained on your semester schedule, course syllabi, and administrative deadlines.</p>
          </div>

          <div className="feature-item">
            <Icon name="digitalId" size={20} className="feat-icon" />
            <h3>Digital Identity</h3>
            <p>Secure digital ID cards, hall tickets, and friction-free campus pass verifications.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="v2-final-cta">
        <h2>Experience the future of campus operating systems.</h2>
        <Link to="/login" className="v2-btn-primary lg-btn" style={{ marginTop: '20px' }}>
          Get Started with UniFlow X
        </Link>
      </section>
    </div>
  );
}

export default Landing;
