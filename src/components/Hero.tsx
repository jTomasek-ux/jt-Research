import type { ReactNode } from "react";

export function Hero({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <section className="border-b border-hairline bg-canvas px-6 py-24 sm:py-section">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="max-w-3xl font-serif text-4xl font-normal leading-[1.1] tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-body">
          {description}
        </p>
      </div>
    </section>
  );
}
