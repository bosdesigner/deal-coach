import { S, C } from "../../theme.js";
import { INTENT_LISTINGS, UNLOCK_NOTE } from "../../../shared/dealroom.js";

function Lock() {
  return (
    <svg width="9" height="11" viewBox="0 0 10 12" fill="none" aria-hidden="true">
      <rect x="0.6" y="4.8" width="8.8" height="6.6" rx="1.2" stroke={C.brass} strokeWidth="1.1" />
      <path d="M2.7 4.8V3.3a2.3 2.3 0 0 1 4.6 0v1.5" stroke={C.brass} strokeWidth="1.1" />
    </svg>
  );
}

/** Principle 6 — the Room sees everything; members see what reciprocity earns. */
export function IntentBoard() {
  return (
    <section>
      <div style={S.sectionLabel}>THE INTENT BOARD · DOUBLE-BLIND</div>
      <div style={S.intentGrid}>
        {INTENT_LISTINGS.map((l) => (
          <div key={l.id} className="engraved lift" style={S.intentCard}>
            <div style={S.intentKind}>{l.kind}</div>
            <div style={S.intentBody}>{l.body}</div>
            <button style={S.intentBtn} disabled title={UNLOCK_NOTE}>
              <Lock /> REQUEST MUTUAL UNLOCK
            </button>
          </div>
        ))}
      </div>
      <div style={S.smallPrint}>{UNLOCK_NOTE}</div>
    </section>
  );
}
