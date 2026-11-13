# Win-Back: design rules

The rulebook for how the app looks. Tokens live in `app/globals.css`; this file says why.

## The five picks

Decided 2026-11-13 (tekguyz/win-back#5), picked against `claude-config/LOOKS.md`. Closest row was quote-to-paid (square, black accent, hard rules); this look differs in ground, display font and body font, and in having hard offset shadows.

| Column | Pick |
| --- | --- |
| Ground | Mustard yellow `#f2c230` for the page. Sections flip to black `#111111` with yellow text. Panels `#fff8e1` |
| Accent | Black `#111111`: buttons, borders, links |
| Display font | Zilla Slab 700 |
| Body font | Work Sans |
| Shape | Square corners. 3px black borders and a hard 4px offset shadow on panels and buttons. No pill buttons, no soft shadows |

## Feel

Loud, direct, sunny: a painted sign on a service van. Buttonwood Air wants its old customers back, so the page shouts it in a slab serif on yellow and black. Nothing is soft or rounded.

## Logo

**Option A, "Comes back"** (picked by the founder 2026-11-11 from `docs/design/logos.html`): an arrow that goes out and turns back home. Recolored 2026-11-13: black square, cream arrow, yellow arrowhead, square corners. Sources, changed together: `components/marks.tsx`, `app/icon.svg`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`, `docs/banner.svg`.

The sample company, Buttonwood Air, has its own mark: a green buttonwood leaf on a pale blue disc (`BusinessMark`). It is made up.

## Color

| Token | Use |
| --- | --- |
| `paper` `#f2c230` | page background, text on black |
| `surface` `#fff8e1` | panels |
| `sunk` `#f0dc8a` | table header, skipped chips |
| `ink` / `line` / `brand` `#111111` | text, every border, buttons, links |
| `muted` `#4a3d00` | secondary text (6.4:1 on the yellow page, 10:1 on panels) |
| `on-brand` `#f2c230` | text on black buttons and sections (11.3:1) |
| `bubble` `#ffffff` | message bubbles, outlined in black |
| `sun-soft` (yellow) | waiting for the owner's OK |
| `ink` fill, yellow text | approved |
| `coral-soft` / `coral-ink` | a customer replied |
| `leaf-soft` / `leaf-ink` | sent (simulated), visit booked |

Status colors only ever appear as chips, never as large fills. Every chip has a 2px black border. Every text pair is WCAG AA or better.

## Type

Zilla Slab (700) for headings. Work Sans for everything else. Counts and months use tabular numbers.

## Shape

Square corners everywhere. Panels (`.panel` in `app/globals.css`) have a 3px black border and a 4px hard offset shadow. Buttons have the same border and shadow, move 2px toward it on hover, and press flat. Focus is a 3px ring that turns yellow on black (`.dark-zone`).

## Layout

Phone first. Every target is at least 44 px. The demo is one screen in four steps (Records, Report, Approve, Sent and replies) with a step bar on top. On the Approve step the count and the Send button stick to the top while scrolling.

## Motion

Two gestures, both showing a change of state. The scan lights each record row in turn (70 ms a row) before the report opens. The report and the sent screen open with a hairline that draws from the left. `prefers-reduced-motion: reduce` skips both. Nothing else moves.

## Demo banner

Black strip with yellow text on top of the demo: "Demo: a made-up company. Nothing is really sent.", Reset demo, Leave the demo, Built by TEKGUYZ. It carries `data-demo-banner` so `tools/capture` can hide it.
