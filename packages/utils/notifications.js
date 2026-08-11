// Mock Notification Center Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data
let mockNotifications = [
  {
    id: 'n1',
    category: 'Academic',
    title: 'Assignment Alert',
    description: 'CS401 Assignment #4 is due in 48 hours.',
    timestamp: '2 hours ago',
    group: 'TODAY',
    isUnread: true,
    isHighPriority: true,
    icon: 'assignments',
    link: '/assignments'
  },
  {
    id: 'n2',
    category: 'Academic',
    title: 'Attendance Logged',
    description: 'Prof. Jenkins marked your attendance for CS402.',
    timestamp: '4 hours ago',
    group: 'TODAY',
    isUnread: true,
    isHighPriority: false,
    icon: 'attendance',
    link: '/attendance'
  },
  {
    id: 'n3',
    category: 'Campus',
    title: 'Campus Announcement',
    description: 'Tech Fest registration is now open.',
    timestamp: '6 hours ago',
    group: 'TODAY',
    isUnread: true,
    isHighPriority: true,
    icon: 'campus',
    link: '/campus'
  },
  {
    id: 'n4',
    category: 'System',
    title: 'System Update',
    description: 'University maintenance scheduled for tonight.',
    timestamp: 'Yesterday',
    group: 'YESTERDAY',
    isUnread: false,
    isHighPriority: false,
    icon: 'settings',
    link: null
  },
  {
    id: 'n5',
    category: 'Academic',
    title: 'Academic Alert',
    description: 'Your GPA has been updated.',
    timestamp: 'Yesterday',
    group: 'YESTERDAY',
    isUnread: false,
    isHighPriority: false,
    icon: 'academics',
    link: '/academics'
  }
];

export const getNotifications = async () => {
  await delay(300);
  return [...mockNotifications];
};

export const markAsRead = async (id) => {
  await delay(100);
  mockNotifications = mockNotifications.map(n => 
    n.id === id ? { ...n, isUnread: false } : n
  );
  return [...mockNotifications];
};

export const markAllAsRead = async () => {
  await delay(200);
  mockNotifications = mockNotifications.map(n => ({ ...n, isUnread: false }));
  return [...mockNotifications];
};

export const deleteNotification = async (id) => {
  await delay(150);
  mockNotifications = mockNotifications.filter(n => n.id !== id);
  return [...mockNotifications];
};
