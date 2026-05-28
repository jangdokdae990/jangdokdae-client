import { apiClient } from './client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import type { Issue, IssueDetail } from '@/types/Issue';

export const issueService = {
  async getList(): Promise<Issue[]> {
    return apiClient.get<Issue[]>(API_ENDPOINTS.news.list);
  },
  async getDetail(id: string): Promise<IssueDetail> {
    return apiClient.get<IssueDetail>(API_ENDPOINTS.news.detail(id));
  },
  async search(query: string): Promise<Issue[]> {
    return apiClient.get<Issue[]>(`${API_ENDPOINTS.news.search}?q=${encodeURIComponent(query)}`);
  },
};
