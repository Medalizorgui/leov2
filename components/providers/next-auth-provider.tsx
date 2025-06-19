"use client";

import { SessionProvider } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price?: number;
  quantity: number;
  options?: Record<string, any>;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage if logged in
  useEffect(() => {
    if (session && session.user && session.user.email) {
      const key = `leo_cart_${session.user.email}`;
      const stored = localStorage.getItem(key);
      if (stored) setCart(JSON.parse(stored));
      else setCart([]);
    } else {
      setCart([]);
    }
  }, [session]);

  // Persist cart to localStorage if logged in
  useEffect(() => {
    if (session && session.user && session.user.email) {
      const key = `leo_cart_${session.user.email}`;
      localStorage.setItem(key, JSON.stringify(cart));
    }
  }, [cart, session]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId && JSON.stringify(i.options) === JSON.stringify(item.options));
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && JSON.stringify(i.options) === JSON.stringify(item.options)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function NextAuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
} 