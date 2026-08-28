import { S } from "../../theme.js";
import { MEMBERSHIP } from "../../../shared/dealroom.js";

/**
 * The only door into the Room. Sits directly beneath the curriculum tabs.
 *
 * The count and the name are now the same number, deliberately: seating a
 * 501st member would mean renaming the institution. Principle 3 enforced by
 * the masthead rather than by good intentions.
 */
export function RoomBanner({ onOpen }) {
  const { cap, remaining, demoFigure } = MEMBERSHIP;

  return (
    <div style={S.roomBanner}>
      <button className="engraved sheen" style={S.roomPlaque} onClick={onOpen}>
        <span>ENTER THE ROOM</span>
        <span style={S.roomPlaqueCount}>
          {remaining} OF {cap} SEATS REMAINING
        </span>
        {/* Principle 2 cuts both ways: a court that misstates its own supply
            has no credibility to trade on. Marked until the number is real. */}
        {demoFigure && <span style={S.roomPlaqueDemo}>DEMO FIGURE</span>}
      </button>
    </div>
  );
}
