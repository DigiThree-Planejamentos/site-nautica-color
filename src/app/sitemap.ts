import type { MetadataRoute } from "next";
import { storeConfig } from "@/config/store";
import { getProducts } from "@/lib/catalog/get-products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: storeConfig.siteUrl, lastModified: new Date() },
    { url: `${storeConfig.siteUrl}/produtos`, lastModified: new Date() },
    ...products.map((product) => ({
      url: `${storeConfig.siteUrl}/produtos/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
