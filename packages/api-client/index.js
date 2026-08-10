// Shared API Client for UniFlow X

export const createApiClient = (baseURL = 'http://localhost:8000') => {
  return {
    baseURL,
    async get(endpoint) {
      const response = await fetch(`${baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
    async post(endpoint, data) {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  };
};
