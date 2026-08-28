import { useEffect, useState } from "react";
import { S } from "../../theme.js";
import {
  THRESHOLDS, VERIFICATION_METHODS, DEAL_TYPES, SIZE_BANDS, DEAL_ROLES,
  DEAL_YEARS, CONTRIBUTION_PROMPT, CONTRIBUTION_HELP, CONTRIBUTION_LIMIT,
  SPONSORSHIP_NOTE, APPLICATION_STORAGE_NOTE,
} from "../../../shared/dealroom.js";

const STEPS = ["Qualification", "Deal History", "Contribution", "Sponsorship"];

const BLANK = {
  threshold: "", verification: "",
  dealType: "", sizeBand: "", role: "", year: "",
  contribution: "",
  sponsorOne: "", sponsorTwo: "",
};

function Radio({ name, value, checked, onChange }) {
  return (
    <label style={S.radioRow}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange(value)}
        style={{ marginTop: 3, accentColor: "#c9a44c" }}
      />
      <span>{value}</span>
    </label>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <label style={S.field}>
      <span style={S.fieldLabel}>{label}</span>
      <select style={S.select} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function Application() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(BLANK);
  const [submitted, setSubmitted] = useState(false);

  // Principle: the demo holds nothing. State lives in this component only —
  // never a fetch, never localStorage — and is wiped when the view unmounts.
  useEffect(() => () => setForm(BLANK), []);

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  if (submitted) {
    return (
      <section>
        <div style={S.sectionLabel}>APPLICATION</div>
        <div className="engraved" style={S.panel}>
          <div style={S.receiptWrap}>
            <div style={S.receiptHead}>Application received.</div>
            {/* Enforcement voice: procedural, passive, attributed to the
                Committee. The Chair's name appears only alongside honors. */}
            <div style={S.receiptBody}>
              The Membership Committee reviews quarterly.
              <br />
              Most applications are declined.
            </div>
            <div style={{ ...S.smallPrint, marginTop: 22 }}>
              {APPLICATION_STORAGE_NOTE}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const canAdvance =
    (step === 0 && form.threshold && form.verification) ||
    (step === 1 && form.dealType && form.sizeBand && form.role && form.year) ||
    (step === 2 && form.contribution.trim().length > 0) ||
    step === 3;

  return (
    <section>
      <div style={S.sectionLabel}>APPLICATION</div>
      <div className="engraved" style={S.panel}>
        <div style={S.stepRow}>
          {STEPS.map((label, i) => (
            <div
              key={label}
              style={{ ...S.stepPip, ...(i <= step ? S.stepPipDone : {}) }}
              title={label}
            />
          ))}
        </div>

        <div style={S.stepCount}>
          STEP {step + 1} OF {STEPS.length}
        </div>
        <div style={S.stepTitle}>{STEPS[step]}</div>

        {step === 0 && (
          <>
            <div style={{ ...S.fieldLabel, marginTop: 16 }}>
              THRESHOLD MET
            </div>
            {THRESHOLDS.map((t) => (
              <Radio key={t} name="threshold" value={t}
                checked={form.threshold === t} onChange={set("threshold")} />
            ))}
            <div style={{ ...S.fieldLabel, marginTop: 16 }}>
              VERIFICATION METHOD
            </div>
            {VERIFICATION_METHODS.map((m) => (
              <Radio key={m} name="verification" value={m}
                checked={form.verification === m} onChange={set("verification")} />
            ))}
          </>
        )}

        {step === 1 && (
          <>
            <Select label="DEAL TYPE" value={form.dealType} options={DEAL_TYPES} onChange={set("dealType")} />
            <Select label="SIZE BAND" value={form.sizeBand} options={SIZE_BANDS} onChange={set("sizeBand")} />
            <Select label="YOUR ROLE" value={form.role} options={DEAL_ROLES} onChange={set("role")} />
            <Select label="YEAR" value={form.year} options={DEAL_YEARS} onChange={set("year")} />
          </>
        )}

        {step === 2 && (
          <div style={{ marginTop: 18 }}>
            <div style={S.contributionPrompt}>{CONTRIBUTION_PROMPT}</div>
            <textarea
              style={{ ...S.input, minHeight: 96, resize: "vertical", lineHeight: 1.55 }}
              maxLength={CONTRIBUTION_LIMIT}
              value={form.contribution}
              onChange={(e) => set("contribution")(e.target.value)}
              aria-label={CONTRIBUTION_PROMPT}
            />
            <div style={S.charCount}>
              {form.contribution.length} / {CONTRIBUTION_LIMIT}
            </div>
            <div style={S.smallPrint}>{CONTRIBUTION_HELP}</div>
          </div>
        )}

        {step === 3 && (
          <>
            <label style={S.field}>
              <span style={S.fieldLabel}>SPONSOR — MEMBER IN GOOD STANDING</span>
              <input style={S.input} value={form.sponsorOne}
                onChange={(e) => set("sponsorOne")(e.target.value)} />
            </label>
            <label style={S.field}>
              <span style={S.fieldLabel}>SECOND SPONSOR</span>
              <input style={S.input} value={form.sponsorTwo}
                onChange={(e) => set("sponsorTwo")(e.target.value)} />
            </label>
            <div style={S.smallPrint}>{SPONSORSHIP_NOTE}</div>
          </>
        )}

        <div style={S.stepNav}>
          <button
            style={{ ...S.btnGhost, visibility: step === 0 ? "hidden" : "visible" }}
            onClick={() => setStep((s) => s - 1)}
          >
            BACK
          </button>
          <button
            style={{ ...S.btnBrass, opacity: canAdvance ? 1 : 0.4 }}
            disabled={!canAdvance}
            onClick={() => (step === STEPS.length - 1 ? setSubmitted(true) : setStep((s) => s + 1))}
          >
            {step === STEPS.length - 1 ? "SUBMIT APPLICATION" : "CONTINUE"}
          </button>
        </div>

        <div style={S.smallPrint}>{APPLICATION_STORAGE_NOTE}</div>
      </div>
    </section>
  );
}
