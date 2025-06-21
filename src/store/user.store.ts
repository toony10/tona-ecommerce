import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);
