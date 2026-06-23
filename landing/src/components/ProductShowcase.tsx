import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { buildProductMessage, resolveWhatsappNumber, whatsappUrl } from "@/lib/whatsapp";
import { showcaseProducts } from "@/data/showcase";

/**
 * Vitrine visual de produtos selecionados. Cada card funila para o WhatsApp do
 * atendimento, com a mensagem do produto já preenchida.
 */
export function ProductShowcase() {
  const number = resolveWhatsappNumber();
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {showcaseProducts.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 90} className="h-full">
          <ProductCard product={product} whatsappUrl={whatsappUrl(buildProductMessage(product), number)} />
        </Reveal>
      ))}
    </div>
  );
}
