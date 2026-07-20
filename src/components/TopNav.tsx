import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink hover:opacity-80"
        >
          JT-Research
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-ink hover:text-primary"
          >
            Papers
          </Link>
        </nav>
      </div>
    </header>
  );
}
