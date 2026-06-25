/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/WhatsappIcon";

/**
 * Cabeçalho enxuto da landing: logo + um CTA de WhatsApp.
 *
 * O final (base) do header é uma onda PARADA que funciona como lâmina d'água: o
 * fundo branco do header fica ACIMA da curva; o azul-marinho da Náutica
 * (#002659) é a "água" que preenche ABAIXO da curva, subindo da esquerda para a
 * direita na proporção do scroll. A onda (formato) não se move.
 */
// Faixa de onda repetível (um comprimento = 60px). `side` define qual metade é
// pintada: "above" (silhueta branca do header) ou "below" (água navy). A curva
// é idêntica nas duas, então elas se encaixam exatamente na lâmina d'água.
const waveBand = (color: string, side: "above" | "below") => {
  const curve = "M0%206%20Q15%203%2030%206%20T60%206";
  const close = side === "above" ? "V0%20H0%20Z" : "V12%20H0%20Z";
  return `url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='60'%20height='12'%20viewBox='0%200%2060%2012'%3E%3Cpath%20d='${curve}%20${close}'%20fill='${color}'/%3E%3C/svg%3E")`;
};
const WAVE_WHITE = waveBand("%23ffffff", "above");
const WAVE_NAVY = waveBand("%23002659", "below");
export function Header({ supportUrl }: { supportUrl: string }) {
  const [progress, setProgress] = useState(0); // 0..1 do scroll total da página

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#topo" className="flex items-center gap-3" aria-label="Náutica Color">
          <img src="/brand/nautica-color-logo.png" alt="Náutica Color" className="h-10 w-auto" />
        </a>
        <a
          href={supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-red px-4 text-sm font-semibold text-white transition hover:bg-red-bright sm:px-5"
        >
          <WhatsappIcon className="h-4 w-4" />{" "}
          <span className="hidden sm:inline">Falar no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>

      {/* Onda parada (lâmina d'água) na base do header, pendurada na borda
          inferior. O navy "sobe" da esquerda para a direita conforme o scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-full h-3"
      >
        {/* Silhueta: o branco do header termina em onda (acima da curva). */}
        <div
          className="header-edge-wave absolute inset-0"
          style={{ backgroundImage: WAVE_WHITE }}
        />
        {/* Água navy abaixo da curva, recortada pela proporção do scroll. */}
        <div
          className="header-edge-wave absolute inset-y-0 left-0"
          style={{ width: `${progress * 100}%`, backgroundImage: WAVE_NAVY }}
        />
      </div>
    </header>
  );
}
