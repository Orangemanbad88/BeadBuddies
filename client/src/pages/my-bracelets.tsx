import { Link } from "wouter";
import { BookOpen, Heart, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { TutorialCard } from "@/components/tutorial-card";
import { GalleryCard } from "@/components/gallery-card";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { useProgressState } from "@/lib/use-progress";
import { tutorials as allTutorials, galleryItems } from "@/data/content";
import type { Tutorial } from "@shared/schema";

const MyBraceletsPage = () => {
  const state = useProgressState();

  const completedIds = Object.entries(state.tutorials)
    .filter(([, p]) => p.completedAt)
    .map(([id]) => id);
  const inProgressIds = Object.entries(state.tutorials)
    .filter(([, p]) => !p.completedAt && p.stepsDone.length > 0)
    .map(([id]) => id);

  const byId = new Map(allTutorials.map((t) => [t.id, t]));
  const completedTutorials = completedIds.map((id) => byId.get(id)).filter(Boolean) as Tutorial[];
  const inProgressTutorials = inProgressIds.map((id) => byId.get(id)).filter(Boolean) as Tutorial[];
  const favorites = galleryItems.filter((g) => state.favorites.includes(g.id));

  const nothingYet =
    completedTutorials.length === 0 &&
    inProgressTutorials.length === 0 &&
    favorites.length === 0;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Your stuff"
        title="My Bracelets"
        subtitle="Tutorials you've started, finished, and gallery favorites you've saved."
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        {nothingYet ? (
          <EmptyState
            title="Nothing saved yet"
            description="Start a tutorial or tap a heart in the gallery — it'll show up here."
            action={
              <Link href="/tutorials">
                <a>
                  <Button className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold">
                    <BookOpen className="w-4 h-4 mr-2" /> Find a tutorial
                  </Button>
                </a>
              </Link>
            }
          />
        ) : null}

        {inProgressTutorials.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl text-ink mb-4 inline-flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-coral-deep" /> In progress
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgressTutorials.map((t) => (
                <TutorialCard key={t.id} tutorial={t} />
              ))}
            </div>
          </div>
        ) : null}

        {completedTutorials.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl text-ink mb-4 inline-flex items-center gap-2">
              <Trophy className="w-5 h-5 text-sage-deep" /> Finished
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedTutorials.map((t) => (
                <TutorialCard key={t.id} tutorial={t} />
              ))}
            </div>
          </div>
        ) : null}

        {favorites.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl text-ink mb-4 inline-flex items-center gap-2">
              <Heart className="w-5 h-5 text-coral fill-coral" /> Favorites
            </h2>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favorites.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </AppShell>
  );
};

export default MyBraceletsPage;
