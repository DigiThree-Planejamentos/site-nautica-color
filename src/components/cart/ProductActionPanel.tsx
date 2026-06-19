"use client";

import { useState } from "react";
import { MessageCircle, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuantityPicker } from "@/components/cart/QuantityPicker";
import { useCart } from "@/hooks/useCart";
import { buildQuoteMessage, resolveWhatsappNumber, whatsappUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/catalog";

export function ProductActionPanel({ product, settings }: { product: Product; settings: Record<string, string> }) {
  const [quantity, setQuantity] = useState(1);
  const { addProduct } = useCart();
  const directItem = {
    productId: product.id,
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    brandName: product.brand?.name ?? "Náutica Color",
    unit: product.unit,
    priceCents: product.priceCents,
    imageUrl: product.imageUrl,
    quantity
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <QuantityPicker value={quantity} onChange={setQuantity} />
      <Button type="button" onClick={() => addProduct(product, quantity)} className="sm:flex-1">
        <ShoppingBasket size={18} aria-hidden="true" />
        Adicionar ao carrinho
      </Button>
      <a
        href={whatsappUrl(buildQuoteMessage([directItem]), resolveWhatsappNumber(settings))}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white transition hover:bg-navy-light focus-visible:outline focus-visible:outline-2"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Enviar pelo WhatsApp
      </a>
    </div>
  );
}
