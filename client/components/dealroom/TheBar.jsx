import { S, C } from "../../theme.js";
import { BAR } from "../../../shared/dealroom.js";

function Item({ children }) {
  return (
    <div style={S.barItem}>
      <span style={{ position: "absolute", left: 0, color: C.brass }}>·</span>
      {children}
    </div>
  );
}

/** Principle 2 — published in advance, in full. Nothing here is a surprise. */
export function TheBar() {
  return (
    <section>
      <div style={S.sectionLabel}>{BAR.title}</div>
      <div style={S.panelBrass}>
        <div style={S.barGroupLabel}>{BAR.financial.label}</div>
        {BAR.financial.options.map((o) => (
          <Item key={o}>{o}</Item>
        ))}

        <div style={{ ...S.barGroupLabel, marginTop: 16 }}>And all of:</div>
        {BAR.requirements.map((r) => (
          <Item key={r}>{r}</Item>
        ))}

        <div style={S.barTerms}>
          {BAR.terms.map((t) => (
            <span key={t} style={S.barTerm}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
