import { useEffect, useRef, useState } from "react";
import { Sparkles, Trash2, Save, Target, Palette, Check, X, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Dallas } from "@/components/dallas";
import { BeadPalette } from "@/components/bead-palette";
import { BeadString } from "@/components/bead-string";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAX_STRING_LENGTH, randomPattern, type BeadShape } from "@/data/beads";
import { accessoryIds, getAccessory } from "@/data/accessories";
import { saveDesign, recordChallengeWin } from "@/lib/progress";
import { useProgressState } from "@/lib/use-progress";

type Mode = "free" | "challenge";

const levels = [
  { level: 1, count: 4, showMs: 4200, label: "Easy" },
  { level: 2, count: 6, showMs: 4200, label: "Medium" },
  { level: 3, count: 8, showMs: 4500, label: "Tricky" },
];

type ChallengePhase = "idle" | "showing" | "recalling" | "result";

const BeadLabPage = () => {
  const [mode, setMode] = useState<Mode>("free");
  const [shape, setShape] = useState<BeadShape>("round");
  const [beads, setBeads] = useState<string[]>([]);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<ChallengePhase>("idle");
  const [pattern, setPattern] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<"win" | "miss" | null>(null);
  const [lastAward, setLastAward] = useState<string | null>(null);

  const state = useProgressState();

  const highestCompleted = state.character.highestChallengeLevel;
  const maxUnlockedLevel = Math.min(levels.length, highestCompleted + 1);

  const hideTimerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const add = (id: string) => {
    if (mode === "free" && beads.length < MAX_STRING_LENGTH) {
      setBeads((b) => [...b, id]);
    }
    if (mode === "challenge" && phase === "recalling" && attempt.length < pattern.length) {
      setAttempt((a) => [...a, id]);
    }
  };

  const removeAt = (i: number) => {
    if (mode === "free") setBeads((b) => b.filter((_, idx) => idx !== i));
    if (mode === "challenge" && phase === "recalling")
      setAttempt((a) => a.filter((_, idx) => idx !== i));
  };

  const clearAll = () => {
    if (mode === "free") setBeads([]);
    if (mode === "challenge" && phase === "recalling") setAttempt([]);
  };

  const handleSave = () => {
    if (beads.length === 0) return;
    const name = window.prompt("Name your design:", "My new design")?.trim();
    if (name === undefined) return;
    const d = saveDesign(name || "Untitled", beads);
    setSavedToast(`Saved "${d.name}" to My Bracelets`);
    window.setTimeout(() => setSavedToast(null), 2400);
  };

  const startChallenge = (lvl: number) => {
    const def = levels.find((l) => l.level === lvl) ?? levels[0];
    const p = randomPattern(def.count);
    setLevel(lvl);
    setPattern(p);
    setAttempt([]);
    setLastResult(null);
    setLastAward(null);
    setPhase("showing");
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => {
      setPhase("recalling");
    }, def.showMs);
  };

  const submitAttempt = () => {
    if (attempt.length !== pattern.length) return;
    const match = attempt.every((b, i) => b === pattern[i]);
    if (match) {
      const award = recordChallengeWin(level, accessoryIds);
      setLastAward(award);
      setLastResult("win");
    } else {
      setLastResult("miss");
    }
    setPhase("result");
  };

  const retryChallenge = () => startChallenge(level);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Bead Lab"
        title="Design and play"
        subtitle="Make a bracelet from bead colors and shapes, or test your memory with Dallas."
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("free")}
            aria-pressed={mode === "free"}
            data-testid="mode-free"
            className={cn(
              "chip-button",
              mode === "free"
                ? "bg-ink text-cream border-ink"
                : "bg-card text-ink-soft border-border"
            )}
          >
            <Palette className="w-4 h-4" /> Free Play
          </button>
          <button
            type="button"
            onClick={() => setMode("challenge")}
            aria-pressed={mode === "challenge"}
            data-testid="mode-challenge"
            className={cn(
              "chip-button",
              mode === "challenge"
                ? "bg-ink text-cream border-ink"
                : "bg-card text-ink-soft border-border"
            )}
          >
            <Target className="w-4 h-4" /> Pattern Challenge
          </button>
        </div>
      </PageHeader>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 md:grid-cols-[220px_1fr] items-start">
          <div className="card-soft p-5 text-center sticky top-24 hidden md:block">
            <Dallas
              size={180}
              message={
                mode === "free"
                  ? "Make something fun! Tap beads to add them."
                  : phase === "showing"
                  ? "Watch carefully…"
                  : phase === "recalling"
                  ? "Now you try — same order!"
                  : phase === "result" && lastResult === "win"
                  ? "Yes! You got it!"
                  : phase === "result" && lastResult === "miss"
                  ? "Close! Try again?"
                  : "Pick a level to start."
              }
              mood={phase === "showing" ? "thinking" : "happy"}
            />
          </div>
          <div className="space-y-6">
            {mode === "free" ? (
              <>
                <div className="card-soft p-5">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <h3 className="font-display text-xl text-ink">Your bracelet</h3>
                    <span className="text-xs text-ink-muted font-semibold">
                      {beads.length} / {MAX_STRING_LENGTH} beads
                    </span>
                  </div>
                  <BeadString beads={beads} onRemove={removeAt} />
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      type="button"
                      onClick={handleSave}
                      disabled={beads.length === 0}
                      data-testid="button-save-design"
                      className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                    >
                      <Save className="w-4 h-4 mr-2" /> Save design
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearAll}
                      disabled={beads.length === 0}
                      data-testid="button-clear-design"
                      className="rounded-full h-11 px-5 border-2 font-bold"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Clear
                    </Button>
                  </div>
                </div>
                <BeadPalette shape={shape} onChangeShape={setShape} onPick={add} />
                {savedToast ? (
                  <div
                    role="status"
                    className="card-soft p-4 bg-sage-soft border-sage/30 inline-flex items-center gap-2 text-sage-deep font-bold anim-pop"
                  >
                    <Check className="w-4 h-4" /> {savedToast}
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <div className="card-soft p-5">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div>
                      <h3 className="font-display text-xl text-ink">
                        Level {level} · {levels[level - 1].label}
                      </h3>
                      <p className="text-xs text-ink-muted font-semibold mt-1">
                        Won: {state.character.challengeWins} · Best level: {highestCompleted || "—"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {levels.map((l) => {
                        const locked = l.level > maxUnlockedLevel;
                        return (
                          <button
                            key={l.level}
                            type="button"
                            disabled={locked}
                            onClick={() => startChallenge(l.level)}
                            data-testid={`level-${l.level}`}
                            className={cn(
                              "chip-button h-9 px-3 text-xs",
                              level === l.level && !locked
                                ? "bg-ink text-cream border-ink"
                                : locked
                                ? "bg-cream-deep text-ink-muted border-border opacity-60"
                                : "bg-card text-ink-soft border-border hover:border-ink/40"
                            )}
                          >
                            {l.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {phase === "idle" ? (
                    <div className="py-10 text-center">
                      <p className="text-ink-soft mb-4">
                        Dallas will show you a pattern. Remember the order and recreate it.
                      </p>
                      <Button
                        type="button"
                        onClick={() => startChallenge(level)}
                        data-testid="button-start-challenge"
                        className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold"
                      >
                        <Sparkles className="w-5 h-5 mr-2" /> Start round
                      </Button>
                    </div>
                  ) : null}

                  {phase === "showing" ? (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-coral-deep mb-2">
                        Remember this!
                      </div>
                      <BeadString beads={pattern} emptyLabel="" />
                    </div>
                  ) : null}

                  {phase === "recalling" ? (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                        Your turn · {attempt.length} / {pattern.length}
                      </div>
                      <BeadString
                        beads={attempt}
                        onRemove={removeAt}
                        emptyLabel="Tap bead colors below to rebuild the pattern"
                      />
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          type="button"
                          onClick={submitAttempt}
                          disabled={attempt.length !== pattern.length}
                          data-testid="button-check-attempt"
                          className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                        >
                          <Check className="w-4 h-4 mr-2" /> Check
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearAll}
                          disabled={attempt.length === 0}
                          className="rounded-full h-11 px-5 border-2 font-bold"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Clear
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {phase === "result" ? (
                    <div className="text-center py-6">
                      {lastResult === "win" ? (
                        <div className="anim-pop">
                          <Trophy className="w-10 h-10 text-sage-deep mx-auto mb-2" />
                          <h4 className="font-display text-2xl text-ink mb-1">
                            You nailed it!
                          </h4>
                          {lastAward ? (
                            <p className="text-ink-soft">
                              You unlocked the{" "}
                              <span className="font-bold text-ink">
                                {getAccessory(lastAward)?.name}
                              </span>{" "}
                              for Dallas!
                            </p>
                          ) : (
                            <p className="text-ink-soft">All accessories already unlocked — legend.</p>
                          )}
                          <div className="mt-4 flex flex-wrap justify-center gap-2">
                            <Button
                              type="button"
                              onClick={retryChallenge}
                              className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                            >
                              Play again
                            </Button>
                            {level < levels.length ? (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => startChallenge(level + 1)}
                                className="rounded-full h-11 px-5 border-2 font-bold"
                              >
                                Next level
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <X className="w-10 h-10 text-coral-deep mx-auto mb-2" />
                          <h4 className="font-display text-2xl text-ink mb-1">
                            So close!
                          </h4>
                          <p className="text-ink-soft">Let's try that one again.</p>
                          <div className="mt-4 flex justify-center gap-2">
                            <Button
                              type="button"
                              onClick={retryChallenge}
                              data-testid="button-retry-challenge"
                              className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                            >
                              Try again
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                {phase === "recalling" ? (
                  <BeadPalette
                    shape="round"
                    onChangeShape={() => undefined}
                    onPick={add}
                    showShapePicker={false}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
};

export default BeadLabPage;
