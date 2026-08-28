import { S } from "../../theme.js";
import { DEMO_LEDGER } from "../../../shared/dealroom.js";

/** Principle 4 made visible — standing that exists only inside the Room. */
export function Ledger() {
  const l = DEMO_LEDGER;
  const cells = [
    { v: l.rank, k: "PRECEDENCE" },
    { v: l.dealsClosedInRoom, k: "DEALS CLOSED IN-ROOM" },
    { v: l.sponsorshipsInGoodStanding, k: "SPONSORSHIPS IN GOOD STANDING" },
    { v: `${l.unlocksRemaining}/${l.unlocksAllowance}`, k: "UNLOCKS THIS MONTH" },
  ];

  return (
    <section>
      <div style={S.sectionLabel}>
        THE LEDGER{l.demoFigure && " · DEMO STANDING"}
      </div>
      <div style={S.panel}>
        <div style={S.ledgerGrid}>
          {cells.map((c) => (
            <div key={c.k} style={S.ledgerCell}>
              <div style={S.ledgerVal}>{c.v}</div>
              <div style={S.ledgerKey}>{c.k}</div>
            </div>
          ))}
        </div>
        <div style={S.smallPrint}>
          Precedence review: {l.precedenceReview}. Standing is granted by the
          Room, held at the Room's discretion, and extinguished on exit.
        </div>
      </div>
    </section>
  );
}
