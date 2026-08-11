// Mock Attendance Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockAttendanceSummary = {
  overallPercentage: 82,
  status: 'Good',
  present: 154,
  absent: 34,
  late: 4,
  trend: [
    { week: 'Week 1', percentage: 95 },
    { week: 'Week 2', percentage: 92 },
    { week: 'Week 3', percentage: 88 },
    { week: 'Week 4', percentage: 80 },
    { week: 'Week 5', percentage: 82 },
  ]
};

const mockSubjectsAttendance = [
  {
    id: 's1',
    name: 'Data Structures',
    percentage: 82,
    presentClasses: 33,
    totalClasses: 40,
    classesRemaining: 10,
    status: 'Safe',
    prediction: 'You can miss 2 more classes before reaching 75%.'
  },
  {
    id: 's2',
    name: 'Discrete Mathematics',
    percentage: 76,
    presentClasses: 30,
    totalClasses: 39,
    classesRemaining: 11,
    status: 'Warning',
    prediction: 'You can miss 0 more classes before reaching 75%.'
  },
  {
    id: 's3',
    name: 'Web Development',
    percentage: 91,
    presentClasses: 41,
    totalClasses: 45,
    classesRemaining: 5,
    status: 'Safe',
    prediction: 'You can miss 5 more classes before reaching 75%.'
  },
  {
    id: 's4',
    name: 'System Security',
    percentage: 88,
    presentClasses: 35,
    totalClasses: 40,
    classesRemaining: 10,
    status: 'Safe',
    prediction: 'You can miss 5 more classes before reaching 75%.'
  },
  {
    id: 's5',
    name: 'AI & ML Basics',
    percentage: 85,
    presentClasses: 34,
    totalClasses: 40,
    classesRemaining: 10,
    status: 'Safe',
    prediction: 'You can miss 4 more classes before reaching 75%.'
  }
];

const mockRecentRecords = [
  { id: 'r1', date: '10 Aug', subject: 'Data Structures', status: 'Present' },
  { id: 'r2', date: '10 Aug', subject: 'Discrete Mathematics', status: 'Present' },
  { id: 'r3', date: '9 Aug', subject: 'Web Development', status: 'Absent' },
  { id: 'r4', date: '9 Aug', subject: 'System Security', status: 'Present' },
  { id: 'r5', date: '8 Aug', subject: 'AI & ML Basics', status: 'Present' },
];

export const getAttendanceSummary = async () => {
  await delay(400);
  return mockAttendanceSummary;
};

export const getSubjectsAttendance = async () => {
  await delay(400);
  return mockSubjectsAttendance;
};

export const getRecentAttendanceRecords = async () => {
  await delay(400);
  return mockRecentRecords;
};
