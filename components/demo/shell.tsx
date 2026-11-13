"use client";

// The frame around the demo: the demo banner and the company header.

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BusinessName } from "@/components/marks";
import { resetDemo } from "@/lib/demo/use-demo";

const bannerLink = "inline-flex min-h-11 items-center underline-offset-4 hover:underline";

/** DESIGN.md, Demo banner. `data-demo-banner` lets tools/capture hide it. */
function DemoBanner() {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  function reset() {
    resetDemo();
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 3000);
  }

  return (
    <aside aria-label="Demo" data-demo-banner className="bg-ink text-sm text-paper">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 px-4 sm:px-6">
        <p className="py-2" role="status">
          {done ? "Back to the start: the records are not scanned yet." : "Demo: a made-up company. Nothing is really sent."}
        </p>
        <div className="flex flex-wrap items-center gap-x-5">
          <button type="button" onClick={reset} className={bannerLink}>
            Reset demo
          </button>
          <Link href="/" className={bannerLink}>
            Leave the demo
          </Link>
          <p className="text-paper/80">
            Built by{" "}
            <a href="https://tekguyz.com" className={`${bannerLink} text-paper underline`}>
              TEKGUYZ
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}

export function DemoShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-30 focus:rounded-[3px] focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <DemoBanner />
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <BusinessName />
          <p className="hidden text-sm text-muted sm:block">Win-Back · past customers</p>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-24 sm:px-6">
        {children}
      </main>
    </>
  );
}
