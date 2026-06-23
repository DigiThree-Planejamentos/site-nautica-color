/* eslint-disable @next/next/no-img-element */
import { MessageCircle } from "lucide-react";

/**
 * Cabeçalho enxuto da landing: logo + um CTA de WhatsApp. Sem carrinho e sem
 * navegação para o catálogo (a landing é um app independente).
 */
export function Header({ supportUrl }: { supportUrl: string }) {
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
          <MessageCircle size={16} aria-hidden="true" /> <span className="hidden sm:inline">Falar no WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
