import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

// TODO: 인증 필요 경로 확정 후 업데이트 (/issue-docent, /market, /discover, /stock 등)
const PROTECTED_ROUTES: string[] = [];
const PUBLIC_ONLY_ROUTES = ['/auth'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // access_token은 15분 만료로 소멸될 수 있으므로 refresh_token 존재 여부로 세션 유효성 판단
  const isAuthenticated = request.cookies.has(AUTH_COOKIES.REFRESH_TOKEN);

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isPublicOnly = PUBLIC_ONLY_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('return_url', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicOnly && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
};
