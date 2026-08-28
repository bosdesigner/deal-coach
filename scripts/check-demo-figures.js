#!/usr/bin/env node
/**
 * Fails while any Deal Room figure is still demo data.
 *
 * Displayed scarcity has to be real scarcity — a counter or a cap that
 * misstates supply to induce a $25,000 payment is a false statement of
 * material fact, not set dressing. This exists so shipping the demo numbers
 * to paying applicants takes a deliberate act, not an oversight.
 *
 * Run `npm run check:demo-figures` before any build that real money touches.
 */
import * as room from "../shared/dealroom.js";

const flagged = [];
for (const [name, value] of Object.entries(room)) {
  if (!value || typeof value !== "object") continue;
  if (value.demoFigure) flagged.push(name);
  for (const [key, inner] of Object.entries(value)) {
    if (inner && typeof inner === "object" && inner.demoFigure) {
      flagged.push(`${name}.${key}`);
    }
  }
  if (Array.isArray(value)) {
    value.forEach((entry, i) => {
      if (entry?.capDemoFigure || entry?.demoFigure) {
        flagged.push(`${name}[${i}] (${entry.rank ?? i})`);
      }
    });
  }
}

if (flagged.length === 0) {
  console.log("✓ No demo figures remain in shared/dealroom.js");
  process.exit(0);
}

console.error("\n✗ Deal Room still contains DEMO figures:\n");
for (const f of flagged) console.error(`    ${f}`);
console.error(`
These are displayed to applicants as facts about supply and rank.
Before taking money, replace each with a value derived from real
membership records and remove its demoFigure/capDemoFigure flag.

This check is expected to fail for the prototype. It is a gate for
the live product, not a lint error to silence.
`);
process.exit(1);
