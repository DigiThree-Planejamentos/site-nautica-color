"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/**
 * Aplica um deslocamento vertical sutil conforme a página rola, criando
 * profundidade (a ilustração "anda" mais devagar que o texto).
 * Desativa o efeito em prefers-reduced-motion.
 */
export function Parallax({
  children,
  className = "",
  distance = 70
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : distance]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
