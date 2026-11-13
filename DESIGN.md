# Win-Back: design rules

The rulebook for how the app looks. Tokens live in `app/globals.css`; this file says why.

## Feel

A calm office desk for a trade business: warm paper, dark ink, one deep indigo for the product and its actions, and a coral accent for the mark and the closing call to action. Headings use a warm serif, because the app writes personal notes to people who already know the business. It should look like something an AC owner trusts, not a marketing tool.

## Logo

**Option A, "Comes back"** (picked by the founder 2026-11-11 from `docs/design/logos.html`): an arrow that goes out and turns back home, indigo square, coral arrowhead. Sources, changed together: `components/marks.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `docs/banner.svg`.

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

## Shape

Editorial (set 2026-11-13, tekguyz/win-back#9). Like a printed office ledger: square edges and rules, not soft tiles.

- **Cards:** 0px corners, a 1px `line` border and a heavier 2px `brand` rule on top. The sticky Approve bar uses the same rule from tablet width up.
- **Buttons:** one solid `brand` button per group, 3px corners (`primary` in `components/buttons.ts`). The closing "Try the demo" is the same shape in `coral`.
- **Secondary actions are underlined text links**, never a second button: `secondary` (brand ink) for Edit and Cancel, `quiet` (muted) for Skip, Undo skip and Back. Always underlined, 1.5px, 5px offset.
- **Chips:** 2px corners. Step numbers in the step bar: small 2px squares.
- **Fields:** the draft textarea has 3px corners, a `line` border that turns `brand` on focus, a brand caret, no resize grip.
- **Text bubbles keep their round message shape.** They are texts, not cards. Bubbles cap at 34rem so a line stays readable on a wide screen.
- **Landing steps:** a 1px ink rule over a large Fraunces numeral, no circle.
- **Never:** pill buttons, `rounded-full` buttons, `rounded-xl` or `rounded-2xl` cards.
- **Browser surfaces:** text selection in `brand-soft`, focus ring 2px `brand` with 3px corners, scrollbar in `line` on `paper`.

## Frames

No phone or browser frame is drawn in this demo. The owner's drafts and the sent texts show as message bubbles inside a card, which is the owner's own screen, not the customer's phone. If a phone is ever drawn, it follows `claude-config/LOOKS.md`, "Phone and browser frames".

## Layout

Phone first. Every target is at least 44 px. The demo is one screen in four steps (Records, Report, Approve, Sent and replies) with a step bar on top. On the Approve step the count and the Send button stick to the top while scrolling.

## Motion

Two gestures, both showing a change of state. The scan lights each record row in turn (70 ms a row) before the report opens. The report and the sent screen open with a hairline that draws from the left. `prefers-reduced-motion: reduce` skips both. Nothing else moves.

## Demo banner

Dark ink strip on top of the demo: "Demo: a made-up company. Nothing is really sent.", Reset demo, Leave the demo, Built by TEKGUYZ. It carries `data-demo-banner` so `tools/capture` can hide it.
