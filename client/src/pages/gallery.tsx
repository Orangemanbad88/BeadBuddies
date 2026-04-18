import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { DifficultyFilter } from "@/components/difficulty-filter";
import { GalleryCard } from "@/components/gallery-card";
import { EmptyState } from "@/components/empty-state";
import { galleryItems } from "@/data/content";

const GalleryPage = () => {
  const [difficulty, setDifficulty] = useState("all");

  const filtered = useMemo(() => {
    if (difficulty === "all") return galleryItems;
    return galleryItems.filter((g) => g.difficulty === difficulty);
  }, [difficulty]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Gallery"
        title="Look what kids have made"
        subtitle="Tap the heart to save your favorites to My Bracelets."
      >
        <DifficultyFilter value={difficulty} onChange={setDifficulty} />
      </PageHeader>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length === 0 ? (
          <EmptyState
            title="No bracelets at this level yet"
            description="Try another filter to see more."
          />
        ) : (
          <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
};

export default GalleryPage;
