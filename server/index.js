import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import express from "express";
import Anthropic from "@anthropic-ai/sdk";

import { rateLimit } from "./rateLimit.js";
import { hasCredentials, streamAdvisorReply, MODEL } from "./anthropic.js";
import { MAX_CHARS_PER_MESSAGE, MAX_HISTORY_MESSAGES } from "./prompt.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const app = express();

// Replit (and any PaaS) terminates TLS in front of us; without this every
// request looks like it came from the proxy and the rate limiter sees one IP.
app.set("trust proxy", 1);
app.use(express.json({ limit: "64kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, model: MODEL, credentials: hasCredentials() });
});

/** Reject anything that isn't a well-formed alternating chat history. */
function parseMessages(body) {
  if (!body || !Array.isArray(body.messages)) {
    return { error: "Expected a `messages` array." };
  }

  const messages = body.messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m?.role === "assistant" ? "assistant" : "user",
      content: typeof m?.content === "string" ? m.content.trim() : "",
    }))
    .filter((m) => m.content.length > 0);

  if (messages.length === 0) return { error: "No message to answer." };
  if (messages[messages.length - 1].role !== "user") {
    return { error: "The last message must come from the user." };
  }
  if (messages.some((m) => m.content.length > MAX_CHARS_PER_MESSAGE)) {
    return { error: `Keep it under ${MAX_CHARS_PER_MESSAGE} characters.` };
  }

  return { messages };
}

app.post("/api/chat", rateLimit({ windowMs: 60_000, max: 12 }), async (req, res) => {
  const { messages, error } = parseMessages(req.body);
  if (error) return res.status(400).json({ error });

  if (!hasCredentials()) {
    return res.status(503).json({
      error:
        "The advisor isn't configured. Set ANTHROPIC_API_KEY in Replit Secrets (see docs/replit-setup.md).",
    });
  }

  res.status(200).set({
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  res.flushHeaders?.();

  const send = (payload) => res.write(`data: ${JSON.stringify(payload)}\n\n`);

  let stream;
  try {
    stream = streamAdvisorReply(messages);

    // If the browser goes away mid-answer, stop paying for the rest of it.
    res.on("close", () => stream?.abort());

    for await (const event of stream) {
      if (
        event.type === "content_block_delta" &&
        event.delta.type === "text_delta"
      ) {
        send({ type: "delta", text: event.delta.text });
      }
    }

    const final = await stream.finalMessage();

    if (final.stop_reason === "refusal") {
      send({
        type: "error",
        error:
          "The advisor declined that one. Rephrase it as a deal or mindset question.",
      });
    } else {
      send({ type: "done", usage: final.usage });
    }
  } catch (err) {
    // The browser hung up and our own `res.on("close")` aborted the stream.
    // Expected, not a fault — don't log it and don't try to write a reply.
    if (err instanceof Anthropic.APIUserAbortError) return;
    if (res.writableEnded) return;

    // Typed SDK errors, most specific first — never string-match messages.
    let message = "The advisor couldn't respond. Try again in a moment.";
    if (err instanceof Anthropic.AuthenticationError) {
      message = "The advisor's API credentials were rejected. Check ANTHROPIC_API_KEY.";
    } else if (err instanceof Anthropic.RateLimitError) {
      message = "The advisor is at capacity right now. Give it a few seconds.";
    } else if (err instanceof Anthropic.BadRequestError) {
      message = "That request was malformed. Start a new conversation.";
    }

    console.error("[/api/chat]", err);
    send({ type: "error", error: message });
  } finally {
    if (!res.writableEnded) res.end();
  }
});

// Serve the built client in production. In dev, Vite serves the UI and
// proxies /api here instead (see vite.config.js), so dist/ may not exist.
const dist = path.join(root, "dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(dist, "index.html"));
  });
}

const port = Number(process.env.API_PORT || process.env.PORT || 3001);
app.listen(port, "0.0.0.0", () => {
  console.log(`[deal-coach] api on :${port} · model ${MODEL} · key ${hasCredentials() ? "set" : "MISSING"}`);
});
