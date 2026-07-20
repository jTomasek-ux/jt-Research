export function Hero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-hairline bg-canvas px-6 py-24 sm:py-section">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
          {description}
        </p>
      </div>
    </section>
  );
}
