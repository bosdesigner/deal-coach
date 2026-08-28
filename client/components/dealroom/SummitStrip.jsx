import { S, C } from "../../theme.js";
import { SUMMIT } from "../../../shared/dealroom.js";

/**
 * Concentric arcs — the court assembling. The innermost arc is the Inner
 * Circle, nearest the Chair. The seating chart *is* the argument.
 */
function SeatingMotif() {
  const cx = 74;
  const cy = 74;
  // Wide gap between the innermost arc and the next: the Inner Circle's
  // distance from everyone else is the whole point of the chart.
  const arcs = [
    { r: 20, opacity: 1, width: 2.2 },
    { r: 42, opacity: 0.5, width: 1.3 },
    { r: 54, opacity: 0.3, width: 1.3 },
    { r: 66, opacity: 0.16, width: 1.3 },
  ];

  return (
    <svg width="148" height="86" viewBox="0 0 148 86" aria-hidden="true" style={{ flexShrink: 0 }}>
      {/* The Chair, at the focus of every arc. */}
      <circle cx={cx} cy={cy} r="3" fill={C.brass} />
      {arcs.map((a) => (
        <path
          key={a.r}
          d={`M ${cx - a.r} ${cy} A ${a.r} ${a.r} 0 0 1 ${cx + a.r} ${cy}`}
          stroke={C.brass}
          strokeOpacity={a.opacity}
          strokeWidth={a.width}
          fill="none"
        />
      ))}
      {/* Break the arc behind the label rather than letting it strike through —
          the engraved-chart convention, and the only way this stays legible. */}
      <rect x={cx - 35} y={cy - 34} width="70" height="10" fill="#181209" />
      <text
        x={cx}
        y={cy - 27}
        fill={C.brass}
        fontSize="6.6"
        letterSpacing="1.5"
        textAnchor="middle"
        fontFamily="Archivo, sans-serif"
      >
        INNER CIRCLE
      </text>
    </svg>
  );
}

export function SummitStrip() {
  return (
    <section>
      <div style={S.summitStrip}>
        <SeatingMotif />
        <div>
          <div style={S.summitName}>{SUMMIT.name}</div>
          <div style={S.summitMeta}>
            {SUMMIT.location} · {SUMMIT.seating}
          </div>
        </div>
      </div>
    </section>
  );
}
