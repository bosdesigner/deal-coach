import { useLayoutEffect, useRef, useState } from "react";
import { S } from "../theme.js";

export function Composer({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Grow the box with the text instead of scrolling a one-line field.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  function submit() {
    const content = value.trim();
    if (!content || disabled) return;
    setValue("");
    onSend(content);
  }

  return (
    <div style={S.inputBar}>
      <textarea
        ref={textareaRef}
        style={S.textarea}
        rows={1}
        value={value}
        placeholder="Describe your deal…"
        aria-label="Describe your deal"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <button
        className="plaque sheen"
        style={S.plaque}
        onClick={submit}
        disabled={disabled || value.trim().length === 0}
      >
        WHAT WOULD<br />TRUMP DO?
      </button>
    </div>
  );
}
