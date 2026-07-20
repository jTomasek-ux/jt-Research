import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PublicationsTable } from "@/components/PublicationsTable";
import { getAllPapers } from "@/lib/papers";

export default function Home() {
  const papers = getAllPapers();

  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero
          title="Research from JT-Research"
          description={
            <>
              Hello, I&apos;m Jan, and I share my recent research and findings
              here. I hope you find something useful. Thank you for looking at
              this site. If you have any thoughts on my work, feel free to
              contact me at{" "}
              <a
                href="mailto:tomasekjan128@gmail.com"
                className="text-primary underline underline-offset-2 hover:text-primary-active"
              >
                tomasekjan128@gmail.com
              </a>
              .
            </>
          }
        />
        <PublicationsTable papers={papers} />
      </main>
      <Footer />
    </>
  );
}
