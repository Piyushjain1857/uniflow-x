// Mock AI Engine for UniAI
// In a real app, this would route to a backend API (e.g. OpenAI/Anthropic)

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const quickPrompts = [
  "What's on my schedule today?",
  "Which assignments are due?",
  "Can I miss my next class?",
  "Plan my study week."
];

export const generateAIResponse = async (query) => {
  await delay(600); // Simulate network latency

  const lowerQuery = query.toLowerCase();

  // 1. SCHEDULE / NEXT CLASS
  if (lowerQuery.includes('schedule') || lowerQuery.includes('next class')) {
    return {
      text: "Good morning, Piyush. Here's your schedule today.",
      scheduleItems: [
        { time: '09:00 AM', subject: 'Data Structures', room: 'Room 204', faculty: 'Dr. Aris Thorne' },
        { time: '11:00 AM', subject: 'Discrete Mathematics', room: 'Room 302', faculty: 'Prof. Elena Rostova' },
        { time: '02:00 PM', subject: 'Web Development', room: 'Lab 3', faculty: 'Dr. Marcus Vance' }
      ]
    };
  }

  // 2. ASSIGNMENTS
  if (lowerQuery.includes('assignment') || lowerQuery.includes('due')) {
    return {
      text: "You have a few assignments coming up. Prioritize the React Authentication project.",
      scheduleItems: [
        { time: 'Tomorrow', subject: 'React Authentication', room: 'CS204', faculty: '20 marks' },
        { time: 'Aug 14', subject: 'AVL Tree Balancing', room: 'CS201', faculty: '50 marks' }
      ],
      noticeText: "I recommend starting the AVL Tree assignment this weekend since it carries a heavy weight."
    };
  }

  // 3. ATTENDANCE / MISS
  if (lowerQuery.includes('miss') || lowerQuery.includes('attendance')) {
    return {
      text: "Let's look at your attendance. You currently have 82% overall attendance.",
      noticeText: "For Data Structures (next class), you can miss 2 more classes before you drop below the 75% threshold. However, since there is an assignment due soon, I recommend attending."
    };
  }

  // 4. STUDY PLAN
  if (lowerQuery.includes('study plan') || lowerQuery.includes('plan')) {
    return {
      text: "I've generated a study plan for this week based on your upcoming deadlines and course load.",
      scheduleItems: [
        { time: 'Monday Eve', subject: 'React Auth Polish', room: '2 hours', faculty: 'High Priority' },
        { time: 'Wed Eve', subject: 'AVL Trees Theory', room: '1.5 hours', faculty: 'Medium Priority' },
        { time: 'Friday', subject: 'System Security Audit', room: '3 hours', faculty: 'Deep Work' }
      ]
    };
  }

  // 5. FALLBACK
  return {
    text: `I understood your query about "${query}". As a mock AI, I can currently help you with your schedule, assignments, attendance, or a study plan. Try asking "What's on my schedule today?"`
  };
};
