type Variant = "neutral" | "primary";

const variantClasses: Record<Variant, string> = {
  neutral: "bg-surface-card text-ink",
  primary: "bg-primary text-on-primary uppercase tracking-wide",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
