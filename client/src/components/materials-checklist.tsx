import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleMaterial } from "@/lib/progress";
import { useProgressState } from "@/lib/use-progress";

export const MaterialsChecklist = ({
  tutorialId,
  materials,
}: {
  tutorialId: string;
  materials: string[];
}) => {
  const state = useProgressState();
  const checked = state.tutorials[tutorialId]?.materialsDone ?? [];

  return (
    <div className="card-soft p-6">
      <h3 className="font-display text-xl text-ink mb-1">What you'll need</h3>
      <p className="text-sm text-ink-muted mb-4">Tick things off as you gather them.</p>
      <ul className="space-y-2">
        {materials.map((m, i) => {
          const isChecked = checked.includes(i);
          return (
            <li key={i}>
              <button
                type="button"
                aria-pressed={isChecked}
                data-testid={`material-${i}`}
                onClick={() => toggleMaterial(tutorialId, i)}
                className={cn(
                  "w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors",
                  isChecked
                    ? "bg-sage-soft border-sage/40 text-ink"
                    : "bg-card border-border hover:border-ink/30 text-ink"
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors",
                    isChecked
                      ? "bg-sage-deep border-sage-deep text-white"
                      : "border-border bg-cream"
                  )}
                >
                  {isChecked ? <Check className="w-4 h-4" strokeWidth={3} /> : null}
                </span>
                <span className={cn("font-semibold", isChecked && "line-through text-ink-muted")}>
                  {m}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
