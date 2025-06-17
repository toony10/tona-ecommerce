import { CartItem } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        addToCart: (item: CartItem) =>
          set((state) => ({
            cart: [...state.cart, item],
          })),
        removeFromCart: (index: number) =>
          set((state) => ({
            cart: state.cart.filter((_, i) => i !== index),
          })),
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: 'cart-storage',
      },
    ),
  ),
);
