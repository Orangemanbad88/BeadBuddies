import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Trash2,
  Save,
  Target,
  Palette,
  Check,
  X,
  Trophy,
  Users,
  Flame,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Dallas } from "@/components/dallas";
import { BeadPalette } from "@/components/bead-palette";
import { BeadString } from "@/components/bead-string";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAX_STRING_LENGTH, randomPattern, type BeadShape } from "@/data/beads";
import { accessoryIds, getAccessory } from "@/data/accessories";
import { saveDesign, recordChallengeWin, resetStreak } from "@/lib/progress";
import { useProgressState } from "@/lib/use-progress";

type Mode = "free" | "challenge" | "friends";

const levels = [
  { level: 1, count: 4, showMs: 4200, label: "Easy" },
  { level: 2, count: 6, showMs: 4200, label: "Medium" },
  { level: 3, count: 8, showMs: 4500, label: "Tricky" },
];

type ChallengePhase = "idle" | "showing" | "recalling" | "result";

type FriendsPhase = "setup" | "handoff" | "memorize" | "recall" | "result";

const MIN_FRIENDS_PATTERN = 4;
const MAX_FRIENDS_PATTERN = 8;
const FRIENDS_MEMORIZE_MS = 5000;

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
  const [lastBonus, setLastBonus] = useState<string | null>(null);
  const [streakJustHit, setStreakJustHit] = useState(false);

  const [fPhase, setFPhase] = useState<FriendsPhase>("setup");
  const [fPattern, setFPattern] = useState<string[]>([]);
  const [fAttempt, setFAttempt] = useState<string[]>([]);
  const [fResult, setFResult] = useState<"win" | "miss" | null>(null);
  const [fRound, setFRound] = useState(1);
  const [fScore, setFScore] = useState(0);

  const state = useProgressState();
  const highestCompleted = state.character.highestChallengeLevel;
  const maxUnlockedLevel = Math.min(levels.length, highestCompleted + 1);

  const hideTimerRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const clearShowTimer = () => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const add = (id: string) => {
    if (mode === "free" && beads.length < MAX_STRING_LENGTH) {
      setBeads((b) => [...b, id]);
      return;
    }
    if (mode === "challenge" && phase === "recalling" && attempt.length < pattern.length) {
      setAttempt((a) => [...a, id]);
      return;
    }
    if (mode === "friends") {
      if (fPhase === "setup" && fPattern.length < MAX_FRIENDS_PATTERN) {
        setFPattern((p) => [...p, id]);
      } else if (fPhase === "recall" && fAttempt.length < fPattern.length) {
        setFAttempt((a) => [...a, id]);
      }
    }
  };

  const removeAt = (i: number) => {
    if (mode === "free") setBeads((b) => b.filter((_, idx) => idx !== i));
    if (mode === "challenge" && phase === "recalling")
      setAttempt((a) => a.filter((_, idx) => idx !== i));
    if (mode === "friends") {
      if (fPhase === "setup") setFPattern((p) => p.filter((_, idx) => idx !== i));
      else if (fPhase === "recall") setFAttempt((a) => a.filter((_, idx) => idx !== i));
    }
  };

  const clearAll = () => {
    if (mode === "free") setBeads([]);
    if (mode === "challenge" && phase === "recalling") setAttempt([]);
    if (mode === "friends" && fPhase === "setup") setFPattern([]);
    if (mode === "friends" && fPhase === "recall") setFAttempt([]);
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
    setLastBonus(null);
    setStreakJustHit(false);
    setPhase("showing");
    clearShowTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setPhase("recalling");
    }, def.showMs);
  };

  const submitAttempt = () => {
    if (attempt.length !== pattern.length) return;
    const match = attempt.every((b, i) => b === pattern[i]);
    if (match) {
      const award = recordChallengeWin(level, accessoryIds);
      setLastAward(award.accessory);
      setLastBonus(award.bonusAccessory);
      setStreakJustHit(award.streakMilestone);
      setLastResult("win");
    } else {
      resetStreak();
      setLastResult("miss");
    }
    setPhase("result");
  };

  const retryChallenge = () => startChallenge(level);

  const startFriends = () => {
    setFPhase("setup");
    setFPattern([]);
    setFAttempt([]);
    setFResult(null);
  };

  const lockPattern = () => {
    if (fPattern.length < MIN_FRIENDS_PATTERN) return;
    setFPhase("handoff");
  };

  const beginMemorize = () => {
    setFPhase("memorize");
    clearShowTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setFPhase("recall");
    }, FRIENDS_MEMORIZE_MS);
  };

  const checkFriends = () => {
    if (fAttempt.length !== fPattern.length) return;
    const match = fAttempt.every((b, i) => b === fPattern[i]);
    setFResult(match ? "win" : "miss");
    if (match) setFScore((s) => s + 1);
    setFPhase("result");
  };

  const nextFriendsRound = () => {
    setFRound((r) => r + 1);
    startFriends();
  };

  const streak = state.character.currentStreak;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Bead Lab"
        title="Design and play"
        subtitle="Design freely, play against Dallas, or pass the phone to a friend."
      >
        <div className="flex gap-2 flex-wrap">
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
          <button
            type="button"
            onClick={() => {
              setMode("friends");
              startFriends();
            }}
            aria-pressed={mode === "friends"}
            data-testid="mode-friends"
            className={cn(
              "chip-button",
              mode === "friends"
                ? "bg-ink text-cream border-ink"
                : "bg-card text-ink-soft border-border"
            )}
          >
            <Users className="w-4 h-4" /> Friends Mode
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
                  ? "Tap beads to add them!"
                  : mode === "challenge"
                  ? phase === "showing"
                    ? "Watch carefully…"
                    : phase === "recalling"
                    ? "Now you try — same order!"
                    : phase === "result" && lastResult === "win"
                    ? streakJustHit
                      ? "HOT STREAK!"
                      : "Yes! You got it!"
                    : phase === "result" && lastResult === "miss"
                    ? "Close! Try again?"
                    : "Pick a level to start."
                  : fPhase === "setup"
                  ? "Make a tricky pattern!"
                  : fPhase === "handoff"
                  ? "Pass the phone!"
                  : fPhase === "memorize"
                  ? "Memorize it!"
                  : fPhase === "recall"
                  ? "Rebuild the pattern!"
                  : fResult === "win"
                  ? "Teamwork!"
                  : "Close one!"
              }
              mood={
                (mode === "challenge" && phase === "showing") ||
                (mode === "friends" && fPhase === "memorize")
                  ? "thinking"
                  : "happy"
              }
            />
            {mode === "challenge" && streak > 0 ? (
              <div className="mt-4 inline-flex items-center gap-1.5 pill bg-coral/15 text-coral-deep">
                <Flame className="w-4 h-4" /> Streak: {streak}
              </div>
            ) : null}
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
            ) : mode === "challenge" ? (
              <>
                <div className="card-soft p-5">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div>
                      <h3 className="font-display text-xl text-ink">
                        Level {level} · {levels[level - 1].label}
                      </h3>
                      <p className="text-xs text-ink-muted font-semibold mt-1 inline-flex items-center gap-3">
                        <span>Wins: {state.character.challengeWins}</span>
                        <span>Best level: {highestCompleted || "—"}</span>
                        <span>Best streak: {state.character.bestStreak}</span>
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
                        Dallas will show a pattern. Remember it, then rebuild.
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
                        emptyLabel="Tap beads below to rebuild the pattern"
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
                          {streakJustHit ? (
                            <div className="inline-flex items-center gap-2 pill bg-coral/15 text-coral-deep mb-2">
                              <Flame className="w-4 h-4" /> {streak}-in-a-row bonus!
                            </div>
                          ) : null}
                          {lastAward ? (
                            <p className="text-ink-soft">
                              You unlocked{" "}
                              <span className="font-bold text-ink">
                                {getAccessory(lastAward)?.name}
                              </span>
                              {lastBonus ? (
                                <>
                                  {" "}and a bonus{" "}
                                  <span className="font-bold text-ink">
                                    {getAccessory(lastBonus)?.name}
                                  </span>
                                </>
                              ) : null}
                              {" "}for Dallas!
                            </p>
                          ) : (
                            <p className="text-ink-soft">
                              All accessories already unlocked — legend.
                            </p>
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
                          <p className="text-ink-soft">
                            Streak reset — let's build it back up.
                          </p>
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
            ) : (
              <>
                <div className="card-soft p-5">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div>
                      <h3 className="font-display text-xl text-ink inline-flex items-center gap-2">
                        <Users className="w-5 h-5 text-plum-deep" /> Friends Mode
                      </h3>
                      <p className="text-xs text-ink-muted font-semibold mt-1">
                        Round {fRound} · Team score {fScore}
                      </p>
                    </div>
                  </div>

                  {fPhase === "setup" ? (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-plum-deep mb-2">
                        Your turn · make a pattern
                      </div>
                      <p className="text-sm text-ink-soft mb-3">
                        Tap {MIN_FRIENDS_PATTERN}–{MAX_FRIENDS_PATTERN} beads. When you're done,
                        hit Ready and pass the phone.
                      </p>
                      <BeadString
                        beads={fPattern}
                        onRemove={removeAt}
                        emptyLabel="Tap beads below to build your pattern"
                      />
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          type="button"
                          onClick={lockPattern}
                          disabled={fPattern.length < MIN_FRIENDS_PATTERN}
                          data-testid="button-lock-friends"
                          className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                        >
                          Ready <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearAll}
                          disabled={fPattern.length === 0}
                          className="rounded-full h-11 px-5 border-2 font-bold"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Clear
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {fPhase === "handoff" ? (
                    <div className="text-center py-8">
                      <Users className="w-10 h-10 text-plum-deep mx-auto mb-2" />
                      <h4 className="font-display text-2xl text-ink mb-1">Pass the phone!</h4>
                      <p className="text-ink-soft mb-4">
                        When your friend is ready, they tap start.
                      </p>
                      <Button
                        type="button"
                        onClick={beginMemorize}
                        data-testid="button-begin-memorize"
                        className="rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold"
                      >
                        <Sparkles className="w-5 h-5 mr-2" /> I'm ready
                      </Button>
                    </div>
                  ) : null}

                  {fPhase === "memorize" ? (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-coral-deep mb-2">
                        Memorize it!
                      </div>
                      <BeadString beads={fPattern} emptyLabel="" />
                    </div>
                  ) : null}

                  {fPhase === "recall" ? (
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
                        Rebuild it · {fAttempt.length} / {fPattern.length}
                      </div>
                      <BeadString
                        beads={fAttempt}
                        onRemove={removeAt}
                        emptyLabel="Tap beads below to rebuild"
                      />
                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          type="button"
                          onClick={checkFriends}
                          disabled={fAttempt.length !== fPattern.length}
                          data-testid="button-check-friends"
                          className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                        >
                          <Check className="w-4 h-4 mr-2" /> Check
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearAll}
                          disabled={fAttempt.length === 0}
                          className="rounded-full h-11 px-5 border-2 font-bold"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Clear
                        </Button>
                      </div>
                    </div>
                  ) : null}

                  {fPhase === "result" ? (
                    <div className="text-center py-6 anim-pop">
                      {fResult === "win" ? (
                        <>
                          <Trophy className="w-10 h-10 text-sage-deep mx-auto mb-2" />
                          <h4 className="font-display text-2xl text-ink mb-1">
                            Teamwork!
                          </h4>
                          <p className="text-ink-soft">You got it on round {fRound}.</p>
                        </>
                      ) : (
                        <>
                          <X className="w-10 h-10 text-coral-deep mx-auto mb-2" />
                          <h4 className="font-display text-2xl text-ink mb-1">So close!</h4>
                          <p className="text-ink-soft">Swap and try another round.</p>
                        </>
                      )}
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <Button
                          type="button"
                          onClick={nextFriendsRound}
                          data-testid="button-next-friends-round"
                          className="rounded-full h-11 px-5 bg-coral hover:bg-coral-deep font-bold"
                        >
                          Next round
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>

                {fPhase === "setup" || fPhase === "recall" ? (
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
