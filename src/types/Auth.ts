export type OAuthProvider = 'kakao' | 'google';

export interface OAuthCallbackParams {
  code: string;
  provider: OAuthProvider;
}
