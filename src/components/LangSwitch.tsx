"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { NavLanguageLink } from "@/components/TopNav";

const HEADING_INDEX_KEY = "jt-paper-heading-index";
const SCROLL_RATIO_KEY = "jt-paper-scroll-ratio";

function headingElements(): HTMLElement[] {
  return Array.from(
    document.querySelectorAll<HTMLElement>("article h2[id], article h3[id]"),
  );
}

/** Nearest heading to the reading position (under sticky nav). */
function currentHeadingIndex(): number {
  const headings = headingElements();
  if (headings.length === 0) return 0;

  const anchorY = window.scrollY + 140;
  let bestIdx = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  headings.forEach((el, i) => {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const dist = Math.abs(top - anchorY);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  });

  return bestIdx;
}

function scrollRatio(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return window.scrollY / max;
}

export function rememberPaperPosition() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HEADING_INDEX_KEY, String(currentHeadingIndex()));
  sessionStorage.setItem(SCROLL_RATIO_KEY, String(scrollRatio()));
}

export function restorePaperPosition() {
  if (typeof window === "undefined") return;

  const rawIdx = sessionStorage.getItem(HEADING_INDEX_KEY);
  const rawRatio = sessionStorage.getItem(SCROLL_RATIO_KEY);
  sessionStorage.removeItem(HEADING_INDEX_KEY);
  sessionStorage.removeItem(SCROLL_RATIO_KEY);

  const headings = headingElements();

  if (rawIdx != null && headings.length > 0) {
    const idx = Math.min(Math.max(Number(rawIdx), 0), headings.length - 1);
    const el = headings[idx];
    if (el && Number.isFinite(idx)) {
      el.scrollIntoView({ behavior: "auto", block: "start" });
      window.history.replaceState(null, "", `#${el.id}`);
      return;
    }
  }

  if (rawRatio != null) {
    const ratio = Number(rawRatio);
    if (Number.isFinite(ratio)) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: Math.max(0, ratio * max), behavior: "auto" });
    }
  }
}

export function LangSwitch({ links }: { links: NavLanguageLink[] }) {
  const router = useRouter();

  return (
    <div
      className="flex items-center rounded-md border border-hairline p-0.5"
      role="group"
      aria-label="Language"
    >
      {links.map((link) => {
        const classes = `rounded px-2.5 py-1.5 font-sans text-xs font-semibold tracking-wide transition-colors ${
          link.current
            ? "bg-surface-card text-ink"
            : "text-muted hover:text-ink"
        }`;

        if (link.current || !link.href) {
          return (
            <span
              key={link.lang}
              className={classes}
              aria-current={link.current ? "true" : undefined}
            >
              {link.label}
            </span>
          );
        }

        const isPaperLink = link.href.startsWith("/papers/");

        return (
          <Link
            key={link.lang}
            href={link.href}
            className={classes}
            onClick={(event) => {
              if (!isPaperLink) return;
              event.preventDefault();
              rememberPaperPosition();
              router.push(link.href!);
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
