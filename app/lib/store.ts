import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

export interface CartItem extends Product {
  cartItemId: string; // Unique ID for cart item (handles same product with different sizes/colors)
  qty: number;
  selectedSize: number | string;
  selectedColor: string;
}

interface AppState {
  // Cart State
  cart: CartItem[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, qty: number) => void;
  setCartOpen: (isOpen: boolean) => void;
  
  // Wishlist State
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      cartOpen: false,
      setCartOpen: (isOpen) => set({ cartOpen: isOpen }),
      addToCart: (item) => set((state) => {
        // Check if exact same item (same product, size, and color) exists
        const existingItemIndex = state.cart.findIndex(
          (c) => c.slug === item.slug && c.selectedSize === item.selectedSize && c.selectedColor === item.selectedColor
        );

        if (existingItemIndex >= 0) {
          // Increase quantity
          const newCart = [...state.cart];
          newCart[existingItemIndex].qty += item.qty;
          return { cart: newCart, cartOpen: true }; // Open cart drawer on add
        } else {
          // Add new item
          const cartItemId = `${item.slug}-${item.selectedSize}-${item.selectedColor}`;
          return { cart: [...state.cart, { ...item, cartItemId }], cartOpen: true };
        }
      }),
      removeFromCart: (cartItemId) => set((state) => ({
        cart: state.cart.filter((c) => c.cartItemId !== cartItemId)
      })),
      updateCartQty: (cartItemId, qty) => set((state) => ({
        cart: state.cart.map((c) => c.cartItemId === cartItemId ? { ...c, qty: Math.max(1, qty) } : c)
      })),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) => set((state) => {
        if (!state.wishlist.find(p => p.slug === product.slug)) {
          return { wishlist: [...state.wishlist, product] };
        }
        return state;
      }),
      removeFromWishlist: (slug) => set((state) => ({
        wishlist: state.wishlist.filter((p) => p.slug !== slug)
      })),
      isInWishlist: (slug) => {
        return get().wishlist.some(p => p.slug === slug);
      }
    }),
    {
      name: 'kolhapuri-storage',
      // only persist cart and wishlist, not UI state like cartOpen
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
