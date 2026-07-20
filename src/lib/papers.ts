import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PAPERS_DIR = path.join(process.cwd(), "content", "papers");

export type Paper = {
  slug: string;
  title: string;
  date: string;
  authors: string[];
  category: string;
  abstract: string;
  content: string;
  lang: string;
  translationOf: string | null;
  translations: Record<string, string>;
};

function readPaperFile(slug: string): Paper {
  const filePath = path.join(PAPERS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const translations =
    (data.translations as Record<string, string> | undefined) ?? {};

  return {
    slug,
    title: (data.title as string | undefined) ?? slug,
    date: (data.date as string | undefined) ?? "",
    authors: (data.authors as string[] | undefined) ?? [],
    category: (data.category as string | undefined) ?? "",
    abstract: (data.abstract as string | undefined) ?? "",
    content,
    lang: (data.lang as string | undefined) ?? "en",
    translationOf: (data.translationOf as string | undefined) ?? null,
    translations,
  };
}

export function getAllPaperSlugs(): string[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  return fs
    .readdirSync(PAPERS_DIR)
    .filter((file: string) => file.endsWith(".mdx"))
    .map((file: string) => file.replace(/\.mdx$/, ""));
}

/** Primary papers only — translations are linked from their parent. */
export function getAllPapers(): Paper[] {
  return getAllPaperSlugs()
    .map((slug: string) => readPaperFile(slug))
    .filter((paper: Paper) => paper.translationOf === null)
    .sort((a: Paper, b: Paper) => (a.date < b.date ? 1 : -1));
}

export function getPaperBySlug(slug: string): Paper | null {
  try {
    return readPaperFile(slug);
  } catch {
    return null;
  }
}

const LANG_LABELS: Record<string, string> = {
  en: "English",
  cs: "Česky",
};

export function languageLabel(lang: string): string {
  return LANG_LABELS[lang] ?? lang.toUpperCase();
}

/** Sibling language links for the paper page language switcher. */
export function getPaperLanguageLinks(
  paper: Paper,
): { lang: string; label: string; slug: string; current: boolean }[] {
  const links: { lang: string; label: string; slug: string; current: boolean }[] =
    [];

  if (paper.translationOf) {
    const parent = getPaperBySlug(paper.translationOf);
    if (parent) {
      links.push({
        lang: parent.lang,
        label: languageLabel(parent.lang),
        slug: parent.slug,
        current: false,
      });
      for (const [lang, slug] of Object.entries(parent.translations)) {
        links.push({
          lang,
          label: languageLabel(lang),
          slug,
          current: slug === paper.slug,
        });
      }
    }
  } else {
    links.push({
      lang: paper.lang,
      label: languageLabel(paper.lang),
      slug: paper.slug,
      current: true,
    });
    for (const [lang, slug] of Object.entries(paper.translations)) {
      links.push({
        lang,
        label: languageLabel(lang),
        slug,
        current: false,
      });
    }
  }

  return links;
}

const NAV_LANG_LABELS: Record<string, string> = {
  en: "EN",
  cs: "CS",
};

/** Compact EN/CS links for the top navigation. */
export function getNavLanguageLinks(
  paper: Paper,
): { lang: string; label: string; href: string; current: boolean }[] {
  return getPaperLanguageLinks(paper).map((link) => ({
    lang: link.lang,
    label: NAV_LANG_LABELS[link.lang] ?? link.lang.toUpperCase(),
    href: `/papers/${link.slug}`,
    current: link.current,
  }));
}
