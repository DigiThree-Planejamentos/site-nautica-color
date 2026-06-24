/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsappIcon } from "@/components/WhatsappIcon";

/**
 * Cabeçalho enxuto da landing: logo + um CTA de WhatsApp.
 *
 * Animação de scroll: conforme a página rola para baixo, uma faixa azul-marinho
 * (cor da Náutica, #002659) preenche o header da esquerda para a direita. Na
 * borda direita desse preenchimento corre uma onda vertical animada — a mesma
 * linguagem visual da onda do hero. O conteúdo (logo + botão) é duplicado em
 * versão clara e revelado exatamente sobre o azul, para manter a legibilidade.
 */
export function Header({ supportUrl }: { supportUrl: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 do scroll total da página
  const [headerWidth, setHeaderWidth] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderWidth(el.clientWidth);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

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
      ro.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const fillPx = progress * headerWidth;
  const WAVE_W = 44; // largura do SVG da onda (px)

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 overflow-hidden bg-white/95 backdrop-blur"
    >
      {/* Camada base (sobre branco): logo escuro + botão. */}
      <HeaderInner supportUrl={supportUrl} variant="dark" />

      {/* Camada de preenchimento azul, recortada pela largura do scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden bg-navy"
        style={{ width: `${fillPx}px` }}
      >
        {/* Cópia clara do conteúdo, ancorada à largura total do header para
            alinhar pixel a pixel com a camada base; o recorte acima revela
            apenas a parte que está sobre o azul. */}
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: headerWidth ? `${headerWidth}px` : "100%" }}
        >
          <HeaderInner supportUrl={supportUrl} variant="light" />
        </div>
      </div>

      {/* Onda vertical na borda do preenchimento (visível só durante o scroll). */}
      <ScrollWave leftPx={fillPx} width={WAVE_W} visible={progress > 0.001} />
    </header>
  );
}

function HeaderInner({
  supportUrl,
  variant,
}: {
  supportUrl: string;
  variant: "dark" | "light";
}) {
  const isLight = variant === "light";
  const logo = isLight
    ? "/brand/nautica-color-logo-light.png"
    : "/brand/nautica-color-logo.png";
  // A cópia clara é puramente visual: não recebe foco nem cliques (a camada
  // base, por baixo, é quem responde à interação).
  const interactive = isLight ? "pointer-events-none" : "pointer-events-auto";

  return (
    <div className="pointer-events-none mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        href="#topo"
        className={`${interactive} flex items-center gap-3`}
        aria-label="Náutica Color"
        tabIndex={isLight ? -1 : undefined}
        aria-hidden={isLight ? true : undefined}
      >
        <img src={logo} alt="Náutica Color" className="h-10 w-auto" />
      </a>
      <a
        href={supportUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isLight ? -1 : undefined}
        aria-hidden={isLight ? true : undefined}
        className={`${interactive} inline-flex h-10 items-center justify-center gap-2 rounded-full bg-red px-4 text-sm font-semibold text-white transition hover:bg-red-bright sm:px-5`}
      >
        <WhatsappIcon className="h-4 w-4" />{" "}
        <span className="hidden sm:inline">Falar no WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </div>
  );
}

/**
 * Onda vertical desenhada na borda do preenchimento azul. A metade esquerda do
 * SVG é navy sólido (cobre a emenda reta da faixa) e a borda direita ondula,
 * com as cristas avançando sobre o branco. A onda desliza na vertical
 * (`header-wave-flow`, em globals.css), ecoando o movimento da onda do hero.
 */
function ScrollWave({
  leftPx,
  width,
  visible,
}: {
  leftPx: number;
  width: number;
  visible: boolean;
}) {
  // viewBox em unidades: largura `width`, altura 64 (= h-16). A fronteira do
  // preenchimento fica no x central; cristas avançam para a direita.
  const H = 64;
  const L = 22; // comprimento de onda (em unidades de y)
  const BOUNDARY = width / 2; // x da borda reta da faixa
  const TROUGH = BOUNDARY; // vale da onda encosta na borda
  const CREST = BOUNDARY + 12; // crista avança 12px sobre o branco

  // Constrói uma onda suave (curvas S) que ladrilha de y=-L até y=H+L, para
  // que a animação translateY(-L) seja perfeitamente contínua.
  const d = buildWavePath({ top: -L, bottom: H + L, L, trough: TROUGH, crest: CREST });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 z-[1] will-change-transform"
      style={{
        left: `${leftPx - width / 2}px`,
        width: `${width}px`,
        opacity: visible ? 1 : 0,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <g className="header-wave">
          <path d={d} fill="#002659" />
        </g>
      </svg>
    </div>
  );
}

function buildWavePath({
  top,
  bottom,
  L,
  trough,
  crest,
}: {
  top: number;
  bottom: number;
  L: number;
  trough: number;
  crest: number;
}) {
  const half = L / 2;
  let d = `M0 ${top} L${trough} ${top}`;
  let y = top;
  let atTrough = true;
  // Cada meio comprimento de onda é uma curva S de vale->crista ou crista->vale.
  while (y < bottom) {
    const from = atTrough ? trough : crest;
    const to = atTrough ? crest : trough;
    const c = y + half / 2;
    const e = y + half;
    d += ` C${from} ${c} ${to} ${c} ${to} ${e}`;
    y = e;
    atTrough = !atTrough;
  }
  d += ` L0 ${y} Z`;
  return d;
}
