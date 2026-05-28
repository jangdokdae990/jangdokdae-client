import { apiClient } from './client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const authService = {
  async refresh(): Promise<void> {
    return apiClient.post(API_ENDPOINTS.auth.refresh, {});
  },
  async logout(): Promise<void> {
    return apiClient.post(API_ENDPOINTS.auth.logout, {});
  },
};
