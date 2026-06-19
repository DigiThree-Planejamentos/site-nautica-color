/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export function Footer({ settings }: { settings: Record<string, string> }) {
  const catalogLinks = [
    ["Produtos", "/produtos"],
    ["Categorias", "/#categorias"],
    ["Marcas parceiras", "/#marcas"],
    ["Atendimento", "/#atendimento"]
  ];
  const categoryLinks = [
    ["Antifouling", "/produtos?categoria=antifouling"],
    ["Tintas e primers", "/produtos?categoria=tintas-de-fundo-e-primers"],
    ["Vernizes e acabamentos", "/produtos?categoria=vernizes-e-acabamentos"],
    ["Lixas e abrasivos", "/produtos?categoria=lixas-e-abrasivos"],
    ["Limpeza e polimento", "/produtos?categoria=limpeza-protecao-e-polimento"]
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1fr_1fr] lg:px-8">
        <div>
          <img src="/brand/nautica-color-logo-light.png" alt="Náutica Color" className="h-14 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
            {settings.positioning || "Mais do que pintura, é sobre preservar valor, estética e prestígio."}
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
            Catálogo para consulta, montagem de carrinho e confirmação de preço, estoque e aplicação com atendimento especializado.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Catálogo</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {catalogLinks.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Linhas</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            {categoryLinks.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Atendimento</h2>
          <p className="mt-4 text-sm text-white/75">{settings.location}</p>
          <p className="mt-2 text-sm text-white/75">{settings.phone}</p>
          <p className="mt-2 text-sm text-white/75">WhatsApp: {settings.whatsapp_visible}</p>
          <p className="mt-2 text-sm text-white/75">{settings.instagram}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/55">
        Preços e disponibilidade sujeitos à confirmação com a equipe da Náutica Color.
      </div>
    </footer>
  );
}
