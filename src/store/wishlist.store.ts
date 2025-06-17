import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface WishlistState {
  wishlistItems: string[]; // Array of product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  devtools(
    persist(
      (set, get) => ({
        wishlistItems: [],

        addToWishlist: (productId: string) =>
          set((state) => ({
            wishlistItems: state.wishlistItems.includes(productId)
              ? state.wishlistItems
              : [...state.wishlistItems, productId],
          })),

        removeFromWishlist: (productId: string) =>
          set((state) => ({
            wishlistItems: state.wishlistItems.filter((id) => id !== productId),
          })),

        isInWishlist: (productId: string) => {
          const state = get();
          return state.wishlistItems.includes(productId);
        },

        clearWishlist: () => set({ wishlistItems: [] }),

        getWishlistCount: () => {
          const state = get();
          return state.wishlistItems.length;
        },
      }),
      {
        name: 'wishlist-storage',
      },
    ),
  ),
);
