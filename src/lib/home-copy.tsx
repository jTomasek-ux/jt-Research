import type { ReactNode } from "react";

export type HomeLang = "en" | "cs";

export type HomeCopy = {
  title: string;
  papersNav: string;
  publications: string;
  date: string;
  category: string;
  titleCol: string;
  emptyTitle: string;
  emptyBody: string;
  description: ReactNode;
};

export function getHomeCopy(lang: HomeLang): HomeCopy {
  if (lang === "cs") {
    return {
      title: "Výzkum od JT-Research",
      papersNav: "Články",
      publications: "Publikace",
      date: "Datum",
      category: "Kategorie",
      titleCol: "Název",
      emptyTitle: "Zatím žádné publikace",
      emptyBody:
        "Brzy se sem vrátím. Nový výzkum se zde objeví, jakmile bude hotový.",
      description: (
        <>
          Ahoj, jmenuji se Jan a sdílím zde svůj nedávný výzkum a zjištění.
          Doufám, že tu najdete něco užitečného. Děkuji, že jste se podívali na
          tyto stránky. Pokud máte k mé práci jakékoliv názory, neváhejte mě
          kontaktovat na{" "}
          <a
            href="mailto:tomasekjan128@gmail.com"
            className="text-primary underline underline-offset-2 hover:text-primary-active"
          >
            tomasekjan128@gmail.com
          </a>
          .
        </>
      ),
    };
  }

  return {
    title: "Research from JT-Research",
    papersNav: "Papers",
    publications: "Publications",
    date: "Date",
    category: "Category",
    titleCol: "Title",
    emptyTitle: "No papers published yet",
    emptyBody:
      "Check back soon. New research will appear here as it's written.",
    description: (
      <>
        Hello, I&apos;m Jan, and I share my recent research and findings here. I
        hope you find something useful. Thank you for looking at this site. If
        you have any thoughts on my work, feel free to contact me at{" "}
        <a
          href="mailto:tomasekjan128@gmail.com"
          className="text-primary underline underline-offset-2 hover:text-primary-active"
        >
          tomasekjan128@gmail.com
        </a>
        .
      </>
    ),
  };
}

export function getHomeLanguageLinks(lang: HomeLang) {
  return [
    {
      lang: "en",
      label: "EN",
      href: "/",
      current: lang === "en",
    },
    {
      lang: "cs",
      label: "CS",
      href: "/cs",
      current: lang === "cs",
    },
  ];
}

export function homePath(lang: HomeLang) {
  return lang === "cs" ? "/cs" : "/";
}
