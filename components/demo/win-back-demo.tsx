"use client";

// The whole demo on one screen, in four steps: the records, the report, the
// drafts the owner approves, and what was sent (simulated) with the replies.

import { useEffect, useRef, useState } from "react";
import { primary, quiet, secondary } from "@/components/buttons";
import { business } from "@/lib/brand";
import { approve, bookVisit, canOpen, customer, editDraft, goTo, groupOrder, groups, lastVisit, passDay, runScan, sendApproved, skip, unskip } from "@/lib/demo/engine";
import { records, visitSlot } from "@/lib/demo/sample";
import type { DemoState, Draft, Lapsed, Step } from "@/lib/demo/types";
import { update, useDemo } from "@/lib/demo/use-demo";

const steps: { id: Step; label: string }[] = [
  { id: "records", label: "Records" },
  { id: "report", label: "Report" },
  { id: "drafts", label: "Approve" },
  { id: "sent", label: "Sent and replies" },
];

// DESIGN.md, Shape: square cards under a 2px navy rule; status chips with 2px corners.
const chip = "inline-flex items-center rounded-[2px] px-2 py-0.5 text-xs font-semibold whitespace-nowrap";
const card = "border border-line border-t-2 border-t-brand bg-surface";

function StepBar({ s }: { s: DemoState }) {
  return (
    <nav aria-label="Demo steps" className="overflow-x-auto">
      <ol className="flex min-w-max border-b border-line sm:gap-1">
        {steps.map((st, i) => {
          const open = canOpen(s, st.id);
          const current = s.step === st.id;
          return (
            <li key={st.id}>
              <button
                type="button"
                disabled={!open}
                aria-current={current ? "step" : undefined}
                onClick={() => update((x) => goTo(x, st.id))}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 border-b-2 px-2 text-sm font-semibold sm:gap-2 sm:px-3 ${current ? "border-brand text-ink" : "border-transparent text-muted enabled:hover:text-ink"} disabled:opacity-45`}
              >
                <span className={`tabular flex size-6 items-center justify-center rounded-[2px] text-xs ${current ? "bg-brand text-on-brand" : "bg-sunk"}`}>{i + 1}</span>
                <span className={current ? undefined : "sr-only sm:not-sr-only"}>{st.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

const ago = (n: number) => (n < 12 ? `${n} mo ago` : `${Math.floor(n / 12)} yr ${n % 12} mo ago`.replace(" 0 mo", ""));

function Records({ s }: { s: DemoState }) {
  const [lit, setLit] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => () => clearInterval(timer.current), []);
  const scanning = lit >= 0;

  function start() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return update(runScan);
    let i = 0;
    setLit(0);
    timer.current = setInterval(() => {
      i += 1;
      if (i >= records.length) {
        clearInterval(timer.current);
        setLit(-1);
        update(runScan);
      } else setLit(i);
    }, 70);
  }

  return (
    <section aria-labelledby="records-h">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 id="records-h" className="font-display text-3xl font-semibold tracking-tight">
            {business.name}&rsquo;s past customers
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            The company&rsquo;s own records: who they are, what system they have, and every visit. The list it already keeps. Nothing new to type.
          </p>
        </div>
        <button type="button" onClick={start} disabled={scanning} className={primary}>
          {scanning ? "Reading the records…" : s.scan ? "Scan again" : "Find who stopped coming back"}
        </button>
      </div>
      <div className={`${card} mt-6 overflow-hidden`}>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Past customers and their visits</caption>
          <thead className="bg-sunk text-xs text-muted">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">Customer</th>
              <th scope="col" className="hidden px-4 py-2.5 font-semibold sm:table-cell">System</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Last visit</th>
              <th scope="col" className="hidden px-4 py-2.5 text-right font-semibold md:table-cell">Visits</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {records.map((r, i) => {
              const last = lastVisit(r);
              return (
                <tr key={r.id} className={`transition-colors duration-150 ${lit === i ? "bg-brand-soft" : ""}`}>
                  <td className="px-4 py-3">
                    <span className="font-semibold">{r.name}</span>
                    {r.optOut ? <span className="mt-0.5 block text-xs text-muted">Asked not to get texts</span> : null}
                    <span className="mt-0.5 block text-xs text-muted sm:hidden">{r.system}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted sm:table-cell">{r.system}</td>
                  <td className="px-4 py-3">
                    <span className="tabular">{ago(last.monthsAgo)}</span>
                    <span className="block text-xs text-muted">{last.what}</span>
                  </td>
                  <td className="tabular hidden px-4 py-3 text-right md:table-cell">{r.visits.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Report({ s }: { s: DemoState }) {
  const scan = s.scan!;
  const total = records.length;
  const n = scan.lapsed.length;
  const by = (g: string) => scan.lapsed.filter((l) => l.group === g);
  return (
    <section aria-labelledby="report-h">
      <div className="hairline-draw h-0.5 bg-brand" />
      <p className="mt-4 text-sm font-semibold tracking-wide text-brand uppercase">Report</p>
      <h1 id="report-h" className="mt-1 font-display text-3xl font-semibold tracking-tight text-balance">
        {n} of {total} past customers have not been back in over a year.
      </h1>
      <ul className="mt-4 grid max-w-3xl gap-2 text-muted">
        {groupOrder.map((g) => (
          <li key={g}>
            <span className="font-semibold text-ink">
              {by(g).length} · {groups[g].title}.
            </span>{" "}
            {groups[g].note}
          </li>
        ))}
        <li>
          <span className="font-semibold text-ink">Left out:</span> {scan.activeIds.length} customers seen in the last 12 months, and{" "}
          {scan.optOutIds.map((id) => customer(id).name).join(", ")}, who asked not to get texts.
        </li>
      </ul>
      <p className="mt-3 text-sm text-muted">In the real thing, AI writes this from your records. In the demo it is built from the sample records.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {groupOrder.map((g) => (
          <div key={g} className={`${card} p-4`}>
            <h2 className="font-display text-lg font-semibold">{groups[g].title}</h2>
            <ul className="mt-3 divide-y divide-line">
              {by(g).map((l) => (
                <li key={l.id} className="py-2.5">
                  <p className="font-semibold">{customer(l.id).name}</p>
                  <p className="text-sm text-muted">{l.why}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => update((x) => goTo(x, "drafts"))} className={primary}>
          See the {n} draft messages
        </button>
        <p className="text-sm text-muted">One message per customer. Nothing goes out until you approve it.</p>
      </div>
    </section>
  );
}

const statusChip: Record<Draft["status"], { label: string; tone: string }> = {
  waiting: { label: "Waiting for your OK", tone: "bg-sun-soft text-sun-ink" },
  approved: { label: "Approved", tone: "bg-brand-soft text-brand" },
  skipped: { label: "Skipped, won't be sent", tone: "bg-sunk text-muted" },
  sent: { label: "Sent (simulated)", tone: "bg-leaf-soft text-leaf-ink" },
};

function DraftCard({ d, l }: { d: Draft; l: Lapsed }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(d.text);
  const c = customer(d.id);
  const st = statusChip[d.status];
  return (
    <li className={`${card} p-4 sm:p-5 ${d.status === "skipped" ? "opacity-70" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg font-semibold">{c.name}</h3>
          <p className="text-sm text-muted">{l.why}</p>
        </div>
        <span className={`${chip} ${st.tone}`}>{st.label}</span>
      </div>
      {editing ? (
        <div className="mt-3">
          <label htmlFor={`t-${d.id}`} className="text-sm font-semibold">
            Message to {c.firstName}
          </label>
          <textarea
            id={`t-${d.id}`}
            name={`message-${d.id}`}
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="mt-1 w-full resize-none rounded-[3px] border border-line bg-paper p-3 text-[15px] leading-snug transition-colors duration-150 hover:border-muted focus:border-brand focus:bg-surface"
          />
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              className={primary}
              onClick={() => {
                update((x) => editDraft(x, d.id, text));
                setEditing(false);
              }}
            >
              Save changes
            </button>
            <button
              type="button"
              className={secondary}
              onClick={() => {
                setText(d.text);
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 max-w-prose rounded-2xl rounded-bl-sm bg-bubble break-words px-3.5 py-2.5 text-[15px] leading-snug">
          {d.text}
          {d.edited ? <span className="mt-1 block text-xs text-muted">Edited by you</span> : null}
        </p>
      )}
      {!editing ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {d.status === "waiting" ? (
            <>
              <button type="button" className={primary} onClick={() => update((x) => approve(x, d.id))}>
                Approve
              </button>
              <button type="button" className={secondary} onClick={() => setEditing(true)}>
                Edit
              </button>
              <button type="button" className={quiet} onClick={() => update((x) => skip(x, d.id))}>
                Skip
              </button>
            </>
          ) : d.status === "approved" ? (
            <>
              <button type="button" className={secondary} onClick={() => setEditing(true)}>
                Edit
              </button>
              <button type="button" className={quiet} onClick={() => update((x) => skip(x, d.id))}>
                Skip instead
              </button>
            </>
          ) : d.status === "skipped" ? (
            <button type="button" className={quiet} onClick={() => update((x) => unskip(x, d.id))}>
              Undo skip
            </button>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}

function Drafts({ s }: { s: DemoState }) {
  const scan = s.scan!;
  const count = (st: Draft["status"]) => s.drafts.filter((d) => d.status === st).length;
  const approved = count("approved");
  const open = s.drafts.filter((d) => d.status !== "sent");
  return (
    <section aria-labelledby="drafts-h">
      <h1 id="drafts-h" className="font-display text-3xl font-semibold tracking-tight">
        Approve each message
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Read it, change a word if you like, then approve it or skip it. A message you did not approve is never sent. That is the whole point.
      </p>
      <div className="sticky top-0 z-10 -mx-4 mt-5 border-y border-line bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:border sm:border-t-2 sm:border-t-brand">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="tabular text-sm" aria-live="polite">
            <span className="font-semibold">{approved} approved</span> · {count("waiting")} waiting · {count("skipped")} skipped
            {count("sent") ? ` · ${count("sent")} sent` : ""}
          </p>
          <button type="button" disabled={approved === 0} onClick={() => update(sendApproved)} className={primary}>
            {approved === 0 ? "Approve one to send" : `Send the ${approved} approved (simulated)`}
          </button>
        </div>
      </div>
      {open.length === 0 ? (
        <p className="mt-6 text-muted">Every message is sent or skipped.</p>
      ) : (
        <ul className="mt-6 grid gap-4 [&_button]:scroll-mt-32 [&_textarea]:scroll-mt-32">
          {open.map((d) => (
            <DraftCard key={d.id + d.text} d={d} l={scan.lapsed.find((l) => l.id === d.id)!} />
          ))}
        </ul>
      )}
    </section>
  );
}

function Sent({ s }: { s: DemoState }) {
  const sent = s.drafts.filter((d) => d.status === "sent");
  const notSent = s.drafts.filter((d) => d.status !== "sent");
  return (
    <section aria-labelledby="sent-h">
      <div className="hairline-draw h-0.5 bg-leaf-ink" />
      <h1 id="sent-h" className="mt-4 font-display text-3xl font-semibold tracking-tight">
        {sent.length} sent (simulated)
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        In the demo nothing leaves your browser. In the real thing these go out by text, signed by {business.owner}.
      </p>

      {!s.dayPassed ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => update(passDay)} className={primary}>
            Skip ahead a day
          </button>
          <p className="text-sm text-muted">See who wrote back.</p>
        </div>
      ) : null}

      <ul className="mt-6 grid gap-4">
        {sent.map((d) => {
          const c = customer(d.id);
          const reply = s.replies.find((r) => r.id === d.id);
          return (
            <li key={d.id} className={`${card} p-4 sm:p-5`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold">{c.name}</h2>
                <span className={`${chip} ${reply?.booked ? "bg-leaf-soft text-leaf-ink" : reply ? "bg-coral-soft text-coral-ink" : "bg-leaf-soft text-leaf-ink"}`}>
                  {reply?.booked ? "Visit booked" : reply ? "Replied" : s.dayPassed ? "No reply yet" : "Sent (simulated)"}
                </span>
              </div>
              <div className="mt-3 grid gap-2 text-[15px] leading-snug">
                <p className="max-w-[min(85%,34rem)] break-words justify-self-end rounded-2xl rounded-br-sm bg-brand px-3.5 py-2 text-on-brand">{d.text}</p>
                {reply ? <p className="max-w-[min(85%,34rem)] break-words justify-self-start rounded-2xl rounded-bl-sm bg-bubble px-3.5 py-2">{reply.text}</p> : null}
                {reply?.booked ? (
                  <>
                    <p className="max-w-[min(85%,34rem)] break-words justify-self-end rounded-2xl rounded-br-sm bg-brand px-3.5 py-2 text-on-brand">
                      You&rsquo;re booked for {visitSlot}. See you then! — {business.owner}
                    </p>
                    <p className={`${chip} justify-self-center bg-leaf-soft text-leaf-ink`}>On the calendar · {visitSlot}</p>
                  </>
                ) : null}
              </div>
              {reply?.wantsVisit && !reply.booked ? (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" className={primary} onClick={() => update((x) => bookVisit(x, d.id))}>
                    Book {visitSlot}
                  </button>
                  <p className="text-sm text-muted">Sends a confirmation (simulated).</p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {notSent.length ? (
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold">Not sent</h2>
          <p className="text-sm text-muted">You did not approve these, so they stayed put.</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {notSent.map((d) => (
              <li key={d.id} className={`${chip} bg-sunk text-muted`}>
                {customer(d.id).name} · {d.status === "skipped" ? "skipped" : "waiting"}
              </li>
            ))}
          </ul>
          <button type="button" className={`${quiet} mt-2`} onClick={() => update((x) => goTo(x, "drafts"))}>
            Back to the drafts
          </button>
        </div>
      ) : null}
    </section>
  );
}

export function WinBackDemo() {
  const s = useDemo();
  if (!s) return <p className="text-muted">Opening the sample company…</p>;
  return (
    <div className="grid gap-6">
      <StepBar s={s} />
      {s.step === "records" || !s.scan ? <Records s={s} /> : s.step === "report" ? <Report s={s} /> : s.step === "drafts" ? <Drafts s={s} /> : <Sent s={s} />}
    </div>
  );
}
