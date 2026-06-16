export const FALLBACK_IMAGE = "/products/placeholders/lata.svg";

export function productImage(src?: string | null) {
  return src && src.trim().length > 0 ? src : FALLBACK_IMAGE;
}
