// Structured API-ready mock data for Student Dashboard preview
export const dashboardMockData = {
  studentInfo: {
    name: 'Alex Vance',
    greeting: 'Good Morning, Alex 👋',
    role: 'Senior • Computer Science',
    department: 'School of Engineering',
    avatarInitials: 'AV',
    unreadNotificationsCount: 3,
    currentSemester: 'Fall Semester 2026',
    todayDateFormatted: 'Monday, August 10, 2026',
  },

  nextClass: {
    code: 'CS401',
    subject: 'Distributed Systems & Cloud Computing',
    instructor: 'Prof. Mark Davis',
    time: '10:30 AM - 12:00 PM',
    room: 'Hall 304B • Science & Tech Block',
    countdown: 'Starts in 24 mins',
    status: 'Upcoming',
  },

  attendanceOverview: {
    overallPercentage: 92.4,
    attendedClasses: 87,
    totalClasses: 94,
    status: 'Safe', // Safe, Warning, At Risk
    subjects: [
      {
        id: 'cs401',
        code: 'CS401',
        name: 'Distributed Systems',
        attended: 34,
        total: 36,
        percentage: 94.4,
        status: 'Excellent',
        variant: 'success',
      },
      {
        id: 'ec204',
        code: 'EC204',
        name: 'Signal Processing',
        attended: 28,
        total: 32,
        percentage: 87.5,
        status: 'Near Threshold',
        variant: 'warning',
      },
      {
        id: 'ma301',
        code: 'MA301',
        name: 'Linear Algebra & Calculus',
        attended: 25,
        total: 26,
        percentage: 96.1,
        status: 'Excellent',
        variant: 'success',
      },
    ],
  },

  upcoming: {
    assignments: [
      {
        id: 'asg-1',
        code: 'CS401',
        title: 'Distributed Consensus & Raft Implementation',
        dueDate: 'Tomorrow, 11:59 PM',
        urgent: true,
      },
      {
        id: 'asg-2',
        code: 'EC204',
        title: 'Fourier Transform MATLAB Simulation',
        dueDate: 'Thursday, Aug 13',
        urgent: false,
      },
    ],
    exams: [
      {
        id: 'ex-1',
        code: 'MA301',
        title: 'Midterm 2: Vector Spaces & Eigenvalues',
        date: 'Monday, Aug 17',
        time: '09:00 AM - 11:00 AM',
        hall: 'Auditorium A',
      },
    ],
    events: [
      {
        id: 'ev-1',
        title: 'Annual Campus Hackathon 2026',
        category: 'Tech Fest',
        date: 'Aug 15 - 16',
        location: 'Innovation Lab',
      },
    ],
  },

  attentionItems: [
    {
      id: 'att-1',
      type: 'deadline',
      variant: 'danger',
      title: 'Upcoming Deadline',
      message: 'CS401 Assignment 4 is due in 18 hours. Submit PDF report on portal.',
      icon: 'assignments',
    },
    {
      id: 'att-2',
      type: 'warning',
      variant: 'warning',
      title: 'Attendance Warning',
      message: 'EC204 Signal Processing attendance (87.5%) is near the 85% requirement.',
      icon: 'attendance',
    },
    {
      id: 'att-3',
      type: 'notice',
      variant: 'info',
      title: 'Important Campus Notice',
      message: 'Central Library will remain closed on Sunday for network infrastructure maintenance.',
      icon: 'sparkles',
    },
  ],

  uniAiPrompts: [
    'What is my attendance percentage in EC204?',
    'When is my next midterm exam?',
    'Find available quiet study rooms in Central Library',
    'Summarize syllabus for CS401 Distributed Systems',
  ],
};

export default dashboardMockData;
