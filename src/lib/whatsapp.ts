import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/catalog";
import { formatCurrency, formatPriceLabel } from "@/lib/currency";

const fallbackNumber = "5524998447844";

export function resolveWhatsappNumber(settings?: Record<string, string>) {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || settings?.whatsapp_number || fallbackNumber;
}

export function buildQuoteMessage(items: CartItem[]) {
  const lines = items.map((item, index) => {
    const subtotal = item.priceCents * item.quantity;
    return `${index + 1}. ${item.name}
   Quantidade: ${item.quantity}
   Valor de referência unitário: ${formatCurrency(item.priceCents)}
   Subtotal estimado: ${formatCurrency(subtotal)}`;
  });

  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  return `Olá, equipe Náutica Color! Montei um carrinho de compras no site e gostaria de confirmar os seguintes produtos:

${lines.join("\n\n")}

Total estimado: ${formatCurrency(total)}

Os valores apresentados no site são apenas referências e estão sujeitos à confirmação.

Nome:
Embarcação:
Preferência de retirada ou entrega:

Aguardo a confirmação de disponibilidade, valores e condições pelo WhatsApp. Obrigado!`;
}

export function buildSupportMessage() {
  return "Olá, equipe Náutica Color! Acessei o site e gostaria de receber ajuda para escolher os produtos adequados para minha embarcação.";
}

// Mensagem para o botão "Falar no WhatsApp" de um produto específico da vitrine.
// Já chega no atendimento com o nome, código e preço de referência preenchidos.
export function buildProductMessage(product: Product) {
  const brand = product.brand?.name ? ` (${product.brand.name})` : "";
  return `Olá, equipe Náutica Color! Tenho interesse neste produto e gostaria de confirmar disponibilidade, valor e indicação de uso:

• ${product.name}${brand}
Código: ${product.sku}
Preço de referência: ${formatPriceLabel(product.priceCents)}

Os valores do site são apenas referência. Aguardo a confirmação pelo WhatsApp. Obrigado!`;
}

export function whatsappUrl(message: string, number = fallbackNumber) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
