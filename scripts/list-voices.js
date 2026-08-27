#!/usr/bin/env node
// `npm run voices` — prints the voice ids available on your ElevenLabs
// account, so you can set ELEVENLABS_VOICE_ID to one that won't expire.
import { listVoices } from "../server/voice.js";

if (!process.env.ELEVENLABS_API_KEY) {
  console.error("Set ELEVENLABS_API_KEY first (Replit Secrets, or .env locally).");
  process.exit(1);
}

try {
  const voices = await listVoices();
  if (voices.length === 0) {
    console.log("No voices on this account. Add one from the ElevenLabs Voice Library.");
    process.exit(0);
  }
  console.log(`\n${voices.length} voice(s) available:\n`);
  for (const v of voices) {
    const traits = [v.labels.gender, v.labels.age, v.labels.accent, v.labels.description]
      .filter(Boolean)
      .join(", ");
    console.log(`  ${v.id}  ${v.name.padEnd(18)} ${v.category ?? ""}${traits ? ` — ${traits}` : ""}`);
  }
  console.log("\nSet ELEVENLABS_VOICE_ID to one of the ids above.");
  console.log("Avoid voices marked 'premade'/'default' — those expire 2026-12-31.\n");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
