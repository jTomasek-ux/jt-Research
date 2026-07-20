import Link from "next/link";

export type NavLanguageLink = {
  lang: string;
  label: string;
  href: string | null;
  current: boolean;
};

const DEFAULT_LANGUAGE_LINKS: NavLanguageLink[] = [
  { lang: "en", label: "EN", href: "/", current: true },
  { lang: "cs", label: "CS", href: null, current: false },
];

export function TopNav({
  languageLinks = DEFAULT_LANGUAGE_LINKS,
}: {
  languageLinks?: NavLanguageLink[];
}) {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-xl tracking-tight text-ink hover:opacity-80"
        >
          JT-Research
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-ink hover:text-primary"
          >
            Papers
          </Link>

          <div
            className="flex items-center rounded-md border border-hairline p-0.5"
            role="group"
            aria-label="Language"
          >
            {languageLinks.map((link) => {
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

              return (
                <Link key={link.lang} href={link.href} className={classes}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
