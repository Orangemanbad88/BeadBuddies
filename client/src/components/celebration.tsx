import { Sparkles, Home } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mascot } from "./mascot";

const pieces = Array.from({ length: 18 });

export const Celebration = ({ title }: { title: string }) => {
  return (
    <div className="card-soft p-8 md:p-12 text-center relative overflow-hidden anim-pop">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {pieces.map((_, i) => {
          const tx = (Math.random() * 2 - 1) * 280;
          const ty = -(Math.random() * 280 + 60);
          const r = Math.random() * 720 - 360;
          const delay = Math.random() * 300;
          const colors = ["hsl(var(--coral))", "hsl(var(--plum))", "hsl(var(--sage))", "hsl(var(--sun))"];
          const color = colors[i % colors.length];
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-sm"
              style={{
                backgroundColor: color,
                animation: `confetti-burst 1200ms ease-out ${delay}ms forwards`,
                // @ts-expect-error custom CSS vars
                "--tx": `${tx}px`,
                "--ty": `${ty}px`,
                "--r": `${r}deg`,
              }}
            />
          );
        })}
      </div>
      <div className="relative z-10">
        <div className="inline-block anim-float mb-4">
          <Mascot size={120} />
        </div>
        <div className="inline-flex items-center gap-2 text-sage-deep font-bold text-sm mb-2">
          <Sparkles className="w-4 h-4" /> BRACELET FINISHED
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-ink mb-3">You did it!</h2>
        <p className="text-ink-soft text-lg max-w-md mx-auto mb-6">
          Nice work on <span className="font-bold text-ink">{title}</span>. It's saved in My
          Bracelets — come back any time.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/my-bracelets">
            <a>
              <Button className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold">
                See My Bracelets
              </Button>
            </a>
          </Link>
          <Link href="/tutorials">
            <a>
              <Button
                variant="outline"
                className="rounded-full h-12 px-6 border-2 font-bold"
              >
                <Home className="w-4 h-4 mr-2" /> Try another
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
