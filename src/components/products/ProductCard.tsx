import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartStepper } from "@/components/cart/CartStepper";
import { ProductImage } from "@/components/ui/ProductImage";
import { formatPriceLabel, isOnRequestPrice } from "@/lib/currency";
import type { Product } from "@/types/catalog";

export function ProductCard({
  product,
  compact = false,
  showDetailsButton = false
}: {
  product: Product;
  compact?: boolean;
  showDetailsButton?: boolean;
}) {
  const stockLabel = product.stockStatus === "available" ? "Disponível" : product.stockStatus === "unavailable" ? "Indisponível" : "Sob consulta";
  const stockBadge = product.stockStatus === "unavailable" ? "bg-red text-white" : "bg-white text-navy shadow-sm";

  return (
    <article className="group flex h-full flex-col rounded-[28px] border border-navy/10 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:border-red/20 hover:shadow-soft">
      <Link
        href={`/produtos/${product.slug}`}
        className={`relative block overflow-hidden rounded-3xl bg-sky transition group-hover:bg-mist ${compact ? "p-0" : "p-6"}`}
      >
        <span className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold ${stockBadge}`}>
          {stockLabel}
        </span>
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          fit={compact ? "cover" : "contain"}
          className={`w-full transition-transform duration-300 ease-nautica group-hover:scale-105 ${compact ? "h-32" : "mx-auto h-44"}`}
        />
      </Link>
      {compact ? (
        <div className="mt-3 flex flex-1 flex-col px-1">
          <h2 className="line-clamp-2 font-heading text-sm font-bold leading-tight text-navy">
            <Link href={`/produtos/${product.slug}`} className="hover:text-red">{product.name}</Link>
          </h2>
          {showDetailsButton ? (
            <Link
              href={`/produtos/${product.slug}`}
              className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-sm font-semibold text-white transition hover:bg-red"
            >
              Ver detalhes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 flex flex-1 flex-col px-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {product.brand?.logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={product.brand.logoUrl} alt={product.brand.name} className="h-4 w-auto max-w-[72px] object-contain" loading="lazy" />
            ) : null}
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-red">{product.brand?.name}</span>
            {product.category?.name ? (
              <span className="text-xs font-semibold text-ink/45">· {product.category.name}</span>
            ) : null}
          </div>
          <h2 className="mt-1.5 font-heading text-lg font-bold leading-tight text-navy">
            <Link href={`/produtos/${product.slug}`} className="hover:text-red">{product.name}</Link>
          </h2>
          <p className="mt-2 flex-1 text-sm leading-6 text-ink/70">{product.shortDescription}</p>
          <div className="mt-4 flex items-end justify-between gap-2 border-t border-navy/10 pt-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
                {isOnRequestPrice(product.priceCents) ? "Preço" : "Preço de referência"}
              </p>
              <p className="mt-0.5 font-heading text-2xl font-bold text-ink">{formatPriceLabel(product.priceCents)}</p>
            </div>
            <span className="pb-1 text-xs font-semibold text-ink/55">{product.unit}</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <CartStepper product={product} className="flex-1" />
            <Link
              href={`/produtos/${product.slug}`}
              aria-label={`Ver detalhes de ${product.name}`}
              className="inline-flex min-h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky text-navy transition hover:bg-navy hover:text-white"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
