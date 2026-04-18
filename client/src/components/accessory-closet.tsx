import { Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dallas } from "./dallas";
import { accessories } from "@/data/accessories";
import { equipAccessory } from "@/lib/progress";
import { useProgressState } from "@/lib/use-progress";

export const AccessoryCloset = () => {
  const state = useProgressState();
  const { equippedAccessory, unlockedAccessories } = state.character;
  const unlockedCount = unlockedAccessories.length;

  return (
    <div className="card-soft p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
        <div>
          <h3 className="font-display text-2xl text-ink mb-1">Dallas's closet</h3>
          <p className="text-sm text-ink-soft">
            You've unlocked {unlockedCount} of {accessories.length}. Finish tutorials and
            win Pattern Challenges to earn more.
          </p>
        </div>
        {equippedAccessory ? (
          <button
            type="button"
            onClick={() => equipAccessory(null)}
            data-testid="button-unequip"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft hover:text-coral-deep"
          >
            <X className="w-4 h-4" /> Take off
          </button>
        ) : null}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {accessories.map((a) => {
          const unlocked = unlockedAccessories.includes(a.id);
          const equipped = equippedAccessory === a.id;
          return (
            <button
              key={a.id}
              type="button"
              disabled={!unlocked}
              data-testid={`accessory-${a.id}`}
              onClick={() => equipAccessory(equipped ? null : a.id)}
              aria-pressed={equipped}
              className={cn(
                "relative rounded-2xl p-3 border-2 transition-all text-center",
                equipped
                  ? "bg-coral/15 border-coral"
                  : unlocked
                  ? "bg-card border-border hover:border-ink/40"
                  : "bg-cream-deep border-border opacity-70"
              )}
            >
              <div className="aspect-square flex items-center justify-center mb-2">
                {unlocked ? (
                  <Dallas
                    size={90}
                    accessoryOverride={a.id}
                    idle={false}
                    interactive={false}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-ink-muted" />
                  </div>
                )}
              </div>
              <div className="text-xs font-bold text-ink">{a.name}</div>
              {equipped ? (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center">
                  ✓
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
