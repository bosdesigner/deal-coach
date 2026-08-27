# Rights and guardrails

Read this before adding content, changing the system prompt, or showing the
demo to anyone outside the deal team.

## Status: pre-license

Nothing in `docs/licensing-one-pager.md` is signed. Until it is, this is an
internal prototype built to *illustrate* a licensed product — not a licensed
product. Two consequences:

1. **The repo stays private.** No public deploy, no public repo, no link in a
   deck that leaves the room. `index.html` also carries `noindex, nofollow` as
   a second line of defence, but that is a backstop, not the control.
2. **The corpus stays a summary.** `shared/corpus.js` holds short paraphrases
   of the 11 elements and 25 lessons — enough to demonstrate the two-track
   mechanic. Do **not** paste in book text, long excerpts, or a scraped
   manuscript. Training or prompting on the full texts requires:
   - *The Art of the Deal* — trademark/title licence, plus content-training
     rights cleared separately (the book has shared authorship).
   - *Trump Your Life* — licensed directly from Keith Ablow.

## What the advisor must never do

These live in `server/prompt.js` and are load-bearing, not decoration. If you
edit that file, keep every one of them:

| Guardrail | Why |
|---|---|
| Never claims to *be* Donald Trump or Keith Ablow | It's an AI advisor built on published work. Speaking as a real person in the first person is the line between a licensed persona and an impersonation. |
| No invented quotes or claimed private views | Same reason, and the one most likely to end up in a screenshot. |
| No legal, financial, tax, medical, or mental-health advice | The one-pager promises counsel that inner-game content is positioned as coaching, never clinical. |
| No income, earnings, or results claims | Explicitly promised to the licensor: *"no income claims, ever."* |
| No coaching toward deception, fraud, threats, or harassment | "Fight Back" means answering unfairly on the record — not retaliating illegitimately. |
| Declines political questions and commentary on real people | Keeps a coaching product out of politics. |

## UI disclosures

Three are present and should stay:

- The `PRODUCT DEMO` badge in the masthead.
- The `WWTD ADVISOR — DEMO OUTPUT` label on every assistant message.
- The footer: demo prototype, sample corpus, not legal/financial/mental-health
  advice, and no affiliation or endorsement.

## Before any external demo

- [ ] Confirm the viewer is covered by an NDA or is the licensor's own team.
- [ ] Run a handful of adversarial prompts (ask it to *be* Trump, ask for legal
      advice, ask a political question) and confirm it declines.
- [ ] Confirm the deployment is private, not a public Replit URL.
