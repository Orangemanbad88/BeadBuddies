import { Link } from "wouter";
import { BookOpen, Heart, Trophy, Palette, Shirt } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { TutorialCard } from "@/components/tutorial-card";
import { GalleryCard } from "@/components/gallery-card";
import { DesignCard } from "@/components/design-card";
import { AccessoryCloset } from "@/components/accessory-closet";
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
  const designs = state.designs;

  const nothingYet =
    completedTutorials.length === 0 &&
    inProgressTutorials.length === 0 &&
    favorites.length === 0 &&
    designs.length === 0;

  const hasUnlocks = state.character.unlockedAccessories.length > 0;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Your stuff"
        title={state.character.userName ? `${state.character.userName}'s Bracelets` : "My Bracelets"}
        subtitle="Tutorials, saved designs, favorites, and Dallas's accessories — all in one place."
      />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-12">
        {nothingYet ? (
          <EmptyState
            title="Nothing saved yet"
            description="Start a tutorial, design something in Bead Lab, or tap a heart in the gallery."
            action={
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/tutorials">
                  <a>
                    <Button className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold">
                      <BookOpen className="w-4 h-4 mr-2" /> Find a tutorial
                    </Button>
                  </a>
                </Link>
                <Link href="/bead-lab">
                  <a>
                    <Button variant="outline" className="rounded-full h-12 px-6 border-2 font-bold">
                      <Palette className="w-4 h-4 mr-2" /> Open Bead Lab
                    </Button>
                  </a>
                </Link>
              </div>
            }
          />
        ) : null}

        {hasUnlocks || designs.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl text-ink mb-4 inline-flex items-center gap-2">
              <Shirt className="w-5 h-5 text-coral-deep" /> Dallas
            </h2>
            <AccessoryCloset />
          </div>
        ) : null}

        {designs.length > 0 ? (
          <div>
            <h2 className="font-display text-2xl text-ink mb-4 inline-flex items-center gap-2">
              <Palette className="w-5 h-5 text-plum-deep" /> My designs
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {designs.map((d) => (
                <DesignCard key={d.id} design={d} />
              ))}
            </div>
          </div>
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
