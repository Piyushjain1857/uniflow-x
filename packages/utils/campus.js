// Mock Campus Hub Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockEvents = [
  {
    id: 'e1',
    category: 'Technical',
    title: 'UniHack 2026 Hackathon',
    date: 'Aug 15–16',
    time: '09:00 AM',
    location: 'Innovation Hub',
    description: 'The premier 36-hour hackathon. Build the future, collaborate with top talent, and win prizes.',
    isFeatured: true
  },
  {
    id: 'e2',
    category: 'Academic',
    title: 'AI & Quantum Computing Keynote',
    date: 'Aug 18',
    time: '11:00 AM',
    location: 'Main Auditorium',
    description: 'Join industry leaders for an insightful keynote on the intersection of AI and Quantum mechanics.',
    isFeatured: false
  },
  {
    id: 'e3',
    category: 'Cultural',
    title: 'Annual Campus Cultural Fest',
    date: 'Aug 22–24',
    time: '06:00 PM',
    location: 'Campus Grounds',
    description: 'Three days of music, art, food, and cultural showcases from student organizations.',
    isFeatured: false
  },
  {
    id: 'e4',
    category: 'Sports',
    title: 'Inter-Department Basketball Finals',
    date: 'Aug 26',
    time: '05:00 PM',
    location: 'Sports Arena',
    description: 'Cheer for your department in the grand finale of the summer basketball tournament.',
    isFeatured: false
  }
];

const mockServices = [
  { id: 's1', name: 'Library', desc: 'Open 24/7', status: 'Open' },
  { id: 's2', name: 'Computer Labs', desc: 'Building B, Floor 2', status: 'Open' },
  { id: 's3', name: 'Cafeteria', desc: 'North Wing', status: 'Crowded' },
  { id: 's4', name: 'Transport', desc: 'Shuttle live tracking', status: 'Live' },
  { id: 's5', name: 'Hostel', desc: 'Admin & Support', status: 'Online' },
  { id: 's6', name: 'Medical Center', desc: 'Emergency & Clinic', status: 'Open' }
];

const mockMapLocations = [
  { id: 'l1', name: 'Innovation Hub', x: 20, y: 30, w: 25, h: 20, type: 'building' },
  { id: 'l2', name: 'Main Auditorium', x: 60, y: 15, w: 30, h: 25, type: 'building' },
  { id: 'l3', name: 'Library', x: 50, y: 55, w: 20, h: 30, type: 'building' },
  { id: 'l4', name: 'Campus Grounds', x: 10, y: 60, w: 35, h: 30, type: 'park' },
  { id: 'l5', name: 'Sports Arena', x: 75, y: 50, w: 20, h: 40, type: 'sports' }
];

export const getCampusEvents = async () => {
  await delay(400);
  return mockEvents;
};

export const getCampusServices = async () => {
  await delay(300);
  return mockServices;
};

export const getCampusMap = async () => {
  await delay(500);
  return mockMapLocations;
};
