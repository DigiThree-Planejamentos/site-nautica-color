"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Brush, LifeBuoy, MessageCircle, Search, ShieldCheck, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Brand, Category, Product } from "@/types/catalog";

type Sort = "featured" | "price-asc" | "price-desc" | "alpha";

export function CatalogClient({
  products,
  brands,
  categories,
  supportUrl
}: {
  products: Product[];
  brands: Brand[];
  categories: Category[];
  supportUrl: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [brand, setBrand] = useState(searchParams.get("marca") ?? "");
  const [category, setCategory] = useState(searchParams.get("categoria") ?? "");
  const [sort, setSort] = useState<Sort>((searchParams.get("ordem") as Sort) || "featured");
  const [minPrice, setMinPrice] = useState(searchParams.get("preco_min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("preco_max") ?? "");
  const [inStockOnly, setInStockOnly] = useState(searchParams.get("estoque") === "1");
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const activeFilters = [query.trim(), brand, category, minPrice, maxPrice, inStockOnly ? "1" : ""].filter(Boolean).length;

  // Contadores por categoria/marca (sobre todo o catálogo).
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      const slug = product.category?.slug;
      if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
    });
    return counts;
  }, [products]);
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      const slug = product.brand?.slug;
      if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
    });
    return counts;
  }, [products]);
  const priceBounds = useMemo(() => {
    const prices = products.map((product) => product.priceCents).filter((cents) => cents > 0);
    if (prices.length === 0) return { min: 0, max: 0 };
    return { min: Math.floor(Math.min(...prices) / 100), max: Math.ceil(Math.max(...prices) / 100) };
  }, [products]);
  const buyingGuides = [
    {
      icon: ShieldCheck,
      title: "Linha náutica",
      text: "Tintas, primers e produtos para proteção e manutenção do casco.",
      href: "/produtos?categoria=linha-nautica"
    },
    {
      icon: Brush,
      title: "Acabamento e pintura",
      text: "Tintas, vernizes, rolos, pincéis e materiais para um bom acabamento.",
      href: "/produtos?categoria=artigos-de-pintura"
    },
    {
      icon: Sparkles,
      title: "Fibra e reparos",
      text: "Resinas, tecidos e abrasivos para correções, laminação e preparação.",
      href: "/produtos?categoria=fiberglass"
    }
  ];

  function updateUrl(next: { q?: string; marca?: string; categoria?: string; ordem?: string; preco_min?: string; preco_max?: string; estoque?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    startTransition(() => router.replace(`/produtos?${params.toString()}`, { scroll: false }));
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const minCents = minPrice ? Math.round(parseFloat(minPrice.replace(",", ".")) * 100) : null;
    const maxCents = maxPrice ? Math.round(parseFloat(maxPrice.replace(",", ".")) * 100) : null;
    const hasPriceFilter = Number.isFinite(minCents) || Number.isFinite(maxCents);
    return products
      .filter((product) => {
        const matchesQuery = normalized
          ? `${product.name} ${product.sku} ${product.shortDescription} ${product.brand?.name ?? ""} ${product.category?.name ?? ""} ${product.tags.join(" ")}`.toLowerCase().includes(normalized)
          : true;
        if (!matchesQuery) return false;
        if (brand && product.brand?.slug !== brand) return false;
        if (category && product.category?.slug !== category) return false;
        if (inStockOnly && product.stockStatus !== "available") return false;
        if (hasPriceFilter) {
          // "Sob consulta" (preço 0) não entra quando há filtro de faixa de preço.
          if (product.priceCents <= 0) return false;
          if (minCents !== null && product.priceCents < minCents) return false;
          if (maxCents !== null && product.priceCents > maxCents) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc" || sort === "price-desc") {
          // Produtos "sob consulta" (preço 0) vão sempre para o fim, em qualquer direção.
          const av = a.priceCents > 0 ? a.priceCents : null;
          const bv = b.priceCents > 0 ? b.priceCents : null;
          if (av === null && bv === null) return a.name.localeCompare(b.name, "pt-BR");
          if (av === null) return 1;
          if (bv === null) return -1;
          return sort === "price-asc" ? av - bv : bv - av;
        }
        if (sort === "alpha") return a.name.localeCompare(b.name, "pt-BR");
        return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name, "pt-BR");
      });
  }, [brand, category, products, query, sort, minPrice, maxPrice, inStockOnly]);

  // Paginação leve: ~2.000 produtos não podem ser renderizados de uma vez.
  const pageSize = 48;
  const [visibleCount, setVisibleCount] = useState(pageSize);
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [query, brand, category, sort, minPrice, maxPrice, inStockOnly]);
  const visibleProducts = filtered.slice(0, visibleCount);

  function clearFilters() {
    setQuery("");
    setBrand("");
    setCategory("");
    setSort("featured");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    startTransition(() => router.replace("/produtos", { scroll: false }));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-red">Comprar por categoria</p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-navy">Comece pela etapa do serviço.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-ink/65">
            Use os atalhos para filtrar rapidamente e depois refine por marca, termo ou ordenação.
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((item) => {
            const selected = category === item.slug;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  const next = selected ? "" : item.slug;
                  setCategory(next);
                  updateUrl({ categoria: next });
                }}
                className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold transition ${
                  selected ? "bg-navy text-white" : "bg-sky text-navy hover:bg-navy hover:text-white"
                }`}
              >
                {item.name}
                <span className={selected ? "text-white/70" : "text-navy/45"}>{categoryCounts[item.slug] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {brands.some((item) => item.logoUrl) ? (
        <div className="mb-8 rounded-lg bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">Marcas parceiras</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {brands
              .filter((item) => item.logoUrl)
              .map((item) => {
                const selected = brand === item.slug;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      const next = selected ? "" : item.slug;
                      setBrand(next);
                      updateUrl({ marca: next });
                    }}
                    aria-pressed={selected}
                    title={`Filtrar por ${item.name}`}
                    className={`inline-flex h-16 w-28 items-center justify-center rounded-xl border px-3 transition ${
                      selected ? "border-red bg-red/5" : "border-navy/10 bg-white hover:border-navy/30"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.logoUrl!} alt={item.name} className="max-h-10 w-auto max-w-full object-contain" loading="lazy" />
                  </button>
                );
              })}
          </div>
        </div>
      ) : null}

      <div className="rounded-lg bg-white p-4 shadow-soft">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red">Filtros</p>
            <h2 className="font-heading text-2xl font-bold text-navy">Refine sua busca</h2>
          </div>
          <p className="text-sm font-semibold text-ink/60">
            {activeFilters > 0 ? `${activeFilters} filtro(s) ativo(s)` : "Nenhum filtro ativo"}
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className="relative block">
            <span className="sr-only">Buscar produto</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/45" size={18} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                updateUrl({ q: event.target.value });
              }}
              placeholder="Buscar por nome, SKU, marca ou aplicação"
              className="h-12 w-full rounded-full border border-navy/15 pl-11 pr-4 text-sm"
            />
          </label>
          <label>
            <span className="sr-only">Filtrar por marca</span>
            <select
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                updateUrl({ marca: event.target.value });
              }}
              className="h-12 w-full rounded-full border border-navy/15 px-4 text-sm"
            >
              <option value="">Todas as marcas</option>
              {brands.map((item) => <option key={item.id} value={item.slug}>{item.name} ({brandCounts[item.slug] ?? 0})</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filtrar por categoria</span>
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                updateUrl({ categoria: event.target.value });
              }}
              className="h-12 w-full rounded-full border border-navy/15 px-4 text-sm"
            >
              <option value="">Todas as categorias</option>
              {categories.map((item) => <option key={item.id} value={item.slug}>{item.name} ({categoryCounts[item.slug] ?? 0})</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Ordenar produtos</span>
            <select
              value={sort}
              onChange={(event) => {
                const value = event.target.value as Sort;
                setSort(value);
                updateUrl({ ordem: value });
              }}
              className="h-12 w-full rounded-full border border-navy/15 px-4 text-sm"
            >
              <option value="featured">Destaques primeiro</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="alpha">Ordem alfabética</option>
            </select>
          </label>
          <button type="button" onClick={clearFilters} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-off-white px-5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white">
            <X size={16} aria-hidden="true" /> Limpar
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4 border-t border-navy/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-navy">Preço</span>
            <label className="relative">
              <span className="sr-only">Preço mínimo</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-navy/45">R$</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={minPrice}
                onChange={(event) => {
                  setMinPrice(event.target.value);
                  updateUrl({ preco_min: event.target.value });
                }}
                placeholder={String(priceBounds.min)}
                className="h-11 w-28 rounded-full border border-navy/15 pl-9 pr-3 text-sm"
              />
            </label>
            <span className="text-navy/45">—</span>
            <label className="relative">
              <span className="sr-only">Preço máximo</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-navy/45">R$</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                value={maxPrice}
                onChange={(event) => {
                  setMaxPrice(event.target.value);
                  updateUrl({ preco_max: event.target.value });
                }}
                placeholder={String(priceBounds.max)}
                className="h-11 w-28 rounded-full border border-navy/15 pl-9 pr-3 text-sm"
              />
            </label>
          </div>
          <label className="inline-flex cursor-pointer select-none items-center gap-2 rounded-full bg-off-white px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-sky sm:ml-auto">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => {
                setInStockOnly(event.target.checked);
                updateUrl({ estoque: event.target.checked ? "1" : "" });
              }}
              className="h-4 w-4 accent-red"
            />
            Somente em estoque
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
        {buyingGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link key={guide.title} href={guide.href} className="group rounded-lg bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
              <Icon className="text-red" size={26} aria-hidden="true" />
              <h2 className="mt-4 font-heading text-xl font-bold text-navy group-hover:text-red">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/70">{guide.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red">
                Ver produtos <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          );
        })}
        <a
          href={supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-navy p-5 text-white shadow-soft transition hover:bg-navy-light"
        >
          <LifeBuoy className="text-red" size={26} aria-hidden="true" />
          <h2 className="mt-4 font-heading text-xl font-bold">Não sabe por onde começar?</h2>
          <p className="mt-2 text-sm leading-6 text-white/75">Fale com a equipe para validar aplicação, rendimento, estoque e preço antes de comprar.</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
            <MessageCircle size={16} aria-hidden="true" /> Pedir indicação
          </span>
        </a>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold text-navy">
            {filtered.length} produto(s) encontrado(s)
            {filtered.length > visibleProducts.length ? ` · mostrando ${visibleProducts.length}` : ""}
          </p>
          <p className="mt-1 text-sm text-ink/60">Preços de referência. Disponibilidade e aplicação são confirmadas pela equipe.</p>
        </div>
        {isPending ? <p className="text-sm text-ink/60">Atualizando filtros...</p> : <SlidersHorizontal className="text-red" size={22} aria-hidden="true" />}
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
                  transition={{
                    duration: reduce ? 0 : 0.3,
                    ease,
                    delay: reduce ? 0 : Math.min(index % pageSize, 8) * 0.03
                  }}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {filtered.length > visibleProducts.length ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + pageSize)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-white transition hover:bg-red"
              >
                Carregar mais ({filtered.length - visibleProducts.length} restante(s)) <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-8 rounded-lg bg-white p-12 text-center shadow-soft">
          <h2 className="font-heading text-2xl font-bold text-navy">Nenhum produto encontrado.</h2>
          <p className="mt-2 text-ink/70">Tente ajustar os filtros ou fale com a equipe para uma indicação personalizada.</p>
          <button type="button" onClick={clearFilters} className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red px-5 text-sm font-semibold text-white transition hover:bg-red-bright">
            Limpar filtros <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
