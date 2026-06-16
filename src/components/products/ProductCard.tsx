import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatCurrency } from "@/lib/currency";
import type { Product } from "@/types/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-navy/10 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/produtos/${product.slug}`} className="block rounded-lg bg-off-white p-4">
        <ProductImage src={product.imageUrl} alt={product.name} className="mx-auto h-44 w-full object-contain" />
      </Link>
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-red">{product.brand?.name}</p>
        <h2 className="mt-2 font-heading text-xl font-bold leading-tight text-navy">
          <Link href={`/produtos/${product.slug}`} className="hover:text-red">{product.name}</Link>
        </h2>
        <p className="mt-2 text-sm text-ink/65">{product.unit}</p>
        <p className="mt-3 flex-1 text-sm leading-6 text-ink/75">{product.shortDescription}</p>
        <div className="mt-4">
          <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-bold text-navy">Preço de referência</span>
          <p className="mt-2 font-heading text-2xl font-bold text-ink">{formatCurrency(product.priceCents)}</p>
          <p className="mt-1 text-xs text-ink/55">Valores demonstrativos sujeitos à confirmação de preço e disponibilidade.</p>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <AddToCartButton product={product} className="w-full" />
          <Link href={`/produtos/${product.slug}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-off-white px-4 text-sm font-semibold text-navy hover:bg-navy hover:text-white">
            Detalhes <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
