"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";

type TypingState = { text: string; count: number };

/**
 * Revela el texto carácter a carácter. Con prefers-reduced-motion aparece
 * entero de inmediato: el contenido nunca depende de la animación.
 *
 * El progreso guarda a qué texto pertenece, así al cambiar de mensaje no se
 * pinta un fragmento del nuevo con la longitud del anterior. Todos los
 * setState ocurren dentro del temporizador, nunca en el cuerpo del efecto.
 */
export function useTypewriter(text: string, speed = 22): string {
  const prefersReducedMotion = useReducedMotion();
  const [typing, setTyping] = useState<TypingState>({ text, count: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const start = performance.now();
    const interval = window.setInterval(() => {
      const count = Math.floor((performance.now() - start) / speed);
      setTyping({ text, count });
      if (count >= text.length) window.clearInterval(interval);
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed, prefersReducedMotion]);

  if (prefersReducedMotion) return text;
  return typing.text === text ? text.slice(0, typing.count) : "";
}
