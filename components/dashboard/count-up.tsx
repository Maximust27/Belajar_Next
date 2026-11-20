"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const formatter = new Intl.NumberFormat("id-ID");

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const formatted = formatter.format(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion || value <= 0 || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let startTime: number | null = null;
    const duration = 1050;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const tick = (time: number) => {
          if (startTime === null) startTime = time;

          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          node.textContent = formatter.format(Math.round(value * eased));

          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = formatter.format(value);
    };
  }, [value, reducedMotion]);

  return (
    <>
      <span ref={ref} aria-hidden="true">{formatted}</span>
      <span className="sr-only">{formatted}</span>
    </>
  );
}
