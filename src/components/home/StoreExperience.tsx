import { MapPin, MessageCircle, PackageCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* eslint-disable @next/next/no-img-element */

/**
 * Seção "Prontos para te atender": mostra a estrutura física e o atendimento
 * da loja por meio de um marquee (carrossel contínuo, só CSS) com fotos reais.
 *
 * Por que só CSS: a animação é decorativa e dispensa estado/JS. O loop é
 * perfeito porque a lista de fotos é renderizada duas vezes lado a lado e
 * desliza -50%; ao passar o mouse, pausa; com `prefers-reduced-motion`, fica
 * estática (regra global em globals.css) sem esconder conteúdo.
 */

const photos = [
  { src: "/experiencia/loja-01.jpg", alt: "Corredor da Náutica Color com prateleiras de tintas, antifouling e abrasivos" },
  { src: "/experiencia/loja-02.jpg", alt: "Balcão de atendimento da Náutica Color com selantes e acessórios náuticos" },
  { src: "/experiencia/loja-03.jpg", alt: "Estoque variado de produtos náuticos exposto na loja Náutica Color" }
];

// Lista duplicada para o loop contínuo do marquee.
const marquee = [...photos, ...photos];

const reasons: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: PackageCheck, title: "Estoque completo", text: "Tintas, antifouling, abrasivos, fiberglass e acabamentos na prateleira." },
  { icon: Users, title: "Equipe que entende de barco", text: "Indicação certa de produto, rendimento e preparação para cada caso." },
  { icon: MapPin, title: "Pertinho da sua embarcação", text: "Atendimento presencial na Marina Verolme, em Angra dos Reis." }
];

export function StoreExperience({ supportUrl }: { supportUrl: string }) {
  return (
    <section id="atendimento" className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Atendimento</Eyebrow>
          </div>
          <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
            Prontos para te atender.
          </h2>
          <p className="mt-4 text-ink/70">
            Uma loja física de verdade, com a prateleira cheia e gente que conhece o produto. Passe na Marina Verolme ou
            chame pelo WhatsApp: a gente encontra a solução certa para a sua embarcação.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-2.5 rounded-lg border border-navy/10 bg-white p-3 transition-shadow hover:shadow-soft">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sky text-navy">
                <Icon size={16} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-heading text-sm font-bold leading-tight text-navy">{title}</h3>
                <p className="mt-0.5 text-xs leading-4 text-ink/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee de fotos da loja (full-bleed), com máscara de borda suave. */}
      <div className="group relative mt-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {marquee.map((photo, index) => (
            <figure
              key={index}
              aria-hidden={index >= photos.length ? "true" : undefined}
              className="relative aspect-[21/9] w-[280px] shrink-0 overflow-hidden rounded-lg shadow-soft ring-1 ring-navy/10 sm:w-[360px]"
            >
              <img
                src={photo.src}
                alt={index >= photos.length ? "" : photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-nautica hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <a
          href={supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-bright"
        >
          <MessageCircle size={18} aria-hidden="true" /> Falar com a equipe
        </a>
      </div>
    </section>
  );
}
