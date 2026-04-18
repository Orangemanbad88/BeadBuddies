import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { DifficultyFilter } from "@/components/difficulty-filter";
import { TutorialCard } from "@/components/tutorial-card";
import { EmptyState } from "@/components/empty-state";
import { tutorials } from "@/data/content";

const BrowseTutorialsPage = () => {
  const [difficulty, setDifficulty] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const byDiff = difficulty === "all" ? tutorials : tutorials.filter((t) => t.difficulty === difficulty);
    const query = q.trim().toLowerCase();
    if (!query) return byDiff;
    return byDiff.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
  }, [difficulty, q]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Tutorials"
        title="Pick what to make today"
        subtitle="Filter by skill level, or search by name."
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <DifficultyFilter value={difficulty} onChange={setDifficulty} />
          <label className="relative md:w-72">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tutorials…"
              data-testid="input-search-tutorials"
              className="w-full h-11 pl-10 pr-4 rounded-full border-2 border-border bg-card text-ink font-semibold placeholder:text-ink-muted focus:border-coral focus:outline-none"
            />
          </label>
        </div>
      </PageHeader>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing matches yet"
            description="Try a different filter or clear the search box."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <TutorialCard key={t.id} tutorial={t} />
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
};

export default BrowseTutorialsPage;
