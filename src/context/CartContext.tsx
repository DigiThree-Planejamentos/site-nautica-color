"use client";

import { createContext, useEffect, useMemo, useReducer } from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/catalog";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
};

type CartAction =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; product: Product; quantity?: number }
  | { type: "update"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" }
  | { type: "open" }
  | { type: "close" }
  | { type: "toggle" };

type CartContextValue = CartState & {
  count: number;
  totalCents: number;
  addProduct: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const storageKey = "nautica-color-cart";

export const CartContext = createContext<CartContextValue | null>(null);

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    productId: product.id,
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    brandName: product.brand?.name ?? "Náutica Color",
    unit: product.unit,
    priceCents: product.priceCents,
    imageUrl: product.imageUrl,
    quantity: Math.max(1, quantity)
  };
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { ...state, items: action.items, hydrated: true };
    case "add": {
      const quantity = Math.max(1, action.quantity ?? 1);
      const existing = state.items.find((item) => item.productId === action.product.id);
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((item) =>
            item.productId === action.product.id ? { ...item, quantity: item.quantity + quantity } : item
          )
        };
      }
      return { ...state, isOpen: true, items: [...state.items, toCartItem(action.product, quantity)] };
    }
    case "update":
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId ? { ...item, quantity: Math.max(1, action.quantity) } : item
        )
      };
    case "remove":
      return { ...state, items: state.items.filter((item) => item.productId !== action.productId) };
    case "clear":
      return { ...state, items: [] };
    case "open":
      return { ...state, isOpen: true };
    case "close":
      return { ...state, isOpen: false };
    case "toggle":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false, hydrated: false });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      dispatch({ type: "hydrate", items: raw ? JSON.parse(raw) : [] });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    }
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      window.localStorage.setItem(storageKey, JSON.stringify(state.items));
    }
  }, [state.hydrated, state.items]);

  useEffect(() => {
    document.body.style.overflow = state.isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalCents = state.items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

    return {
      ...state,
      count,
      totalCents,
      addProduct: (product, quantity) => dispatch({ type: "add", product, quantity }),
      updateQuantity: (productId, quantity) => dispatch({ type: "update", productId, quantity }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      clearCart: () => dispatch({ type: "clear" }),
      openCart: () => dispatch({ type: "open" }),
      closeCart: () => dispatch({ type: "close" }),
      toggleCart: () => dispatch({ type: "toggle" })
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
