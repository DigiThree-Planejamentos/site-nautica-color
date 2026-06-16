import { getCatalog } from "@/lib/catalog/get-catalog";

export async function getSite() {
  return (await getCatalog()).site;
}
