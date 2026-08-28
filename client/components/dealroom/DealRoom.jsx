import { S } from "../../theme.js";
import { Reveal } from "../Reveal.jsx";
import { Precedence } from "./Precedence.jsx";
import { TheBar } from "./TheBar.jsx";
import { Application } from "./Application.jsx";
import { Ledger } from "./Ledger.jsx";
import { IntentBoard } from "./IntentBoard.jsx";
import { SummitStrip } from "./SummitStrip.jsx";

export function DealRoom({ onBack, onPledge }) {
  return (
    <main style={S.roomWrap}>
      <button style={S.roomBack} onClick={onBack}>
        ← RETURN TO THE ADVISOR
      </button>

      <Reveal i={0} as="header">
        <h2 style={S.roomHeadline}>
          The advisor teaches the deal.
          <br />
          The Room is where you find your counterparty.
        </h2>
        <div style={S.roomSub}>
          A capped court of 500 verified principals. Rank is earned inside
          these walls and exists nowhere else.
        </div>

        <button
          className="sheen engraved"
          style={{ ...S.btnGhost, marginTop: 18, borderColor: "#4a3f2c" }}
          onClick={onPledge}
        >
          READ THE OATH AND THE COVENANT →
        </button>
      </Reveal>

      <Reveal i={1}><Precedence /></Reveal>
      <Reveal i={2}><TheBar /></Reveal>
      <Reveal i={3}><Application /></Reveal>
      <Reveal i={4}><Ledger /></Reveal>
      <Reveal i={5}><IntentBoard /></Reveal>
      <Reveal i={6}><SummitStrip /></Reveal>

      <div style={S.footer}>
        Membership fees only. The Room never takes a percentage of any
        transaction.
        <br />
        Demo prototype · Nothing entered here is transmitted or stored
      </div>
    </main>
  );
}
