import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
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
  EmptyState,
  ErrorState,
  LoadingState,
  StatCard,
  Timeline,
  DataTable,
} from '../components/ui';
import Icon from '../components/Icon';

export function DesignSystemShowcase() {
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [inputValue, setInputValue] = useState('');
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

  return (
    <div className="showcase-page" style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header & Theme Control */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <Badge variant="primary" size="md">Design Tokens & Component Kit</Badge>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '0.4rem' }}>
            UniFlow X Web Design System
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            24 Reusable, Accessible, Keyboard-Friendly React UI Components
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

      {/* Main Category Tabs */}
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
        style={{ marginBottom: '2rem' }}
      />

      {/* 1. Buttons & Badges */}
      {(activeTab === 'overview' || activeTab === 'forms') && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>1. Buttons & Badges</h2>
          <Card>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <Button variant="primary" icon="sparkles">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger" icon="alertTriangle">Danger</Button>
                <Button variant="success" icon="checkCircle">Success</Button>
                <Button variant="primary" isLoading>Loading</Button>
                <Button variant="primary" isDisabled>Disabled</Button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <Badge variant="primary" hasDot>Primary Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success" hasDot>Success</Badge>
                <Badge variant="warning" hasDot>Warning</Badge>
                <Badge variant="danger" hasDot>Danger</Badge>
                <Badge variant="info">Info Badge</Badge>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar name="Alex Vance" size="sm" status="online" />
                <Avatar name="Sarah Jenkins" size="md" status="online" />
                <Avatar name="Mark Davis" size="lg" status="away" />
                <Avatar name="Turing" size="xl" status="busy" />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 2. Inputs & Form Controls */}
      {(activeTab === 'overview' || activeTab === 'forms') && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>2. Form Controls & Inputs</h2>
          <Card>
            <CardContent style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <Input
                label="University Email"
                placeholder="netid@university.edu"
                startIcon="profile"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Enter your official campus ID"
              />

              <Select
                label="Department"
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
            </CardContent>
          </Card>
        </section>
      )}

      {/* 3. Overlays & Dialogs */}
      {(activeTab === 'overview' || activeTab === 'overlays') && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>3. Overlays, Dialogs & Popovers</h2>
          <Card>
            <CardContent style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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
            </CardContent>
          </Card>
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
        <p style={{ color: 'var(--text-muted)' }}>
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
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Slide-out panel for navigation or detailed item inspection.
        </p>
        <Alert variant="info" title="Drawer Tip">
          You can close this drawer by pressing Escape or clicking outside.
        </Alert>
      </Drawer>

      {/* 4. Feedback & States */}
      {(activeTab === 'overview' || activeTab === 'data') && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>4. Feedback & State Components</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <Alert variant="info" title="System Announcement">
              Fall 2026 course registration closes on Friday.
            </Alert>
            <Alert variant="success" title="Grade Verified">
              CS401 Final Exam score published (Grade A).
            </Alert>
          </div>

          <Card style={{ marginTop: '1.5rem' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Progress value={75} max={100} label="Semester Progress" showValue variant="primary" />
              <Progress value={92} max={100} label="Attendance Threshold" showValue variant="success" />

              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Loading Skeletons:</p>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rect" height="60px" style={{ marginTop: '6px' }} />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 5. Data & Analytics */}
      {(activeTab === 'overview' || activeTab === 'data') && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>5. Analytics & Data Tables</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <StatCard label="Total Enrolled" value="15,420" change="+4.2% vs last term" changeType="positive" icon="profile" color="primary" />
            <StatCard label="Attendance Rate" value="92.4%" change="Safe Status" changeType="positive" icon="attendance" color="emerald" />
            <StatCard label="Open Tickets" value="12 Tasks" change="-3 resolved today" changeType="positive" icon="complaints" color="amber" />
          </div>

          <Card style={{ marginBottom: '1.5rem' }}>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline items={timelineItems} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Roster Data Table</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={sampleData} pageSize={3} />
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}

export default DesignSystemShowcase;
