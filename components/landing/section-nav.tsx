"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "tentang", label: "Tentang" },
  { id: "fitur", label: "Fitur" },
  { id: "alur", label: "Alur kerja" },
] as const;

export function SectionNav() {
  const [active, setActive] = useState<string | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.35;
      let current: string | null = null;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) {
          current = section.id;
        }
      }

      setActive(current);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollable))
        : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = "scaleX(" + progress + ")";
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Navigasi bagian beranda"
      className="order-3 flex w-full items-center justify-center gap-6 border-t border-neutral-900/10 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] md:order-none md:w-auto md:gap-8 md:border-t-0 md:py-0"
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={"#" + id}
          aria-current={active === id ? "location" : undefined}
          onClick={() => setActive(id)}
          className={
            "relative inline-flex min-h-10 items-center whitespace-nowrap transition-colors duration-200 after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-orange-600 after:transition-transform after:duration-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 " +
            (active === id
              ? "text-orange-700 after:scale-x-100"
              : "text-neutral-700 after:scale-x-0 hover:text-orange-700 hover:after:scale-x-100")
          }
        >
          {label}
        </a>
      ))}
      <span
        ref={progressRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-orange-600"
      />
    </nav>
  );
}
