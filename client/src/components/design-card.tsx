import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { BeadString } from "./bead-string";
import { cn } from "@/lib/utils";
import { deleteDesign, renameDesign, type Design } from "@/lib/progress";

export const DesignCard = ({ design }: { design: Design }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(design.name);

  const save = () => {
    renameDesign(design.id, name);
    setEditing(false);
  };

  return (
    <article className="card-soft p-4">
      <BeadString beads={design.beads} beadSize={36} className="min-h-[76px]" />
      <div className="flex items-center justify-between gap-2 mt-3">
        {editing ? (
          <div className="flex-1 flex items-center gap-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              autoFocus
              className="flex-1 h-9 px-3 rounded-full border-2 border-border bg-card text-ink text-sm font-semibold focus:border-coral focus:outline-none"
            />
            <button
              type="button"
              onClick={save}
              aria-label="Save name"
              className="w-9 h-9 rounded-full bg-sage text-white flex items-center justify-center"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setName(design.name);
                setEditing(false);
              }}
              aria-label="Cancel"
              className="w-9 h-9 rounded-full bg-cream-deep text-ink flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <h4 className="font-display text-base text-ink leading-tight flex-1">
              {design.name}
            </h4>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setEditing(true)}
                aria-label="Rename"
                className={cn(
                  "w-8 h-8 rounded-full bg-cream-deep hover:bg-ink/10 text-ink-soft flex items-center justify-center"
                )}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete "${design.name}"?`)) deleteDesign(design.id);
                }}
                aria-label="Delete"
                data-testid={`delete-design-${design.id}`}
                className="w-8 h-8 rounded-full bg-cream-deep hover:bg-destructive/10 text-ink-soft hover:text-destructive flex items-center justify-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
};
