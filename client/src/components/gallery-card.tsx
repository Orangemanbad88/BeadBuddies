import type { GalleryItem } from "@shared/schema";
import { DifficultyBadge } from "./difficulty-badge";
import { FavoriteHeart } from "./favorite-heart";

export const GalleryCard = ({ item }: { item: GalleryItem }) => {
  return (
    <article
      data-testid={`card-gallery-${item.id}`}
      className="card-soft overflow-hidden"
    >
      <div className="relative aspect-square bg-cream-deep">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <FavoriteHeart galleryId={item.id} className="absolute top-3 right-3" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-display text-base text-ink leading-tight">{item.title}</h3>
          <DifficultyBadge difficulty={item.difficulty} className="shrink-0 text-xs px-2 py-0.5" />
        </div>
        <p className="text-xs text-ink-muted">
          by {item.creatorName}
          {item.creatorAge ? `, ${item.creatorAge}` : ""}
        </p>
      </div>
    </article>
  );
};
