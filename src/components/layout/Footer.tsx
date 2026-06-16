/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export function Footer({ settings }: { settings: Record<string, string> }) {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <img src="/brand/nautica-color-logo-light.svg" alt="Náutica Color" className="h-14 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
            {settings.positioning || "Mais do que pintura, é sobre preservar valor, estética e prestígio."}
          </p>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Catálogo</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/75">
            <Link href="/produtos" className="hover:text-white">Produtos</Link>
            <Link href="/#marcas" className="hover:text-white">Marcas parceiras</Link>
            <Link href="/#como-comprar" className="hover:text-white">Como comprar</Link>
          </div>
        </div>
        <div>
          <h2 className="font-heading text-lg font-bold">Contato</h2>
          <p className="mt-4 text-sm text-white/75">{settings.location}</p>
          <p className="mt-2 text-sm text-white/75">{settings.phone}</p>
          <p className="mt-2 text-sm text-white/75">{settings.instagram}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/55">
        Logotipo provisório textual em SVG. Substituir pela logo oficial antes da publicação.
      </div>
    </footer>
  );
}
