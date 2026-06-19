"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Product } from "@/types/catalog";

/**
 * Linha única de produtos com rolagem horizontal: arraste/deslize no mobile e
 * setas no desktop. Usa os cards no modo `compact` para caber mais por linha.
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [products.length]);

  function scrollByDir(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: "smooth" });
  }

  const arrowBase =
    "absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-soft ring-1 ring-navy/10 transition hover:bg-navy hover:text-white lg:grid";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByDir(-1)}
        aria-label="Ver produtos anteriores"
        className={`${arrowBase} left-0 -translate-x-1/2 ${atStart ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByDir(1)}
        aria-label="Ver mais produtos"
        className={`${arrowBase} right-0 translate-x-1/2 ${atEnd ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>
      <div
        ref={ref}
        onScroll={update}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, index) => (
          <Reveal
            key={product.id}
            delay={(index % 4) * 120}
            className="w-[70%] shrink-0 snap-start sm:w-56 lg:w-52"
          >
            <ProductCard product={product} compact showDetailsButton />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
