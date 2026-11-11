// The win-back rules and every demo action. Pure functions, fully tested.
// Nothing here sends anything: "sent" is a status in the visitor's browser.

import { business } from "@/lib/brand";
import { records, replyScript } from "./sample";
import type { CustomerRecord, DemoState, Draft, GroupId, Lapsed, ScanResult, Step } from "./types";

/** A customer not seen for this many months has stopped coming back. */
export const LAPSED_AFTER_MONTHS = 12;

export const groups: Record<GroupId, { title: string; note: string }> = {
  "tune-up-overdue": {
    title: "Missed this year's tune-up",
    note: "They came back every year, then stopped. They already know you, so a short reminder is the right first message.",
  },
  "plan-ended": {
    title: "Maintenance plan ran out",
    note: "Their plan ended and nobody asked about renewing it.",
  },
  "one-time": {
    title: "One visit, never back",
    note: "A repair or a new system, and no tune-up since.",
  },
};

export const groupOrder: GroupId[] = ["tune-up-overdue", "plan-ended", "one-time"];

const months = (n: number) => `${n} month${n === 1 ? "" : "s"} ago`;

export function lastVisit(c: CustomerRecord) {
  return c.visits.reduce((a, b) => (b.monthsAgo < a.monthsAgo ? b : a));
}

function classify(c: CustomerRecord): Lapsed {
  const last = lastVisit(c);
  if (c.planEndedMonthsAgo !== undefined) {
    return { id: c.id, group: "plan-ended", lastVisitMonthsAgo: last.monthsAgo, why: `Plan ended ${months(c.planEndedMonthsAgo)}, not renewed. Last visit ${months(last.monthsAgo)}.` };
  }
  const tuneUps = c.visits.filter((v) => v.kind === "tune-up").length;
  if (tuneUps > 0) {
    return { id: c.id, group: "tune-up-overdue", lastVisitMonthsAgo: last.monthsAgo, why: `${tuneUps} tune-up${tuneUps === 1 ? "" : "s"} with you. The last one was ${months(last.monthsAgo)}.` };
  }
  return { id: c.id, group: "one-time", lastVisitMonthsAgo: last.monthsAgo, why: `${last.what}, ${months(last.monthsAgo)}. No visit since.` };
}

/** Reads the records and finds who stopped coming back. */
export function scan(list: CustomerRecord[]): ScanResult {
  const result: ScanResult = { lapsed: [], activeIds: [], optOutIds: [] };
  for (const c of list) {
    if (c.optOut) result.optOutIds.push(c.id);
    else if (lastVisit(c).monthsAgo < LAPSED_AFTER_MONTHS) result.activeIds.push(c.id);
    else result.lapsed.push(classify(c));
  }
  result.lapsed.sort((a, b) => groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group) || b.lastVisitMonthsAgo - a.lastVisitMonthsAgo);
  return result;
}

export function customer(id: string): CustomerRecord {
  const c = records.find((r) => r.id === id);
  if (!c) throw new Error(`No sample customer ${id}`);
  return c;
}

/** The first draft of the message, signed by the owner. */
export function draftText(l: Lapsed): string {
  const c = customer(l.id);
  const sign = `${business.owner}, ${business.name}`;
  switch (l.group) {
    case "tune-up-overdue":
      return `Hi ${c.firstName}, it's ${business.owner} from ${business.name}. Your ${c.system} is due for its yearly tune-up. Want me to save you a spot before the heat? Just reply here. — ${sign}`;
    case "plan-ended":
      return `Hi ${c.firstName}, ${business.owner} here. Your maintenance plan with us ended a little while ago. Would you like to pick it back up? I can fit in your next visit this month. — ${sign}`;
    case "one-time":
      return `Hi ${c.firstName}, it's ${business.owner} from ${business.name}. We worked on your ${c.system} a while back and wanted to check it's still running well. A tune-up now keeps it that way. Reply if you'd like a visit. — ${sign}`;
  }
}

export function createState(): DemoState {
  return { version: 1, step: "records", reached: "records", scan: null, drafts: [], replies: [], dayPassed: false };
}

const stepOrder: Step[] = ["records", "report", "drafts", "sent"];

export function canOpen(s: DemoState, step: Step) {
  return stepOrder.indexOf(step) <= stepOrder.indexOf(s.reached);
}

/** Opens a step already reached. The one step forward by hand is report → drafts; scanning and sending move the rest. */
export function goTo(s: DemoState, step: Step): DemoState {
  if (canOpen(s, step)) return { ...s, step };
  if (step === "drafts" && s.reached === "report") return { ...s, step, reached: "drafts" };
  return s;
}

export function runScan(s: DemoState): DemoState {
  const result = scan(records);
  const drafts: Draft[] = result.lapsed.map((l) => ({ id: l.id, text: draftText(l), status: "waiting", edited: false }));
  return { ...s, scan: result, drafts, replies: [], dayPassed: false, step: "report", reached: "report" };
}

function setDraft(s: DemoState, id: string, fn: (d: Draft) => Draft): DemoState {
  return { ...s, drafts: s.drafts.map((d) => (d.id === id && d.status !== "sent" ? fn(d) : d)) };
}

export const approve = (s: DemoState, id: string) => setDraft(s, id, (d) => ({ ...d, status: "approved" }));
export const skip = (s: DemoState, id: string) => setDraft(s, id, (d) => ({ ...d, status: "skipped" }));
export const unskip = (s: DemoState, id: string) => setDraft(s, id, (d) => ({ ...d, status: "waiting" }));

/** An edit always goes back to waiting: the owner approves the final words. */
export function editDraft(s: DemoState, id: string, text: string): DemoState {
  const clean = text.trim();
  if (!clean) return s;
  return setDraft(s, id, (d) => ({ ...d, text: clean, edited: true, status: "waiting" }));
}

/** Marks every approved draft "sent (simulated)". Nothing else changes. */
export function sendApproved(s: DemoState): DemoState {
  if (!s.drafts.some((d) => d.status === "approved")) return s;
  return { ...s, drafts: s.drafts.map((d) => (d.status === "approved" ? { ...d, status: "sent" } : d)), step: "sent", reached: "sent", dayPassed: false };
}

/** A day goes by: customers who got a message may reply. Runs once per batch sent. */
export function passDay(s: DemoState): DemoState {
  if (s.dayPassed) return s;
  const fresh = s.drafts
    .filter((d) => d.status === "sent" && replyScript[d.id] && !s.replies.some((r) => r.id === d.id))
    .map((d) => ({ id: d.id, ...replyScript[d.id], booked: false }));
  return { ...s, replies: [...s.replies, ...fresh], dayPassed: true };
}

export function bookVisit(s: DemoState, id: string): DemoState {
  return { ...s, replies: s.replies.map((r) => (r.id === id && r.wantsVisit ? { ...r, booked: true } : r)) };
}
