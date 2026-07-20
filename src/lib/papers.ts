import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PAPERS_DIR = path.join(process.cwd(), "content", "papers");

export type Paper = {
  slug: string;
  title: string;
  date: string;
  authors: string[];
  tags: string[];
  abstract: string;
  content: string;
};

function readPaperFile(slug: string): Paper {
  const filePath = path.join(PAPERS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: (data.title as string | undefined) ?? slug,
    date: (data.date as string | undefined) ?? "",
    authors: (data.authors as string[] | undefined) ?? [],
    tags: (data.tags as string[] | undefined) ?? [],
    abstract: (data.abstract as string | undefined) ?? "",
    content,
  };
}

export function getAllPaperSlugs(): string[] {
  if (!fs.existsSync(PAPERS_DIR)) return [];

  return fs
    .readdirSync(PAPERS_DIR)
    .filter((file: string) => file.endsWith(".mdx"))
    .map((file: string) => file.replace(/\.mdx$/, ""));
}

export function getAllPapers(): Paper[] {
  return getAllPaperSlugs()
    .map((slug: string) => readPaperFile(slug))
    .sort((a: Paper, b: Paper) => (a.date < b.date ? 1 : -1));
}

export function getPaperBySlug(slug: string): Paper | null {
  try {
    return readPaperFile(slug);
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const paper of getAllPapers()) {
    for (const tag of paper.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}
