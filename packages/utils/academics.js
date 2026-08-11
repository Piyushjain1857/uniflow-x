// Mock Academics Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockSubjectsList = [
  {
    id: 'cs201',
    code: 'CS201',
    name: 'Data Structures',
    faculty: 'Prof. Alan Turing',
    attendance: '95%',
    credits: 4,
    nextClass: 'Tomorrow, 10:00 AM',
    assignmentStatus: 'pending', // pending, submitted, graded
    assignmentCount: 2,
    currentGrade: 'A',
    schedule: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
    materials: [
      { id: 'm1', title: 'Trees & Graphs Slides', type: 'pdf', date: '2 days ago' },
      { id: 'm2', title: 'Binary Search Implementation', type: 'code', date: '1 week ago' }
    ],
    assignments: [
      { id: 'a1', title: 'AVL Trees Implementation', dueDate: 'Friday, 11:59 PM', status: 'Pending' },
      { id: 'a2', title: 'Graph Traversal Homework', dueDate: 'Next Wednesday', status: 'Not Started' }
    ],
    grades: [
      { title: 'Midterm Exam', weight: '30%', score: '92/100' },
      { title: 'Quiz 1', weight: '10%', score: '18/20' }
    ]
  },
  {
    id: 'math202',
    code: 'MATH202',
    name: 'Discrete Mathematics',
    faculty: 'Dr. John von Neumann',
    attendance: '88%',
    credits: 3,
    nextClass: 'Today, 2:00 PM',
    assignmentStatus: 'submitted',
    assignmentCount: 0,
    currentGrade: 'B+',
    schedule: 'Tue, Thu • 2:00 PM - 3:30 PM',
    materials: [
      { id: 'm3', title: 'Set Theory Notes', type: 'pdf', date: 'Yesterday' }
    ],
    assignments: [
      { id: 'a3', title: 'Combinatorics Problem Set', dueDate: 'Submitted 2 days ago', status: 'Submitted' }
    ],
    grades: [
      { title: 'Midterm Exam', weight: '40%', score: '85/100' }
    ]
  },
  {
    id: 'cs301',
    code: 'CS301',
    name: 'Web Development',
    faculty: 'Prof. Tim Berners-Lee',
    attendance: '100%',
    credits: 4,
    nextClass: 'Wednesday, 1:00 PM',
    assignmentStatus: 'graded',
    assignmentCount: 0,
    currentGrade: 'A+',
    schedule: 'Wed, Fri • 1:00 PM - 3:00 PM',
    materials: [
      { id: 'm4', title: 'React Hooks Guide', type: 'doc', date: '3 days ago' }
    ],
    assignments: [
      { id: 'a4', title: 'Portfolio Project', dueDate: 'Graded', status: 'Graded' }
    ],
    grades: [
      { title: 'Portfolio Project', weight: '50%', score: '98/100' }
    ]
  },
  {
    id: 'cs405',
    code: 'CS405',
    name: 'System Security',
    faculty: 'Dr. Grace Hopper',
    attendance: '92%',
    credits: 3,
    nextClass: 'Monday, 9:00 AM',
    assignmentStatus: 'pending',
    assignmentCount: 1,
    currentGrade: 'A-',
    schedule: 'Mon, Wed • 9:00 AM - 10:30 AM',
    materials: [
      { id: 'm5', title: 'Cryptography Slides', type: 'pdf', date: 'Last week' }
    ],
    assignments: [
      { id: 'a5', title: 'Vulnerability Assessment', dueDate: 'Sunday, 11:59 PM', status: 'Pending' }
    ],
    grades: [
      { title: 'Quiz 2', weight: '15%', score: '14/15' }
    ]
  },
  {
    id: 'cs410',
    code: 'CS410',
    name: 'AI & ML Basics',
    faculty: 'Prof. Geoffrey Hinton',
    attendance: '90%',
    credits: 4,
    nextClass: 'Thursday, 11:00 AM',
    assignmentStatus: 'submitted',
    assignmentCount: 0,
    currentGrade: 'A',
    schedule: 'Tue, Thu • 11:00 AM - 12:30 PM',
    materials: [
      { id: 'm6', title: 'Neural Networks 101', type: 'pdf', date: 'Yesterday' }
    ],
    assignments: [
      { id: 'a6', title: 'Model Training Lab', dueDate: 'Submitted', status: 'Submitted' }
    ],
    grades: [
      { title: 'Midterm Exam', weight: '35%', score: '89/100' }
    ]
  }
];

const mockSummary = {
  semester: 'Semester 4',
  degree: 'B.Tech CSE',
  term: 'Current Semester',
  gpa: {
    current: 3.85,
    max: 4.0
  },
  credits: {
    earned: 82,
    total: 120
  },
  gpaTrend: [
    { semester: 'Sem 1', gpa: 3.6 },
    { semester: 'Sem 2', gpa: 3.75 },
    { semester: 'Sem 3', gpa: 3.8 },
    { semester: 'Sem 4', gpa: 3.85 }
  ],
  attendanceOverview: {
    overall: 93,
    present: 42,
    absent: 3,
    total: 45
  },
  recentActivity: [
    { id: 1, title: 'Grade Published', desc: 'Web Development Portfolio Graded (98/100)', time: '2 hours ago', icon: 'academics' },
    { id: 2, title: 'Assignment Due', desc: 'System Security Vulnerability Assessment due Sunday', time: '1 day ago', icon: 'assignments' },
    { id: 3, title: 'Material Added', desc: 'Set Theory Notes uploaded by Dr. John von Neumann', time: 'Yesterday', icon: 'campus' }
  ]
};

export const getAcademicsSummary = async () => {
  await delay(500);
  return mockSummary;
};

export const getSubjects = async () => {
  await delay(500);
  return mockSubjectsList;
};

export const getSubjectDetails = async (id) => {
  await delay(500);
  const subject = mockSubjectsList.find(s => s.id === id);
  if (!subject) throw new Error('Subject not found');
  return subject;
};
