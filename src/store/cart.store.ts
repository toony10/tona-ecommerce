import { CartItem } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
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
        increaseQuantity: (index: number) =>
          set((state) => ({
            cart: state.cart.map((item, i) =>
              i === index ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })),
        decreaseQuantity: (index: number) =>
          set((state) => ({
            cart: state.cart.map((item, i) =>
              i === index
                ? { ...item, quantity: item.quantity - 1 }
                : item.quantity === 1
                ? item
                : { ...item, quantity: item.quantity - 1 },
            ),
          })),
      }),
      {
        name: 'cart-storage',
      },
    ),
  ),
);
