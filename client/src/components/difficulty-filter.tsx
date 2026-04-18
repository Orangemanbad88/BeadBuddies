import { cn } from "@/lib/utils";

const options = [
  { value: "all", label: "All" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Getting there" },
  { value: "advanced", label: "Expert" },
];

export const DifficultyFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Difficulty filter">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            data-testid={`chip-difficulty-${o.value}`}
            onClick={() => onChange(o.value)}
            className={cn(
              "chip-button",
              active
                ? "bg-ink text-cream border-ink"
                : "bg-card text-ink-soft border-border hover:border-ink/40"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};
