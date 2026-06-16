import { getCatalog } from "@/lib/catalog/get-catalog";

export async function getBrands() {
  return (await getCatalog()).brands;
}
