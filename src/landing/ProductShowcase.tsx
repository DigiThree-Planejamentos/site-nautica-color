import { ProductCard } from "@/landing/ProductCard";
import { Reveal } from "@/landing/Reveal";
import { buildProductMessage, whatsappUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/catalog";

/**
 * Vitrine visual de produtos selecionados para a landing page.
 * Cada card traz foto, preço e as duas ações: adicionar ao carrinho de orçamento
 * e "Falar no WhatsApp" (já com a mensagem do produto preenchida para o atendimento).
 */
export function ProductShowcase({ products, whatsappNumber }: { products: Product[]; whatsappNumber: string }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 90} className="h-full">
          <ProductCard
            product={product}
            whatsappUrl={whatsappUrl(buildProductMessage(product), whatsappNumber)}
          />
        </Reveal>
      ))}
    </div>
  );
}
