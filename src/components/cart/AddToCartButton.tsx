"use client";

import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/catalog";

export function AddToCartButton({
  product,
  quantity = 1,
  className = ""
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const { addProduct } = useCart();
  return (
    <Button type="button" onClick={() => addProduct(product, quantity)} className={className}>
      <ShoppingBasket size={18} aria-hidden="true" />
      Adicionar
    </Button>
  );
}
