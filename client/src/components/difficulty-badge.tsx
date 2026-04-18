import { cn } from "@/lib/utils";

type Difficulty = "beginner" | "intermediate" | "advanced" | string;

const labelMap: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Getting there",
  advanced: "Expert",
};

const styleMap: Record<string, string> = {
  beginner: "bg-sage-soft text-sage-deep",
  intermediate: "bg-sun-soft text-[hsl(30_70%_34%)]",
  advanced: "bg-plum-soft text-plum-deep",
};

export const DifficultyBadge = ({
  difficulty,
  className,
}: {
  difficulty: Difficulty;
  className?: string;
}) => {
  const key = difficulty.toLowerCase();
  return (
    <span className={cn("pill", styleMap[key] ?? "bg-muted text-ink-soft", className)}>
      {labelMap[key] ?? difficulty}
    </span>
  );
};
