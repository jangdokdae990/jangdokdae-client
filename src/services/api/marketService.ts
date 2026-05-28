import { apiClient } from './client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import type { MarketIndex } from '@/types/Market';

export const marketService = {
  async getIndices(): Promise<MarketIndex[]> {
    return apiClient.get<MarketIndex[]>(API_ENDPOINTS.market.indices);
  },
};
