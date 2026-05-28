# 장독대 클라이언트 아키텍처

## 목차

1. [전체 구조](#1-전체-구조)
2. [레이어 설계](#2-레이어-설계)
3. [폴더 구조](#3-폴더-구조)
4. [페이지 및 라우팅](#4-페이지-및-라우팅)
5. [인증 흐름](#5-인증-흐름)
6. [API 호출 흐름](#6-api-호출-흐름)
7. [상태 관리](#7-상태-관리)
8. [환경 변수](#8-환경-변수)

---

## 1. 전체 구조

```
브라우저
  │
  ├─ Next.js Middleware (src/middleware.ts)
  │     └─ 인증 쿠키 확인 → 보호 라우트 가드
  │
  ├─ App Router Pages (src/app/**/page.tsx)
  │     └─ Server Component (기본) / Client Component ('use client')
  │
  ├─ React Components (src/components/**)
  │     └─ UI 렌더링, 이벤트 처리
  │
  ├─ Hooks (src/hooks/**)
  │     └─ 상태·서비스 레이어 연결 추상화
  │
  ├─ Stores (src/stores/**)  ← Zustand
  │     └─ 클라이언트 전역 상태
  │
  └─ Services (src/services/**)
        ├─ api/client.ts  ← fetch 래퍼, 401 자동 갱신
        ├─ api/*Service.ts  ← 도메인별 API 호출
        └─ sse/issueStream.ts  ← 실시간 이슈 스트림
              │
              └─ 백엔드 (http://localhost:8000)
```

---

## 2. 레이어 설계

### 의존성 방향

```
Pages / Components
      ↓
    Hooks
      ↓
 Stores ←→ Services
      ↓
   Types / Utils / Constants
```

- **상위 레이어는 하위 레이어만 참조**한다. 역방향 참조 금지.
- `components/`는 `stores/`와 `services/`에 직접 접근하지 않고 `hooks/`를 통한다.
- `services/`는 `stores/`를 참조하지 않는다.

### 각 레이어 역할

| 레이어 | 역할 | 예시 |
|--------|------|------|
| `app/` | 라우팅, 레이아웃, 페이지 진입점 | `page.tsx`, `layout.tsx` |
| `components/` | UI 단위 컴포넌트 | `IssueCard`, `MarketBadge` |
| `hooks/` | 상태·서비스 조합 로직 | `useAuth`, `useIssueList` |
| `stores/` | 클라이언트 전역 상태 (Zustand) | `authStore` |
| `services/api/` | HTTP 요청, 응답 매핑 | `issueService`, `apiClient` |
| `services/sse/` | 서버 푸시 구독 | `subscribeIssueUpdates` |
| `types/` | TypeScript 인터페이스 | `Issue`, `User`, `Stock` |
| `utils/` | 순수 함수 유틸리티 | `formatDate`, `formatPrice` |
| `constants/` | 상수, enum, API 경로 | `API_ENDPOINTS`, `ENV` |

---

## 3. 폴더 구조

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # 루트 레이아웃 (전역 폰트·스타일)
│   ├── page.tsx                # / 오늘의 독해 홈
│   ├── auth/
│   │   └── page.tsx            # /auth OAuth 콜백
│   ├── issue-docent/
│   │   ├── page.tsx            # /issue-docent 이슈 피드
│   │   └── [id]/
│   │       └── page.tsx        # /issue-docent/[id] 이슈 상세
│   ├── market/
│   │   └── indices/
│   │       └── page.tsx        # /market/indices 마켓 지수
│   ├── discover/
│   │   └── page.tsx            # /discover 탐색
│   ├── stock/
│   │   └── [symbol]/
│   │       └── page.tsx        # /stock/[symbol] 종목 상세
│   └── api/                    # Next.js API Routes (필요 시)
│
├── components/
│   ├── common/                 # 범용 (Button, Card, Modal 등)
│   ├── layout/                 # Header, BottomNav 등
│   ├── auth/                   # OAuthButton 등
│   └── {도메인}/               # issue, market, stock 등
│
├── hooks/                      # 커스텀 훅
│   └── useAuth.ts
│
├── services/
│   ├── api/
│   │   ├── client.ts           # fetch 래퍼 (공통 헤더, 401 처리)
│   │   ├── authService.ts
│   │   ├── issueService.ts
│   │   ├── marketService.ts
│   │   └── stockService.ts
│   └── sse/
│       └── issueStream.ts      # EventSource 구독
│
├── stores/
│   └── authStore.ts            # 인증 상태 (Zustand)
│
├── types/
│   ├── Common.ts               # ApiResponse, PaginatedResponse
│   ├── Auth.ts                 # OAuthProvider, OAuthCallbackParams
│   ├── User.ts                 # User
│   ├── Issue.ts                # Issue, IssueDetail, IssueTerm, IssueQuiz
│   ├── Market.ts               # MarketIndex
│   └── Stock.ts                # Stock
│
├── utils/
│   ├── dateUtils.ts            # formatDate, formatRelativeTime
│   └── formatNumber.ts         # formatPrice, formatChangeRate
│
├── constants/
│   ├── apiEndpoints.ts         # API_ENDPOINTS (모든 경로 상수)
│   ├── env.ts                  # ENV (환경 변수 단일 접근점)
│   ├── errorMessages.ts        # ERROR_MESSAGES
│   └── issueCategories.ts      # ISSUE_CATEGORIES enum
│
├── styles/
│   └── globals.css             # Pretendard 폰트, Tailwind 베이스
│
└── middleware.ts               # Edge Runtime 인증 가드
```

---

## 4. 페이지 및 라우팅

### 라우트 맵

| 경로 | 파일 | 설명 | 인증 |
|------|------|------|------|
| `/` | `app/page.tsx` | 오늘의 독해 홈 | 미정 |
| `/auth` | `app/auth/page.tsx` | OAuth 콜백 처리 | 공개 전용 |
| `/issue-docent` | `app/issue-docent/page.tsx` | 이슈 탐색 피드 | 미정 |
| `/issue-docent/[id]` | `app/issue-docent/[id]/page.tsx` | 이슈 상세, 번역, 퀴즈 | 미정 |
| `/market/indices` | `app/market/indices/page.tsx` | 코스피/코스닥 지수 | 미정 |
| `/discover` | `app/discover/page.tsx` | 종목 탐색 | 미정 |
| `/stock/[symbol]` | `app/stock/[symbol]/page.tsx` | 종목 상세 | 미정 |

> `인증: 미정` 경로는 `src/middleware.ts`의 `PROTECTED_ROUTES` 배열에 추가하여 보호 여부를 확정한다.

### 동적 라우트 파라미터

Next.js 15+ 에서 동적 params는 `Promise`로 전달된다.

```typescript
// app/issue-docent/[id]/page.tsx
type Params = Promise<{ id: string }>;

export default async function IssueDocentDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  // ...
}
```

---

## 5. 인증 흐름

### OAuth 로그인 흐름

```
사용자 → [카카오/구글 로그인 버튼 클릭]
       → 백엔드 /api/v1/auth/kakao (또는 /google)
       → OAuth 제공자 인증
       → 백엔드 콜백 처리
       → httpOnly 쿠키 발급 (access_token, refresh_token)
       → 프론트엔드 /auth 페이지로 리다이렉트
       → return_url이 있으면 해당 페이지로 이동, 없으면 /로 이동
```

### 토큰 정책

| 토큰 | 유효 기간 | 저장 방식 |
|------|-----------|-----------|
| `access_token` | 15분 | httpOnly 세션 쿠키 |
| `refresh_token` | 7일 | httpOnly 세션 쿠키 + DB |

### 자동 토큰 갱신 (apiClient)

`services/api/client.ts`가 모든 API 요청을 중앙 처리하며, 401 응답 시 자동으로 갱신을 시도한다.

```
API 요청
  │
  ├─ 응답 200~299 → 정상 반환
  │
  ├─ 응답 401
  │     ├─ POST /api/v1/auth/refresh
  │     │     ├─ 성공 → 원본 요청 재시도
  │     │     └─ 실패 → sessionExpired 에러 throw
  │     └─ 재시도 실패 → API error throw
  │
  └─ 응답 기타 4xx/5xx → API error throw
```

### 미들웨어 라우트 가드 (`src/middleware.ts`)

Edge Runtime에서 실행되며, **refresh_token 쿠키 존재 여부**로 인증 상태를 판단한다. (access_token은 15분 후 소멸될 수 있으므로 사용하지 않음)

```typescript
// 보호 라우트: 미인증 시 /auth?return_url=... 으로 리다이렉트
const PROTECTED_ROUTES: string[] = [/* TODO: 확정 후 추가 */];

// 공개 전용 라우트: 인증된 사용자는 / 으로 리다이렉트
const PUBLIC_ONLY_ROUTES = ['/auth'];
```

---

## 6. API 호출 흐름

### 구조

```
컴포넌트/훅
    ↓
{domain}Service  (services/api/issueService.ts 등)
    ↓
apiClient        (services/api/client.ts)
    ↓
fetch            (브라우저 내장, credentials: 'include')
    ↓
백엔드 (ENV.API_BASE_URL)
```

### apiClient

`services/api/client.ts`는 `process.env`를 직접 참조하지 않고 `constants/env.ts`의 `ENV` 객체를 사용한다.

```typescript
export const apiClient = {
  get:    <T>(path: string) => request<T>(path),
  post:   <T>(path: string, body: unknown) => request<T>(path, { method: 'POST', ... }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
```

### API 엔드포인트 상수

모든 경로는 `constants/apiEndpoints.ts`의 `API_ENDPOINTS`에서 관리한다. 컴포넌트나 서비스에서 URL 문자열을 직접 작성하지 않는다.

```typescript
API_ENDPOINTS.news.list               // '/api/v1/news'
API_ENDPOINTS.news.detail(id)         // '/api/v1/news/:id'
API_ENDPOINTS.market.indices          // '/api/v1/market/indices'
API_ENDPOINTS.stock.detail(symbol)    // '/api/v1/stocks/:symbol'
```

### 실시간 이슈 스트림 (SSE)

`services/sse/issueStream.ts`는 `EventSource`를 통해 서버 푸시를 구독하고, 구독 해제 함수를 반환한다.

```typescript
const unsubscribe = subscribeIssueUpdates((data) => {
  // 새 이슈 수신 처리
});

// 컴포넌트 언마운트 시
unsubscribe();
```

---

## 7. 상태 관리

클라이언트 전역 상태는 **Zustand**로 관리한다. 서버에서 패칭하는 데이터는 별도 캐싱 라이브러리 없이 서버 컴포넌트의 fetch 캐싱을 활용한다.

### 스토어 구조

```
stores/
└── authStore.ts   ← 로그인 사용자 정보, 로그인 여부
```

### authStore

```typescript
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}
```

### 훅을 통한 접근

컴포넌트는 스토어를 직접 import하지 않고 `hooks/useAuth.ts`를 통해 접근한다.

```typescript
// ✅
const { user, isLoggedIn, logout } = useAuth();

// ❌ 컴포넌트에서 직접 import 지양
import { useAuthStore } from '@/stores/authStore';
```

---

## 8. 환경 변수

모든 환경 변수 접근은 `constants/env.ts`의 `ENV` 객체 한 곳에서만 처리한다. 컴포넌트나 서비스 파일에서 `process.env`를 직접 참조하지 않는다.

```typescript
// constants/env.ts
export const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000',
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  IS_PRODUCTION: (process.env.NEXT_PUBLIC_APP_ENV ?? 'local') === 'production',
} as const;
```

### 환경 변수 목록

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000` | 백엔드 API 베이스 URL |
| `NEXT_PUBLIC_APP_ENV` | `local` | 실행 환경 (`local` / `production`) |

> `.env.example`을 복사해 `.env.local`을 생성한다. `.env.local`은 gitignore 대상이다.
