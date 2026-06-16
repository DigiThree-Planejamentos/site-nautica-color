import { getCatalog } from "@/lib/catalog/get-catalog";

export async function getCategories() {
  return (await getCatalog()).categories;
}
