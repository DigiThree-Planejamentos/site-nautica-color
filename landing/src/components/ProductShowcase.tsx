"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { buildProductMessage, resolveWhatsappNumber, whatsappUrl } from "@/lib/whatsapp";
import { showcaseProducts } from "@/data/showcase";

/**
 * Vitrine visual de produtos selecionados. Cada card funila para o WhatsApp do
 * atendimento, com a mensagem do produto já preenchida.
 */
export function ProductShowcase() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const number = resolveWhatsappNumber();

  const moveCarousel = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * 288,
      behavior: "smooth"
    });
  };

  return (
    <div className="mt-10">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => moveCarousel(-1)}
          aria-label="Ver produtos anteriores"
          className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:border-red hover:bg-red hover:text-white"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => moveCarousel(1)}
          aria-label="Ver próximos produtos"
          className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white text-navy shadow-sm transition hover:border-red hover:bg-red hover:text-white"
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {showcaseProducts.map((product, index) => (
          <div key={product.id} className="w-[250px] shrink-0 snap-start sm:w-[270px]">
            <Reveal delay={(index % 4) * 90} className="h-full">
              <ProductCard product={product} whatsappUrl={whatsappUrl(buildProductMessage(product), number)} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
}
