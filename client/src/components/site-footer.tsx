import { Link } from "wouter";
import { Mascot } from "./mascot";

export const SiteFooter = () => {
  return (
    <footer className="mt-24 border-t border-border bg-cream-deep">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Mascot size={44} />
            <span className="font-display text-2xl text-ink font-semibold">Tied Together</span>
          </div>
          <p className="text-ink-soft text-sm max-w-sm">
            A cozy place to learn bracelet-making — step by step, at your own pace.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base text-ink mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tutorials"><a className="text-ink-soft hover:text-coral-deep">Tutorials</a></Link></li>
            <li><Link href="/gallery"><a className="text-ink-soft hover:text-coral-deep">Gallery</a></Link></li>
            <li><Link href="/my-bracelets"><a className="text-ink-soft hover:text-coral-deep">My Bracelets</a></Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base text-ink mb-3">Good to know</h4>
          <p className="text-ink-soft text-sm">
            Progress and favorites are saved on this device. Nothing is sent anywhere.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-ink-muted text-center">
          Made with care · © {new Date().getFullYear()} Tied Together
        </div>
      </div>
    </footer>
  );
};
