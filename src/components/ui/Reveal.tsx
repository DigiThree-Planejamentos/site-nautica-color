"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso em ms para escalonar (stagger) itens de um mesmo grid. */
  delay?: number;
  className?: string;
};

/**
 * Revela o conteúdo com fade + slide-up quando ele entra na viewport (cascata).
 * CSS puro + IntersectionObserver, sem dependências.
 *
 * Anti-bloco-vazio: o conteúdo nasce VISÍVEL no SSR e em ambientes sem JS ou
 * sem IntersectionObserver (screenshots, carregamentos lentos). Só quando o JS
 * "arma" a animação (`armed`) o card recua para o estado escondido e então
 * anima ao entrar na tela. Como o primeiro render no cliente também começa
 * visível, não há divergência de hidratação.
 *
 * Respeita prefers-reduced-motion via globals.css (zera a duração).
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Sem IntersectionObserver: mantém visível (nunca arma).
    if (typeof IntersectionObserver === "undefined") return;
    const el = ref.current;
    if (!el) return;

    setArmed(true);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-[1000ms] ease-nautica ${
        hidden ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
