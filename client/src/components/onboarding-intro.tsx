import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dallas } from "./dallas";
import { setUserName, markIntroSeen } from "@/lib/progress";

export const OnboardingIntro = () => {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(name);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
    >
      <div className="card-soft bg-cream w-full max-w-lg p-8 md:p-10 anim-pop">
        <div className="flex justify-center mb-4">
          <Dallas size={160} interactive={false} />
        </div>
        <div className="inline-flex items-center gap-1.5 text-sm font-bold text-coral-deep mb-1.5">
          <Sparkles className="w-4 h-4" /> Hi there!
        </div>
        <h2 id="intro-title" className="font-display text-3xl md:text-4xl text-ink mb-2">
          I'm Dallas.
        </h2>
        <p className="text-ink-soft text-lg mb-6">
          I'll hang out with you while you make bracelets. What should I call you?
        </p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            maxLength={20}
            data-testid="input-user-name"
            className="w-full h-14 px-5 rounded-full border-2 border-border bg-card text-ink text-lg font-semibold placeholder:text-ink-muted focus:border-coral focus:outline-none"
          />
          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              data-testid="button-intro-go"
              className="flex-1 rounded-full h-12 px-6 bg-coral hover:bg-coral-deep font-bold text-base"
            >
              Let's go!
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => markIntroSeen()}
              data-testid="button-intro-skip"
              className="rounded-full h-12 px-6 border-2 font-bold"
            >
              Skip
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
