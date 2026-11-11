import { describe, expect, it } from "vitest";
import { approve, bookVisit, createState, editDraft, passDay, runScan, scan, sendApproved, skip } from "../engine";
import { records } from "../sample";

const ids = (xs: { id: string }[]) => xs.map((x) => x.id).sort();

describe("scan", () => {
  const result = scan(records);

  it("finds the customers not seen in over a year", () => {
    expect(ids(result.lapsed)).toEqual(["beth", "carmen", "darnell", "hector", "joan", "kenji", "nadia", "priya"]);
  });

  it("leaves out anyone seen in the last 12 months", () => {
    expect(result.activeIds.sort()).toEqual(["aisha", "grace", "mike", "omar", "rosa"]);
  });

  it("never lists someone who asked not to be contacted", () => {
    expect(result.optOutIds).toEqual(["frank"]);
    expect(ids(result.lapsed)).not.toContain("frank");
  });

  it("groups them by why they stopped", () => {
    const group = (g: string) => ids(result.lapsed.filter((l) => l.group === g));
    expect(group("tune-up-overdue")).toEqual(["carmen", "darnell", "hector"]);
    expect(group("plan-ended")).toEqual(["beth", "priya"]);
    expect(group("one-time")).toEqual(["joan", "kenji", "nadia"]);
  });

  it("says why in plain words", () => {
    const carmen = result.lapsed.find((l) => l.id === "carmen")!;
    expect(carmen.why).toContain("15 months ago");
  });
});

describe("drafts and approval", () => {
  const scanned = runScan(createState());

  it("makes one waiting draft per lapsed customer", () => {
    expect(scanned.drafts).toHaveLength(8);
    expect(scanned.drafts.every((d) => d.status === "waiting")).toBe(true);
    expect(scanned.drafts.find((d) => d.id === "carmen")!.text).toContain("Carmen");
  });

  it("sends nothing that was not approved", () => {
    const s = sendApproved(approve(scanned, "carmen"));
    expect(s.drafts.filter((d) => d.status === "sent").map((d) => d.id)).toEqual(["carmen"]);
    expect(s.drafts.filter((d) => d.status === "waiting")).toHaveLength(7);
  });

  it("sends nothing at all when nothing is approved", () => {
    const s = sendApproved(scanned);
    expect(s.drafts.some((d) => d.status === "sent")).toBe(false);
    expect(s).toBe(scanned);
  });

  it("keeps the owner's edit and sends that text", () => {
    const s = sendApproved(approve(editDraft(scanned, "joan", "Hi Joan, it's Teo."), "joan"));
    const joan = s.drafts.find((d) => d.id === "joan")!;
    expect(joan).toMatchObject({ text: "Hi Joan, it's Teo.", edited: true, status: "sent" });
  });

  it("an edit puts an approved draft back to waiting", () => {
    const s = editDraft(approve(scanned, "joan"), "joan", "New words");
    expect(s.drafts.find((d) => d.id === "joan")!.status).toBe("waiting");
  });

  it("a skipped draft is never sent", () => {
    const s = sendApproved(approve(skip(scanned, "kenji"), "carmen"));
    expect(s.drafts.find((d) => d.id === "kenji")!.status).toBe("skipped");
  });
});

describe("replies and booking", () => {
  const sent = sendApproved(approve(approve(scanned(), "carmen"), "joan"));
  function scanned() {
    return runScan(createState());
  }

  it("only customers who got a message can reply", () => {
    const s = passDay(sent);
    expect(ids(s.replies)).toEqual(["carmen", "joan"]);
  });

  it("a reply that wants a visit can be booked", () => {
    const s = bookVisit(passDay(sent), "carmen");
    expect(s.replies.find((r) => r.id === "carmen")!.booked).toBe(true);
  });

  it("a reply that wants no visit cannot be booked", () => {
    const s = bookVisit(passDay(sent), "joan");
    expect(s.replies.find((r) => r.id === "joan")!.booked).toBe(false);
  });

  it("a day only passes once per batch sent", () => {
    const once = passDay(sent);
    expect(passDay(once)).toBe(once);
  });

  it("a second batch sent later gets its own replies and keeps the first ones", () => {
    const booked = bookVisit(passDay(sent), "carmen");
    const later = passDay(sendApproved(approve(booked, "priya")));
    expect(ids(later.replies)).toEqual(["carmen", "joan", "priya"]);
    expect(later.replies.find((r) => r.id === "carmen")!.booked).toBe(true);
  });
});
