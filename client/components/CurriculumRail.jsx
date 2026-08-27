import { S } from "../theme.js";
import { PRINCIPLES, LESSONS } from "../../shared/corpus.js";

const TRACKS = {
  deal: { label: "THE OUTER GAME · 11 Elements", items: PRINCIPLES },
  mind: { label: "THE INNER GAME · 25 Lessons", items: LESSONS },
};

export function CurriculumRail({ open, onToggle }) {
  const track = TRACKS[open];

  return (
    <>
      <div style={S.tabRow}>
        {Object.entries(TRACKS).map(([key, { label }]) => (
          <button
            key={key}
            className="rail-toggle"
            style={{ ...S.tab, ...(open === key ? S.tabActive : {}) }}
            aria-expanded={open === key}
            aria-controls="curriculum-rail"
            onClick={() => onToggle(open === key ? null : key)}
          >
            {label}
          </button>
        ))}
      </div>

      {track && (
        <div id="curriculum-rail" style={S.rail}>
          {track.items.map((item) => (
            <div key={item.n} style={S.card}>
              <div style={S.cardNum}>{String(item.n).padStart(2, "0")}</div>
              <div>
                <div style={S.cardTitle}>{item.t}</div>
                <div style={S.cardBody}>{item.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
