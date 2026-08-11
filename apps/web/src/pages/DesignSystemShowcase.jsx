import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Badge,
  Avatar,
  Modal,
  Drawer,
  Dropdown,
  Tabs,
  Tooltip,
  useToast,
  Alert,
  Skeleton,
  Progress,
  StatCard,
  Timeline,
  DataTable,
} from '../components/ui';

export function DesignSystemShowcase() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [inputValue, setInputValue] = useState('netid@university.edu');
  const [focusedInputValue, setFocusedInputValue] = useState('Type something...');
  const [selectValue, setSelectValue] = useState('cs');
  const { addToast } = useToast();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const sampleData = [
    { id: 1, name: 'Alex Vance', role: 'Student', dept: 'CS', gpa: '3.88', status: 'Active' },
    { id: 2, name: 'Dr. Sarah Jenkins', role: 'Faculty', dept: 'AI Lab', gpa: 'N/A', status: 'Active' },
    { id: 3, name: 'Prof. Mark Davis', role: 'Faculty', dept: 'Systems', gpa: 'N/A', status: 'On Leave' },
    { id: 4, name: 'Elena Rostova', role: 'Student', dept: 'ECE', gpa: '3.95', status: 'Active' },
    { id: 5, name: 'Liam Chen', role: 'Student', dept: 'Math', gpa: '3.72', status: 'Graduated' },
  ];

  const columns = [
    { key: 'name', title: 'Member Name', sortable: true },
    { key: 'role', title: 'User Role', sortable: true },
    { key: 'dept', title: 'Department', sortable: true },
    { key: 'gpa', title: 'GPA Score', sortable: true },
    {
      key: 'status',
      title: 'Status',
      render: (val) => (
        <Badge variant={val === 'Active' ? 'success' : val === 'On Leave' ? 'warning' : 'secondary'}>
          {val}
        </Badge>
      ),
    },
  ];

  const timelineItems = [
    { title: 'Project Charter Approved', timestamp: '10:00 AM', description: 'Architecture verified by faculty committee.' },
    { title: 'Database Migration Completed', timestamp: '11:30 AM', description: 'Alembic revision #4092 applied.' },
    { title: 'System Security Audit Passed', timestamp: '02:00 PM', description: 'Zero high severity vulnerabilities found.' },
  ];

  const colorTokens = [
    { name: 'Primary Accent', hex: '#6366F1', varName: '--accent' },
    { name: 'Background', hex: '#0B0D12', varName: '--bg' },
    { name: 'Surface Card', hex: '#11141C', varName: '--surface' },
    { name: 'Surface Secondary', hex: '#151923', varName: '--surface-2' },
    { name: 'Success Green', hex: '#2DD4A3', varName: '--success' },
    { name: 'Warning Amber', hex: '#F5B942', varName: '--warning' },
    { name: 'Danger Red', hex: '#F04455', varName: '--danger' },
  ];

  return (
    <div className="showcase-page" style={{ padding: '44px 48px 96px', maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header & Theme Switcher */}
      <div className="v8-page-header">
        <div>
          <Badge variant="primary" size="md">Design Tokens & Component Kit</Badge>
          <h1 className="v8-page-title" style={{ fontSize: '2.4rem', marginTop: '0.6rem' }}>
            UniFlow X Web Design System
          </h1>
          <p className="v8-page-sub">
            UI components, accessibility patterns, and design tokens for university operations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Switch
            label={`${theme.toUpperCase()} THEME`}
            checked={theme === 'light'}
            onChange={toggleTheme}
          />
        </div>
      </div>

      {/* Main Category Filter Tabs */}
      <Tabs
        variant="pill"
        activeTab={activeTab}
        onChange={setActiveTab}
        items={[
          { id: 'overview', label: 'All Components', icon: 'sparkles' },
          { id: 'forms', label: 'Form Controls', icon: 'profile' },
          { id: 'overlays', label: 'Overlays & Dialogs', icon: 'settings' },
          { id: 'data', label: 'Data & Analytics', icon: 'dashboard' },
        ]}
        style={{ marginBottom: '2.5rem' }}
      />

      {/* 0. Color Tokens & Swatches */}
      {(activeTab === 'overview') && (
        <section className="v8-section">
          <div className="v8-section-header">
            <h3 className="v8-section-label">DESIGN SYSTEM TOKENS</h3>
          </div>
          <div className="v8-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px' }}>
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      height: '48px',
                      borderRadius: '8px',
                      background: `var(${token.varName})`,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                  <div>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text)', display: 'block' }}>
                      {token.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {token.varName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 1. Buttons & Badges */}
      {(activeTab === 'overview' || activeTab === 'forms') && (
        <section className="v8-section">
          <div className="v8-section-header">
            <h3 className="v8-section-label">1. BUTTONS, BADGES & AVATARS</h3>
          </div>
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">Interactive Button States & Variants</h3>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                <Button variant="primary" icon="sparkles">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger" icon="alertTriangle">Danger</Button>
                <Button variant="success" icon="checkCircle">Success</Button>
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="primary" isDisabled>Disabled</Button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                <Badge variant="primary" hasDot>Primary Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success" hasDot>Success</Badge>
                <Badge variant="warning" hasDot>Warning</Badge>
                <Badge variant="danger" hasDot>Danger</Badge>
                <Badge variant="info">Info Badge</Badge>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Avatar name="Alex Vance" size="sm" status="online" />
                <Avatar name="Sarah Jenkins" size="md" status="online" />
                <Avatar name="Mark Davis" size="lg" status="away" />
                <Avatar name="Turing" size="xl" status="busy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Inputs & Form Controls */}
      {(activeTab === 'overview' || activeTab === 'forms') && (
        <section className="v8-section">
          <div className="v8-section-header">
            <h3 className="v8-section-label">2. FORM CONTROLS & INPUTS</h3>
          </div>
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">Form Input Fields, Toggles & Checkboxes</h3>
            </div>
            <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <Input
                label="Default Input"
                placeholder="Type something..."
                startIcon="profile"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Enter your official campus ID"
              />

              <Input
                label="Focused State Input"
                placeholder="Type something..."
                startIcon="search"
                value={focusedInputValue}
                onChange={(e) => setFocusedInputValue(e.target.value)}
                helperText="Active input state demo"
              />

              <Select
                label="Department Select"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                startIcon="academics"
                options={[
                  { value: 'cs', label: 'Computer Science & Eng' },
                  { value: 'ee', label: 'Electrical Engineering' },
                  { value: 'math', label: 'Mathematics & Stats' },
                ]}
              />

              <Checkbox
                label="Enable Real-Time Notifications"
                description="Receive instant alerts for assignments & grades"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />

              <Switch
                label="Academic Integrity Charter"
                description="Agreed to computing code of conduct"
                checked={switchChecked}
                onChange={(e) => setSwitchChecked(e.target.checked)}
              />

              <div style={{ gridColumn: '1 / -1' }}>
                <Textarea
                  label="Course Feedback / Complaint"
                  placeholder="Describe any issues or feedback..."
                  maxLength={200}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Overlays & Dialogs */}
      {(activeTab === 'overview' || activeTab === 'overlays') && (
        <section className="v8-section">
          <div className="v8-section-header">
            <h3 className="v8-section-label">3. OVERLAYS, DIALOGS & TOASTS</h3>
          </div>
          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">Modals, Drawers, Dropdowns & Tooltips</h3>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Open Modal Dialog
              </Button>

              <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
                Open Slide Drawer
              </Button>

              <Dropdown
                trigger={<Button variant="outline" iconRight="chevronRight">Dropdown Menu</Button>}
                items={[
                  { id: '1', label: 'View Profile', icon: 'profile' },
                  { id: '2', label: 'System Settings', icon: 'settings' },
                  { id: '3', label: 'Sign Out Session', icon: 'close', danger: true },
                ]}
              />

              <Tooltip content="Tooltip helper text on hover or focus!" position="top">
                <Button variant="ghost">Hover Tooltip</Button>
              </Tooltip>

              <Button
                variant="success"
                onClick={() =>
                  addToast({ title: 'Toast Notification', message: 'Action executed successfully!', type: 'success' })
                }
              >
                Trigger Success Toast
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="UniFlow X System Dialog"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm Action</Button>
          </>
        }
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          This is an accessible modal dialog with backdrop blur, Esc key handling, and focus trapping.
        </p>
      </Modal>

      {/* Drawer Demo */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Side Navigation Drawer"
        position="right"
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Slide-out panel for navigation or detailed item inspection.
        </p>
        <Alert variant="info" title="Drawer Tip">
          You can close this drawer by pressing Escape or clicking outside.
        </Alert>
      </Drawer>

      {/* 4. Feedback & States */}
      {(activeTab === 'overview' || activeTab === 'data') && (
        <section className="v8-section">
          <div className="v8-section-header">
            <h3 className="v8-section-label">4. FEEDBACK & STATE COMPONENTS</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <Alert variant="info" title="System Announcement">
              Fall 2026 course registration closes on Friday.
            </Alert>
            <Alert variant="success" title="Grade Verified">
              CS401 Final Exam score published (Grade A).
            </Alert>
          </div>

          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">Progress Bars & Loading Skeletons</h3>
            </div>
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Progress value={75} max={100} label="Semester Progress" showValue variant="primary" />
              <Progress value={92} max={100} label="Attendance Threshold" showValue variant="success" />

              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 700 }}>Loading Skeletons:</p>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rect" height="60px" style={{ marginTop: '8px' }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Data & Analytics */}
      {(activeTab === 'overview' || activeTab === 'data') && (
        <section className="v8-section">
          <div className="v8-section-header">
            <h3 className="v8-section-label">5. ANALYTICS & DATA TABLES</h3>
          </div>
          <div className="v8-stat-row" style={{ marginBottom: '24px' }}>
            <StatCard label="Total Enrolled" value="15,420" change="+4.2% vs last term" changeType="positive" icon="profile" color="primary" />
            <StatCard label="Attendance Rate" value="92.4%" change="Safe Status" changeType="positive" icon="attendance" color="emerald" />
            <StatCard label="Open Tickets" value="12 Tasks" change="-3 resolved today" changeType="positive" icon="complaints" color="amber" />
          </div>

          <div className="v8-panel" style={{ marginBottom: '24px' }}>
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">Activity Timeline</h3>
            </div>
            <div style={{ padding: '20px' }}>
              <Timeline items={timelineItems} />
            </div>
          </div>

          <div className="v8-panel">
            <div className="v8-panel-header">
              <h3 className="v8-panel-title">Department Roster Data Table</h3>
            </div>
            <div style={{ padding: '16px' }}>
              <DataTable columns={columns} data={sampleData} pageSize={3} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default DesignSystemShowcase;
