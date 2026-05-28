import { apiClient } from './client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import type { Stock } from '@/types/Stock';

export const stockService = {
  async getDetail(symbol: string): Promise<Stock> {
    return apiClient.get<Stock>(API_ENDPOINTS.stock.detail(symbol));
  },
};
