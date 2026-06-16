"use client";

import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";

export function AppShell({ children, settings }: { children: React.ReactNode; settings: Record<string, string> }) {
  return (
    <CartProvider>
      <Header phone={settings.phone} />
      {children}
      <CartDrawer settings={settings} />
    </CartProvider>
  );
}
