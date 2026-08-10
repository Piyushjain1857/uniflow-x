import { createApiClient } from '@uniflow-x/api-client';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
export const api = createApiClient(API_URL);
