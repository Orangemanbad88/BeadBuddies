import { cn } from "@/lib/utils";
import { Bead } from "./bead";

export const BeadString = ({
  beads,
  emptyLabel = "Your bracelet will show up here",
  onRemove,
  className,
  beadSize = 44,
}: {
  beads: string[];
  emptyLabel?: string;
  onRemove?: (index: number) => void;
  className?: string;
  beadSize?: number;
}) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-[var(--radius)] bg-cream-deep/70 border-2 border-dashed border-line-strong p-4 min-h-[92px]",
        className
      )}
      aria-label="Your bracelet"
    >
      {beads.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-ink-muted text-sm font-semibold pointer-events-none">
          {emptyLabel}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 items-center justify-center">
          {beads.map((beadId, i) =>
            onRemove ? (
              <Bead
                key={`${beadId}-${i}`}
                beadId={beadId}
                size={beadSize}
                interactive
                onClick={() => onRemove(i)}
                label="Tap to remove"
              />
            ) : (
              <Bead key={`${beadId}-${i}`} beadId={beadId} size={beadSize} />
            )
          )}
        </div>
      )}
    </div>
  );
};
