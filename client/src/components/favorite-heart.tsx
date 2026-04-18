import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/lib/progress";
import { useProgressState } from "@/lib/use-progress";

export const FavoriteHeart = ({
  galleryId,
  className,
}: {
  galleryId: string;
  className?: string;
}) => {
  const state = useProgressState();
  const active = state.favorites.includes(galleryId);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      data-testid={`button-favorite-${galleryId}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(galleryId);
      }}
      className={cn(
        "w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition-transform hover:scale-110 active:scale-95",
        className
      )}
    >
      <Heart
        className={cn(
          "w-5 h-5 transition-colors",
          active ? "fill-coral text-coral" : "text-ink-soft"
        )}
      />
    </button>
  );
};
