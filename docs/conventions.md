# 장독대 클라이언트 코드 컨벤션

## 1. 폴더 구조 규칙

```
src/
├── app/                    # Next.js 앱 라우터 (페이지, 레이아웃)
│   ├── (auth)/            # 라우트 그룹 (UI 레이아웃 공유)
│   ├── dashboard/
│   ├── news/
│   └── api/               # API 라우트
├── components/            # React 컴포넌트 (UI 단위)
│   ├── auth/              # 인증 관련 컴포넌트
│   ├── common/            # 공통 컴포넌트 (Button, Card 등)
│   ├── layout/            # 레이아웃 컴포넌트 (Header, Sidebar 등)
│   └── news/              # 뉴스 도메인 컴포넌트
├── hooks/                 # 커스텀 React 훅
├── services/              # API 호출, 외부 서비스
│   ├── api.ts             # API 클라이언트
│   └── sse/               # Server-Sent Events
├── stores/                # 상태 관리 (Zustand)
├── types/                 # TypeScript 타입 정의
├── utils/                 # 유틸리티 함수
├── lib/                   # 라이브러리 설정 (axios, zustand 등)
├── styles/                # 글로벌 스타일
├── constants/             # 상수 (API URL, enum 등)
└── middleware.ts          # Next.js 미들웨어
```

### 폴더명 규칙
- **도메인 기반**: 기능별로 폴더 구분 (auth, news, dashboard 등)
- **소문자**: 모두 소문자 (components, services 아님 component, service)
- **도메인 폴더 내 파일**: 역할을 포함한 이름 (예: `UserCard.tsx`, `useUserData.ts`)

---

## 2. 파일명 규칙

### 컴포넌트 파일 (.tsx)
**PascalCase**, `{컴포넌트명}.tsx`

```
components/
├── common/
│   ├── Button.tsx          # 범용 버튼 컴포넌트
│   ├── Card.tsx            # 범용 카드 컴포넌트
│   └── Modal.tsx
├── auth/
│   ├── LoginForm.tsx       # 로그인 폼
│   ├── SignupForm.tsx      # 가입 폼
│   └── OAuthButton.tsx     # OAuth 버튼
├── news/
│   ├── NewsCard.tsx        # 뉴스 카드
│   ├── NewsList.tsx        # 뉴스 목록
│   └── NewsFilter.tsx      # 뉴스 필터
└── layout/
    ├── Header.tsx
    ├── Sidebar.tsx
    └── Navigation.tsx
```

### 페이지 파일 (app/)
**소문자 또는 폴더 기반**, Next.js 컨벤션 따름

```
app/
├── page.tsx                    # / 오늘의 독해 홈
├── layout.tsx                  # 루트 레이아웃
├── issue-docent/
│   ├── page.tsx                # /issue-docent 이슈 탐색 피드
│   └── [id]/
│       └── page.tsx            # /issue-docent/[id] 이슈 상세
├── market/
│   └── indices/
│       └── page.tsx            # /market/indices 마켓 정보
├── discover/
│   └── page.tsx                # /discover 탐색 화면
├── stock/
│   └── [symbol]/
│       └── page.tsx            # /stock/[symbol] 종목 상세
└── auth/
    └── page.tsx                # /auth OAuth 콜백 처리
```

### 훅 파일 (.ts, .tsx)
**camelCase**, `use{기능명}.ts`

```
hooks/
├── useAuthStore.ts        # Zustand 스토어 훅
├── useFetchNews.ts        # API 데이터 페칭
├── useDebounce.ts         # 디바운싱 훅
├── useLocalStorage.ts     # 로컬 스토리지
├── useScrollToTop.ts      # 스크롤 관련
└── useNewsFilter.ts       # 뉴스 필터 로직
```

### 타입 정의 파일 (.ts)
**PascalCase**, `{타입명}.ts`

```
types/
├── User.ts                # User 인터페이스
├── News.ts                # News 인터페이스
├── Auth.ts                # 인증 관련 타입
└── Common.ts              # 공통 타입
```

### 유틸리티 파일 (.ts)
**camelCase**, `{기능명}Utils.ts` 또는 `{기능명}.ts`

```
utils/
├── dateUtils.ts           # 날짜 포맷팅
├── formatNews.ts          # 뉴스 포맷팅
├── validation.ts          # 입력 검증
├── localStorage.ts        # 로컬스토리지 헬퍼
└── api.ts                 # API 헬퍼
```

### 서비스 파일 (.ts)
**camelCase**, `{서비스명}.ts`

```
services/
├── api.ts                 # Axios 인스턴스 + 기본 설정
├── newsService.ts         # 뉴스 API 호출
├── authService.ts         # 인증 API 호출
├── userService.ts         # 유저 API 호출
└── sse/
    └── newsStream.ts      # Server-Sent Events
```

### 스토어 파일 (.ts)
**camelCase**, `{도메인}Store.ts`

```
stores/
├── authStore.ts           # 인증 상태
├── newsStore.ts           # 뉴스 목록 상태
└── userStore.ts           # 유저 정보 상태
```

### 상수 파일 (.ts)
**UPPER_SNAKE_CASE** 변수명, **camelCase** 파일명

```
constants/
├── apiEndpoints.ts        # API URL
├── errorMessages.ts       # 에러 메시지
├── newsCategories.ts      # 뉴스 카테고리 enum
└── env.ts                 # 환경 변수
```

---

## 3. 컴포넌트 네이밍

### PascalCase 규칙
모든 컴포넌트는 **PascalCase**

```typescript
// 올바른 예
export function NewsCard() { ... }
export function UserProfile() { ... }
export const LoginButton = () => { ... }

// 잘못된 예
export function news_card() { ... }          // snake_case 금지
export const loginButton = () => { ... }    // camelCase 금지
```

### 컴포넌트 접두사/접미사
| 패턴 | 용도 | 예시 |
|------|------|------|
| `{도메인}{역할}` | 기본 | `NewsCard`, `UserProfile` |
| `{역할}` | 범용 | `Button`, `Card`, `Modal` |
| `{도메인}List` | 목록 | `NewsList`, `CommentList` |
| `{도메인}Form` | 폼 | `LoginForm`, `FilterForm` |
| `{도메인}Modal` | 모달 | `DeleteConfirmModal` |
| `{도메인}Provider` | Context Provider | `AuthProvider`, `ThemeProvider` |

---

## 4. 함수명 & 변수명 규칙

### 함수명: camelCase
**{동사}_{목적어}** 또는 간단하게 **{동사}{명사}**

```typescript
// 올바른 예
function fetchNews() { ... }
function validateEmail(email: string) { ... }
function handleNewsClick(id: string) { ... }
const formatDate = (date: Date) => { ... }

// 잘못된 예
function get_news() { ... }           // snake_case 금지
function NewsSearch() { ... }         // PascalCase 금지
function process() { ... }            # 너무 추상적
```

### 변수명: camelCase
**{명사}{추가정보}** 형태

```typescript
// 올바른 예
const newsList: News[] = [];
const isLoading = true;
const hasError = false;
const maxRetries = 3;

// 잘못된 예
const news_list = [];                 // snake_case 금지
const loading = true;                 // is/has 접두사 없음
const MaxRetries = 3;                 // PascalCase 금지
```

### 불리언 변수
**is_, has_, can_ 접두사**

```typescript
const isLoading = false;
const hasError = true;
const canDelete = false;
const isVisible = true;
```

### 이벤트 핸들러
**handle{이벤트}{대상}**

```typescript
const handleNewsClick = (id: string) => { ... }
const handleFormSubmit = (data: FormData) => { ... }
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... }
```

---

## 5. 파일 확장자 규칙

| 확장자 | 용도 | 예시 |
|--------|------|------|
| `.tsx` | React 컴포넌트 (JSX 포함) | `Button.tsx`, `Header.tsx` |
| `.ts` | TypeScript 파일 (로직만) | `utils.ts`, `api.ts` |
| `.json` | 설정 파일 | `tsconfig.json` |
| `.css` | 스타일 (Tailwind 사용 시 제한적) | `globals.css` |
| `.env.local` | 환경 변수 | `.env.local` |

**Tailwind CSS 사용하므로 `.css` 모듈은 최소화**

---

## 6. TypeScript 타입 정의 규칙

### 인터페이스 정의
파일별로 관련 타입을 그룹화

```typescript
// types/News.ts
export interface News {
  id: string;
  title: string;
  content: string;
  source: string;
  createdAt: string;
  isImportant: boolean;
}

export interface NewsFilter {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export type NewsResponse = {
  data: News[];
  total: number;
  page: number;
};
```

### Props 타입
컴포넌트 props는 `{컴포넌트명}Props`

```typescript
// components/news/NewsCard.tsx
interface NewsCardProps {
  news: News;
  onClickMore?: (id: string) => void;
  isSelected?: boolean;
}

export function NewsCard({ news, onClickMore, isSelected }: NewsCardProps) {
  // ...
}
```

### 타입 힌트 필수
모든 함수에 타입 힌트 작성

```typescript
// 올바른 예
const fetchNews = async (page: number): Promise<News[]> => { ... }
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... }

// 잘못된 예
const fetchNews = async (page) => { ... }
const handleClick = (e) => { ... }
```

---

## 7. import 순서 규칙

**3개 그룹으로 구분, 각 그룹 사이에 빈 줄 하나**

```typescript
// 1. 외부 라이브러리
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// 2. 내부 모듈 (types → hooks → components → services → utils)
import type { News } from '@/types/News';
import { useAuthStore } from '@/hooks/useAuthStore';
import { NewsCard } from '@/components/news/NewsCard';
import { newsService } from '@/services/api/newsService';
import { formatDate } from '@/utils/dateUtils';

// 3. 스타일 (마지막)
import styles from './Page.module.css';
```

### alias 규칙
`@/` alias 사용 (절대 경로)

```typescript
// ✅ 사용
import { Button } from '@/components/common/Button';
import type { User } from '@/types/User';

// ❌ 상대 경로는 피하기
import { Button } from '../../../components/common/Button';
```

---

## 8. 컴포넌트 구조 규칙

### 기본 구조
```typescript
// components/news/NewsCard.tsx
'use client';

import React from 'react';
import { News } from '@/types/News';
import { formatDate } from '@/utils/dateUtils';

interface NewsCardProps {
  news: News;
  onSelect?: (id: string) => void;
}

export function NewsCard({ news, onSelect }: NewsCardProps) {
  const handleClick = () => {
    onSelect?.(news.id);
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-bold">{news.title}</h3>
      <p className="text-sm text-gray-600">{formatDate(news.createdAt)}</p>
      <button onClick={handleClick}>View Details</button>
    </div>
  );
}
```

### 클라이언트 컴포넌트
서버/클라이언트 구분이 필요하면 상단에 명시

```typescript
'use client';  // 클라이언트 컴포넌트

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 9. 상태 관리 규칙 (Zustand)

### 스토어 구조
```typescript
// stores/newsStore.ts
import { create } from 'zustand';
import type { News } from '@/types/News';

interface NewsState {
  newsList: News[];
  isLoading: boolean;
  error: string | null;
  
  // actions
  setNews: (news: News[]) => void;
  setLoading: (loading: boolean) => void;
  addNews: (news: News) => void;
  clearNews: () => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  newsList: [],
  isLoading: false,
  error: null,

  setNews: (news) => set({ newsList: news }),
  setLoading: (loading) => set({ isLoading: loading }),
  addNews: (news) => set((state) => ({ newsList: [...state.newsList, news] })),
  clearNews: () => set({ newsList: [], error: null }),
}));
```

### 스토어 사용
```typescript
// hooks/useAuthStore.ts
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, isLoggedIn, logout } = useAuthStore();
  return { user, isLoggedIn, logout };
}

// 컴포넌트에서
const { user, logout } = useAuth();
```

---

## 10. 스타일링 규칙

### Tailwind CSS 우선
모든 스타일은 **Tailwind CSS 클래스** 사용

```typescript
// ✅ Tailwind 사용
<div className="flex gap-4 rounded-lg bg-white p-4 shadow">
  <h3 className="font-bold text-lg">Title</h3>
</div>

// ❌ CSS 모듈/인라인 스타일
import styles from './styles.css';  // 가급적 피하기
<div style={{ display: 'flex' }}>   // 절대 금지
```

### 클래스 순서
**레이아웃 → 크기 → 배경 → 텍스트 → 효과 → 반응형**

```typescript
<button className="flex gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 md:text-lg">
  Click me
</button>
```

### 조건부 클래스
템플릿 리터럴 또는 배열 join 패턴 사용

```typescript
// 템플릿 리터럴
<button
  className={`rounded-lg px-4 py-2 font-bold transition ${
    isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
  } ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
>
  Submit
</button>

// 조건이 많을 경우 배열 join 패턴
const classes = [
  'rounded-lg px-4 py-2 font-bold transition',
  isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900',
  isDisabled && 'cursor-not-allowed opacity-50',
].filter(Boolean).join(' ');

<button className={classes}>Submit</button>
```

---

## 11. 주석 규칙

### 기본 원칙
**WHY(왜)를 설명**한다. WHAT(무엇)은 코드가 이미 설명한다.

```typescript
// 올바른 예 — 이유를 설명
// 뉴스 API 요청 시 서버 부하 줄이기 위해 5초 디바운싱 적용
const debouncedSearch = useDebounce(searchQuery, 5000);

// 잘못된 예 — 코드를 반복
// searchQuery가 변경될 때마다 호출
useEffect(() => { ... }, [searchQuery]);
```

### TODO 주석
미구현 부분은 `// TODO:` 형식

```typescript
// TODO: SSE 연결 구현
const subscribeNews = () => { ... };
```

### 복잡한 로직만 주석
간단한 코드는 주석 없음

```typescript
// 복잡한 로직은 설명
// 페이지네이션: 총 100개 뉴스, 한 페이지 10개 → 총 10페이지
const totalPages = Math.ceil(totalNews / pageSize);

// 간단한 코드는 주석 불필요
const isLastPage = page === totalPages;
```

---

## 12. 커밋 메시지 규칙

`{타입}: {변경 내용}` 형식

| 타입 | 용도 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변화 없는 코드 개선 |
| `docs` | 문서 추가/수정 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정, 의존성 변경 |
| `style` | 코드 포맷팅 (Prettier 등) |

```bash
# 올바른 예
feat: NewsCard 컴포넌트 추가
fix: 뉴스 필터링 버그 수정
refactor: API 호출 로직 분리
docs: README 업데이트
chore: tailwind 설정 추가

# 잘못된 예
update code              # 타입 없음
feat: 기능 추가          # 내용 구체적이지 않음
```

---

## 13. API 호출 규칙

### 서비스 레이어 분리
`services/api/` 폴더에 도메인별 API 호출 로직 집중

```
services/
├── api/
│   ├── client.ts          # fetch 기본 설정 (baseURL, headers, error 처리)
│   ├── newsService.ts     # 뉴스 API
│   ├── authService.ts     # 인증 API
│   └── userService.ts     # 유저 API
└── sse/
    └── newsStream.ts      # Server-Sent Events
```

```typescript
// services/api/client.ts — fetch 래퍼
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};
```

```typescript
// services/api/newsService.ts
import { apiClient } from './client';
import type { News } from '@/types/News';

export const newsService = {
  async getAllNews(page: number = 1): Promise<News[]> {
    return apiClient.get(`/news?page=${page}`);
  },

  async searchNews(query: string): Promise<News[]> {
    return apiClient.get(`/news/search?q=${encodeURIComponent(query)}`);
  },

  async getNewsDetail(id: string): Promise<News> {
    return apiClient.get(`/news/${id}`);
  },
};
```

### 컴포넌트에서 사용
```typescript
// components/news/NewsList.tsx
import { useEffect, useState } from 'react';
import { newsService } from '@/services/api/newsService';

export function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    newsService.getAllNews()
      .then(setNews)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return <div>{/* render news */}</div>;
}
```

---

## 14. 환경 변수 규칙

### .env.local 파일
민감한 정보는 `.env.local`에 저장 (git ignore)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SSE_URL=http://localhost:8000/stream
```

### 환경 변수 사용
`process.env`를 직접 참조하되, 사용 위치는 `services/api/client.ts` 한 곳으로 집중

```typescript
// services/api/client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';
const SSE_URL = process.env.NEXT_PUBLIC_SSE_URL ?? `${BASE_URL}/stream`;
```

컴포넌트나 훅에서 `process.env`를 직접 참조하지 않는다.

```typescript
// ✅ 서비스 레이어에서만 참조
// services/api/client.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

// ❌ 컴포넌트에서 직접 참조 금지
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/news`);
```

---

## 15. 테스트 파일 네이밍

테스트 파일은 원본과 같은 폴더에 위치

```
components/
├── Button.tsx
├── Button.test.tsx      # Button 테스트
└── Button.stories.tsx   # Storybook (선택사항)

hooks/
├── useNewsFilter.ts
└── useNewsFilter.test.ts
```

---

## 16. 기타 규칙

### console.log 제거
프로덕션 배포 전 모든 `console.log` 제거

### 사용하지 않는 import 제거
ESLint 규칙으로 자동 감지

### 파일 크기
컴포넌트 파일은 200줄 초과 시 분리 검토

```typescript
// ❌ 너무 큼 — 분리 권장
export function NewsPage() {
  // 300줄...
}

// ✅ 분리
// NewsList.tsx + NewsFilter.tsx + NewsDetail.tsx
```
