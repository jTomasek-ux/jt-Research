import Link from "next/link";
import { LangSwitch } from "@/components/LangSwitch";

export type NavLanguageLink = {
  lang: string;
  label: string;
  href: string | null;
  current: boolean;
};

const DEFAULT_LANGUAGE_LINKS: NavLanguageLink[] = [
  { lang: "en", label: "EN", href: "/", current: true },
  { lang: "cs", label: "CS", href: "/cs", current: false },
];

export function TopNav({
  languageLinks = DEFAULT_LANGUAGE_LINKS,
  homeHref = "/",
  papersLabel = "Papers",
}: {
  languageLinks?: NavLanguageLink[];
  homeHref?: string;
  papersLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link
          href={homeHref}
          className="font-serif text-xl tracking-tight text-ink hover:opacity-80"
        >
          JT-Research
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href={homeHref}
            className="text-sm font-medium text-ink hover:text-primary"
          >
            {papersLabel}
          </Link>

          <LangSwitch links={languageLinks} />
        </nav>
      </div>
    </header>
  );
}
