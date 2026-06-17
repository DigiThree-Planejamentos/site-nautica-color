"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/catalog";

/**
 * Botão "Adicionar" que se transforma em controle de quantidade ( – qtd + )
 * quando o produto já está no carrinho — inspirado no stepper do Gromuse,
 * adaptado à paleta Náutica (vermelho). Não abre o drawer ao ajustar inline.
 */
export function CartStepper({ product, className = "" }: { product: Product; className?: string }) {
  const { items, addProduct, updateQuantity, removeItem } = useCart();
  const reduce = useReducedMotion();
  const quantity = items.find((item) => item.productId === product.id)?.quantity ?? 0;

  const dur = reduce ? 0 : 0.22;
  const offset = reduce ? 0 : 8;

  const shell =
    "flex min-h-11 w-full items-center justify-center rounded-full bg-red text-sm font-semibold text-white";

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {quantity === 0 ? (
          <motion.button
            key="add"
            type="button"
            onClick={() => addProduct(product, 1, { open: false })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            className={`${shell} gap-2 px-5 transition-colors hover:bg-red-bright focus-visible:outline focus-visible:outline-2`}
          >
            <ShoppingBasket size={18} aria-hidden="true" />
            Adicionar
          </motion.button>
        ) : (
          <motion.div
            key="stepper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
            className={`${shell} justify-between px-1.5`}
          >
            <button
              type="button"
              aria-label={quantity === 1 ? "Remover do carrinho" : "Diminuir quantidade"}
              onClick={() => (quantity === 1 ? removeItem(product.id) : updateQuantity(product.id, quantity - 1))}
              className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Minus size={16} aria-hidden="true" />
            </button>

            <span aria-live="polite" className="min-w-8 overflow-hidden text-center tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={quantity}
                  initial={{ y: offset, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -offset, opacity: 0 }}
                  transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>
            </span>

            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
