@AGENTS.md

# Win-Back

A show-off app for TEKGUYZ package G, "Win-back": finds past customers who stopped coming back in the business's own records, says who and why, and drafts a message to each for the owner to approve. A landing page plus a one-click demo with a made-up AC company, Buttonwood Air. Rules for every demo: `C:/Projects/claude-config/DEMO-STANDARD.md`.

## Hard rules

- **No backend** (`docs/adr/0001-browser-only-demo.md`). The demo lives in the visitor's browser. Do not add sign-in, a database, or a visit cap.
- **Nothing is ever sent.** No email, SMS or AI call, not even behind a flag. "Sent" is a status in the browser.
- **The owner approves every message.** No "approve all", no auto-send. That step is the point of the package.
- **Made-up names only.** The company and every customer are invented. Never a real business. No phone numbers, addresses or prices anywhere.
- **No TEKGUYZ prices and no statistics** on any screen. Counts of the sample records are fine.
- TEKGUYZ appears only as the small "Built by TEKGUYZ" credit.

## Where things are

| Path | Holds |
| --- | --- |
| `lib/demo/engine.ts` | The win-back rules (who has lapsed, which group, why), the drafts, and every action. Pure functions, fully tested |
| `lib/demo/sample.ts` | The sample company's past-customer records and the replies |
| `lib/demo/use-demo.ts` | The browser store. The only code that touches storage |
| `lib/brand.ts` | The sample company's name, owner and area |
| `components/demo/` | The demo screen and its frame |
| `app/page.tsx` | The landing page |
| `docs/design/logos.html` | Logo options (A picked 2026-11-11) |
| `DESIGN.md` | The look |

## Commands

- `npm run dev` · `npm run typecheck` · `npm run test:unit` · `npm run build`
- **Never `npm test`.** It prints an error on purpose.
