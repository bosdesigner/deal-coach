import { useEffect, useState } from "react";
import { S } from "../../theme.js";
import { Reveal } from "../Reveal.jsx";
import {
  OATH_TITLE, OATH_INTRO, OATH, COVENANT_TITLE, COVENANT_INTRO, COVENANT,
  ASSENT_LABEL, SIGN_ACTION, SEAL_TEXT, SEAL_NOTE,
  COHORT_TITLE, COHORT_YEAR, COHORT_BODY, COHORT_ACTION,
  COHORT_RECEIPT_HEAD, COHORT_RECEIPT_BODY,
} from "../../../shared/pledge.js";

function Articles({ items }) {
  return (
    <>
      {items.map((a, i) => (
        <Reveal
          key={a.n}
          i={i}
          step={45}
          style={{ ...S.article, ...(i === 0 ? { borderTop: "none", paddingTop: 4 } : {}) }}
        >
          <div style={S.articleNum}>{a.n}</div>
          <div>
            <div style={S.articleHeading}>{a.heading}</div>
            <div style={S.articleBody}>{a.body}</div>
          </div>
        </Reveal>
      ))}
    </>
  );
}

/** The oath, the covenant given back, and — below a hard rule — the cohort. */
export function Pledge({ onBack }) {
  const [assented, setAssented] = useState(false);
  const [name, setName] = useState("");
  const [sworn, setSworn] = useState(false);
  const [declared, setDeclared] = useState(false);

  // Same rule as the application: held in memory, gone when the view closes.
  useEffect(() => () => { setName(""); setAssented(false); }, []);

  const canSign = assented && name.trim().length > 1;

  return (
    <main style={S.pledgeWrap}>
      <button style={S.roomBack} onClick={onBack}>
        ← RETURN TO THE ROOM
      </button>

      {/* ---- The Oath ---- */}
      <section>
        <Reveal style={S.pledgeHead}>
          <h2 style={S.pledgeTitle}>{OATH_TITLE}</h2>
          <div style={S.pledgeIntro}>{OATH_INTRO}</div>
        </Reveal>

        <div className="engraved" style={{ ...S.panel, marginTop: 18 }}>
          <Articles items={OATH} />

          <hr className="rule" style={{ marginTop: 20 }} />

          {sworn ? (
            <div style={S.sealWrap}>
              <div style={S.sealName}>{name.trim()}</div>
              {/* Honors voice: the Chair receives an oath, the Committee holds
                  you to it. This moment belongs to the Chair. */}
              <div style={S.sealMeta}>
                {SEAL_TEXT} · RECEIVED BY THE CHAIR
              </div>
              <div style={{ ...S.smallPrint, maxWidth: 420, margin: "16px auto 0" }}>
                {SEAL_NOTE}
              </div>
            </div>
          ) : (
            <>
              <label style={S.assentBox}>
                <input
                  type="checkbox"
                  checked={assented}
                  onChange={(e) => setAssented(e.target.checked)}
                  style={{ marginTop: 2, accentColor: "#c9a44c", width: 15, height: 15 }}
                />
                <span>{ASSENT_LABEL}</span>
              </label>

              <div style={S.signRow}>
                <input
                  style={S.signInput}
                  value={name}
                  placeholder="Your name"
                  aria-label="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className="sheen"
                  style={{ ...S.btnBrass, opacity: canSign ? 1 : 0.4 }}
                  disabled={!canSign}
                  onClick={() => setSworn(true)}
                >
                  {SIGN_ACTION}
                </button>
              </div>
              <div style={S.smallPrint}>{SEAL_NOTE}</div>
            </>
          )}
        </div>
      </section>

      {/* ---- The Covenant given in return ---- */}
      <section>
        <Reveal style={S.pledgeHead}>
          <h2 style={S.pledgeTitle}>{COVENANT_TITLE}</h2>
          <div style={S.pledgeIntro}>{COVENANT_INTRO}</div>
        </Reveal>

        <div className="engraved" style={{ ...S.panelBrass, marginTop: 18 }}>
          <Articles items={COVENANT} />
        </div>
      </section>

      {/* ---- Hard rule. Everything above is a document; below is an act. ---- */}
      <hr className="rule" style={{ margin: "10px 0" }} />

      <section>
        <div className="engraved" style={S.cohortBand}>
          <div>
            <span style={S.cohortTitle}>{COHORT_TITLE}</span>{" "}
            <span style={S.cohortYear}>{COHORT_YEAR}</span>
          </div>

          {declared ? (
            <>
              <div style={{ ...S.cohortBody, color: "#efe6d2" }}>
                {COHORT_RECEIPT_HEAD}
              </div>
              <div style={S.cohortBody}>{COHORT_RECEIPT_BODY}</div>
            </>
          ) : (
            <>
              <div style={S.cohortBody}>{COHORT_BODY}</div>
              <div style={{ marginTop: 16 }}>
                <button style={S.btnGhost} onClick={() => setDeclared(true)}>
                  {COHORT_ACTION}
                </button>
              </div>
            </>
          )}
          <div style={S.smallPrint}>
            Demo — nothing entered here is transmitted or stored.
          </div>
        </div>
      </section>

      <div style={S.footer}>
        Membership fees only. The Room never takes a percentage of any
        transaction.
        <br />
        Demo prototype · Nothing entered here is transmitted or stored
      </div>
    </main>
  );
}
