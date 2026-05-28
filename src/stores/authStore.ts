import { create } from 'zustand';
import type { User } from '@/types/User';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: user !== null }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
