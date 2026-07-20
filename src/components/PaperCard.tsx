import Link from "next/link";
import type { Paper } from "@/lib/papers";
import { Badge } from "@/components/Badge";

function formatDate(date: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PaperCard({ paper }: { paper: Paper }) {
  return (
    <Link
      href={`/papers/${paper.slug}`}
      className="group flex flex-col gap-4 rounded-lg bg-surface-card p-8 transition-colors hover:bg-hairline"
    >
      {paper.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {paper.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
      <h3 className="font-display text-2xl leading-snug text-ink group-hover:text-primary">
        {paper.title}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-body">
        {paper.abstract}
      </p>
      <div className="mt-auto flex items-center gap-3 text-xs text-muted">
        {paper.authors.length > 0 && <span>{paper.authors.join(", ")}</span>}
        {paper.authors.length > 0 && paper.date && <span>&middot;</span>}
        {paper.date && <span>{formatDate(paper.date)}</span>}
      </div>
    </Link>
  );
}
