// Shared action looks (DESIGN.md, Shape). Every target is at least 44px tall.
// One solid button per group, with 3px corners. Every other action next to it
// is an underlined text link, never a second button.
export const primary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] bg-brand px-5 font-semibold text-on-brand transition-colors duration-150 enabled:hover:bg-brand-deep [&:not(button)]:hover:bg-brand-deep active:bg-brand-deep disabled:opacity-50";
/** A secondary action: an underlined text link in the brand color. */
export const secondary =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-1 px-1 font-semibold text-brand underline decoration-brand/35 decoration-[1.5px] underline-offset-[5px] transition-colors duration-150 hover:decoration-brand";
/** A quieter action (skip, back): the same link in muted ink. */
export const quiet =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-1 px-1 font-semibold text-muted underline decoration-line decoration-[1.5px] underline-offset-[5px] transition-colors duration-150 hover:text-ink hover:decoration-ink";
