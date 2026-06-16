import { getCatalog } from "@/lib/catalog/get-catalog";

export async function getProducts() {
  return (await getCatalog()).products;
}
