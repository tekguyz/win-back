<p align="center"><img src="docs/banner.svg" alt="Win-Back" width="100%"></p>

<p align="center">
<img src="https://img.shields.io/badge/status-demo%20built-2f3f8f?labelColor=f6f4ef" alt="status">
<img src="https://img.shields.io/badge/Next.js-16-1b1e2c?labelColor=f6f4ef" alt="Next.js">
<img src="https://img.shields.io/badge/database-none%20(browser%20only)-2f3f8f?labelColor=f6f4ef" alt="database">
<img src="https://img.shields.io/badge/tests-vitest-e8734f?labelColor=f6f4ef" alt="tests">
</p>

**Finds past customers who stopped coming back, says who and why, and drafts a message to each for the owner to approve.**

Not deployed yet (tekguyz/win-back#1).

## Status

| Row | |
| --- | --- |
| Phase | Landing page and demo built, not deployed |
| Shipped | Nothing live yet |
| Next | tekguyz/win-back#1: logo pick, deploy, showcase |
| Updated | 2026-11-11 |

## What it does

- Reads the business's own past-customer records: who, what system, every visit.
- Finds the customers not seen in over a year and groups them: missed this year's tune-up, maintenance plan ran out, one visit and never back.
- Writes a short report: how many, who, and why for each one.
- Drafts one message per customer, signed by the owner.
- The owner approves, edits or skips each message. Only approved ones are sent.
- Shows who replied, and books a visit from a reply.

## What it never does

- Sends a message the owner did not approve. There is no "approve all".
- Messages anyone who asked not to get texts.
- Writes to strangers: it starts from the business's own records only.
- In the demo: sends anything at all. "Sent" is a status in your browser.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript, Vitest. No backend: the demo lives in the browser (`docs/adr/0001-browser-only-demo.md`).

## Run it locally

Node 24 and npm. No env file needed.

```bash
npm ci
npm run dev
```

`SITE_URL` (optional, set in the host) is the public address used for link previews and the sitemap.

## Tests

`npm run test:unit` runs the engine tests (who has lapsed, grouping, approval, nothing sent without approval, replies). Never `npm test`: it prints an error on purpose. CI runs typecheck, unit tests and the build.

## Docs

- [`DESIGN.md`](DESIGN.md): the look
- [`docs/design/logos.html`](docs/design/logos.html): logo options
- [`docs/adr/0001-browser-only-demo.md`](docs/adr/0001-browser-only-demo.md): why there is no backend

---

<p align="center">Built by <a href="https://tekguyz.com">TEKGUYZ</a></p>
