// Mock Timetable Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockTimetableData = {
  Monday: [
    { id: 'cs201', subject: 'Data Structures', code: 'CS201', faculty: 'Dr. Aris Thorne', room: 'Room 204', startTime: '09:00', endTime: '10:00', duration: '09:00–10:00', color: 'var(--primary)' },
    { id: 'cs405', subject: 'System Security', code: 'CS405', faculty: 'Dr. Grace Hopper', room: 'Room 305', startTime: '11:00', endTime: '12:00', duration: '11:00–12:00', color: 'var(--accent)' }
  ],
  Tuesday: [
    { id: 'math202', subject: 'Discrete Mathematics', code: 'MATH202', faculty: 'Dr. John von Neumann', room: 'Room 302', startTime: '10:00', endTime: '11:00', duration: '10:00–11:00', color: 'var(--warning)' },
    { id: 'cs410', subject: 'AI & ML Basics', code: 'CS410', faculty: 'Prof. Geoffrey Hinton', room: 'Lab 1', startTime: '13:00', endTime: '15:00', duration: '01:00–03:00', color: 'var(--success)' }
  ],
  Wednesday: [
    { id: 'cs201', subject: 'Data Structures', code: 'CS201', faculty: 'Dr. Aris Thorne', room: 'Room 204', startTime: '09:00', endTime: '10:00', duration: '09:00–10:00', color: 'var(--primary)' },
    { id: 'cs301', subject: 'Web Development', code: 'CS301', faculty: 'Prof. Tim Berners-Lee', room: 'Lab 3', startTime: '11:00', endTime: '13:00', duration: '11:00–01:00', color: 'var(--danger)' }
  ],
  Thursday: [
    { id: 'math202', subject: 'Discrete Mathematics', code: 'MATH202', faculty: 'Dr. John von Neumann', room: 'Room 302', startTime: '10:00', endTime: '11:00', duration: '10:00–11:00', color: 'var(--warning)' },
    { id: 'cs405', subject: 'System Security', code: 'CS405', faculty: 'Dr. Grace Hopper', room: 'Room 305', startTime: '14:00', endTime: '15:00', duration: '02:00–03:00', color: 'var(--accent)' }
  ],
  Friday: [
    { id: 'cs410', subject: 'AI & ML Basics', code: 'CS410', faculty: 'Prof. Geoffrey Hinton', room: 'Lab 1', startTime: '09:00', endTime: '11:00', duration: '09:00–11:00', color: 'var(--success)' },
    { id: 'cs301', subject: 'Web Development', code: 'CS301', faculty: 'Prof. Tim Berners-Lee', room: 'Lab 3', startTime: '14:00', endTime: '16:00', duration: '02:00–04:00', color: 'var(--danger)' }
  ],
  Saturday: []
};

export const getWeeklyTimetable = async () => {
  await delay(300);
  return mockTimetableData;
};

export const getDailyTimetable = async (day) => {
  await delay(200);
  return mockTimetableData[day] || [];
};
