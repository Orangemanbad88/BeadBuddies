import { Link } from "wouter";
import { ArrowRight, Sparkles, BookOpen, Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/app-shell";
import { Mascot } from "@/components/mascot";
import { TutorialCard } from "@/components/tutorial-card";
import { GalleryCard } from "@/components/gallery-card";
import { tutorials, galleryItems } from "@/data/content";

const HomePage = () => {
  const featured = tutorials.slice(0, 3);
  const gallerySlice = galleryItems.slice(0, 6);

  return (
    <AppShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-coral/20 blur-3xl" />
          <div className="absolute top-40 -right-24 w-96 h-96 rounded-full bg-plum/15 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 grid gap-10 md:grid-cols-[1.15fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 pill bg-sun-soft text-[hsl(30_70%_34%)] mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Cozy bracelet school
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-[1.05] mb-5">
              Learn to make<br />
              <span className="text-coral-deep">bracelets</span> you love.
            </h1>
            <p className="text-lg md:text-xl text-ink-soft max-w-xl mb-7">
              Pick a tutorial, gather your materials, and follow along step by step — we'll save
              your progress so you can come back any time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tutorials">
                <a>
                  <Button
                    data-testid="button-hero-browse"
                    className="rounded-full h-14 px-7 text-base font-bold bg-coral hover:bg-coral-deep shadow-[0_4px_0_hsl(var(--coral-deep))] hover:shadow-[0_2px_0_hsl(var(--coral-deep))] hover:translate-y-0.5 transition-all"
                  >
                    <BookOpen className="w-5 h-5 mr-2" /> Browse tutorials
                  </Button>
                </a>
              </Link>
              <Link href="/gallery">
                <a>
                  <Button
                    variant="outline"
                    data-testid="button-hero-gallery"
                    className="rounded-full h-14 px-7 text-base font-bold border-2 border-ink text-ink bg-transparent hover:bg-ink hover:text-cream"
                  >
                    <Images className="w-5 h-5 mr-2" /> See the gallery
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-6 rounded-full bg-coral/25 blur-2xl" aria-hidden />
              <div className="relative anim-float">
                <Mascot size={280} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-coral-deep mb-1.5">
              Featured
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Start with these</h2>
          </div>
          <Link href="/tutorials">
            <a
              data-testid="link-all-tutorials"
              className="hidden sm:inline-flex items-center gap-1 font-bold text-ink hover:text-coral-deep"
            >
              All tutorials <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((t) => (
            <TutorialCard key={t.id} tutorial={t} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-plum-deep mb-1.5">
              Made by kids
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Gallery highlights</h2>
          </div>
          <Link href="/gallery">
            <a className="hidden sm:inline-flex items-center gap-1 font-bold text-ink hover:text-coral-deep">
              See all <ArrowRight className="w-4 h-4" />
            </a>
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {gallerySlice.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="rounded-[var(--radius)] bg-ink text-cream p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-4 opacity-90 hidden md:block">
            <Mascot size={220} />
          </div>
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl mb-3">Ready to make something?</h2>
            <p className="text-cream/80 text-lg mb-6">
              Pick a tutorial that matches your mood today. Beginner, expert, whatever — we'll
              guide you.
            </p>
            <Link href="/tutorials">
              <a>
                <Button className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold">
                  Let's go <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default HomePage;
