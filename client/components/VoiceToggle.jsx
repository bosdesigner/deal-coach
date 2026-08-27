import { S } from "../theme.js";

/** Brass speaker glyph. Inline SVG so it inherits currentColor and needs no font. */
export function SpeakerIcon({ muted = false, size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M7 2.5 3.8 5.2H1.8v5.6h2L7 13.5z" fill="currentColor" />
      {muted ? (
        <path d="M10 6l4 4M14 6l-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      ) : (
        <>
          <path d="M10.2 5.6a3.2 3.2 0 0 1 0 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M12.4 3.6a6 6 0 0 1 0 8.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function VoiceToggle({ available, enabled, speaking, onToggle, onStop }) {
  if (!available) {
    return (
      <div style={S.voiceRow}>
        <span
          style={{ ...S.voiceBtn, ...S.voiceBtnOff }}
          title="Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID to enable the advisor's voice."
        >
          <SpeakerIcon muted /> VOICE UNAVAILABLE
        </span>
      </div>
    );
  }

  return (
    <div style={S.voiceRow}>
      <button
        style={{ ...S.voiceBtn, ...(enabled ? S.voiceBtnOn : {}) }}
        aria-pressed={enabled}
        onClick={onToggle}
      >
        <SpeakerIcon muted={!enabled} /> {enabled ? "VOICE ON" : "VOICE OFF"}
      </button>

      {speaking && (
        <button style={S.voiceBtn} onClick={onStop}>
          STOP
        </button>
      )}
    </div>
  );
}
