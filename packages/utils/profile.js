// Mock Profile Service for UniFlow X

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Central mock profile data store
let mockProfileStore = {
  '12345': {
    id: '12345',
    fullName: 'Alex Vance',
    avatar: 'AV',
    role: 'student',
    email: 'alex.vance@university.edu',
    studentId: 'CS2026-08492',
    department: 'Computer Science & Engineering',
    semester: '4',
    phone: '+1 (555) 123-4567',
    address: 'Campus Dorms, Building B, Room 402',
    gender: 'Male',
    dateOfBirth: '2004-05-14',
    enrollmentStatus: 'Active / Full-Time',
    stats: {
      gpa: '3.8',
      attendance: '94%',
      credits: '64',
      pendingAssignments: '3',
    }
  },
  '67890': {
    id: '67890',
    fullName: 'New Student',
    avatar: 'NS',
    role: 'student',
    email: 'new.student@university.edu',
    studentId: 'CS2027-00001',
    department: 'Computer Science & Engineering',
    semester: '1',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    enrollmentStatus: 'Active / Full-Time',
    stats: {
      gpa: 'N/A',
      attendance: '100%',
      credits: '16',
      pendingAssignments: '0',
    }
  }
};

export const mockGetProfile = async (userId) => {
  await delay(600);
  
  const profile = mockProfileStore[userId];
  if (!profile) {
    throw new Error('Profile not found');
  }
  
  return profile;
};

export const mockUpdateProfile = async (userId, updates) => {
  await delay(1000);
  
  const profile = mockProfileStore[userId];
  if (!profile) {
    throw new Error('Profile not found');
  }
  
  // Basic validation
  if (!updates.fullName || !updates.email) {
    throw new Error('Full Name and Email are required.');
  }

  // Generate new avatar initials if name changed
  let avatar = profile.avatar;
  if (updates.fullName !== profile.fullName) {
    const parts = updates.fullName.split(' ');
    if (parts.length >= 2) {
      avatar = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    } else {
      avatar = updates.fullName.substring(0, 2).toUpperCase();
    }
  }

  // Update store
  mockProfileStore[userId] = {
    ...profile,
    ...updates,
    avatar
  };

  return mockProfileStore[userId];
};

export const mockChangePassword = async (userId, currentPassword, newPassword, confirmPassword) => {
  await delay(800);
  
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error('Please fill in all password fields.');
  }
  
  if (currentPassword === 'wrong') {
    throw new Error('Current password is incorrect.');
  }
  
  if (newPassword !== confirmPassword) {
    throw new Error('New passwords do not match.');
  }
  
  return { success: true, message: 'Password successfully updated.' };
};
