"use client";

import { useMemo, useState } from "react";
import { PaperCard } from "./PaperCard";
import type { Paper } from "@/lib/papers";

export function PaperGrid({
  papers,
  tags,
}: {
  papers: Paper[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPapers = useMemo(() => {
    if (!activeTag) return papers;
    return papers.filter((paper) => paper.tags.includes(activeTag));
  }, [papers, activeTag]);

  return (
    <section id="papers" className="bg-canvas">
      <div className="mx-auto max-w-[1200px] px-6 pb-section">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-b border-hairline pb-6">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-md px-3.5 py-2 font-sans text-sm font-medium transition-colors ${
                activeTag === null
                  ? "bg-surface-card text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-md px-3.5 py-2 font-sans text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-surface-card text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredPapers.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
              <PaperCard key={paper.slug} paper={paper} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-lg border border-hairline py-24 text-center">
            <p className="font-display text-2xl text-ink">
              No papers published yet
            </p>
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted">
              Check back soon &mdash; new research will appear here as
              it&apos;s written.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
