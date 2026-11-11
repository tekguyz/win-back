"use client";

// The demo store in the browser (ADR 0001). Every demo screen reads with
// `useDemo()` and writes with `update()`. Nothing else touches storage.

import { useSyncExternalStore } from "react";
import { createState } from "./engine";
import type { DemoState } from "./types";

const KEY = "win-back-demo-v1";

let state: DemoState | null = null;
const listeners = new Set<() => void>();
let memoryOnly = false;

function read(): DemoState {
  if (state) return state;
  try {
    const raw = window.localStorage.getItem(KEY);
    const saved = raw ? (JSON.parse(raw) as DemoState) : null;
    if (saved?.version === 1) return (state = saved);
  } catch {
    // Private windows and some embeds block storage: keep it in memory.
    memoryOnly = true;
  }
  return (state = createState());
}

function write(next: DemoState) {
  state = next;
  if (!memoryOnly) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      memoryOnly = true;
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The demo state, or null while the page is still starting in the browser. */
export function useDemo(): DemoState | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function update(fn: (s: DemoState) => DemoState) {
  write(fn(read()));
}

export function resetDemo() {
  write(createState());
}
