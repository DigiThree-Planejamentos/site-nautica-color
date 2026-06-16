import { unstable_cache } from "next/cache";
import { demoCatalog } from "@/lib/catalog/demo-data";
import { mapBrand, mapCategory, mapProduct, mapSetting, mapSite, stringifySetting } from "@/lib/catalog/mappers";
import { hasSupabaseEnv, supabase } from "@/lib/supabase/public-client";
import type { CatalogData } from "@/types/catalog";

const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || "nautica-color";

async function fetchCatalog(): Promise<CatalogData> {
  if (!hasSupabaseEnv) return demoCatalog;

  try {
    const { data: siteRow, error: siteError } = await supabase
      .from("store_sites")
      .select("*")
      .eq("slug", siteSlug)
      .eq("active", true)
      .single();

    if (siteError || !siteRow) throw siteError;
    const site = mapSite(siteRow);

    const [brandsResult, categoriesResult, productsResult, settingsResult] = await Promise.all([
      supabase.from("store_brands").select("*").eq("site_id", site.id).eq("active", true).order("sort_order"),
      supabase.from("store_categories").select("*").eq("site_id", site.id).eq("active", true).order("sort_order"),
      supabase
        .from("store_products")
        .select("*, store_brands(*), store_categories(*)")
        .eq("site_id", site.id)
        .eq("active", true)
        .order("featured", { ascending: false })
        .order("name"),
      supabase.from("store_settings").select("*").eq("site_id", site.id).eq("is_public", true)
    ]);

    if (brandsResult.error) throw brandsResult.error;
    if (categoriesResult.error) throw categoriesResult.error;
    if (productsResult.error) throw productsResult.error;
    if (settingsResult.error) throw settingsResult.error;

    const brands = (brandsResult.data ?? []).map(mapBrand);
    const categories = (categoriesResult.data ?? []).map(mapCategory);
    const settings = Object.fromEntries((settingsResult.data ?? []).map((row) => {
      const setting = mapSetting(row);
      return [setting.key, stringifySetting(setting.value)];
    }));

    const products = (productsResult.data ?? []).map(mapProduct).map((product) => ({
      ...product,
      brand: product.brand ?? brands.find((brand) => brand.id === product.brandId),
      category: product.category ?? categories.find((category) => category.id === product.categoryId)
    }));

    return { site, brands, categories, products, settings };
  } catch (error) {
    console.error("Catalog query failed. Rendering demo fallback.", error);
    return demoCatalog;
  }
}

export const getCatalog = unstable_cache(fetchCatalog, ["catalog", siteSlug], {
  revalidate: 60,
  tags: ["catalog"]
});
