export type StockStatus = "available" | "unavailable" | "on_request";

export type StoreSite = {
  id: string;
  slug: string;
  name: string;
  active: boolean;
};

export type Brand = {
  id: string;
  siteId: string;
  parentBrandId: string | null;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
  active: boolean;
  sortOrder: number;
};

export type Category = {
  id: string;
  siteId: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  active: boolean;
  sortOrder: number;
};

export type Product = {
  id: string;
  siteId: string;
  brandId: string;
  categoryId: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string | null;
  priceCents: number;
  unit: string;
  imageUrl: string | null;
  active: boolean;
  featured: boolean;
  demoPrice: boolean;
  stockStatus: StockStatus;
  tags: string[];
  brand?: Brand;
  category?: Category;
};

export type SiteSetting = {
  id: string;
  siteId: string;
  key: string;
  value: unknown;
  isPublic: boolean;
};

export type CatalogData = {
  site: StoreSite | null;
  brands: Brand[];
  categories: Category[];
  products: Product[];
  settings: Record<string, string>;
};
