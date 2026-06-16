"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { FALLBACK_IMAGE, productImage } from "@/lib/images";

export function ProductImage({ src, alt, className = "" }: { src?: string | null; alt: string; className?: string }) {
  const [imageSrc, setImageSrc] = useState(productImage(src));
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setImageSrc(FALLBACK_IMAGE)}
    />
  );
}
