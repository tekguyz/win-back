# Win-Back: design rules

The rulebook for how the app looks. Tokens live in `app/globals.css`; this file says why.

## Feel

A calm office desk for a trade business: warm paper, dark ink, one deep indigo for the product and its actions, and a coral accent for the mark and the closing call to action. Headings use a warm serif, because the app writes personal notes to people who already know the business. It should look like something an AC owner trusts, not a marketing tool.

## Logo

**Not picked yet.** Options in `docs/design/logos.html` (A "Comes back", B "Welcome back", C "Due again"). Option A is in the app as a stand-in only, so the favicon and link preview are not empty. The founder picks; write the pick here. Sources to change together: `components/marks.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `docs/banner.svg`.

The sample company, Buttonwood Air, has its own mark: a green buttonwood leaf on a pale blue disc (`BusinessMark`). It is made up.

## Color

| Token | Use |
| --- | --- |
| `paper` `#f6f4ef` | page background |
| `surface` `#ffffff` | cards |
| `ink` `#1b1e2c` / `muted` `#5b6070` | text |
| `brand` `#2f3f8f` | primary buttons, links, the product |
| `coral` `#e8734f` | the mark's arrowhead, the closing "Try the demo" |
| `sun-soft` / `sun-ink` | waiting for the owner's OK |
| `brand-soft` | approved |
| `coral-soft` / `coral-ink` | a customer replied |
| `leaf-soft` / `leaf-ink` | sent (simulated), visit booked |

Status colors only ever appear as chips, never as large fills.

## Type

Fraunces (600) for headings. Public Sans for everything else. Counts and months use tabular numbers.

## Layout

Phone first. Every target is at least 44 px. The demo is one screen in four steps (Records, Report, Approve, Sent and replies) with a step bar on top. On the Approve step the count and the Send button stick to the top while scrolling.

## Motion

Two gestures, both showing a change of state. The scan lights each record row in turn (70 ms a row) before the report opens. The report and the sent screen open with a hairline that draws from the left. `prefers-reduced-motion: reduce` skips both. Nothing else moves.

## Demo banner

Dark ink strip on top of the demo: "Demo: a made-up company. Nothing is really sent.", Reset demo, Leave the demo, Built by TEKGUYZ. It carries `data-demo-banner` so `tools/capture` can hide it.
