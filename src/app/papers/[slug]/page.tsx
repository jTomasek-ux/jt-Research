import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { PaperToc } from "@/components/PaperToc";
import { mdxComponents } from "@/components/mdx-components";
import {
  getAllPaperSlugs,
  getNavLanguageLinks,
  getPaperBySlug,
  getPaperSections,
} from "@/lib/papers";
import { homePath, type HomeLang } from "@/lib/home-copy";

export function generateStaticParams() {
  return getAllPaperSlugs().map((slug) => ({ slug }));
}

function formatDate(dateString: string, lang: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-US", {
    year: "numeric",
    month: "short",
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

  const languageLinks = getNavLanguageLinks(paper);
  const lang = (paper.lang === "cs" ? "cs" : "en") as HomeLang;
  const sections = [
    ...getPaperSections(paper.content),
    ...(paper.authors.length > 0
      ? [{ id: "author", title: lang === "cs" ? "Autor" : "Author" }]
      : []),
  ];

  return (
    <>
      <TopNav
        languageLinks={languageLinks}
        homeHref={homePath(lang)}
        papersLabel={lang === "cs" ? "Články" : "Papers"}
      />
      <main className="flex-1 bg-canvas">
        <header className="px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="font-sans text-sm font-semibold tracking-tight text-ink">
              JT-Research
            </p>
            <h1 className="mt-5 font-sans text-4xl font-bold leading-[1.15] tracking-tight text-ink sm:text-5xl md:text-[3.25rem]">
              {paper.title}
            </h1>
            <p className="mt-5 font-sans text-sm text-ink">
              {formatDate(paper.date, lang)}
            </p>
          </div>
        </header>

        <article className="mx-auto max-w-2xl px-6 pb-section">
          <PaperToc
            sections={sections}
            label={lang === "cs" ? "Obsah" : "Contents"}
          />

          <div className="prose prose-neutral max-w-none">
            <MDXRemote source={paper.content} components={mdxComponents} />
          </div>

          {paper.authors.length > 0 && (
            <section
              id="author"
              className="mt-16 scroll-mt-28 border-t border-hairline pt-10"
            >
              <h2 className="font-serif text-2xl font-normal tracking-tight text-ink">
                {lang === "cs" ? "Autor" : "Author"}
              </h2>
              <p className="mt-4 font-serif text-lg text-body">
                {paper.authors.join(", ")}
              </p>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
