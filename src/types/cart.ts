export type CartItem = {
  productId: string;
  slug: string;
  sku: string;
  name: string;
  brandName: string;
  unit: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
};
