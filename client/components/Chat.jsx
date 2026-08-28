import { useEffect, useRef } from "react";
import { S } from "../theme.js";
import { STARTERS } from "../../shared/corpus.js";
import { Reveal } from "./Reveal.jsx";
import { SpeakerIcon } from "./VoiceToggle.jsx";

function EmptyState({ onPick, disabled }) {
  return (
    <div style={S.empty}>
      <div style={S.emptyHead}>Stuck in a deal?</div>
      <div style={S.emptySub}>
        Describe your negotiation — or what’s going on in your head. The advisor
        coaches the deal and the dealmaker, drawing on The Art of the Deal and
        Trump Your Life.
      </div>
      <div style={S.starterWrap}>
        {STARTERS.map((s, i) => (
          <Reveal
            as="button"
            key={s}
            i={i}
            className="starter"
            style={S.starter}
            disabled={disabled}
            onClick={() => onPick(s)}
          >
            {s}
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Chat({ messages, streaming, error, onPick, onReplay, canSpeak }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, error]);

  const lastIsAssistant = messages[messages.length - 1]?.role === "assistant";
  // Show the thinking pulse only until the first token lands.
  const waiting = streaming && !lastIsAssistant;

  return (
    <div
      className="chat"
      ref={scrollRef}
      // With no conversation yet the column still claims its full height, which
      // stranded the opener at the top and left a dead well above the composer.
      // Centring turns that empty space into composition.
      style={{
        ...S.chat,
        ...(messages.length === 0 && !error ? { justifyContent: "center" } : {}),
      }}
      role="log"
      aria-live="polite"
      aria-busy={streaming}
    >
      {messages.length === 0 && !error && (
        <EmptyState onPick={onPick} disabled={streaming} />
      )}

      {messages.map((m, i) =>
        m.role === "user" ? (
          <div key={i} style={S.userMsg}>{m.content}</div>
        ) : (
          <div key={i} style={S.aiMsg}>
            <div style={S.aiLabel}>
              WWTD ADVISOR — DEMO OUTPUT
              {canSpeak && !(streaming && i === messages.length - 1) && (
                <button
                  style={S.msgSpeak}
                  title="Play this reply"
                  aria-label="Play this reply"
                  onClick={() => onReplay(m.content)}
                >
                  <SpeakerIcon size={11} />
                </button>
              )}
            </div>
            {m.content}
            {streaming && i === messages.length - 1 && <span className="caret" />}
          </div>
        ),
      )}

      {waiting && (
        <div style={S.aiMsg}>
          <div style={S.aiLabel}>WWTD ADVISOR</div>
          <span className="pulse">Working the angles…</span>
        </div>
      )}

      {error && <div style={S.error} role="alert">{error}</div>}
    </div>
  );
}
