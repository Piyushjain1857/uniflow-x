// Comprehensive Mock Data Engine for UniFlow X (V8 Rebuild)
export const mockData = {
  student: {
    name: 'Piyush',
    fullName: 'Piyush Jain',
    greetingMuted: 'Good morning,',
    greetingBold: 'Piyush 👋',
    dateFormatted: 'Monday — 10 August',
    subheading: "Here's what's happening at your university today.",
    program: 'B.Tech Computer Science & Engineering',
    programShort: 'B.Tech CSE',
    semester: 'Semester 8',
    semesterShort: 'Sem 4',
    email: 'piyush.jain@university.edu',
    avatarInitials: 'PJ',
    overallGpa: '3.85',
    totalCredits: 82,
    maxCredits: 120,
    rollNumber: 'CS2022/ECN/21021',
    unreadNotifications: 3,
  },

  statCards: [
    { id: 'gpa', label: 'GPA', value: '3.85 / 4.0', sub: 'Excellent', icon: 'academics', color: 'primary' },
    { id: 'attendance', label: 'Attendance', value: '82%', sub: 'Good', icon: 'attendance', color: 'emerald' },
    { id: 'pending', label: 'Pending Tasks', value: '5', sub: 'Due Soon', icon: 'assignments', color: 'amber' },
    { id: 'credits', label: 'Credits Earned', value: '82 / 120', sub: 'Min Complete', icon: 'sparkles', color: 'purple' },
  ],

  nextClass: {
    subject: 'Data Structures',
    code: 'CS201',
    faculty: 'Dr. Aris Thorne',
    time: '09:00 AM',
    room: 'Room 204',
    countdown: 'Starts in 24 minutes',
    status: 'Upcoming',
  },

  attendance: {
    overallPercentage: 82,
    statusText: 'Good standing',
    attendedClasses: 41,
    totalClasses: 50,
    absentClasses: 9,
    missableClassesText: 'You can miss 2 more classes before reaching 75%.',
    subjects: [
      { id: 'ds', name: 'Data Structures', code: 'CS201', faculty: 'Dr. Aris Thorne', percentage: 82, present: 28, absent: 6, total: 34 },
      { id: 'dm', name: 'Discrete Mathematics', code: 'MA202', faculty: 'Prof. Elena Rostova', percentage: 76, present: 22, absent: 7, total: 29 },
      { id: 'wd', name: 'Web Development', code: 'CS204', faculty: 'Dr. Marcus Vance', percentage: 91, present: 29, absent: 3, total: 32 },
      { id: 'ss', name: 'System Security', code: 'CS401', faculty: 'Prof. Sarah Jenkins', percentage: 88, present: 30, absent: 4, total: 34 },
      { id: 'ai', name: 'AI & ML Basics', code: 'CS501', faculty: 'Dr. Mark Davis', percentage: 65, present: 18, absent: 10, total: 28 },
    ],
  },

  todayTimeline: [
    { id: 't1', time: '09:00 AM', subject: 'Data Structures (CS201)', room: 'Room 204', faculty: 'Dr. Aris Thorne', color: '#6366F1', isNow: true },
    { id: 't2', time: '11:00 AM', subject: 'Discrete Mathematics (MA202)', room: 'Room 302', faculty: 'Prof. Elena Rostova', color: '#F59E0B' },
    { id: 't3', time: '01:00 PM', subject: 'Web Development (CS204)', room: 'Lab 3', faculty: 'Dr. Marcus Vance', color: '#10B981' },
    { id: 't4', time: '03:00 PM', subject: 'System Security (CS401)', room: 'Room 401', faculty: 'Prof. Sarah Jenkins', color: '#EF4444' },
  ],

  attentionRows: [
    { id: 'att-1', title: 'Assignment due tomorrow', sub: 'React Authentication — CS204 Web Development', link: '/assignments' },
    { id: 'att-2', title: 'Attendance below target', sub: 'Discrete Mathematics (MA202) is currently at 76%', link: '/attendance' },
    { id: 'att-3', title: 'New university notice', sub: 'Central Library hours extended for Midterm Examinations', link: '/notifications' },
  ],

  upcomingCampusEvents: [
    { id: 'ev-1', title: 'UniHack 2026 Hackathon', date: 'Aug 15 - 16', time: '09:00 AM', location: 'Innovation Hub', category: 'Tech Fest' },
    { id: 'ev-2', title: 'AI & Quantum Computing Keynote', date: 'Aug 18', time: '02:00 PM', location: 'Main Auditorium', category: 'Lecture' },
    { id: 'ev-3', title: 'Annual Campus Cultural Fest', date: 'Aug 22 - 24', time: '05:00 PM', location: 'Campus Grounds', category: 'Cultural' },
  ],

  assignmentsList: [
    { id: 'asg-1', title: 'React Authentication', subject: 'CS204 Web Development', dueDate: 'Tomorrow', dueDateFull: 'Aug 14, 2026', marks: 20, status: 'Upcoming' },
    { id: 'asg-2', title: 'AVL Tree Rotations', subject: 'CS201 Data Structures', dueDate: 'Aug 14, 2026', dueDateFull: 'Aug 14, 2026', marks: 50, status: 'Upcoming' },
    { id: 'asg-3', title: 'System Security Audit', subject: 'CS401 System Security', dueDate: 'Aug 20, 2026', dueDateFull: 'Aug 20, 2026', marks: 30, status: 'Upcoming' },
    { id: 'asg-4', title: 'Math Problem Set 3', subject: 'MA202 Discrete Math', dueDate: 'Aug 22, 2026', dueDateFull: 'Aug 22, 2026', marks: 50, status: 'Upcoming' },
    { id: 'asg-5', title: 'AI Model Report', subject: 'CS501 AI & ML Basics', dueDate: 'Aug 25, 2026', dueDateFull: 'Aug 25, 2026', marks: 40, status: 'Upcoming' },
    { id: 'asg-6', title: 'Docker Containerization', subject: 'CS208 Cloud Computing', dueDate: 'Submitted Aug 04', dueDateFull: 'Aug 04, 2026', marks: 100, status: 'Submitted' },
    { id: 'asg-7', title: 'Graph Theory Proofs', subject: 'MA202 Discrete Math', dueDate: 'Overdue Jul 28', dueDateFull: 'Jul 28, 2026', marks: 30, status: 'Overdue' },
  ],

  academicsRoster: [
    { subject: 'Data Structures', code: 'CS201', faculty: 'Dr. Aris Thorne', attendance: '82%', nextClass: 'Today 09:00 (204)', assignments: '1 Pending', assignmentStatus: 'pending' },
    { subject: 'Discrete Mathematics', code: 'MA202', faculty: 'Prof. Elena Rostova', attendance: '76%', nextClass: 'Today 11:00 (302)', assignments: '1 Due Tomorrow', assignmentStatus: 'warning' },
    { subject: 'Web Development', code: 'CS204', faculty: 'Dr. Marcus Vance', attendance: '91%', nextClass: 'Today 14:00 (Lab 3)', assignments: '1 Due Tomorrow', assignmentStatus: 'warning' },
    { subject: 'System Security', code: 'CS401', faculty: 'Prof. Sarah Jenkins', attendance: '88%', nextClass: 'Aug 12, 10:00 (401)', assignments: '1 Pending', assignmentStatus: 'pending' },
    { subject: 'AI & ML Basics', code: 'CS501', faculty: 'Dr. Mark Davis', attendance: '65%', nextClass: 'Aug 12, 13:00 (Lab 5)', assignments: '2 Pending', assignmentStatus: 'danger' },
  ],

  gpaTrend: [
    { semester: 'Sem 1', gpa: 3.4 },
    { semester: 'Sem 2', gpa: 3.5 },
    { semester: 'Sem 3', gpa: 3.6 },
    { semester: 'Sem 4', gpa: 3.7 },
    { semester: 'Sem 5', gpa: 3.8 },
    { semester: 'Sem 6', gpa: 3.85 },
  ],

  recentMarkedClasses: [
    { date: 'Today, 09 Aug', subject: 'Data Structures (CS201)', faculty: 'Dr. Aris Thorne', status: 'Present' },
    { date: 'Today, 09 Aug', subject: 'Discrete Mathematics (MA202)', faculty: 'Prof. Elena Rostova', status: 'Present' },
    { date: 'Today, 11 Aug', subject: 'Web Development (CS204)', faculty: 'Dr. Marcus Vance', status: 'Present' },
  ],

  announcement: {
    tag: 'ANNOUNCEMENT',
    title: 'Tech Fest 2026',
    description: '3-day tech festival, register now. Explore Keynotes, Workshops, Hackathons & more.',
    cta: 'View Details',
    date: 'Aug 20-22',
    author: 'Event Committee · Renu K.',
  },

  aiSuggestedPrompts: [
    "What's on my schedule today?",
    'Which assignments are due?',
    'Can I miss my next class?',
    'Plan my study week.',
  ],

  timetableWeek: {
    Monday: [
      { time: '09:00 AM', endTime: '10:30 AM', subject: 'Data Structures', code: 'CS201', room: 'Room 204', faculty: 'Dr. Aris Thorne', color: '#6366F1', duration: '2h 15m', tag: 'New' },
      { time: '11:00 AM', endTime: '12:30 PM', subject: 'Discrete Mathematics', code: 'MA202', room: 'Room 302', faculty: 'Prof. Elena Rostova', color: '#F59E0B', duration: '2h 15m' },
      { time: '01:00 PM', endTime: '02:30 PM', subject: 'Web Development', code: 'CS204', room: 'Lab 3', faculty: 'Dr. Marcus Vance', color: '#10B981', duration: '2h' },
      { time: '04:00 PM', endTime: '05:30 PM', subject: 'System Security', code: 'CS401', room: 'Room 401', faculty: 'Prof. Sarah Jenkins', color: '#EF4444', duration: '1h 30m' },
      { time: '06:00 PM', endTime: '07:00 PM', subject: 'AI & ML Basics', code: 'CS501', room: 'Lab 5', faculty: 'Dr. Mark Davis', color: '#8B5CF6', duration: '1h 30m' },
    ],
    Tuesday: [
      { time: '10:00 AM', endTime: '11:30 AM', subject: 'Cloud Computing', code: 'CS405', room: 'Lab 4', faculty: 'Prof. Mark Davis', color: '#06B6D4', duration: '2h' },
      { time: '01:30 PM', endTime: '03:00 PM', subject: 'Data Structures', code: 'CS201', room: 'Room 204', faculty: 'Dr. Aris Thorne', color: '#6366F1', duration: '2h' },
    ],
    Wednesday: [
      { time: '09:00 AM', endTime: '10:30 AM', subject: 'AI & Neural Networks', code: 'CS402', room: 'Room 201', faculty: 'Dr. Sarah Jenkins', color: '#F59E0B', duration: '2h' },
      { time: '11:00 AM', endTime: '12:30 PM', subject: 'Discrete Mathematics', code: 'MA202', room: 'Room 302', faculty: 'Prof. Elena Rostova', color: '#10B981', duration: '2h' },
    ],
    Thursday: [
      { time: '10:00 AM', endTime: '12:00 PM', subject: 'Cloud Systems Lab', code: 'CS405', room: 'Lab 4', faculty: 'Prof. Mark Davis', color: '#06B6D4', duration: '2h' },
      { time: '02:00 PM', endTime: '03:30 PM', subject: 'AI & Neural Networks', code: 'CS402', room: 'Room 201', faculty: 'Dr. Sarah Jenkins', color: '#F59E0B', duration: '2h' },
    ],
    Friday: [
      { time: '09:30 AM', endTime: '11:00 AM', subject: 'Discrete Mathematics', code: 'MA202', room: 'Room 302', faculty: 'Prof. Elena Rostova', color: '#10B981', duration: '2h' },
      { time: '02:00 PM', endTime: '04:00 PM', subject: 'Research Seminar', code: 'SEM101', room: 'Main Auditorium', faculty: 'Guest Speaker', color: '#8B5CF6', duration: '2h' },
    ],
  },
};

export default mockData;
