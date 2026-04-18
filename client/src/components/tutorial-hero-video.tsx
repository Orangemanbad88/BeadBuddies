import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export const TutorialHeroVideo = ({
  videoUrl,
  poster,
  title,
}: {
  videoUrl: string | null;
  poster: string;
  title: string;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!videoUrl) {
    return (
      <div className="relative aspect-video rounded-[var(--radius)] overflow-hidden bg-cream-deep border border-border">
        <img src={poster} alt={title} className="w-full h-full object-cover" />
      </div>
    );
  }

  const start = () => {
    setPlaying(true);
    void ref.current?.play().catch(() => undefined);
  };

  return (
    <div className="relative aspect-video rounded-[var(--radius)] overflow-hidden bg-black border border-border">
      <video
        ref={ref}
        src={videoUrl}
        poster={poster}
        controls={playing}
        playsInline
        preload="metadata"
        className={cn("w-full h-full object-cover", !playing && "opacity-80")}
        onPause={() => setPlaying(false)}
      />
      {!playing ? (
        <button
          type="button"
          onClick={start}
          aria-label={`Play video: ${title}`}
          data-testid="button-play-hero-video"
          className="absolute inset-0 flex items-center justify-center group"
        >
          <span className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
            <Play className="w-9 h-9 text-coral-deep translate-x-1" strokeWidth={2.5} />
          </span>
        </button>
      ) : null}
    </div>
  );
};
