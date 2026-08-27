import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./prompt.js";

export const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";

// The SDK reads ANTHROPIC_API_KEY from the environment. The key lives only on
// the server — it is never sent to the browser. See docs/replit-setup.md.
const client = new Anthropic();

export function hasCredentials() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

/**
 * Stream one advisor turn.
 *
 * @param {Array<{role: 'user'|'assistant', content: string}>} messages
 * @returns the SDK's MessageStream — await `.finalMessage()` or iterate events.
 */
export function streamAdvisorReply(messages) {
  return client.messages.stream({
    model: MODEL,
    // Replies are capped at ~150 words by the system prompt, so a small
    // ceiling is deliberate here rather than a lowball.
    max_tokens: 2000,
    // Adaptive thinking stays ON (disabling it on Opus 5 can leak tool-call
    // text and <thinking> tags); low effort keeps the chat snappy instead.
    thinking: { type: "adaptive" },
    output_config: { effort: "low" },
    // The corpus prompt is byte-stable across every request, so cache it.
    // It sits near the model's minimum cacheable prefix — check
    // usage.cache_read_input_tokens in the logs before assuming it hits.
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages,
  });
}
