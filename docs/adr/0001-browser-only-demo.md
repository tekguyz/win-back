# The demo runs in the browser, with no backend

The TEKGUYZ demo standard expects a Supabase anonymous sign-in per Demo Visitor. Win-Back uses a browser-only demo instead, like FancyFam (tekguyz/fancyfam ADR 0001) and Quote to Paid: the sample company's past-customer records ship with the app, and everything the visitor does lives in their own browser. Every visitor is walled off by design, nothing costs money, nothing is sent, and there is no sign-in, visit cap or cleanup job to build. All demo data goes through one store module (`lib/demo/use-demo.ts`) that a real backend can replace.

## Consequences

- The standard's server rules (POST-only sign-in, RLS walls, visit cap, 7-day cleanup) have nothing to guard. Do not "fix" the demo by adding them.
- "Try the demo" is a plain link: opening the demo writes nothing on a server.
- There is no sign-in page, because there is no product to sign in to yet.
- The report is built from the sample records by fixed rules (`lib/demo/engine.ts`). In the real product AI writes it; the demo makes no AI call.
