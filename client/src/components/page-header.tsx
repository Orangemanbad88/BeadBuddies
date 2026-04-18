import type { ReactNode } from "react";

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
      {eyebrow ? (
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-coral-deep mb-2">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-2">{title}</h1>
      {subtitle ? (
        <p className="text-lg text-ink-soft max-w-2xl">{subtitle}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
};
