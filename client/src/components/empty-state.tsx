import type { ReactNode } from "react";
import { Mascot } from "./mascot";

export const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => {
  return (
    <div className="card-soft p-10 text-center">
      <div className="inline-block mb-4 opacity-90">
        <Mascot size={96} />
      </div>
      <h3 className="font-display text-2xl text-ink mb-2">{title}</h3>
      <p className="text-ink-soft max-w-md mx-auto mb-6">{description}</p>
      {action}
    </div>
  );
};
