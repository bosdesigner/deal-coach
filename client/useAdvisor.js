import { useCallback, useRef, useState } from "react";

const GENERIC_ERROR = "The advisor couldn't respond. Check your connection and try again.";

/** Pull `data:` payloads out of a text/event-stream body, one JSON object at a time. */
async function* readEvents(body) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Events are separated by a blank line; anything after the last one is
      // a partial event that has to wait for the next chunk.
      const chunks = buffer.split("\n\n");
      buffer = chunks.pop() ?? "";

      for (const chunk of chunks) {
        const line = chunk.split("\n").find((l) => l.startsWith("data:"));
        if (!line) continue;
        try {
          yield JSON.parse(line.slice(5).trim());
        } catch {
          // A malformed frame shouldn't kill the rest of the stream.
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Conversation state plus a streaming `send`. The advisor's reply lands one
 * delta at a time on the trailing assistant message.
 */
export function useAdvisor() {
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  // The ref is the source of truth for building requests. Reading `messages`
  // straight out of a setState updater looks equivalent but isn't: React runs
  // updaters at render, not at call time, so the value wouldn't exist yet —
  // and StrictMode invokes them twice, which would double-append the turn.
  const messagesRef = useRef(messages);
  const commit = useCallback((next) => {
    messagesRef.current = next;
    setMessages(next);
  }, []);

  const send = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || streaming) return;

      setError(null);
      setStreaming(true);

      const history = [...messagesRef.current, { role: "user", content }];
      commit(history);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const detail = await res.json().catch(() => null);
          setError(detail?.error || GENERIC_ERROR);
          return;
        }

        // Open the assistant bubble only once the stream is live, so a failed
        // request never leaves an empty bubble behind.
        let opened = false;

        for await (const event of readEvents(res.body)) {
          if (event.type === "delta") {
            if (!opened) {
              opened = true;
              commit([...messagesRef.current, { role: "assistant", content: "" }]);
            }
            const current = messagesRef.current;
            const last = current[current.length - 1];
            commit([
              ...current.slice(0, -1),
              { ...last, content: last.content + event.text },
            ]);
          } else if (event.type === "error") {
            setError(event.error || GENERIC_ERROR);
          }
        }
      } catch (err) {
        if (err.name !== "AbortError") setError(GENERIC_ERROR);
      } finally {
        abortRef.current = null;
        setStreaming(false);
      }
    },
    [streaming, commit],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    commit([]);
    setError(null);
  }, [commit]);

  return { messages, streaming, error, send, reset };
}
