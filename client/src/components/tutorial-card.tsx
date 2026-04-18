import { Link } from "wouter";
import { Play, CheckCircle2 } from "lucide-react";
import type { Tutorial } from "@shared/schema";
import { DifficultyBadge } from "./difficulty-badge";
import { useProgressState } from "@/lib/use-progress";

export const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
  const state = useProgressState();
  const progress = state.tutorials[tutorial.id];
  const total = tutorial.steps.length;
  const done = progress?.stepsDone.length ?? 0;
  const complete = Boolean(progress?.completedAt);

  return (
    <Link href={`/tutorials/${tutorial.id}`}>
      <a
        data-testid={`card-tutorial-${tutorial.id}`}
        className="card-soft block overflow-hidden group"
      >
        <div className="relative aspect-[4/3] bg-cream-deep overflow-hidden">
          <img
            src={tutorial.imageUrl}
            alt=""
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <DifficultyBadge difficulty={tutorial.difficulty} />
          </div>
          <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-md">
            {complete ? (
              <CheckCircle2 className="w-6 h-6 text-sage-deep" />
            ) : (
              <Play className="w-5 h-5 text-coral-deep translate-x-0.5" />
            )}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl text-ink mb-1.5">{tutorial.title}</h3>
          <p className="text-sm text-ink-soft line-clamp-2">{tutorial.description}</p>
          {total > 0 && done > 0 && !complete ? (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-ink-muted mb-1.5">
                <span>{done} of {total} steps</span>
                <span>{Math.round((done / total) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-cream-deep rounded-full overflow-hidden">
                <div
                  className="h-full bg-coral rounded-full"
                  style={{ width: `${(done / total) * 100}%` }}
                />
              </div>
            </div>
          ) : complete ? (
            <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-sage-deep">
              <CheckCircle2 className="w-4 h-4" /> You finished this!
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
