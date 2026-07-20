import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PublicationsTable } from "@/components/PublicationsTable";
import { getPapersForLang } from "@/lib/papers";
import {
  getHomeCopy,
  getHomeLanguageLinks,
  homePath,
  type HomeLang,
} from "@/lib/home-copy";

export function HomePage({ lang }: { lang: HomeLang }) {
  const copy = getHomeCopy(lang);
  const papers = getPapersForLang(lang);

  return (
    <>
      <TopNav
        languageLinks={getHomeLanguageLinks(lang)}
        homeHref={homePath(lang)}
        papersLabel={copy.papersNav}
      />
      <main className="flex-1">
        <Hero title={copy.title} description={copy.description} />
        <PublicationsTable papers={papers} copy={copy} lang={lang} />
      </main>
      <Footer />
    </>
  );
}
