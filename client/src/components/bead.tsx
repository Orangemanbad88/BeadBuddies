import { cn } from "@/lib/utils";
import { getBeadColor, parseBead, type BeadShape } from "@/data/beads";

type BeadProps = {
  beadId: string;
  size?: number;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  label?: string;
};

const heartPath = "M50 82 C40 72 14 56 14 36 C14 22 24 14 34 14 C42 14 48 18 50 26 C52 18 58 14 66 14 C76 14 86 22 86 36 C86 56 60 72 50 82 Z";
const starPath = "M50 8 L60 38 L92 38 L66 56 L76 86 L50 68 L24 86 L34 56 L8 38 L40 38 Z";

const Shape = ({ shape, color }: { shape: BeadShape; color: string }) => {
  if (shape === "heart") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
        <path d={heartPath} fill={color} stroke="#3B2A1E" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }
  if (shape === "star") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
        <path d={starPath} fill={color} stroke="#3B2A1E" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
      <circle cx="50" cy="50" r="42" fill={color} stroke="#3B2A1E" strokeWidth="4" />
      <circle cx="38" cy="38" r="8" fill="#FFFFFF" opacity="0.45" />
    </svg>
  );
};

export const Bead = ({
  beadId,
  size = 48,
  className,
  interactive = false,
  onClick,
  label,
}: BeadProps) => {
  const { colorId, shape } = parseBead(beadId);
  const color = getBeadColor(colorId);
  const content = <Shape shape={shape} color={color.hex} />;
  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label ?? `${color.name} ${shape} bead`}
        data-testid={`bead-${beadId}`}
        className={cn(
          "rounded-full hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-coral",
          className
        )}
        style={{ width: size, height: size }}
      >
        {content}
      </button>
    );
  }
  return (
    <span
      className={cn("inline-block", className)}
      style={{ width: size, height: size }}
      aria-label={label}
    >
      {content}
    </span>
  );
};
