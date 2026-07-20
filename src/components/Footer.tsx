export function Footer() {
  return (
    <footer className="mt-auto bg-surface-dark py-16 text-on-dark-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-base text-on-dark">
          JT-Research
        </span>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} JT-Research. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
