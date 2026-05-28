export const ERROR_MESSAGES = {
  auth: {
    unauthorized: '로그인이 필요합니다.',
    sessionExpired: '세션이 만료되었습니다. 다시 로그인해 주세요.',
    loginFailed: '로그인에 실패했습니다.',
  },
  network: {
    serverError: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    networkError: '네트워크 연결을 확인해 주세요.',
    timeout: '요청 시간이 초과되었습니다.',
  },
  common: {
    notFound: '요청한 정보를 찾을 수 없습니다.',
    unknown: '알 수 없는 오류가 발생했습니다.',
  },
} as const;
