import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleStep, resetTutorial } from "@/lib/progress";
import { useProgressState } from "@/lib/use-progress";
import { accessoryIds } from "@/data/accessories";

export const StepWalkthrough = ({
  tutorialId,
  steps,
  onComplete,
}: {
  tutorialId: string;
  steps: string[];
  onComplete: (award: string | null) => void;
}) => {
  const [active, setActive] = useState(0);
  const state = useProgressState();
  const done = state.tutorials[tutorialId]?.stepsDone ?? [];
  const total = steps.length;
  const doneCount = done.length;
  const isDone = done.includes(active);
  const last = active === total - 1;

  const handleAdvance = () => {
    const award = isDone ? null : toggleStep(tutorialId, active, total, accessoryIds);
    if (last) {
      onComplete(award);
      return;
    }
    setActive((i) => Math.min(total - 1, i + 1));
  };

  return (
    <div className="card-soft p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-xl text-ink">Step by step</h3>
        {doneCount > 0 ? (
          <button
            type="button"
            onClick={() => {
              resetTutorial(tutorialId);
              setActive(0);
            }}
            className="text-xs font-bold text-ink-muted hover:text-coral-deep inline-flex items-center gap-1"
            data-testid="button-reset-progress"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start over
          </button>
        ) : null}
      </div>
      <div className="flex items-center gap-1.5 mb-6">
        {steps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to step ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors",
              done.includes(i)
                ? "bg-sage-deep"
                : i === active
                ? "bg-coral"
                : "bg-cream-deep"
            )}
          />
        ))}
      </div>
      <div className="mb-6 min-h-[140px]">
        <div className="text-xs font-bold uppercase tracking-wide text-ink-muted mb-2">
          Step {active + 1} of {total}
        </div>
        <p className="font-display text-2xl md:text-3xl text-ink leading-snug">
          {steps[active]}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={active === 0}
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          data-testid="button-prev-step"
          className="rounded-full h-12 px-5 border-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button
          type="button"
          onClick={handleAdvance}
          data-testid="button-next-step"
          className={cn(
            "rounded-full h-12 px-6 font-bold text-base",
            last ? "bg-sage-deep hover:bg-sage-deep/90" : "bg-coral hover:bg-coral-deep"
          )}
        >
          {last ? (
            <>
              <Check className="w-5 h-5 mr-2" /> I finished!
            </>
          ) : isDone ? (
            <>
              Next step <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Done — next <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
