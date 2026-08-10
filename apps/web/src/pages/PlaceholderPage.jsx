import React from 'react';
import Icon from '../components/Icon';

const pageConfigs = {
  '/dashboard': {
    title: 'Student Overview Dashboard',
    category: 'Core Workspace',
    icon: 'dashboard',
    badge: 'Live Operations',
    stats: [
      { label: 'Overall Attendance', value: '92.4%', change: '+1.2% vs last month', color: 'green' },
      { label: 'Current Semester GPA', value: '3.88', change: 'Top 5% Rank', color: 'cyan' },
      { label: 'Pending Tasks', value: '3 Due', change: 'Next: CS402 Assignment', color: 'amber' },
      { label: 'Registered Credits', value: '22 Hrs', change: 'Fall 2026 Cohort', color: 'purple' }
    ],
    cards: [
      {
        title: 'Today\'s Class Schedule',
        desc: '09:00 AM — CS401 Distributed Systems (Room 304B)\n11:30 AM — CS402 AI & Neural Networks (Lab 2)\n02:15 PM — Math301 Advanced Calculus (Auditorium C)',
        status: 'Active Now',
        icon: 'timetable'
      },
      {
        title: 'UniAI Quick Query',
        desc: 'Ask UniAI to summarize your upcoming exam schedule or draft a leave request.',
        status: 'Copilot Online',
        icon: 'uniAi'
      },
      {
        title: 'Latest Announcements',
        desc: 'Annual Tech Hackathon registration is open! Submissions close on Friday.',
        status: 'Campus Feed',
        icon: 'events'
      }
    ]
  },

  '/academics': {
    title: 'Academic Courses & Curricula',
    category: 'Academics',
    icon: 'academics',
    badge: 'Fall 2026',
    stats: [
      { label: 'Enrolled Courses', value: '6 Subjects', change: 'Full-time Status', color: 'blue' },
      { label: 'Total Credits Completed', value: '112 / 140', change: '80% Progress', color: 'purple' },
      { label: 'Major', value: 'CompSci', change: 'Honors Track', color: 'cyan' },
      { label: 'Advisor', value: 'Dr. Jenkins', change: 'Office Hours: Wed 2PM', color: 'green' }
    ],
    cards: [
      { title: 'CS401 — Distributed Systems', desc: 'Prof. Mark Davis • 4 Credits • Tue/Thu 09:00 AM', status: 'Enrolled', icon: 'academics' },
      { title: 'CS402 — Deep Learning Architecture', desc: 'Dr. Sarah Jenkins • 4 Credits • Mon/Wed 11:30 AM', status: 'Enrolled', icon: 'academics' },
      { title: 'CS405 — Cloud Native Infrastructure', desc: 'Prof. Alan Turing • 3 Credits • Fri 10:00 AM', status: 'Lab Unit', icon: 'academics' }
    ]
  },

  '/attendance': {
    title: 'Smart Attendance Tracker',
    category: 'Academics',
    icon: 'attendance',
    badge: 'Auto Sync',
    stats: [
      { label: 'Overall Attendance Rate', value: '92.4%', change: 'Safe (Requirement >75%)', color: 'green' },
      { label: 'Total Hours Attended', value: '148 / 160', change: '12 Hours Missed', color: 'blue' },
      { label: 'Medical Waivers', value: '2 Approved', change: 'Valid till Oct 2026', color: 'purple' },
      { label: 'Warning Status', value: 'None', change: 'All Subjects Safe', color: 'emerald' }
    ],
    cards: [
      { title: 'CS401 Distributed Systems', desc: 'Attended 28 of 30 lectures (93.3%)', status: 'Safe Status', icon: 'attendance' },
      { title: 'CS402 AI & Neural Networks', desc: 'Attended 26 of 28 lectures (92.8%)', status: 'Safe Status', icon: 'attendance' },
      { title: 'Math301 Advanced Calculus', desc: 'Attended 22 of 25 lectures (88.0%)', status: 'Attention Needed', icon: 'attendance' }
    ]
  },

  '/assignments': {
    title: 'Assignments & Submissions',
    category: 'Core Workspace',
    icon: 'assignments',
    badge: '3 Pending',
    stats: [
      { label: 'Pending Assignments', value: '3 Tasks', change: 'Next due in 2 days', color: 'amber' },
      { label: 'Graded Submissions', value: '18 Complete', change: 'Average 94%', color: 'green' },
      { label: 'Late Penalties', value: '0 Points', change: 'Punctual Record', color: 'cyan' },
      { label: 'Plagiarism Audit', value: 'Passed 100%', change: 'Turnitin Verified', color: 'purple' }
    ],
    cards: [
      { title: 'Assignment #4 — MapReduce Implementation', desc: 'Course: CS401 • Due: Aug 12, 11:59 PM • Max Score: 100 Pts', status: 'Pending', icon: 'assignments' },
      { title: 'Project Milestone 2 — Neural Net Model', desc: 'Course: CS402 • Due: Aug 15, 05:00 PM • Team Submission', status: 'In Progress', icon: 'assignments' }
    ]
  },

  '/exams': {
    title: 'Exams, Schedules & Grades',
    category: 'Academics',
    icon: 'exams',
    badge: 'Midterms Ahead',
    stats: [
      { label: 'Upcoming Midterms', value: '4 Exams', change: 'Starts Sept 01, 2026', color: 'rose' },
      { label: 'Hall Ticket Status', value: 'Issued', change: 'Download QR Verified', color: 'green' },
      { label: 'Seating Hall', value: 'Block B-201', change: 'Desk #42', color: 'purple' },
      { label: 'Cumulative GPA', value: '3.88 / 4.0', change: 'Rank #4 in Dept', color: 'cyan' }
    ],
    cards: [
      { title: 'Midterm — CS401 Distributed Systems', desc: 'Date: Sept 02, 2026 • Time: 10:00 AM • Venue: Hall B', status: 'Hall Ticket Ready', icon: 'exams' },
      { title: 'Midterm — CS402 AI & Neural Networks', desc: 'Date: Sept 04, 2026 • Time: 02:00 PM • Venue: Lab 3', status: 'Hall Ticket Ready', icon: 'exams' }
    ]
  },

  '/timetable': {
    title: 'Weekly Interactive Timetable',
    category: 'Schedule',
    icon: 'timetable',
    badge: 'Week 4',
    stats: [
      { label: 'Total Weekly Lectures', value: '18 Hours', change: 'Mon - Fri Schedule', color: 'blue' },
      { label: 'Lab Hours', value: '6 Hours', change: 'Tues & Thurs', color: 'purple' },
      { label: 'Free Time Slots', value: '12 Hours', change: 'Library Study Time', color: 'green' }
    ],
    cards: [
      { title: 'Monday', desc: '09:00 AM CS401 • 11:30 AM CS402 • 02:00 PM Math301', status: 'Schedule Active', icon: 'timetable' },
      { title: 'Tuesday', desc: '10:00 AM Lab 2 CS402 • 02:15 PM CS405 Cloud Systems', status: 'Schedule Active', icon: 'timetable' }
    ]
  },

  '/calendar': {
    title: 'Academic Calendar & Events',
    category: 'Schedule',
    icon: 'calendar',
    badge: 'Term 2026',
    stats: [
      { label: 'Instruction Days Left', value: '42 Days', change: 'Fall Semester', color: 'cyan' },
      { label: 'Upcoming Holidays', value: 'Labor Day', change: 'Sept 07, 2026', color: 'amber' }
    ],
    cards: [
      { title: 'Midterm Examination Window', desc: 'Sept 01 - Sept 10, 2026 • All Departments', status: 'Official Date', icon: 'calendar' },
      { title: 'University Annual Tech Fest', desc: 'Oct 15 - Oct 17, 2026 • Main Campus Stadium', status: 'Major Event', icon: 'events' }
    ]
  },

  '/campus': {
    title: 'Campus Life & Community Feed',
    category: 'Campus Experience',
    icon: 'campus',
    badge: 'Community',
    stats: [
      { label: 'Active Facilities', value: '24 / 24', change: 'Library & Gym Open', color: 'green' },
      { label: 'Campus Shuttle', value: 'On Route', change: 'Next Arrival: 4 min', color: 'blue' }
    ],
    cards: [
      { title: 'Central Library Extended Hours', desc: 'Starting next week, the 3rd floor quiet zone will be open 24/7.', status: 'Facility Update', icon: 'campus' },
      { title: 'Cafeteria Special Menu', desc: 'Organic smoothie bar and Asian street food corner open in Student Union.', status: 'Campus Food', icon: 'campus' }
    ]
  },

  '/events': {
    title: 'University Events & Fests',
    category: 'Campus Experience',
    icon: 'events',
    badge: '2 New Fests',
    stats: [
      { label: 'Upcoming Fests', value: '3 Major Fests', change: 'Hackathon, Cultural, Sports', color: 'purple' },
      { label: 'My Event RSVPs', value: '2 Registered', change: 'Passes Generated', color: 'green' }
    ],
    cards: [
      { title: 'UniHack 2026 — 36hr AI Hackathon', desc: 'Prizes worth $25,000 • Sept 20-22 • Auditorium A', status: 'RSVP Open', icon: 'events' },
      { title: 'Robotics Workshop & Drone Expo', desc: 'Organized by IEEE Student Chapter • Aug 28 • Ground 2', status: 'RSVP Open', icon: 'events' }
    ]
  },

  '/clubs': {
    title: 'Societies & Student Clubs',
    category: 'Campus Experience',
    icon: 'clubs',
    badge: '32 Societies',
    stats: [
      { label: 'Joined Societies', value: '2 Clubs', change: 'Coding Club & Music Society', color: 'blue' },
      { label: 'Leadership Roles', value: 'Tech Lead', change: 'ACM Chapter', color: 'purple' }
    ],
    cards: [
      { title: 'ACM Student Chapter', desc: 'Weekly coding contests, algorithm discussions, and guest lectures.', status: 'Active Member', icon: 'clubs' },
      { title: 'Design & UX Guild', desc: 'Figma workshops, UI critique sessions, and product design sprints.', status: 'Open Member', icon: 'clubs' }
    ]
  },

  '/campus-map': {
    title: 'Interactive Campus Navigation Map',
    category: 'Campus Experience',
    icon: 'campusMap',
    badge: 'GPS Wayfinding',
    stats: [
      { label: 'Current Sector', value: 'Engineering North', change: 'Building B3', color: 'cyan' },
      { label: 'Live Bus Route', value: 'Line #2 Active', change: 'Campus Circle', color: 'green' }
    ],
    cards: [
      { title: 'Interactive Map Viewport', desc: '3D Building Layouts, Cafeterias, Wi-Fi Hotspots, and Parking Zones mockup.', status: 'Map Render Ready', icon: 'campusMap' }
    ]
  },

  '/complaints': {
    title: 'Grievance & Helpdesk Desk',
    category: 'Campus Experience',
    icon: 'complaints',
    badge: 'Support',
    stats: [
      { label: 'Open Tickets', value: '1 Ticket', change: 'Hostel Wi-Fi Speed', color: 'amber' },
      { label: 'Resolved Tickets', value: '8 Tickets', change: 'Avg Resolution: 4 hrs', color: 'green' }
    ],
    cards: [
      { title: 'Ticket #4092 — Hostel B Room 304 Wi-Fi Latency', desc: 'Status: Assigned to IT Support Team • Category: Network Infrastructure', status: 'In Progress', icon: 'complaints' }
    ]
  },

  '/uni-ai': {
    title: 'UniAI Copilot Assistant',
    category: 'AI & Services',
    icon: 'uniAi',
    badge: 'LLM Kernel Active',
    stats: [
      { label: 'AI Model', value: 'UniAI v3.6', change: 'Fine-tuned on Campus Knowledge', color: 'cyan' },
      { label: 'Queries Solved', value: '142 Prompt Runs', change: '100% Accuracy Rating', color: 'green' }
    ],
    cards: [
      { title: 'Suggested Copilot Prompts', desc: '"Summarize my lecture notes for CS401"\n"Where is my next class held?"\n"What is my attendance requirement in Math301?"', status: 'Ready for Prompt', icon: 'uniAi' }
    ]
  },

  '/digital-id': {
    title: 'Digital Student ID Card',
    category: 'AI & Services',
    icon: 'digitalId',
    badge: 'QR Verified',
    stats: [
      { label: 'ID Card Status', value: 'Active & Verified', change: 'Valid for 2026-2027', color: 'green' },
      { label: 'NFC Pass', value: 'Synced', change: 'Apple Wallet / Google Pay Ready', color: 'purple' }
    ],
    cards: [
      { title: 'UniFlow X Pass Holder', desc: 'Name: Alex Vance • ID: CS2026-08492 • Department: Computer Science • Barcode & Encrypted QR Pass Validated', status: 'Pass Active', icon: 'digitalId' }
    ]
  },

  '/notifications': {
    title: 'Notification Center',
    category: 'AI & Services',
    icon: 'notifications',
    badge: '5 Unread',
    stats: [
      { label: 'Unread Alerts', value: '5 Notifications', change: '2 High Priority', color: 'rose' },
      { label: 'Push Sync', value: 'Enabled', change: 'Web + Mobile', color: 'green' }
    ],
    cards: [
      { title: 'Assignment Alert', desc: 'CS401 Assignment #4 is due in 48 hours. Submit your code repo link.', status: 'Academic Alert', icon: 'notifications' },
      { title: 'Attendance Logged', desc: 'Prof. Jenkins marked your attendance for CS402 (Present).', status: 'System Update', icon: 'notifications' }
    ]
  },

  '/profile': {
    title: 'User Profile & Academic Record',
    category: 'Account',
    icon: 'profile',
    badge: 'Verified Identity',
    stats: [
      { label: 'Student Name', value: 'Alex Vance', change: 'NetID: avance26', color: 'blue' },
      { label: 'Program', value: 'B.Tech CompSci', change: 'Class of 2026', color: 'purple' }
    ],
    cards: [
      { title: 'Contact Information', desc: 'Email: alex.vance@university.edu • Phone: +1 (555) 019-2831 • Emergency Contact Registered', status: 'Verified', icon: 'profile' }
    ]
  },

  '/settings': {
    title: 'System Preferences & Settings',
    category: 'Account',
    icon: 'settings',
    badge: 'Config Mode',
    stats: [
      { label: 'Theme Mode', value: 'Neon Cyber Dark', change: 'System Default', color: 'cyan' },
      { label: 'Security', value: '2FA Enabled', change: 'Hardware Key Linked', color: 'green' }
    ],
    cards: [
      { title: 'Appearance & Interface', desc: 'Customize contrast levels, font scale, accent glow colors, and desktop sidebar behaviors.', status: 'Configured', icon: 'settings' }
    ]
  },

  '/faculty': {
    title: 'Faculty Operations Portal',
    category: 'Role Portal',
    icon: 'faculty',
    badge: 'Professor Mode',
    stats: [
      { label: 'Courses Taught', value: '3 Sections', change: 'Total 140 Students', color: 'purple' },
      { label: 'Attendance Logger', value: '98% Recorded', change: 'Today\'s Classes Complete', color: 'green' },
      { label: 'Grading Queue', value: '12 Papers Left', change: 'CS402 Midterm Exam', color: 'amber' }
    ],
    cards: [
      { title: 'Quick Faculty Actions', desc: 'Mark Class Attendance • Submit Course Letter Grades • Publish Syllabus Notice • Schedule Extra Office Hours', status: 'Faculty Tool', icon: 'faculty' }
    ]
  },

  '/admin': {
    title: 'University Admin Control Center',
    category: 'Role Portal',
    icon: 'admin',
    badge: 'Root Governance',
    stats: [
      { label: 'System Health', value: '100% Operational', change: 'Microservices & Database', color: 'green' },
      { label: 'Active Users', value: '14,280 Online', change: 'Web & Mobile Apps', color: 'cyan' },
      { label: 'Server Load', value: '14% CPU', change: 'FastAPI Cluster Peak', color: 'blue' }
    ],
    cards: [
      { title: 'Admin Controls', desc: 'Manage User Roles • Audit Security Logs • Trigger System Backup • Configure Academic Semesters', status: 'SuperAdmin Access', icon: 'admin' }
    ]
  }
};

export function PlaceholderPage({ routePath }) {
  const path = routePath || window.location.pathname;
  const config = pageConfigs[path] || {
    title: 'UniFlow X Feature Module',
    category: 'Application Shell',
    icon: 'dashboard',
    badge: 'Placeholder Shell',
    stats: [{ label: 'Status', value: 'Active Module', change: 'Prompt 02 Ready', color: 'cyan' }],
    cards: [{ title: 'Module Initialized', desc: 'This route is active in the UniFlow X application router.', status: 'Ready', icon: 'sparkles' }]
  };

  return (
    <div className="placeholder-page">
      {/* Top Banner Widget */}
      <div className="placeholder-banner glass-panel">
        <div className="banner-left">
          <div className="banner-icon-box">
            <Icon name={config.icon} size={32} />
          </div>
          <div>
            <span className="badge badge-meta">{config.category}</span>
            <h2 className="banner-title">{config.title}</h2>
            <p className="banner-desc">
              Connected shell view for route <code>{path}</code>. Responsive layout verified.
            </p>
          </div>
        </div>

        <div className="banner-right">
          <span className="badge badge-status">
            <span className="pulse-dot green" />
            <span>{config.badge}</span>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      {config.stats && (
        <div className="metrics-grid">
          {config.stats.map((stat, idx) => (
            <div key={idx} className="metric-card glass-panel">
              <span className="metric-label">{stat.label}</span>
              <div className={`metric-value text-${stat.color}`}>{stat.value}</div>
              <div className="metric-change">{stat.change}</div>
            </div>
          ))}
        </div>
      )}

      {/* Cards Row */}
      <div className="placeholder-cards-grid">
        {config.cards &&
          config.cards.map((card, idx) => (
            <div key={idx} className="feature-item-card glass-panel">
              <div className="card-top-row">
                <Icon name={card.icon || config.icon} size={20} className="card-item-icon" />
                <span className="badge badge-subtle">{card.status}</span>
              </div>
              <h3 className="card-item-title">{card.title}</h3>
              <p className="card-item-desc">{card.desc}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlaceholderPage;
