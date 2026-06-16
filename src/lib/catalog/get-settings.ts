import { getCatalog } from "@/lib/catalog/get-catalog";

export async function getSettings() {
  return (await getCatalog()).settings;
}
