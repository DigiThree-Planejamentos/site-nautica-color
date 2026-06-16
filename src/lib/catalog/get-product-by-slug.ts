import { getCatalog } from "@/lib/catalog/get-catalog";

export async function getProductBySlug(slug: string) {
  return (await getCatalog()).products.find((product) => product.slug === slug) ?? null;
}
