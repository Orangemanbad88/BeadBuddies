import { cn } from "@/lib/utils";
import { Bead } from "./bead";
import { beadColors, beadShapes, makeBead, type BeadShape } from "@/data/beads";

export const BeadPalette = ({
  shape,
  onChangeShape,
  onPick,
  showShapePicker = true,
}: {
  shape: BeadShape;
  onChangeShape: (s: BeadShape) => void;
  onPick: (beadId: string) => void;
  showShapePicker?: boolean;
}) => {
  return (
    <div className="card-soft p-5">
      {showShapePicker ? (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted mr-1">
            Shape
          </span>
          {beadShapes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChangeShape(s)}
              aria-pressed={shape === s}
              data-testid={`shape-${s}`}
              className={cn(
                "chip-button text-xs h-8 px-3",
                shape === s
                  ? "bg-ink text-cream border-ink"
                  : "bg-card text-ink-soft border-border hover:border-ink/40"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-2.5">
        {beadColors.map((c) => (
          <Bead
            key={c.id}
            beadId={makeBead(c.id, shape)}
            size={52}
            interactive
            onClick={() => onPick(makeBead(c.id, shape))}
            label={`Add ${c.name} ${shape} bead`}
          />
        ))}
      </div>
    </div>
  );
};
