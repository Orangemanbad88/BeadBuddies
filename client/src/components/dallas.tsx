import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useProgressState } from "@/lib/use-progress";

type DallasMood = "happy" | "thinking" | "sleeping";

type DallasProps = {
  size?: number;
  accessoryOverride?: string | null;
  idle?: boolean;
  interactive?: boolean;
  className?: string;
  mood?: DallasMood;
  message?: ReactNode;
  onMessageDismiss?: () => void;
};

const tapPhrases = [
  "Woof!",
  "Hi there!",
  "Pat pat pat!",
  "You're doing great!",
  "Wanna play Bead Lab?",
  "I love your bracelets!",
  "Bork!",
  "That tickles!",
  "Let's make stuff!",
  "You're the best!",
];

const Accessory = ({ id }: { id: string | null }) => {
  if (!id) return null;
  switch (id) {
    case "fox-scarf":
      return (
        <g>
          <path d="M55 148 Q100 158 145 148 L148 160 Q100 172 52 160 Z" fill="#E0663A" stroke="#3B2A1E" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M80 155 L80 175 L72 178 L74 168 Z" fill="#E0663A" stroke="#3B2A1E" strokeWidth="2" />
        </g>
      );
    case "bunny-ears":
      return (
        <g>
          <ellipse cx="82" cy="44" rx="9" ry="28" fill="#F7EAE0" stroke="#3B2A1E" strokeWidth="2.5" transform="rotate(-6 82 44)" />
          <ellipse cx="82" cy="48" rx="4" ry="18" fill="#F5B8C4" transform="rotate(-6 82 48)" />
          <ellipse cx="118" cy="44" rx="9" ry="28" fill="#F7EAE0" stroke="#3B2A1E" strokeWidth="2.5" transform="rotate(6 118 44)" />
          <ellipse cx="118" cy="48" rx="4" ry="18" fill="#F5B8C4" transform="rotate(6 118 48)" />
        </g>
      );
    case "panda-hat":
      return (
        <g>
          <ellipse cx="100" cy="58" rx="42" ry="14" fill="#F7F4EE" stroke="#2A1B1B" strokeWidth="2.5" />
          <circle cx="72" cy="52" r="10" fill="#2A1B1B" />
          <circle cx="128" cy="52" r="10" fill="#2A1B1B" />
          <ellipse cx="100" cy="68" rx="34" ry="6" fill="#F7F4EE" stroke="#2A1B1B" strokeWidth="2" />
        </g>
      );
    case "cat-ears":
      return (
        <g>
          <path d="M72 66 L68 40 L88 58 Z" fill="#E8AE7A" stroke="#3B2A1E" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M128 66 L132 40 L112 58 Z" fill="#E8AE7A" stroke="#3B2A1E" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M75 60 L72 48 L83 56 Z" fill="#F5B8C4" />
          <path d="M125 60 L128 48 L117 56 Z" fill="#F5B8C4" />
        </g>
      );
    case "puppy-bow":
      return (
        <g transform="translate(100 66)">
          <path d="M-14 -6 L-4 0 L-14 6 Z" fill="#F07AA5" stroke="#3B2A1E" strokeWidth="2" />
          <path d="M14 -6 L4 0 L14 6 Z" fill="#F07AA5" stroke="#3B2A1E" strokeWidth="2" />
          <circle r="4" fill="#F07AA5" stroke="#3B2A1E" strokeWidth="2" />
        </g>
      );
    case "owl-glasses":
      return (
        <g fill="none" stroke="#3B2A1E" strokeWidth="3">
          <circle cx="86" cy="94" r="12" fill="#FFFDF7" fillOpacity="0.25" />
          <circle cx="114" cy="94" r="12" fill="#FFFDF7" fillOpacity="0.25" />
          <path d="M98 94 L102 94" />
        </g>
      );
    case "unicorn-horn":
      return (
        <g transform="translate(100 52)">
          <path d="M0 16 L-5 0 L0 -18 L5 0 Z" fill="#FFE48A" stroke="#3B2A1E" strokeWidth="2" strokeLinejoin="round" />
          <path d="M-3 10 L3 7" stroke="#D9A33A" strokeWidth="1.5" />
          <path d="M-3 2 L3 -1" stroke="#D9A33A" strokeWidth="1.5" />
          <path d="M-3 -6 L3 -9" stroke="#D9A33A" strokeWidth="1.5" />
        </g>
      );
    case "bear-hood":
      return (
        <g>
          <path d="M54 72 Q54 36 100 36 Q146 36 146 72 Q146 82 140 86 L60 86 Q54 82 54 72 Z" fill="#8A5A3A" stroke="#3B2A1E" strokeWidth="2.5" />
          <circle cx="74" cy="58" r="11" fill="#8A5A3A" stroke="#3B2A1E" strokeWidth="2.5" />
          <circle cx="126" cy="58" r="11" fill="#8A5A3A" stroke="#3B2A1E" strokeWidth="2.5" />
          <circle cx="74" cy="58" r="5" fill="#F5B8C4" />
          <circle cx="126" cy="58" r="5" fill="#F5B8C4" />
        </g>
      );
    default:
      return null;
  }
};

export const Dallas = ({
  size = 200,
  accessoryOverride,
  idle = true,
  interactive = true,
  className,
  mood = "happy",
  message,
  onMessageDismiss,
}: DallasProps) => {
  const state = useProgressState();
  const equipped =
    accessoryOverride !== undefined
      ? accessoryOverride
      : state.character.equippedAccessory;
  const [blink, setBlink] = useState(false);
  const [wag, setWag] = useState(false);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilting, setTilting] = useState(false);
  const [tapSpeech, setTapSpeech] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!idle || mood === "sleeping") return;
    let alive = true;
    const tick = () => {
      if (!alive) return;
      setBlink(true);
      window.setTimeout(() => {
        if (!alive) return;
        setBlink(false);
      }, 160);
    };
    const id = window.setInterval(tick, 3800 + Math.random() * 1500);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [idle, mood]);

  useEffect(() => {
    if (!interactive) return;
    let raf = 0;
    let latestX = 0;
    let latestY = 0;
    const update = () => {
      raf = 0;
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = latestX - cx;
      const dy = latestY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        setPupil({ x: 0, y: 0 });
        return;
      }
      const magnitude = Math.min(1, dist / 360);
      const max = 2.6;
      setPupil({
        x: (dx / dist) * magnitude * max,
        y: (dy / dist) * magnitude * max,
      });
    };
    const onMove = (e: PointerEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [interactive]);

  const eyesClosed = blink || mood === "sleeping";
  const activeMessage = message ?? tapSpeech;

  const handleTap = () => {
    if (!interactive || message) return;
    setTilting(true);
    setTapSpeech(tapPhrases[Math.floor(Math.random() * tapPhrases.length)]);
    window.setTimeout(() => setTilting(false), 540);
    window.setTimeout(() => setTapSpeech(null), 2400);
  };

  const dismissMessage = () => {
    if (tapSpeech) setTapSpeech(null);
    onMessageDismiss?.();
  };

  return (
    <div className={cn("relative inline-block select-none", className)}>
      {activeMessage ? (
        <button
          type="button"
          onClick={dismissMessage}
          className="absolute -top-2 left-full ml-4 z-10 anim-pop max-w-[260px] text-left bg-white border-2 border-ink rounded-2xl rounded-bl-sm px-4 py-3 text-sm font-semibold text-ink shadow-[0_3px_0_hsl(var(--ink)/0.18)] hover:bg-cream-deep transition-colors"
          aria-label="Dismiss message"
        >
          <span className="block leading-snug">{activeMessage}</span>
          <span className="text-[10px] uppercase tracking-wider text-ink-muted mt-1 block">
            tap to close
          </span>
        </button>
      ) : null}
      <div className={cn(tilting && "anim-head-tilt")}>
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox="0 0 200 220"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Dallas the dog"
          className={cn(
            idle && "anim-dallas-breathe",
            interactive && "cursor-pointer"
          )}
          onMouseEnter={() => interactive && setWag(true)}
          onMouseLeave={() => interactive && setWag(false)}
          onFocus={() => interactive && setWag(true)}
          onBlur={() => interactive && setWag(false)}
          onClick={handleTap}
          tabIndex={interactive ? 0 : -1}
        >
          <ellipse cx="100" cy="210" rx="70" ry="8" fill="hsl(var(--ink) / 0.1)" />

          <g
            style={{
              transformOrigin: "140px 160px",
              transform: wag ? "rotate(-30deg)" : "rotate(-8deg)",
              transition: "transform 180ms ease-out",
            }}
          >
            <ellipse
              cx="140"
              cy="160"
              rx="9"
              ry="22"
              fill="#E8AE7A"
              stroke="#3B2A1E"
              strokeWidth="2.5"
            />
          </g>

          <ellipse cx="100" cy="160" rx="52" ry="50" fill="#E8AE7A" stroke="#3B2A1E" strokeWidth="3" />
          <ellipse cx="100" cy="158" rx="34" ry="30" fill="#F9E0C2" />
          <ellipse cx="100" cy="96" rx="46" ry="42" fill="#E8AE7A" stroke="#3B2A1E" strokeWidth="3" />
          <path d="M62 70 Q58 105 72 115 Q78 92 78 76 Z" fill="#BF7F4D" stroke="#3B2A1E" strokeWidth="3" strokeLinejoin="round" />
          <path d="M138 70 Q142 105 128 115 Q122 92 122 76 Z" fill="#BF7F4D" stroke="#3B2A1E" strokeWidth="3" strokeLinejoin="round" />

          {eyesClosed ? (
            <g stroke="#2A1B1B" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M80 95 Q86 97 92 95" />
              <path d="M108 95 Q114 97 120 95" />
            </g>
          ) : (
            <g style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)` }}>
              <circle cx="86" cy="94" r="6" fill="#2A1B1B" />
              <circle cx="114" cy="94" r="6" fill="#2A1B1B" />
              <circle cx="88" cy="92" r="2" fill="#FFF" />
              <circle cx="116" cy="92" r="2" fill="#FFF" />
            </g>
          )}

          <ellipse cx="100" cy="108" rx="5" ry="4" fill="#2A1B1B" />
          <path d="M100 112 Q100 120 93 120" stroke="#2A1B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M100 112 Q100 120 107 120" stroke="#2A1B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="74" cy="104" r="6" fill="hsl(var(--coral) / 0.55)" />
          <circle cx="126" cy="104" r="6" fill="hsl(var(--coral) / 0.55)" />

          {mood === "sleeping" ? (
            <g fontFamily="var(--font-display)" fontSize="14" fill="hsl(var(--plum-deep))">
              <text x="140" y="60">z</text>
              <text x="150" y="48" fontSize="11">z</text>
            </g>
          ) : null}

          <path d="M62 130 Q100 142 138 130" stroke="hsl(var(--coral-deep))" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="74" cy="133" r="3.5" fill="hsl(var(--sun))" stroke="#3B2A1E" strokeWidth="1" />
          <circle cx="88" cy="137" r="3.5" fill="hsl(var(--sage))" stroke="#3B2A1E" strokeWidth="1" />
          <circle cx="100" cy="139" r="4" fill="hsl(var(--coral))" stroke="#3B2A1E" strokeWidth="1" />
          <circle cx="112" cy="137" r="3.5" fill="hsl(var(--plum))" stroke="#3B2A1E" strokeWidth="1" />
          <circle cx="126" cy="133" r="3.5" fill="hsl(var(--sun))" stroke="#3B2A1E" strokeWidth="1" />

          <Accessory id={equipped ?? null} />
        </svg>
      </div>
    </div>
  );
};
