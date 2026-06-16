import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/CatalogClient";
import { getCatalog } from "@/lib/catalog/get-catalog";

export const metadata = {
  title: "Produtos | Náutica Color",
  description: "Catálogo de tintas náuticas, antifouling, abrasivos, fiberglass, acabamentos e produtos de proteção."
};

export default async function ProductsPage() {
  const { products, brands, categories } = await getCatalog();

  return (
    <main>
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-bold uppercase tracking-[0.2em] text-white/65">Catálogo</p>
          <h1 className="mt-3 font-heading text-5xl font-extrabold">Produtos para o carrinho</h1>
          <p className="mt-4 max-w-2xl text-white/75">Pesquise, filtre e monte seu carrinho. Preço, estoque e condições serão confirmados pela equipe no WhatsApp.</p>
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16">Carregando produtos...</div>}>
        <CatalogClient products={products} brands={brands} categories={categories} />
      </Suspense>
    </main>
  );
}
