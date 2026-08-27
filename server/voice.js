import { Readable } from "node:stream";

// Overridable so the voice path can be tested against a local stub.
const API = process.env.ELEVENLABS_BASE_URL || "https://api.elevenlabs.io/v1";

// eleven_flash_v2_5 is the speed/quality balance point — the advisor's replies
// are short, and a coach that pauses to think for eight seconds isn't a coach.
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_flash_v2_5";

// Deliberately no hardcoded fallback. ElevenLabs' *default* voices all expire
// 2026-12-31, so a baked-in id would rot silently — and the stock default is a
// British narrator, wrong for this persona. Run `npm run voices` to list the
// ids on your account and set one. See docs/voice-setup.md.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

/** Roughly 90 seconds of speech. Replies are capped near 150 words anyway; this
 *  is a cost backstop against a pathological input, not a content limit. */
export const MAX_SPEAK_CHARS = 1200;

export function voiceStatus() {
  return {
    configured: Boolean(process.env.ELEVENLABS_API_KEY && VOICE_ID),
    hasKey: Boolean(process.env.ELEVENLABS_API_KEY),
    hasVoice: Boolean(VOICE_ID),
    model: MODEL,
  };
}

function authHeaders() {
  return { "xi-api-key": process.env.ELEVENLABS_API_KEY };
}

/**
 * Synthesise `text` and return a Node Readable of MPEG audio.
 * Throws an Error carrying `.status` when ElevenLabs rejects the request.
 */
export async function speak(text, { signal } = {}) {
  const res = await fetch(
    `${API}/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      signal,
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          // Steady rather than expressive: this is a coach giving a read on
          // your situation, not a performance.
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.15,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!res.ok || !res.body) {
    // The error body is JSON even though we asked for audio.
    const detail = await res.text().catch(() => "");
    const err = new Error(`ElevenLabs ${res.status}: ${detail.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }

  return Readable.fromWeb(res.body);
}

/** List the voices available on this account — used by `npm run voices`. */
export async function listVoices() {
  const res = await fetch(`${API}/voices`, { headers: authHeaders() });
  if (!res.ok) {
    const err = new Error(`ElevenLabs ${res.status}: ${await res.text().catch(() => "")}`);
    err.status = res.status;
    throw err;
  }
  const { voices = [] } = await res.json();
  return voices.map((v) => ({
    id: v.voice_id,
    name: v.name,
    category: v.category,
    labels: v.labels || {},
    preview: v.preview_url,
  }));
}
