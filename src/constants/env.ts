// process.env 직접 참조는 이 파일에만 집중 (conventions.md 14절 참고)
// services/api/client.ts 생성 시 ENV 객체를 해당 파일에서 import하여 사용할 것
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';

export const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000',
  APP_ENV,
  IS_PRODUCTION: APP_ENV === 'production',
} as const;
