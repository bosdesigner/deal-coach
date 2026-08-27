# deal-coach

Working prototype of an AI executive-coaching app with two tracks: the **deal**
(negotiation tactics) and the **dealmaker** (mindset). The user describes a
situation, presses a brass plaque, and gets coached on whichever layer the
problem actually lives in.

Pitched as *The Art of the Deal — AI Executive Coaching*, featuring the
"What Would Trump Do?" advisor. `deal-coach` is the neutral codename.

> **Private, pre-license.** No licence in `docs/licensing-one-pager.md` is
> signed. Keep this repo and every deploy private, and read
> **[docs/rights-and-guardrails.md](docs/rights-and-guardrails.md)** before
> adding content or showing it to anyone.

## Quick start

```bash
npm install
cp .env.example .env        # then put a real ANTHROPIC_API_KEY in it
npm run dev                 # UI on http://localhost:5173
```

On Replit, skip the `.env` and use the Secrets pane —
see **[docs/replit-setup.md](docs/replit-setup.md)**.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Vite (`5173`) + Express API (`3001`) with reload |
| `npm run build` | Compiles the client to `dist/` |
| `npm start` | Production: Express serves `dist/` **and** `/api` on `PORT` |
| `npm run preview` | `build` then `start` — check the real production path |

## How it works

```
client/  ── React UI. Reads a text/event-stream from /api/chat and
            paints the reply one delta at a time.
   │
   │  POST /api/chat  { messages: [...] }
   ▼
server/  ── Express. Validates, rate-limits, calls Claude, relays the
            stream back as SSE. Holds the API key.
   │
shared/  ── corpus.js — the 11 elements and 25 lessons. Imported by BOTH
            sides: the UI renders them as cards, the server compiles them
            into the system prompt. One source of truth.
```

**The API key never reaches the browser.** The original mockup
(`docs/reference/wwtd-app-mockup.jsx`) called `api.anthropic.com` directly from
client-side `fetch` — which can't authenticate, and would leak the key if it
could. Everything now goes through `POST /api/chat`.

### The model call

`claude-opus-5`, streamed, with adaptive thinking at `low` effort — the reply
is capped at ~150 words, so the win is latency, not depth. The system prompt is
byte-stable across requests and marked for prompt caching; watch
`usage.cache_read_input_tokens` in the logs to confirm it's actually hitting.

### Safeguards

Rate limit of 12 requests/minute per IP (in-memory — move it to a shared store
before running more than one instance). Requests are capped at 4,000 characters
per message and 24 messages of history. The advisor's hard limits live in
`server/prompt.js`; the table in `docs/rights-and-guardrails.md` explains why
each one is there.

## Layout

```
client/     React UI (theme.js holds the design tokens)
server/     Express API — prompt.js, anthropic.js, rateLimit.js
shared/     corpus.js — the licensed-content summaries
docs/       licensing one-pager, Replit setup, rights + guardrails
  reference/wwtd-app-mockup.jsx   the original single-file mockup
```

## Status

Built and verified: the UI, the streaming relay end to end against a mock
Anthropic endpoint, request validation, and rate limiting.

**Not yet run against the live API** — no key was available in the build
environment. First run on Replit is the real smoke test.
