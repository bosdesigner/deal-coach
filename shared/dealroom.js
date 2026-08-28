// ============================================================
// THE 500 — the institution. THE ROOM — where its members meet.
//
// Structured as a court. Every field below traces to one of the
// operating principles in docs/deal-room-doctrine.md.
//
// DEMO DATA. Nothing here is a real membership record.
// ============================================================

/**
 * !!! PRODUCTION GATE !!!
 *
 * Scarcity that is displayed must be scarcity that exists. A counter that
 * counts down on a timer, or a cap the house quietly exceeds, is not
 * atmosphere — it is a false statement of material fact made to induce a
 * $25,000 payment. That is consumer fraud under FTC Act §5 and its state
 * analogues, and it is the single fastest way to lose a licensor.
 *
 * Every figure carrying `demoFigure: true` MUST be replaced with a value
 * derived from real membership records before this ships to anyone who can
 * pay. `npm run check:demo-figures` fails the build while any remain.
 */
export const MEMBERSHIP = {
  cap: 500,
  remaining: 132,
  demoFigure: true,
};

/** Principle 5 — the Order of Precedence. Proximity is the prize. */
export const PRECEDENCE = [
  {
    rank: "MEMBER",
    admission: "Passed the bar.",
    access: [
      "Intent board",
      "One unlock request per month",
    ],
  },
  {
    rank: "PRINCIPAL",
    admission: "One verified closed deal inside the Room.",
    access: [
      "Three unlocks per month",
      "Summit floor seating",
    ],
  },
  {
    rank: "INNER CIRCLE",
    admission: "By the Chair's invitation. Revocable.",
    cap: 50,
    capDemoFigure: true,
    access: [
      "Unlimited unlocks",
      "Chairman's Dinner eligibility",
      "First look at new intent listings",
    ],
  },
];

/** Principle 4 — rank is conferred, not owned. */
export const PRECEDENCE_NOTE =
  "Rank is non-transferable and lapses with membership. The Committee reviews precedence quarterly.";

/** Principle 2 — the bar is published in advance, in full. */
export const BAR = {
  title: "MINIMUM STANDARDS — VERIFIED BY THIRD PARTY",
  financial: {
    label: "Financial threshold — any one of:",
    options: [
      "$10M+ verified net worth",
      "Control of a business with $5M+ EBITDA",
      "$25M+ deployable capital",
    ],
  },
  requirements: [
    "Documented principal role in at least one closed transaction over $1M within five years",
    "Clean background screen: no fraud judgments, securities actions, or unresolved creditor claims",
    "Two member sponsors after the founding cohort — sponsors' precedence rides on your conduct",
  ],
  terms: [
    "$25,000 initiation",
    "$50,000 annually",
    "First year probationary",
    "Expulsion by Committee decision, final, no refund",
  ],
};

/** Principle 6 — controlled reveal. Identities are withheld until mutual interest. */
export const INTENT_LISTINGS = [
  {
    id: "int-01",
    kind: "PRINCIPAL SEEKS",
    body: "Acquisition, industrial services, $5–20M, Southeast",
  },
  {
    id: "int-02",
    kind: "CAPITAL AVAILABLE",
    body: "$25M, control positions, consumer brands",
  },
  {
    id: "int-03",
    kind: "EXITING",
    body: "Logistics company, $8M EBITDA, confidential",
  },
];

export const UNLOCK_NOTE =
  "Identities unlock only on mutual interest. Unlock allowance set by precedence. Demo — matching disabled.";

/** Principle 4 made visible — the score that exists nowhere else. */
export const DEMO_LEDGER = {
  rank: "PRINCIPAL",
  dealsClosedInRoom: 2,
  sponsorshipsInGoodStanding: 1,
  unlocksRemaining: 3,
  unlocksAllowance: 3,
  precedenceReview: "OCT 2026",
  demoFigure: true,
};

export const SUMMIT = {
  name: "THE ANNUAL SUMMIT",
  location: "PALM BEACH",
  seating: "SEATING BY PRECEDENCE",
};

// ---- Application flow (demo only — see APPLICATION_STORAGE_NOTE) ----------

export const DEAL_TYPES = [
  "Acquisition", "Divestiture", "Growth equity", "Real estate",
  "Recapitalization", "Joint venture", "Debt financing",
];
export const SIZE_BANDS = [
  "$1M – $5M", "$5M – $20M", "$20M – $100M", "$100M – $500M", "Over $500M",
];
export const DEAL_ROLES = [
  "Principal", "Controlling shareholder", "Chief executive",
  "Board director", "General partner",
];
export const DEAL_YEARS = ["2026", "2025", "2024", "2023", "2022"];

export const VERIFICATION_METHODS = [
  "Third-party verification firm",
  "Audited financial statements",
  "Closing documents",
];

export const THRESHOLDS = BAR.financial.options;

export const CONTRIBUTION_PROMPT =
  "What do you bring that a member of this Room will pay for?";
export const CONTRIBUTION_HELP =
  "Deal flow, capital, distribution, or rare operating expertise. “I want to learn” is what the advisor upstairs is for.";
export const CONTRIBUTION_LIMIT = 280;

export const SPONSORSHIP_NOTE =
  "Founding cohort (2026) by direct invitation of the Chair.";

/**
 * The demo keeps application input in component memory only — no network
 * request, no localStorage, no cookie — and drops it when the view closes.
 * Collecting real financial disclosures would put this prototype in scope for
 * GLBA and state privacy law, which is not a thing to do by accident.
 */
export const APPLICATION_STORAGE_NOTE =
  "Demo — nothing entered here is transmitted or stored.";
