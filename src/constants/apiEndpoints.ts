export const API_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    logout: '/api/v1/auth/logout',
    refresh: '/api/v1/auth/refresh',
    kakao: '/api/v1/auth/kakao',
    google: '/api/v1/auth/google',
  },
  news: {
    list: '/api/v1/news',
    detail: (id: string) => `/api/v1/news/${id}`,
    search: '/api/v1/news/search',
  },
  market: {
    indices: '/api/v1/market/indices',
  },
  stock: {
    detail: (symbol: string) => `/api/v1/stocks/${symbol}`,
  },
} as const;
