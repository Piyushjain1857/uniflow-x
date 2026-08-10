// Comprehensive isolated Mock Data Engine for Piyush Jain (V2 Rebuild)
export const mockData = {
  student: {
    name: 'Piyush',
    fullName: 'Piyush Jain',
    greetingMuted: 'Good morning,',
    greetingBold: 'Piyush.',
    dateFormatted: 'Monday · 10 August',
    subheading: "Here's what matters today.",
    program: 'B.Tech CSE',
    semester: 'Semester 4',
    email: 'piyush.jain@uniflow.edu',
    avatarInitials: 'PJ',
    overallGpa: '3.85',
    totalCredits: 78,
    unreadNotifications: 3,
  },

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
    missableClassesText: 'You can miss 2 more classes before reaching 75%.',
    subjects: [
      {
        id: 'ds',
        name: 'Data Structures',
        code: 'CS201',
        faculty: 'Dr. Aris Thorne',
        percentage: 82,
        present: 28,
        absent: 6,
        total: 34,
      },
      {
        id: 'dm',
        name: 'Discrete Mathematics',
        code: 'MA202',
        faculty: 'Prof. Elena Rostova',
        percentage: 76,
        present: 22,
        absent: 7,
        total: 29,
      },
      {
        id: 'wd',
        name: 'Web Development',
        code: 'CS204',
        faculty: 'Dr. Marcus Vance',
        percentage: 91,
        present: 29,
        absent: 3,
        total: 32,
      },
    ],
  },

  todayTimeline: [
    {
      id: 't1',
      time: '09:00',
      subject: 'Data Structures',
      code: 'CS201',
      room: 'Room 204',
      faculty: 'Dr. Aris Thorne',
    },
    {
      id: 't2',
      time: '11:00',
      subject: 'Discrete Mathematics',
      code: 'MA202',
      room: 'Room 302',
      faculty: 'Prof. Elena Rostova',
    },
    {
      id: 't3',
      time: '14:00',
      subject: 'Web Development',
      code: 'CS204',
      room: 'Lab 3',
      faculty: 'Dr. Marcus Vance',
    },
  ],

  attentionRows: [
    {
      id: 'att-1',
      title: 'Assignment due tomorrow',
      sub: 'React Authentication — CS204 Web Development',
      link: '/assignments',
    },
    {
      id: 'att-2',
      title: 'Attendance below target',
      sub: 'Discrete Mathematics (MA202) is currently at 76%',
      link: '/attendance',
    },
    {
      id: 'att-3',
      title: 'New university notice',
      sub: 'Central Library hours extended for Midterm Examinations',
      link: '/notifications',
    },
  ],

  upcomingCampusEvents: [
    {
      id: 'ev-1',
      title: 'UniHack 2026 Hackathon',
      date: 'Aug 15 - 16',
      time: '09:00 AM',
      location: 'Innovation Hub',
      category: 'Tech Fest',
    },
    {
      id: 'ev-2',
      title: 'AI & Quantum Computing Keynote',
      date: 'Aug 18',
      time: '02:00 PM',
      location: 'Main Auditorium',
      category: 'Lecture',
    },
    {
      id: 'ev-3',
      title: 'Annual Campus Cultural Fest',
      date: 'Aug 22 - 24',
      time: '05:00 PM',
      location: 'Campus Grounds',
      category: 'Cultural',
    },
  ],

  assignmentsList: [
    {
      id: 'asg-1',
      subject: 'CS204 Web Development',
      title: 'React Authentication',
      dueDate: 'Due tomorrow',
      marks: '20 marks',
      status: 'Upcoming',
    },
    {
      id: 'asg-2',
      subject: 'CS201 Data Structures',
      title: 'AVL Tree Balancing & Rotations',
      dueDate: 'Due Aug 14',
      marks: '50 marks',
      status: 'Upcoming',
    },
    {
      id: 'asg-3',
      subject: 'CS208 Cloud Computing',
      title: 'Docker Containerization Suite',
      dueDate: 'Submitted Aug 04',
      marks: '100 marks',
      status: 'Submitted',
    },
    {
      id: 'asg-4',
      subject: 'MA202 Discrete Mathematics',
      title: 'Graph Theory Proof Sets',
      dueDate: 'Overdue Jul 28',
      marks: '30 marks',
      status: 'Overdue',
    },
  ],

  academicsRoster: [
    {
      subject: 'Data Structures',
      faculty: 'Dr. Aris Thorne',
      attendance: '82%',
      nextClass: 'Today 09:00 (Room 204)',
      assignments: '1 Pending',
    },
    {
      subject: 'Discrete Mathematics',
      faculty: 'Prof. Elena Rostova',
      attendance: '76%',
      nextClass: 'Today 11:00 (Room 302)',
      assignments: '1 Overdue',
    },
    {
      subject: 'Web Development',
      faculty: 'Dr. Marcus Vance',
      attendance: '91%',
      nextClass: 'Today 14:00 (Lab 3)',
      assignments: '1 Due Tomorrow',
    },
  ],

  aiSuggestedPrompts: [
    "What's on my schedule today?",
    'Which assignments are due?',
    'Can I miss my next class?',
    'Plan my study week.',
  ],
};

export default mockData;
