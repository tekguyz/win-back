import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/shell";

// Every demo screen is kept out of search (DEMO-STANDARD.md, Search engines).
// The screens are client-rendered: the sample company lives in the visitor's
// own browser (ADR 0001).
export const metadata: Metadata = {
  title: { default: "Demo", template: "%s · Win-Back demo" },
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: LayoutProps<"/demo">) {
  return <DemoShell>{children}</DemoShell>;
}
