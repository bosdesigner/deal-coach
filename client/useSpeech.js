import { useCallback, useEffect, useRef, useState } from "react";

const PREF_KEY = "deal-coach:voice";

function readPref() {
  try {
    return localStorage.getItem(PREF_KEY) === "on";
  } catch {
    // Private windows and blocked site-data both throw on access.
    return false;
  }
}

/**
 * Speaks advisor replies through /api/speak.
 *
 * Availability is decided by the server (`/api/health`), not guessed here —
 * the browser never learns whether a key exists, only whether voice works.
 */
export function useSpeech() {
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(readPref);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const urlRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    let live = true;
    fetch("/api/health")
      .then((r) => r.json())
      .then((h) => live && setAvailable(Boolean(h?.voice?.configured)))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const cleanup = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    // Revoke the blob or the audio accumulates in memory across a session.
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    cleanup();
    setSpeaking(false);
  }, [cleanup]);

  useEffect(() => cleanup, [cleanup]);

  const toggle = useCallback(() => {
    setEnabled((on) => {
      const next = !on;
      try {
        localStorage.setItem(PREF_KEY, next ? "on" : "off");
      } catch {
        // Preference just won't persist; the toggle still works this session.
      }
      if (!next) stop();
      return next;
    });
  }, [stop]);

  const say = useCallback(
    async (text) => {
      if (!enabled || !available || !text?.trim()) return;

      cleanup();
      setError(null);
      setSpeaking(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/speak", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const detail = await res.json().catch(() => null);
          setError(detail?.error || "The advisor couldn't speak that.");
          setSpeaking(false);
          return;
        }

        const url = URL.createObjectURL(await res.blob());
        urlRef.current = url;

        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => setSpeaking(false);
        audio.onerror = () => setSpeaking(false);

        // Browsers block autoplay until the user has interacted with the page.
        // Pressing the plaque or a starter counts, so this normally succeeds.
        await audio.play().catch(() => {
          setError("Your browser blocked autoplay. Press the speaker again.");
          setSpeaking(false);
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("The advisor couldn't speak that.");
        }
        setSpeaking(false);
      }
    },
    [enabled, available, cleanup],
  );

  return { available, enabled, speaking, error, toggle, say, stop };
}
