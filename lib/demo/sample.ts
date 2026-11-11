// The sample company's past-customer records. Every name is made up. No phone
// numbers, no addresses, no prices.

import type { CustomerRecord } from "./types";

export const records: CustomerRecord[] = [
  {
    id: "carmen",
    name: "Carmen R.",
    firstName: "Carmen",
    system: "3-ton central AC",
    visits: [
      { monthsAgo: 51, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 39, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 27, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 15, what: "Yearly tune-up", kind: "tune-up" },
    ],
  },
  {
    id: "rosa",
    name: "Rosa P.",
    firstName: "Rosa",
    system: "Heat pump",
    visits: [
      { monthsAgo: 16, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 4, what: "Yearly tune-up", kind: "tune-up" },
    ],
  },
  {
    id: "darnell",
    name: "Darnell W.",
    firstName: "Darnell",
    system: "2.5-ton central AC",
    visits: [
      { monthsAgo: 38, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 26, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 14, what: "Yearly tune-up", kind: "tune-up" },
    ],
  },
  {
    id: "priya",
    name: "Priya S.",
    firstName: "Priya",
    system: "Two mini-splits",
    visits: [
      { monthsAgo: 25, what: "Plan visit", kind: "tune-up" },
      { monthsAgo: 13, what: "Plan visit", kind: "tune-up" },
    ],
    planEndedMonthsAgo: 2,
  },
  {
    id: "mike",
    name: "Mike D.",
    firstName: "Mike",
    system: "Central AC",
    visits: [{ monthsAgo: 2, what: "Fan motor repair", kind: "repair" }],
  },
  {
    id: "hector",
    name: "Hector & Lucia M.",
    firstName: "Hector and Lucia",
    system: "4-ton central AC",
    visits: [
      { monthsAgo: 30, what: "New system installed", kind: "install" },
      { monthsAgo: 18, what: "First tune-up", kind: "tune-up" },
    ],
  },
  {
    id: "joan",
    name: "Joan B.",
    firstName: "Joan",
    system: "Central AC",
    visits: [{ monthsAgo: 16, what: "Capacitor replaced", kind: "repair" }],
  },
  {
    id: "aisha",
    name: "Aisha K.",
    firstName: "Aisha",
    system: "Heat pump",
    visits: [
      { monthsAgo: 21, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 9, what: "Yearly tune-up", kind: "tune-up" },
    ],
  },
  {
    id: "frank",
    name: "Frank L.",
    firstName: "Frank",
    system: "Central AC",
    visits: [
      { monthsAgo: 40, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 28, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 16, what: "Yearly tune-up", kind: "tune-up" },
    ],
    optOut: true,
  },
  {
    id: "kenji",
    name: "Kenji T.",
    firstName: "Kenji",
    system: "Air handler and coil",
    visits: [{ monthsAgo: 22, what: "Refrigerant leak fixed", kind: "repair" }],
  },
  {
    id: "beth",
    name: "Beth & Sam O.",
    firstName: "Beth and Sam",
    system: "Central AC",
    visits: [
      { monthsAgo: 29, what: "Plan visit", kind: "tune-up" },
      { monthsAgo: 17, what: "Plan visit", kind: "tune-up" },
    ],
    planEndedMonthsAgo: 5,
  },
  {
    id: "omar",
    name: "Omar H.",
    firstName: "Omar",
    system: "Mini-split",
    visits: [{ monthsAgo: 7, what: "Yearly tune-up", kind: "tune-up" }],
  },
  {
    id: "nadia",
    name: "Nadia F.",
    firstName: "Nadia",
    system: "3-ton central AC",
    visits: [{ monthsAgo: 26, what: "New system installed", kind: "install" }],
  },
  {
    id: "grace",
    name: "Grace L.",
    firstName: "Grace",
    system: "Central AC",
    visits: [
      { monthsAgo: 23, what: "Yearly tune-up", kind: "tune-up" },
      { monthsAgo: 11, what: "Yearly tune-up", kind: "tune-up" },
    ],
  },
];

/** What a customer writes back a day after their message, if they do. */
export const replyScript: Record<string, { text: string; wantsVisit: boolean }> = {
  carmen: { text: "Oh, we forgot this year! Yes please, can you come next week?", wantsVisit: true },
  priya: { text: "Yes, let's renew the plan. Mornings are best for us.", wantsVisit: true },
  joan: { text: "Thanks for checking. All good for now.", wantsVisit: false },
};

/** The one opening the demo offers when a customer wants a visit. */
export const visitSlot = "Thursday, 9 to 11 am";
