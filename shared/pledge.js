// ============================================================
// THE PLEDGE — the ritual of conferral.
//
// Two halves, deliberately. The Oath is what a member swears;
// the Covenant is what the Room owes back. A court that only
// extracts obligations is a racket. Principle 2 — feared, never
// hated — only works if the institution is bound too.
// ============================================================

export const OATH_TITLE = "THE MEMBER'S OATH";
export const OATH_INTRO =
  "Sworn on admission. Read in full. The Committee holds each member to every article.";

/** First person, present tense. A member speaks these. */
export const OATH = [
  {
    n: "I",
    heading: "On Dealing Straight",
    body: "I will represent my position, my capital, and my record accurately to every member of this Room. I will not overstate what I control. A deal built on a misrepresentation is not a deal I want.",
  },
  {
    n: "II",
    heading: "On Confidentiality",
    body: "What is disclosed to me in this Room stays in this Room. I will not repeat a member's position, price, or circumstance outside these walls — not to press, not to counterparties, not in confidence to a friend.",
  },
  {
    n: "III",
    heading: "On Reciprocity",
    body: "I will bring before I take. I understand that an unlock is a claim on another member's attention, and that the Room measures what I contribute as closely as what I request.",
  },
  {
    n: "IV",
    heading: "On Standing",
    body: "I hold my rank at the Room's pleasure. It was conferred, it is not owned, it cannot be sold or lent, and it ends when my membership ends. I will not trade on it as though it were mine.",
  },
  {
    n: "V",
    heading: "On the Room's Name",
    body: "I will not invoke this Room to open a door outside it, nor imply that membership carries influence it does not carry. The Room convenes principals. It is not a credential to be spent elsewhere.",
  },
  {
    n: "VI",
    heading: "On Sponsorship",
    body: "When I sponsor an applicant I stake my own precedence on their conduct. I will sponsor no one I would not do business with personally.",
  },
  {
    n: "VII",
    heading: "On Submitting to the Committee",
    body: "I accept that discipline and expulsion rest with the Membership Committee, that its decisions are final, and that I will receive no refund. I accept this now, in advance, in exchange for the same certainty applied to everyone else.",
  },
];

export const COVENANT_TITLE = "THE ROOM'S COVENANT";
export const COVENANT_INTRO =
  "Given in return, by the Chair. Binding on the institution and published in advance.";

/** Institutional voice. The Room speaks these. */
export const COVENANT = [
  {
    n: "I",
    heading: "Fees are published and honored",
    body: "Dues are stated before you apply and will not be raised mid-term, surcharged, or clawed back capriciously. What you were quoted is what you owe.",
  },
  {
    n: "II",
    heading: "Your property stays yours",
    body: "Your deal data, your contacts, and your counterparties are yours. The Room will not sell them, will not seize them on exit, and will not mine them for its own account.",
  },
  {
    n: "III",
    heading: "Enforcement is certain and never arbitrary",
    body: "Every standard is published before it is applied. No member is disciplined under a rule that did not exist when they acted. Severity is predictable; pettiness is not permitted.",
  },
  {
    n: "IV",
    heading: "The Room takes no percentage",
    body: "Membership fees are the only revenue. The Room takes no cut, fee, or carry on any transaction between members, and therefore has no interest in which deals close.",
  },
  {
    n: "V",
    heading: "Scarcity is real",
    body: "The membership cap, the Inner Circle cap, and every honor limit are actual counts of actual seats. The Room will not manufacture urgency it does not have.",
  },
  {
    n: "VI",
    heading: "No access is sold",
    body: "This Room trades in commerce, not influence. Nothing in it is offered, marketed, or programmed as proximity to public office, and no member may represent otherwise.",
  },
];

export const ASSENT_LABEL =
  "I have read the Oath in full and swear to every article.";
export const SIGN_ACTION = "SET MY HAND";
export const SEAL_TEXT = "SWORN";

export const SEAL_NOTE =
  "In the live product an oath is executed against a verified identity and countersigned by the Committee. Demo — nothing entered here is transmitted or stored.";

// ---- Founding cohort declaration (deliberately below a hard rule) ---------

export const COHORT_TITLE = "THE FOUNDING COHORT";
export const COHORT_YEAR = "2026";
export const COHORT_BODY =
  "The founding cohort is seated by direct invitation of the Chair. It does not open, and it is not applied to in the ordinary way. A principal who wishes to be considered may say so here, once.";
export const COHORT_ACTION = "DECLARE INTENT";
export const COHORT_RECEIPT_HEAD = "Your intent is noted.";
export const COHORT_RECEIPT_BODY =
  "The Chair's office contacts those it wishes to consider. No further step is available, and none should be taken.";
