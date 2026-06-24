// ───────────────────────────────────────────────────────────────────────────
// DADOS DA LANDING (estáticos)
//
// Esta landing é um app independente do e-commerce. Em vez de buscar o catálogo
// no Supabase, os produtos da vitrine e as informações da loja ficam congelados
// aqui. Para trocar os produtos em destaque, editar este arquivo (é o único
// lugar). Preços são valores de referência.
// ───────────────────────────────────────────────────────────────────────────

export type ShowcaseProduct = {
  id: string;
  name: string;
  sku: string;
  brandName: string;
  categoryName: string;
  /** Preço de referência em centavos. <= 0 vira "Sob consulta". */
  priceCents: number;
  unit: string;
  shortDescription: string;
  stockStatus: "available" | "unavailable" | "on_request";
  imageUrl: string;
};

// Vitrine: seleção de produtos profissionais em destaque. Imagens demonstrativas.
export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "02131",
    name: "AWLGRIP AWLCAT 2 AGENTE DE CURA OG3010 3,785L",
    sku: "02131",
    brandName: "Awlgrip",
    categoryName: "Linha Náutica",
    priceCents: 211238,
    unit: "UN",
    shortDescription: "Agente de cura da linha Awlgrip para acabamento náutico de alta performance.",
    stockStatus: "available",
    imageUrl: "/products/examples/weg-tinta-galao.png"
  },
  {
    id: "02130",
    name: "AWLGRIP AWLCRAFT 3000 BASE VERNIZ TF0300 3,785L",
    sku: "02130",
    brandName: "Awlgrip",
    categoryName: "Linha Náutica",
    priceCents: 174652,
    unit: "UN",
    shortDescription: "Base verniz Awlcraft 3000 para pintura náutica de alto brilho e durabilidade.",
    stockStatus: "available",
    imageUrl: "/products/examples/3m-finesse-it-polish.png"
  },
  {
    id: "02132",
    name: "AWLGRIP AWLGRIP REDUCER FAST SPRAY OT0001 5L",
    sku: "02132",
    brandName: "Awlgrip",
    categoryName: "Linha Náutica",
    priceCents: 92836,
    unit: "UN",
    shortDescription: "Redutor de secagem rápida para aplicação a pistola da linha Awlgrip.",
    stockStatus: "available",
    imageUrl: "/products/examples/weg-diluente.png"
  },
  {
    id: "00977",
    name: "SIKKENS BRANCO PURO 3,75L",
    sku: "00977",
    brandName: "Sikkens",
    categoryName: "Linha Náutica",
    priceCents: 47550,
    unit: "UN",
    shortDescription: "Esmalte branco puro Sikkens para acabamento náutico e automotivo.",
    stockStatus: "available",
    imageUrl: "/products/examples/sikaflex-295-uv.png"
  },
  {
    id: "01133",
    name: "SIKKENS BT 328 PRIMER EPOXI CINZA 3L",
    sku: "01133",
    brandName: "Sikkens",
    categoryName: "Linha Náutica",
    priceCents: 40551,
    unit: "UN",
    shortDescription: "Primer epóxi cinza para preparação e proteção anticorrosiva de superfícies.",
    stockStatus: "available",
    imageUrl: "/products/examples/weg-tinta-galao.png"
  },
  {
    id: "01183",
    name: "SIKKENS PLUS REDUCER MEDIUM 5L",
    sku: "01183",
    brandName: "Sikkens",
    categoryName: "Linha Náutica",
    priceCents: 26573,
    unit: "UN",
    shortDescription: "Redutor médio Sikkens Plus para diluição e aplicação uniforme.",
    stockStatus: "available",
    imageUrl: "/products/examples/3m-finesse-it-polish.png"
  },
  {
    id: "00978",
    name: "SIKKENS REDUTOR PU 1L",
    sku: "00978",
    brandName: "Sikkens",
    categoryName: "Linha Náutica",
    priceCents: 6359,
    unit: "UN",
    shortDescription: "Redutor PU Sikkens para sistemas de poliuretano de acabamento.",
    stockStatus: "available",
    imageUrl: "/products/examples/weg-diluente.png"
  },
  {
    id: "01003",
    name: "WEG CATALISADOR (WEGPOXI WET SURFACE 89) 520ML",
    sku: "01003",
    brandName: "WEG",
    categoryName: "Linha Náutica",
    priceCents: 9437,
    unit: "UN",
    shortDescription: "Catalisador WEGPOXI Wet Surface 89 para aplicação em superfícies úmidas.",
    stockStatus: "available",
    imageUrl: "/products/examples/sikaflex-295-uv.png"
  }
];

// Marcas parceiras exibidas na seção "Marcas" (logos em public/brand/marcas).
export const partnerBrands: { name: string; logo: string }[] = [
  { name: "3M", logo: "/brand/marcas/3m.webp" },
  { name: "Awlgrip", logo: "/brand/marcas/awlgrip.webp" },
  { name: "International", logo: "/brand/marcas/international.webp" },
  { name: "Norton", logo: "/brand/marcas/norton-saint-gobain.webp" },
  { name: "PropGlide", logo: "/brand/marcas/propglide-preto.webp" },
  { name: "Sika", logo: "/brand/marcas/sika.webp" },
  { name: "Sikkens", logo: "/brand/marcas/sikkens.webp" },
  { name: "WEG", logo: "/brand/marcas/weg.webp" }
];

// Informações da loja (mesmos valores do e-commerce).
export const store = {
  companyName: "Náutica Color",
  location: "Marina Verolme, Angra dos Reis - RJ",
  phone: "(24) 2404-4606",
  whatsappVisible: "(24) 99844-7844",
  whatsappVisible2: "(24) 99303-7332",
  instagram: "@nauticacolor",
  heroImage: "/hero/fachada-nautica.png"
};
