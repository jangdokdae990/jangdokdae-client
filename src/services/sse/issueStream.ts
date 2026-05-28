import { ENV } from '@/constants/env';

// TODO: 백엔드 SSE 엔드포인트 확정 후 URL 업데이트
export function subscribeIssueUpdates(onMessage: (data: unknown) => void): () => void {
  const source = new EventSource(`${ENV.API_BASE_URL}/api/v1/issues/stream`, {
    withCredentials: true,
  });
  source.onmessage = (event: MessageEvent) => {
    onMessage(JSON.parse(event.data as string) as unknown);
  };
  return () => source.close();
}
