import { unstable_cache } from "next/cache";
import { demoCatalog } from "@/lib/catalog/demo-data";
import { mapBrand, mapCategory, mapProduct, mapSetting, mapSite, stringifySetting } from "@/lib/catalog/mappers";
import { productPhotos } from "@/lib/catalog/product-photos";
import { hasSupabaseEnv, supabase } from "@/lib/supabase/public-client";
import type { CatalogData } from "@/types/catalog";

const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || "nautica-color";
const catalogQueryTimeoutMs = 4000;

// Aplica as fotos reais por slug em todos os produtos do catálogo, valendo em
// qualquer tela que use getCatalog (home, catálogo, produto, relacionados).
function withProductPhotos(catalog: CatalogData): CatalogData {
  return {
    ...catalog,
    products: catalog.products.map((product) =>
      productPhotos[product.slug] ? { ...product, imageUrl: productPhotos[product.slug] } : product
    )
  };
}

// O catálogo embute brand+category em cada produto, o que duplica ~340 objetos
// por 1.936 produtos e estoura o limite de 2 MB do unstable_cache. Então
// removemos as relações antes de cachear e reanexamos depois (barato, por id).
function stripRelations(catalog: CatalogData): CatalogData {
  return {
    ...catalog,
    products: catalog.products.map((product) => {
      const slim = { ...product };
      delete slim.brand;
      delete slim.category;
      return slim;
    })
  };
}

function attachRelations(catalog: CatalogData): CatalogData {
  const brandById = new Map(catalog.brands.map((brand) => [brand.id, brand]));
  const categoryById = new Map(catalog.categories.map((category) => [category.id, category]));
  return {
    ...catalog,
    products: catalog.products.map((product) => ({
      ...product,
      brand: product.brand ?? brandById.get(product.brandId),
      category: product.category ?? categoryById.get(product.categoryId)
    }))
  };
}

function withTimeout<T>(promise: PromiseLike<T>, timeoutMs: number, message: string): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(message)), timeoutMs);
    })
  ]);
}

async function fetchCatalog(): Promise<CatalogData> {
  if (!hasSupabaseEnv) return stripRelations(withProductPhotos(demoCatalog));

  try {
    const { data: siteRow, error: siteError } = await withTimeout(
      supabase
        .from("store_sites")
        .select("*")
        .eq("slug", siteSlug)
        .eq("active", true)
        .single(),
      catalogQueryTimeoutMs,
      "Catalog site query timed out."
    );

    if (siteError || !siteRow) throw siteError;
    const site = mapSite(siteRow);

    const [brandsResult, categoriesResult, productsResult, settingsResult] = await withTimeout(
      Promise.all([
        Promise.resolve(supabase.from("store_brands").select("*").eq("site_id", site.id).eq("active", true).order("sort_order")),
        Promise.resolve(supabase.from("store_categories").select("*").eq("site_id", site.id).eq("active", true).order("sort_order")),
        Promise.resolve(
          supabase
            .from("store_products")
            .select("*, store_brands(*), store_categories(*)")
            .eq("site_id", site.id)
            .eq("active", true)
            .order("featured", { ascending: false })
            .order("name")
        ),
        Promise.resolve(supabase.from("store_settings").select("*").eq("site_id", site.id).eq("is_public", true))
      ]),
      catalogQueryTimeoutMs,
      "Catalog detail queries timed out."
    );

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

    return stripRelations(withProductPhotos({ site, brands, categories, products, settings }));
  } catch (error) {
    console.error("Catalog query failed. Rendering demo fallback.", error);
    return stripRelations(withProductPhotos(demoCatalog));
  }
}

const getCachedCatalog = unstable_cache(fetchCatalog, ["catalog", siteSlug], {
  revalidate: 60,
  tags: ["catalog"]
});

// Lê o catálogo (cacheado e enxuto) e reanexa brand/category a cada produto.
export async function getCatalog(): Promise<CatalogData> {
  return attachRelations(await getCachedCatalog());
}
