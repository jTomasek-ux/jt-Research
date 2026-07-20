"use client";

import { useEffect, useState } from "react";
import type { PaperSection } from "@/lib/papers";

export function PaperToc({
  sections,
  label,
}: {
  sections: PaperSection[];
  label: string;
}) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sections.length === 0) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1, 0.35],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  function goToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    setOpen(false);

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label={label}
      className="fixed top-1/2 left-3 z-30 -translate-y-1/2 sm:left-4"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <div className="relative h-10 w-10">
        {/* Hamburger trigger */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="paper-toc-panel"
          className={`absolute inset-0 flex items-center justify-center rounded-md border border-hairline bg-canvas transition-opacity duration-200 ease-out ${
            open ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          onClick={() => setOpen(true)}
        >
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
            <span className="block h-0.5 w-4 bg-ink" />
          </span>
        </button>

        {/* Expanded panel: transform + opacity only (no width animation) */}
        <div
          id="paper-toc-panel"
          className={`absolute top-1/2 left-0 w-56 origin-left -translate-y-1/2 rounded-lg border border-hairline bg-canvas px-3 py-3 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open
              ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
              : "pointer-events-none -translate-x-1 scale-[0.96] opacity-0"
          }`}
        >
          <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-wider text-muted">
            {label}
          </p>
          <ul className="max-h-[min(60vh,22rem)] space-y-0.5 overflow-y-auto">
            {sections.map((section) => {
              const active = activeId === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`block rounded px-2 py-1.5 font-sans text-xs leading-snug transition-colors duration-150 ${
                      active
                        ? "bg-surface-card text-ink"
                        : "text-muted hover:bg-surface-soft hover:text-ink"
                    }`}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(section.id);
                    }}
                  >
                    {section.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
