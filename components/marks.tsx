// Logos. The product mark is option A from docs/design/logos.html, a stand-in
// until the founder picks (DESIGN.md, Logo). The business mark belongs to the
// made-up Buttonwood Air.

import { business } from "@/lib/brand";

/** Option A, "Comes back": an arrow that turns around and returns home. */
export const productMarkPaths = {
  arrow: "M22 10.5H13a5.5 5.5 0 0 0 0 11h8",
  head: "M18 18l3.5 3.5L18 25",
};

export function ProductMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="8" fill="#2f3f8f" />
      <path d={productMarkPaths.arrow} fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d={productMarkPaths.head} fill="none" stroke="#e8734f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-xl font-semibold tracking-tight ${className}`}>
      <ProductMark size={28} />
      Win-Back
    </span>
  );
}

/** Buttonwood Air's mark: a buttonwood leaf on a cool blue disc. Made up. */
export function BusinessMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#cfe3f0" />
      <path d="M16 25c-6-2.5-7.5-9-4-15 4 2 7.5 6.5 4 15z" fill="#2f6b4f" />
      <path d="M16 25c4-4 5.5-8.5 4.5-13" fill="none" stroke="#2f6b4f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 25v-8" stroke="#f6f4ef" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function BusinessName() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BusinessMark />
      <span className="leading-tight">
        <span className="block font-display text-base font-semibold">{business.name}</span>
        <span className="block text-xs text-muted">
          {business.trade} · {business.area}
        </span>
      </span>
    </span>
  );
}
