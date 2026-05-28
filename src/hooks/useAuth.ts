import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const { user, isLoggedIn, logout } = useAuthStore();
  return { user, isLoggedIn, logout };
}
