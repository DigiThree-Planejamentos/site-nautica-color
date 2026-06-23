"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Brush,
  Car,
  ChevronDown,
  Cog,
  Combine,
  Disc3,
  Droplets,
  Flame,
  Fuel,
  HardHat,
  Layers,
  LayoutGrid,
  LifeBuoy,
  Magnet,
  Package,
  PaintBucket,
  Puzzle,
  Sailboat,
  Shirt,
  ShoppingBasket,
  Sparkles,
  SprayCan,
  Waves,
  Wrench,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Category } from "@/types/catalog";

// Ícone + descrição curta por categoria real do catálogo. Slugs sem mapa caem
// no fallback (âncora + texto genérico).
const META: Record<string, { icon: LucideIcon; blurb: string }> = {
  solventes: { icon: Droplets, blurb: "Thinners, aguarrás e solventes para limpeza e diluição." },
  "linha-nautica": { icon: Anchor, blurb: "Produtos específicos para manutenção da embarcação." },
  "material-de-limpeza": { icon: SprayCan, blurb: "Limpadores, desengraxantes e itens de limpeza." },
  "adesivos-e-selantes": { icon: Combine, blurb: "Colas, selantes e adesivos para vedação e fixação." },
  "artigos-nauticos": { icon: Sailboat, blurb: "Acessórios e itens essenciais de bordo." },
  "linha-automotiva": { icon: Car, blurb: "Tintas, vernizes e produtos para acabamento automotivo." },
  "e-p-i": { icon: HardHat, blurb: "Equipamentos de proteção individual." },
  fiberglass: { icon: Layers, blurb: "Resinas, mantas e tecidos para fibra e reparos." },
  polimento: { icon: Sparkles, blurb: "Massas, boinas e ceras para corte e brilho." },
  abrasivos: { icon: Disc3, blurb: "Lixas, discos e abrasivos para preparação." },
  conveniencia: { icon: ShoppingBasket, blurb: "Itens de conveniência e uso geral." },
  "eletro-eletronicos": { icon: Zap, blurb: "Componentes e itens eletroeletrônicos." },
  "artigos-de-pintura": { icon: Brush, blurb: "Pincéis, rolos, fitas e materiais de pintura." },
  ferramentas: { icon: Wrench, blurb: "Ferramentas manuais e elétricas." },
  embalagens: { icon: Package, blurb: "Potes, baldes e embalagens." },
  "tintas-de-base": { icon: PaintBucket, blurb: "Tintas de base e fundo para preparação." },
  ferragens: { icon: Cog, blurb: "Parafusos, fixadores e ferragens em geral." },
  pirotecnicos: { icon: Flame, blurb: "Sinalizadores e itens pirotécnicos de segurança." },
  anodos: { icon: Magnet, blurb: "Ânodos de sacrifício contra a corrosão." },
  "oleo-e-lubrificantes": { icon: Fuel, blurb: "Óleos, graxas e lubrificantes." },
  "uniformes-e-bones-brindes": { icon: Shirt, blurb: "Uniformes, bonés e brindes." },
  mangueiras: { icon: Waves, blurb: "Mangueiras e conexões." },
  salvatagem: { icon: LifeBuoy, blurb: "Coletes e equipamentos de salvatagem." },
  acessorios: { icon: Puzzle, blurb: "Acessórios diversos para diferentes aplicações." }
};

export function CategoryTable({
  categories,
  counts
}: {
  categories: Category[];
  counts: Record<string, number>;
}) {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  // A tabela começa fechada; o botão a abre disparando a cascata.
  const [open, setOpen] = useState(false);

  // O container revela as linhas em cascata (de cima para baixo) ao abrir.
  const tableVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } }
  };
  // Cada linha aparece e dispara o stagger das suas células no sentido inverso
  // (staggerDirection: -1), revelando da direita para a esquerda.
  const rowVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.3, ease, staggerChildren: reduce ? 0 : 0.05, staggerDirection: -1 }
    }
  };
  // Cada célula desliza a partir da direita.
  const cellVariants: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : 28 },
    show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.45, ease } }
  };

  return (
    <div className="mt-8">
      {/* Botão que abre/fecha a tabela */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="tabela-categorias"
        className="group inline-flex items-center gap-3 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red"
      >
        <LayoutGrid size={18} aria-hidden="true" />
        Categorias
        <span className="font-bold text-white/65 group-hover:text-white/80">{categories.length}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ease-nautica ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Painel colapsável: abre a altura e dispara a cascata das linhas */}
      <motion.div
        id="tabela-categorias"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.4, ease }}
        className="overflow-hidden"
      >
        <div className="mt-4 overflow-hidden rounded-2xl border border-navy/10 shadow-sm">
          {/* Cabeçalho da tabela */}
          <div className="flex items-center gap-4 bg-navy px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 sm:px-5">
            <span className="w-9 shrink-0" aria-hidden="true" />
            <span className="flex-1">Categoria</span>
            <span className="w-20 text-right sm:w-24">Itens</span>
            <span className="w-6 shrink-0" aria-hidden="true" />
          </div>

          <motion.div
            className="divide-y divide-navy/10 bg-white"
            variants={tableVariants}
            initial="hidden"
            animate={open ? "show" : "hidden"}
          >
            {categories.map((category) => {
          const meta = META[category.slug];
          const Icon = meta?.icon ?? Anchor;
          const count = counts[category.slug] ?? 0;
          return (
            <motion.div
              key={category.id}
              variants={rowVariants}
              className="group relative flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-sky/50 sm:px-5"
            >
              {/* Alvo de clique cobrindo a linha inteira */}
              <Link
                href={`/produtos?categoria=${category.slug}`}
                aria-label={`Ver produtos de ${category.name}`}
                className="absolute inset-0 z-10"
              />
              <motion.span
                variants={cellVariants}
                className="pointer-events-none grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky text-navy transition-colors group-hover:bg-navy group-hover:text-white"
              >
                <Icon size={18} aria-hidden="true" />
              </motion.span>
              <motion.div variants={cellVariants} className="pointer-events-none min-w-0 flex-1">
                <p className="font-heading text-base font-bold leading-tight text-navy group-hover:text-red">
                  {category.name}
                </p>
                {meta?.blurb ? (
                  <p className="mt-0.5 hidden text-xs leading-5 text-ink/60 sm:block">{meta.blurb}</p>
                ) : null}
              </motion.div>
              <motion.span
                variants={cellVariants}
                className="pointer-events-none w-20 text-right text-sm font-semibold text-ink/70 sm:w-24"
              >
                {count} {count === 1 ? "item" : "itens"}
              </motion.span>
              <motion.span variants={cellVariants} className="pointer-events-none shrink-0 text-red">
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </motion.span>
            </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
