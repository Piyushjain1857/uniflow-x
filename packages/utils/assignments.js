// Mock Assignments Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let mockAssignmentsList = [
  {
    id: 'a1',
    title: 'React Authentication',
    subject: 'CS204 Web Development',
    courseCode: 'CS204',
    dueDate: 'Tomorrow',
    marks: '20',
    status: 'Upcoming',
    description: 'Implement JWT based authentication in the provided React starter template.',
    instructions: '1. Clone repo. 2. Setup Context API. 3. Implement login/register forms. 4. Handle protected routes.',
    submissionState: null, // { url, comments, date }
  },
  {
    id: 'a2',
    title: 'AVL Tree Balancing & Rotations',
    subject: 'CS201 Data Structures',
    courseCode: 'CS201',
    dueDate: 'Aug 14',
    marks: '50',
    status: 'Upcoming',
    description: 'Write a C++ program to implement an AVL tree and demonstrate all four types of rotations.',
    instructions: 'Submit a single .cpp file. Ensure code is well documented. Memory leaks will result in a 10% penalty.',
    submissionState: null,
  },
  {
    id: 'a3',
    title: 'System Security Audit',
    subject: 'CS401 System Security',
    courseCode: 'CS401',
    dueDate: 'Aug 20',
    marks: '30',
    status: 'Upcoming',
    description: 'Perform a security audit on the provided vulnerable web application.',
    instructions: 'Provide a PDF report detailing at least 3 vulnerabilities, how to reproduce them, and mitigation strategies.',
    submissionState: null,
  },
  {
    id: 'a4',
    title: 'Math Problem Set',
    subject: 'MA202 Discrete Mathematics',
    courseCode: 'MA202',
    dueDate: 'Aug 22',
    marks: '20',
    status: 'Upcoming', // Treat as upcoming by default
    description: 'Complete problems 1-15 from Chapter 4 on Graph Theory.',
    instructions: 'Scan your handwritten solutions into a single PDF file and upload it.',
    submissionState: null,
  },
  {
    id: 'a5',
    title: 'Distributed Systems Architecture',
    subject: 'CS401 Distributed Systems',
    courseCode: 'CS401',
    dueDate: 'Aug 05',
    marks: '40',
    status: 'Overdue',
    description: 'Design a distributed key-value store architecture.',
    instructions: 'Submit a PDF report.',
    submissionState: null,
  }
];

export const getAssignments = async () => {
  await delay(400);
  return [...mockAssignmentsList]; // Return a copy
};

export const getAssignmentDetails = async (id) => {
  await delay(300);
  const assignment = mockAssignmentsList.find((a) => a.id === id);
  if (!assignment) throw new Error('Assignment not found');
  return assignment;
};

export const submitAssignment = async (id, payload) => {
  await delay(800);
  const assignmentIdx = mockAssignmentsList.findIndex((a) => a.id === id);
  if (assignmentIdx === -1) throw new Error('Assignment not found');
  
  mockAssignmentsList[assignmentIdx] = {
    ...mockAssignmentsList[assignmentIdx],
    status: 'Submitted',
    submissionState: {
      ...payload,
      date: 'Just now'
    }
  };
  
  return mockAssignmentsList[assignmentIdx];
};
