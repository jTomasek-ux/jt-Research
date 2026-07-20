import Link from "next/link";
import type { Paper } from "@/lib/papers";
import type { HomeCopy, HomeLang } from "@/lib/home-copy";

function formatDate(date: string, lang: HomeLang) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PublicationsTable({
  papers,
  copy,
  lang,
}: {
  papers: Paper[];
  copy: HomeCopy;
  lang: HomeLang;
}) {
  return (
    <section id="papers" className="bg-canvas">
      <div className="mx-auto max-w-[1200px] px-6 pb-section pt-14 sm:pt-16">
        <h2 className="font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl">
          {copy.publications}
        </h2>

        {papers.length > 0 ? (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline">
                  <th className="w-[140px] pb-4 pr-6 font-sans text-xs font-medium uppercase tracking-wider text-muted">
                    {copy.date}
                  </th>
                  <th className="w-[200px] pb-4 pr-6 font-sans text-xs font-medium uppercase tracking-wider text-muted">
                    {copy.category}
                  </th>
                  <th className="pb-4 font-sans text-xs font-medium uppercase tracking-wider text-muted">
                    {copy.titleCol}
                  </th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper) => (
                  <tr key={paper.slug} className="border-b border-hairline">
                    <td colSpan={3} className="p-0">
                      <Link
                        href={`/papers/${paper.slug}`}
                        className="grid grid-cols-[140px_200px_minmax(0,1fr)] py-5 font-serif text-base text-body underline-offset-4 transition-colors hover:bg-surface-soft/60 hover:underline"
                      >
                        <span className="whitespace-nowrap pr-6">
                          {formatDate(paper.date, lang)}
                        </span>
                        <span className="pr-6">{paper.category}</span>
                        <span className="text-ink">{paper.title}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-lg border border-hairline py-24 text-center">
            <p className="font-serif text-2xl text-ink">{copy.emptyTitle}</p>
            <p className="mt-3 max-w-sm font-serif text-sm leading-relaxed text-muted">
              {copy.emptyBody}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
