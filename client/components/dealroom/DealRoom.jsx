import { S } from "../../theme.js";
import { Precedence } from "./Precedence.jsx";
import { TheBar } from "./TheBar.jsx";
import { Application } from "./Application.jsx";
import { Ledger } from "./Ledger.jsx";
import { IntentBoard } from "./IntentBoard.jsx";
import { SummitStrip } from "./SummitStrip.jsx";

export function DealRoom({ onBack }) {
  return (
    <main style={S.roomWrap}>
      <button style={S.roomBack} onClick={onBack}>
        ← RETURN TO THE ADVISOR
      </button>

      <header>
        <h2 style={S.roomHeadline}>
          The advisor teaches the deal.
          <br />
          The Room is where you find your counterparty.
        </h2>
        <div style={S.roomSub}>
          A capped court of 500 verified principals. Rank is earned inside
          these walls and exists nowhere else.
        </div>
      </header>

      <Precedence />
      <TheBar />
      <Application />
      <Ledger />
      <IntentBoard />
      <SummitStrip />

      <div style={S.footer}>
        Membership fees only. The Room never takes a percentage of any
        transaction.
        <br />
        Demo prototype · Nothing entered here is transmitted or stored
      </div>
    </main>
  );
}
