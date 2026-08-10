import { createApiClient } from '@uniflow-x/api-client';

export const api = createApiClient(import.meta.env.VITE_API_URL || 'http://localhost:8000');
