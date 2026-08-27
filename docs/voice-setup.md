# Giving the advisor a voice

The app speaks its replies through [ElevenLabs](https://elevenlabs.io). Voice
is **optional** — with nothing configured the app runs normally and the toggle
reads `VOICE UNAVAILABLE`.

## Read this before picking a voice

**Do not clone, commission, or approximate Donald Trump's voice.** Three
independent reasons, any one of which is sufficient:

1. **ElevenLabs forbids it regardless of consent.** Their
   [No-Go Voices](https://help.elevenlabs.io/hc/en-us/articles/22584327690897-What-are-No-Go-Voices)
   policy blocks voices of political candidates and elected officials *even
   with authorization*. A signed licence would not unlock it. Accounts get
   suspended, and every generation is traceable.
2. **Voice is separately protected.** Tennessee's ELVIS Act (2024) made voice
   an explicit element of likeness and reaches technology providers, not just
   end users. The federal NO FAKES Act advanced out of Senate Judiciary in
   June 2026. Older soundalike cases (*Midler v. Ford*, *Waits v. Frito-Lay*)
   already made imitation actionable without using any real recording.
3. **The licence doesn't cover it.** `docs/licensing-one-pager.md` lists
   explicit AI likeness/voice terms as a protection still to be negotiated.

This applies to human voice actors too. Briefing an actor to "sound like
Trump" walks straight back into *Midler* territory with a person in the loop.
Cast for the **energy** — brash, confident, seasoned, New York — never for
the impression.

## Setup

**1. Pick a voice.** With your API key set, list what your account has:

```bash
npm run voices
```

Prefer a voice **not** marked `premade`/`default` — ElevenLabs' default voices
all expire **2026-12-31** and will stop working. A cloned or Voice Library
voice you've added to your account is stable.

**2. Set two secrets** (Replit Secrets pane, or `.env` locally):

| Key | Value |
|---|---|
| `ELEVENLABS_API_KEY` | from [elevenlabs.io](https://elevenlabs.io) → Profile → API Keys |
| `ELEVENLABS_VOICE_ID` | an id from `npm run voices` |

Restart. `/api/health` reports `voice.configured: true` when it's live.

## How it behaves

- The toggle starts **off** and remembers its state per browser
  (`localStorage`).
- A reply is spoken once it finishes streaming — not per token, so the
  delivery isn't chopped up.
- Each reply carries a small speaker icon to replay it. Useful when demoing to
  a room.
- **STOP** appears while audio is playing.
- Text is capped at 1,200 characters per request as a cost backstop.
- The key stays server-side. The browser only ever calls `/api/speak`.

## Tuning

| Setting | Where | Note |
|---|---|---|
| Model | `ELEVENLABS_MODEL` | Defaults to `eleven_flash_v2_5` — fastest with good quality. `eleven_multilingual_v2` sounds better but is slower. |
| Delivery | `voice_settings` in `server/voice.js` | `stability: 0.55` is deliberately steady. Raise for flatter and calmer, lower for more animated. |

## Cost

Billed per character by ElevenLabs, separately from the Anthropic API. Replies
are capped near 150 words (~800 characters), so roughly 1,200 spoken replies
per 1M characters. Check your plan's quota before a long demo session.
