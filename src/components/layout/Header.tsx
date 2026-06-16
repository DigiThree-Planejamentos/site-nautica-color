"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Menu, Phone, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

const nav = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/#marcas", label: "Marcas" },
  { href: "/#contato", label: "Contato" }
];

export function Header({ phone }: { phone?: string }) {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <>
      <div className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <span>Marina Verolme, Angra dos Reis - RJ</span>
          <span className="hidden items-center gap-2 sm:flex">
            <Phone size={14} aria-hidden="true" /> {phone || "(24) 2404-4606"}
          </span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Náutica Color">
            <img src="/brand/nautica-color-logo.svg" alt="Náutica Color" className="h-12 w-auto" />
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Menu principal">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-navy hover:text-red">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              className="relative grid h-11 w-11 place-items-center rounded-full bg-navy text-white hover:bg-navy-light"
              aria-label="Abrir meu orçamento"
            >
              <ShoppingBasket size={19} aria-hidden="true" />
              {count > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-xs">{count}</span> : null}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-off-white md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-navy/10 bg-white px-4 py-4 md:hidden" aria-label="Menu mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-semibold text-navy hover:bg-off-white">
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
    </>
  );
}
