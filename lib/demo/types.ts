export type ServiceKind = "tune-up" | "repair" | "install";

export type Visit = { monthsAgo: number; what: string; kind: ServiceKind };

/** One row of the business's own past-customer records. */
export type CustomerRecord = {
  id: string;
  name: string;
  firstName: string;
  system: string;
  visits: Visit[];
  /** A maintenance plan that ended this many months ago and was not renewed. */
  planEndedMonthsAgo?: number;
  /** The customer asked not to get texts. Never messaged. */
  optOut?: boolean;
};

export type GroupId = "tune-up-overdue" | "plan-ended" | "one-time";

export type Lapsed = {
  id: string;
  group: GroupId;
  /** Plain words: why this customer is on the list. */
  why: string;
  lastVisitMonthsAgo: number;
};

export type ScanResult = {
  lapsed: Lapsed[];
  activeIds: string[];
  optOutIds: string[];
};

export type DraftStatus = "waiting" | "approved" | "skipped" | "sent";

export type Draft = { id: string; text: string; status: DraftStatus; edited: boolean };

export type Reply = { id: string; text: string; wantsVisit: boolean; booked: boolean };

export type Step = "records" | "report" | "drafts" | "sent";

export type DemoState = {
  version: 1;
  step: Step;
  /** The furthest step reached, so the step bar knows what can be opened. */
  reached: Step;
  scan: ScanResult | null;
  drafts: Draft[];
  replies: Reply[];
  /** True once "Skip ahead a day" ran after sending. */
  dayPassed: boolean;
};
