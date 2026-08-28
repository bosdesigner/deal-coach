# The 500 — operating doctrine

*The 500 is the institution. The Room is where its members meet.*

The 500 is built as a court. Seven principles from *The Prince*, systematized
into product mechanics. This file records what each one is, where it lives in
the code, and — for the three that can go wrong — what separates the legitimate
version from the illegitimate one.

## The seven

**1. The Buffer Institution** (Ch. 19 — the French *parlement*). The sovereign
never punishes; an institution does. All rejection, discipline and expulsion
come from **The Membership Committee** — procedural, final. The **Chair** only
bestows: honors, invitations, recognition. Members associate the brand
exclusively with favor.
*Code:* every rejection string is passive-voice and attributed to the Committee
(`Application.jsx`, `PRECEDENCE_NOTE`). The Chair appears only alongside
invitation and honor.

**2. Feared, Never Hated** (Ch. 17, 19). Enforcement is certain, known in
advance, impersonal. Rules published; dues never clawed back capriciously;
member property — deal data, contacts — never seized. Predictable severity,
zero pettiness.
*Code:* `BAR.terms` states probation, expulsion and the no-refund rule on the
same panel as the fee, before any application step.

**3. The Economy of Favors** (Ch. 16). Honors that are common are worthless.
Every form of recognition is capped and dated: one Dealmaker of the Year,
twelve seats at the Chairman's Dinner, a fixed number of Inner Circle
positions. Nothing is given twice cheaply.
*Code:* `PRECEDENCE[2].cap`, `MEMBERSHIP.cap`.

**4. Status Is Conferred, Not Owned** (Ch. 4 — the Turk's servants, not
France's barons). Rank exists only inside the Room, granted by the Room,
non-transferable, extinguished on exit. Standing depends on the institution,
not on other members. No baronies.
*Code:* `Ledger.jsx` — the score that exists nowhere else — and
`PRECEDENCE_NOTE`.

**5. The Court Assembles** (Versailles). Proximity is the prize. An Order of
Precedence governs everything visible: Summit seating, order of introductions,
access windows. Competing for position binds members to the Room.
*Code:* `Precedence.jsx`; `SummitStrip.jsx` renders it as concentric arcs with
the Chair at the focus.

**6. Information Is the Currency** (Ch. 23). The Room sees everything; each
member sees only what rank and reciprocity have earned. Double-blind matching
is one instance of a general rule: strategic opacity, controlled reveal.
*Code:* `IntentBoard.jsx` — identities withheld pending mutual unlock,
allowance set by precedence.

**7. Discipline Early** (Ch. 3). Problems are handled at probation, not at
scandal. First year provisional for everyone, no exceptions.
*Code:* `BAR.terms`.

---

## The Pledge

The ritual of conferral, reached from the Room. Two halves, deliberately.

**The Member's Oath** — seven articles, sworn in the first person: dealing
straight, confidentiality, reciprocity, holding rank at the Room's pleasure,
not spending the Room's name outside it, staking precedence when sponsoring,
and accepting the Committee's authority in advance.

**The Room's Covenant** — six articles given back, in the institutional voice:
fees honored, member property untouched, enforcement certain and never
retroactive, no percentage of any transaction, scarcity real, no access sold.

The second half is not decoration. Principle 2 — feared, never hated — is only
coherent if the institution is bound as well as the member. A court that
extracts obligations and gives none back is a racket, and the members it
attracts will behave accordingly. The Covenant is also where the three hard
constraints in this document become promises a member can hold the Room to,
rather than internal notes: Covenant IV (no percentage), V (scarcity is real),
and VI (no access is sold) are the same three lines as the sections below.

The founding-cohort declaration sits **below a hard rule**, after both
documents. The oath is a thing you read and assent to; the declaration is a
quiet act at the foot of it. Keeping them visually separate is what stops a
solemn document from reading as a signup form.

The demo signs nothing: name and assent live in component state, no request,
no storage, cleared on exit. In production an oath is executed against a
verified identity and countersigned by the Committee.

---

## Where this goes wrong, and the line

Court mechanics are a legitimate way to run a members' club — Tiger 21, YPO and
every serious trade association use versions of all seven. Three of them turn
into something else if implemented carelessly. These are not stylistic notes.

### Scarcity must be real (Principle 3)

A displayed count of remaining memberships is a **statement of material fact
about supply**, made to induce a $25,000 payment. If the number is decorative —
a countdown on a timer, a cap the house quietly exceeds, a "132" that never
moves — that is a false statement made to induce a purchase: deceptive practice
under FTC Act §5 and every state UDAP analogue.

The demo's figures are fabricated, so they are **marked** in the UI
(`DEMO FIGURE`, `DEMO STANDING`, `CAPPED AT 50 · DEMO`) and flagged in data
(`demoFigure: true`). `npm run check:demo-figures` fails while any remain. It
is expected to fail for the prototype. It must pass before anyone can pay.

The same applies to every honor cap. If the Chairman's Dinner seats twelve, it
seats twelve.

### The Committee must actually exist (Principle 1)

Routing discipline through an institution is ordinary governance — it is how
every club, exchange and professional body works, and it protects members from
arbitrary personal rule as much as it protects the Chair from blame.

It becomes deceptive at one specific point: if the Chair in fact makes the
decisions and a fictional Committee is named to absorb the resentment. Then
"the Committee has decided" is a lie told to a member about who did something
to them, and the buffer is a shield against accountability rather than a
separation of powers.

**The Committee must be real**: named members, a written charter, recorded
decisions, and genuine authority the Chair does not override. Build it before
the first rejection letter.

### No implication of government access (Principle 5)

The Room is brand-licensed from a political figure. A capped, high-fee court
that hints — in marketing, in Summit programming, in what a salesperson says on
a call — at proximity to officeholders is not an aggressive positioning
choice. It is selling access to government, which implicates federal and state
lobbying, honest-services and anti-corruption law, and would end the licence
and the company.

**Nothing in this product touches politics.** The Room convenes principals to
transact with each other. Guardrails against political drift are already in the
advisor's system prompt (`server/prompt.js`) and must extend to every piece of
Room copy, event programming and sales script.

---

## Revenue

Membership fees only. The Room never takes a percentage of any transaction —
stated in the footer and load-bearing. Taking a cut of member deals would make
the Room a party to those transactions and likely a broker-dealer or business
broker, requiring registration in most states and triggering securities
liability on the intent board. Fees-only is what keeps the Room a club rather
than an unlicensed intermediary.

## The demo stores nothing

The application stepper holds input in React state only — no network request,
no `localStorage`, no cookie — and clears it when the view closes. This is
verified in the browser, not assumed. Collecting real net-worth attestations
and deal history would put the prototype in scope for GLBA and state privacy
law; a real application flow needs counsel, a retention policy, and an actual
security review before it accepts a single field.
