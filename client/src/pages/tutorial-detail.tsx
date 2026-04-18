import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { TutorialHeroVideo } from "@/components/tutorial-hero-video";
import { MaterialsChecklist } from "@/components/materials-checklist";
import { StepWalkthrough } from "@/components/step-walkthrough";
import { Celebration } from "@/components/celebration";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { getTutorialById } from "@/data/content";

const TutorialDetailPage = () => {
  const [, params] = useRoute("/tutorials/:id");
  const id = params?.id ?? "";
  const [justFinished, setJustFinished] = useState(false);
  const celebrationRef = useRef<HTMLDivElement>(null);

  const data = getTutorialById(id);

  useEffect(() => {
    if (justFinished && celebrationRef.current) {
      celebrationRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [justFinished]);

  if (!data) {
    return (
      <AppShell>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <EmptyState
            title="Tutorial not found"
            description="We couldn't find that one. It may have been moved."
            action={
              <Link href="/tutorials">
                <a>
                  <Button className="rounded-full bg-coral hover:bg-coral-deep">Back to all</Button>
                </a>
              </Link>
            }
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/tutorials">
          <a
            data-testid="link-back-tutorials"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-coral-deep mb-5"
          >
            <ArrowLeft className="w-4 h-4" /> All tutorials
          </a>
        </Link>

        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <DifficultyBadge difficulty={data.difficulty} />
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <Clock className="w-4 h-4" /> {data.duration}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-ink mb-3 leading-tight">
            {data.title}
          </h1>
          <p className="text-lg text-ink-soft max-w-3xl">{data.description}</p>
        </header>

        <TutorialHeroVideo
          videoUrl={data.videoUrl}
          poster={data.imageUrl}
          title={data.title}
        />

        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] mt-8">
          <MaterialsChecklist tutorialId={data.id} materials={data.materials} />
          <StepWalkthrough
            tutorialId={data.id}
            steps={data.steps}
            onComplete={() => setJustFinished(true)}
          />
        </div>

        {justFinished ? (
          <div ref={celebrationRef} className="mt-8">
            <Celebration title={data.title} />
          </div>
        ) : null}
      </article>
    </AppShell>
  );
};

export default TutorialDetailPage;
