import { S } from "../../theme.js";
import { MEMBERSHIP } from "../../../shared/dealroom.js";

/** The only door into the Room. Sits directly beneath the curriculum tabs. */
export function RoomBanner({ onOpen }) {
  const { cap, remaining, demoFigure } = MEMBERSHIP;

  return (
    <div style={S.roomBanner}>
      <button className="engraved sheen" style={S.roomPlaque} onClick={onOpen}>
        <span>THE DEAL ROOM · BY APPLICATION ONLY</span>
        <span style={S.roomPlaqueCount}>
          {remaining} OF {cap} MEMBERSHIPS REMAINING
        </span>
        {/* Principle 2 cuts both ways: a court that misstates its own supply
            has no credibility to trade on. Marked until the number is real. */}
        {demoFigure && <span style={S.roomPlaqueDemo}>DEMO FIGURE</span>}
      </button>
    </div>
  );
}
