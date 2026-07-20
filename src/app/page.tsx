import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PaperGrid } from "@/components/PaperGrid";
import { getAllPapers, getAllTags } from "@/lib/papers";

export default function Home() {
  const papers = getAllPapers();
  const tags = getAllTags();

  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero
          title="Research from JT-Research"
          description="Papers, findings, and ongoing work — published here as they're ready."
        />
        <PaperGrid papers={papers} tags={tags} />
      </main>
      <Footer />
    </>
  );
}
