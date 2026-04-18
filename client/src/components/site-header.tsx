import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Mascot } from "./mascot";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/my-bracelets", label: "My Bracelets" },
];

const isActive = (current: string, href: string) => {
  if (href === "/") return current === "/";
  return current === href || current.startsWith(`${href}/`);
};

export const SiteHeader = () => {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/">
          <a className="flex items-center gap-2.5 group" data-testid="link-home">
            <span className="w-10 h-10 rounded-full bg-coral/15 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mascot size={28} />
            </span>
            <span className="font-display text-2xl text-ink font-semibold tracking-tight">
              Tied Together
            </span>
          </a>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <a
                data-testid={`link-nav-${l.label.toLowerCase().replace(" ", "-")}`}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-colors",
                  isActive(location, l.href)
                    ? "bg-ink text-cream"
                    : "text-ink-soft hover:bg-cream-deep"
                )}
              >
                {l.label === "My Bracelets" ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> {l.label}
                  </span>
                ) : (
                  l.label
                )}
              </a>
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="button-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-full bg-cream-deep flex items-center justify-center text-ink"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open ? (
        <div className="md:hidden border-t border-border bg-cream">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl font-bold text-base",
                    isActive(location, l.href)
                      ? "bg-ink text-cream"
                      : "text-ink hover:bg-cream-deep"
                  )}
                >
                  {l.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
};
