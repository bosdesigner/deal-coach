import { S } from "../../theme.js";
import { PRECEDENCE, PRECEDENCE_NOTE } from "../../../shared/dealroom.js";

/** Principle 5 — the Order of Precedence. Proximity is the prize. */
export function Precedence() {
  return (
    <section>
      <div style={S.sectionLabel}>THE ORDER OF PRECEDENCE</div>
      <div style={S.panel}>
        {PRECEDENCE.map((r, i) => (
          <div
            key={r.rank}
            style={{ ...S.rankRow, ...(i === 0 ? { borderTop: "none", paddingTop: 0 } : {}) }}
          >
            <div>
              <div style={S.rankName}>{r.rank}</div>
              {r.cap != null && (
                <div style={S.rankCap}>
                  CAPPED AT {r.cap}
                  {r.capDemoFigure && " · DEMO"}
                </div>
              )}
            </div>
            <div>
              <div style={S.rankAdmission}>{r.admission}</div>
              <div style={S.rankAccess}>{r.access.join(" · ")}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={S.smallPrint}>{PRECEDENCE_NOTE}</div>
    </section>
  );
}
