// Mock Authentication Service for UniFlow X

// Simulated delay to mimic network request
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockLogin = async (email, password) => {
  await delay(800);
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Mock valid credentials
  if (password === 'wrong') {
    throw new Error('Invalid credentials. Please try again.');
  }

  return {
    user: {
      id: '12345',
      name: 'Alex Vance',
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('faculty') ? 'faculty' : 'student',
      avatar: 'AV',
    },
    token: 'mock-jwt-token-' + Date.now(),
  };
};

export const mockRegister = async (userData) => {
  await delay(1000);
  
  const { fullName, email, password, confirmPassword } = userData;
  
  if (!fullName || !email || !password) {
    throw new Error('Please fill in all required fields.');
  }
  
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.');
  }
  
  return {
    user: {
      id: '67890',
      name: fullName,
      email: email,
      role: 'student',
      avatar: fullName.substring(0, 2).toUpperCase(),
    },
    token: 'mock-jwt-token-' + Date.now(),
  };
};

export const mockForgotPassword = async (email) => {
  await delay(800);
  
  if (!email) {
    throw new Error('Please enter your email.');
  }
  
  if (!email.includes('@')) {
    throw new Error('Please enter a valid institutional email.');
  }
  
  return { success: true, message: 'Reset link sent to your email.' };
};

export const mockResetPassword = async (newPassword, confirmPassword) => {
  await delay(800);
  
  if (!newPassword || !confirmPassword) {
    throw new Error('Please fill in all fields.');
  }
  
  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match.');
  }
  
  return { success: true, message: 'Password has been reset successfully.' };
};
