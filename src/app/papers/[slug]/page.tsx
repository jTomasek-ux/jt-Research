import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/Badge";
import { mdxComponents } from "@/components/mdx-components";
import { getAllPaperSlugs, getPaperBySlug } from "@/lib/papers";

export function generateStaticParams() {
  return getAllPaperSlugs().map((slug) => ({ slug }));
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) notFound();

  return (
    <>
      <TopNav />
      <main className="flex-1 bg-canvas">
        <article className="mx-auto max-w-2xl px-6 py-section">
          <Link
            href="/"
            className="font-sans text-sm font-medium text-muted hover:text-ink transition-colors"
          >
            &larr; All papers
          </Link>

          <div className="mt-8 flex flex-wrap gap-2">
            {paper.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl md:text-5xl leading-[1.1] tracking-tight text-ink">
            {paper.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-muted">
            <span>{paper.authors.join(", ")}</span>
            <span aria-hidden>&middot;</span>
            <span>{formatDate(paper.date)}</span>
          </div>

          <p className="mt-8 font-display text-xl italic leading-relaxed text-body-strong">
            {paper.abstract}
          </p>

          <div className="prose prose-neutral mt-4 max-w-none border-t border-hairline pt-4">
            <MDXRemote source={paper.content} components={mdxComponents} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
