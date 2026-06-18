import type { Brand, CatalogData, Category, Product, StoreSite } from "@/types/catalog";

const site: StoreSite = { id: "00000000-0000-4000-8000-000000000001", slug: "nautica-color", name: "Náutica Color", active: true };

export const demoBrands: Brand[] = [
  ["Jotun", "jotun", null],
  ["Norton", "norton", null],
  ["AkzoNobel", "akzonobel", null],
  ["Sikkens", "sikkens", "akzonobel"],
  ["Wanda", "wanda", "akzonobel"],
  ["Colorgel Marine", "colorgel-marine", null]
].map(([name, slug, parent], index) => ({
  id: `brand-${slug}`,
  siteId: site.id,
  parentBrandId: parent ? `brand-${parent}` : null,
  name: String(name),
  slug: String(slug),
  logoUrl: null,
  description: null,
  active: true,
  sortOrder: index + 1
}));

export const demoCategories: Category[] = [
  "Tintas de fundo e primers",
  "Antifouling",
  "Vernizes e acabamentos",
  "Lixas e abrasivos",
  "Fiberglass e compósitos",
  "Limpeza, proteção e polimento"
].map((name, index) => ({
  id: `category-${index + 1}`,
  siteId: site.id,
  name,
  slug: [
    "tintas-de-fundo-e-primers",
    "antifouling",
    "vernizes-e-acabamentos",
    "lixas-e-abrasivos",
    "fiberglass-e-compositos",
    "limpeza-protecao-e-polimento"
  ][index],
  description: null,
  imageUrl: null,
  active: true,
  sortOrder: index + 1
}));

// Imagens de exemplo (artes de feed) em alguns destaques, só para demonstração.
// TODO: substituir por fotos de produto isoladas (fundo transparente) quando houver.
const exampleImages: Record<string, string> = {
  "JOT-SFA-36": "/products/examples/exemplo-antifouling.png",
  "SIK-AUTOCLEAR-1": "/products/examples/exemplo-linha-produtos.png",
  "WAN-PRIMER-5100": "/products/examples/exemplo-atendimento.png"
};

const imageFor = (sku: string) => {
  if (exampleImages[sku]) return exampleImages[sku];
  if (sku.includes("T277")) return "/products/placeholders/folha-lixa.svg";
  if (sku.includes("A275")) return "/products/placeholders/disco-lixa.svg";
  if (sku.includes("BOINA")) return "/products/placeholders/boina.svg";
  if (sku.includes("SPRAY")) return "/products/placeholders/frasco.svg";
  if (sku.includes("RESINA")) return "/products/placeholders/galao.svg";
  if (sku.includes("TECIDO")) return "/products/placeholders/fibra.svg";
  return "/products/placeholders/lata.svg";
};

const rawProducts = [
  ["JOT-SFA-36", "Jotun SeaForce Active 3,6 L", "jotun", "antifouling", 95000, "Galão 3,6 L", true, "Revestimento anti-incrustante para proteção do casco."],
  ["NOR-T277", "Folha de Lixa d'Água T277", "norton", "lixas-e-abrasivos", 290, "Unidade", true, "Lixa para trabalhos úmidos em superfícies, primers e compostos."],
  ["NOR-A275-127", "Disco de Lixa A275 127 mm", "norton", "lixas-e-abrasivos", 161, "Unidade", false, "Disco abrasivo para preparação e acabamento de superfícies."],
  ["NOR-LIQUID-ICE-1", "Massa de Polir Liquid Ice Ultra 1 kg", "norton", "limpeza-protecao-e-polimento", 7307, "Embalagem 1 kg", true, "Massa para corte e remoção de pequenas imperfeições."],
  ["NOR-BOINA-8", "Boina de Espuma Dupla Face 8 polegadas", "norton", "limpeza-protecao-e-polimento", 11418, "Unidade", false, "Boina de espuma para acabamento e polimento."],
  ["NOR-MASSA-BASE-AGUA", "Massa de Polir Base d'Água 1 kg", "norton", "limpeza-protecao-e-polimento", 3417, "Embalagem 1 kg", false, "Massa de polir à base d'água para acabamento de superfícies."],
  ["NOR-SPRAY-946", "Spray de Acabamento Liquid Ice 946 ml", "norton", "limpeza-protecao-e-polimento", 12000, "Frasco 946 ml", false, "Spray para limpeza e acabamento após o polimento."],
  ["SIK-AUTOCLEAR-1", "Autoclear Plus HS 1 L", "sikkens", "vernizes-e-acabamentos", 10700, "Lata 1 L", true, "Verniz de alta performance para acabamento e brilho."],
  ["SIK-REDUCER-1", "Plus Reducer Medium 1 L", "sikkens", "vernizes-e-acabamentos", 6600, "Lata 1 L", false, "Diluente universal para diferentes aplicações."],
  ["SIK-AUTOCLEAR-5", "Autoclear Plus HS 5 L", "sikkens", "vernizes-e-acabamentos", 45900, "Galão 5 L", false, "Verniz de alta performance em embalagem profissional."],
  ["WAN-PRIMER-5100", "Primer PU 5100 com Catalisador", "wanda", "tintas-de-fundo-e-primers", 5200, "Kit 900 ml", true, "Primer de enchimento para preparação de superfícies."],
  ["WAN-VERNIZ-5100", "Verniz PU 5100 com Catalisador", "wanda", "vernizes-e-acabamentos", 5890, "Kit 900 ml", true, "Verniz de secagem rápida e acabamento de alto brilho."],
  ["COL-GELCOAT-BRANCO", "Colorgel Marine Gelcoat Branco", "colorgel-marine", "fiberglass-e-compositos", 7590, "Embalagem 1 kg", true, "Gelcoat demonstrativo para acabamento de peças náuticas."],
  ["COL-RESINA-5", "Resina Poliéster para Laminação", "colorgel-marine", "fiberglass-e-compositos", 15493, "Kit 5 kg", false, "Resina demonstrativa para trabalhos de laminação e fibra."],
  ["COL-TECIDO-190", "Tecido de Fibra de Vidro 190 g", "colorgel-marine", "fiberglass-e-compositos", 2000, "Metro", false, "Tecido de fibra de vidro para reforço e reparos."],
  ["COL-PRIMER-BRANCO", "Gelcoat Primer Branco", "colorgel-marine", "tintas-de-fundo-e-primers", 5000, "Kit 1 kg", false, "Primer demonstrativo para preparação de peças em fibra."]
] as const;

export const demoProducts: Product[] = rawProducts.map(([sku, name, brandSlug, categorySlug, priceCents, unit, featured, shortDescription]) => {
  const brand = demoBrands.find((item) => item.slug === brandSlug)!;
  const category = demoCategories.find((item) => item.slug === categorySlug)!;
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: `product-${sku.toLowerCase()}`,
    siteId: site.id,
    brandId: brand.id,
    categoryId: category.id,
    sku,
    slug,
    name,
    shortDescription,
    description: `${shortDescription} Produto demonstrativo do catálogo Náutica Color. Confirme disponibilidade, especificações e aplicação correta com nossa equipe.`,
    priceCents,
    unit,
    imageUrl: imageFor(sku),
    active: true,
    featured,
    demoPrice: true,
    stockStatus: "on_request",
    tags: [brand.name, category.name],
    brand,
    category
  };
});

export const demoSettings: CatalogData["settings"] = {
  company_name: "Náutica Color",
  location: "Marina Verolme, Angra dos Reis - RJ",
  phone: "(24) 2404-4606",
  whatsapp_visible: "(24) 99844-7844",
  whatsapp_number: "5524998447844",
  instagram: "@nauticacolor",
  positioning: "Mais do que pintura, é sobre preservar valor, estética e prestígio.",
  price_notice: "Valores demonstrativos sujeitos à confirmação."
};

export const demoCatalog: CatalogData = {
  site,
  brands: demoBrands,
  categories: demoCategories,
  products: demoProducts,
  settings: demoSettings
};
