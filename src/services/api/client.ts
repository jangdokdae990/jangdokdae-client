import { ENV } from '@/constants/env';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${ENV.API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  // 401 시 토큰 갱신 후 재시도 (CLAUDE.md 인증 정책 참고)
  if (res.status === 401) {
    const refreshRes = await fetch(`${ENV.API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!refreshRes.ok) throw new Error(ERROR_MESSAGES.auth.sessionExpired);

    const retryRes = await fetch(`${ENV.API_BASE_URL}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!retryRes.ok) throw new Error(`API error: ${retryRes.status}`);
    return retryRes.json() as Promise<T>;
  }

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
