import { type User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserState {
  user: User;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
}
