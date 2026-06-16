"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBasket, Trash2, X } from "lucide-react";
import { QuantityPicker } from "@/components/cart/QuantityPicker";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/ui/ProductImage";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/currency";
import { buildQuoteMessage, resolveWhatsappNumber, whatsappUrl } from "@/lib/whatsapp";

export function CartDrawer({ settings }: { settings: Record<string, string> }) {
  const { items, isOpen, count, totalCents, updateQuantity, removeItem, clearCart, closeCart, openCart } = useCart();
  const quoteHref = whatsappUrl(buildQuoteMessage(items), resolveWhatsappNumber(settings));

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrinho de compras">
          <button className="absolute inset-0 bg-ink/55" aria-label="Fechar carrinho" onClick={closeCart} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <header className="flex items-center justify-between border-b border-navy/10 p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red">Carrinho de compras</p>
                <h2 className="font-heading text-2xl font-bold text-navy">{count} item(ns)</h2>
              </div>
              <button className="grid h-11 w-11 place-items-center rounded-full hover:bg-off-white" onClick={closeCart} aria-label="Fechar">
                <X size={22} aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="grid min-h-72 place-items-center rounded-lg bg-off-white p-8 text-center">
                  <div>
                    <ShoppingBasket className="mx-auto mb-4 text-navy" size={42} aria-hidden="true" />
                    <p className="font-heading text-xl font-bold text-navy">Seu carrinho está vazio.</p>
                    <p className="mt-2 text-sm text-ink/70">Adicione produtos ao catálogo e envie a lista pelo WhatsApp.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.productId} className="rounded-lg border border-navy/10 p-3">
                      <div className="flex gap-3">
                        <ProductImage src={item.imageUrl} alt={item.name} className="h-20 w-20 rounded-md bg-off-white object-contain p-2" />
                        <div className="min-w-0 flex-1">
                          <Link href={`/produtos/${item.slug}`} onClick={closeCart} className="font-semibold text-navy hover:text-red">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs text-ink/60">{item.brandName} • {item.unit}</p>
                          <p className="mt-2 text-sm font-bold text-ink">{formatCurrency(item.priceCents)}</p>
                        </div>
                        <button aria-label={`Remover ${item.name}`} onClick={() => removeItem(item.productId)} className="h-10 w-10 rounded-full text-red hover:bg-red/10">
                          <Trash2 className="mx-auto" size={18} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <QuantityPicker value={item.quantity} onChange={(value) => updateQuantity(item.productId, value)} />
                        <span className="text-sm font-semibold text-navy">{formatCurrency(item.priceCents * item.quantity)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-navy/10 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-ink/70">Total estimado</span>
                <strong className="font-heading text-2xl text-navy">{formatCurrency(totalCents)}</strong>
              </div>
              <p className="mb-4 text-xs text-ink/60">Valores demonstrativos sujeitos à confirmação de preço e disponibilidade.</p>
              <div className="grid gap-2">
                <Link
                  href="/produtos"
                  onClick={closeCart}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
                >
                  Continuar comprando
                </Link>
                <a
                  href={items.length > 0 ? quoteHref : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={items.length === 0}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold ${items.length > 0 ? "bg-red text-white hover:bg-red-bright" : "pointer-events-none bg-ink/20 text-ink/50"}`}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Enviar pelo WhatsApp
                </a>
                {items.length > 0 ? (
                  <Button type="button" variant="ghost" onClick={clearCart}>
                    Limpar carrinho
                  </Button>
                ) : null}
              </div>
            </footer>
          </aside>
        </div>
      ) : null}

      {count > 0 ? (
        <button
          type="button"
          onClick={openCart}
          className="fixed bottom-4 left-4 right-4 z-40 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-red px-5 py-3 text-sm font-bold text-white shadow-soft sm:hidden"
        >
          <ShoppingBasket size={18} aria-hidden="true" />
          Carrinho • {formatCurrency(totalCents)}
        </button>
      ) : null}
    </>
  );
}
