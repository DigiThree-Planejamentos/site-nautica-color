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
 * O conteúdo nasce escondido (opacity-0) e aparece ao entrar na tela — é essa
 * mudança de estado que dispara a transição. Rede de segurança: se não houver
 * IntersectionObserver, ou se ele não disparar em 3s, o conteúdo é revelado
 * mesmo assim (nunca fica preso invisível).
 *
 * Respeita prefers-reduced-motion via globals.css (zera a duração da transição).
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Sem IntersectionObserver: revela imediatamente.
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    // Rede de segurança: nunca deixa o conteúdo escondido para sempre.
    const failSafe = setTimeout(() => setShown(true), 3000);

    return () => {
      io.disconnect();
      clearTimeout(failSafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-700 ease-nautica ${
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
