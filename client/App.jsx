import { useEffect, useRef, useState } from "react";
import { S } from "./theme.js";
import { useAdvisor } from "./useAdvisor.js";
import { useSpeech } from "./useSpeech.js";
import { Masthead } from "./components/Masthead.jsx";
import { CurriculumRail } from "./components/CurriculumRail.jsx";
import { Chat } from "./components/Chat.jsx";
import { Composer } from "./components/Composer.jsx";
import { VoiceToggle } from "./components/VoiceToggle.jsx";

export default function App() {
  const [track, setTrack] = useState(null);
  const { messages, streaming, error, send } = useAdvisor();
  const voice = useSpeech();

  // Speak a reply once it has finished streaming — on the falling edge of
  // `streaming`, not on every delta.
  const wasStreaming = useRef(false);
  useEffect(() => {
    if (wasStreaming.current && !streaming) {
      const last = messages[messages.length - 1];
      if (last?.role === "assistant" && last.content) voice.say(last.content);
    }
    wasStreaming.current = streaming;
  }, [streaming, messages, voice]);

  return (
    <div style={S.page}>
      <Masthead />
      <CurriculumRail open={track} onToggle={setTrack} />

      <main style={S.chatWrap}>
        <Chat
          messages={messages}
          streaming={streaming}
          error={error || voice.error}
          onPick={send}
          onReplay={voice.say}
          canSpeak={voice.available}
        />
        <VoiceToggle
          available={voice.available}
          enabled={voice.enabled}
          speaking={voice.speaking}
          onToggle={voice.toggle}
          onStop={voice.stop}
        />
        <Composer onSend={send} disabled={streaming} />
        <div style={S.footer}>
          Demo prototype · Sample corpus only · Coaching content, not legal,
          financial, or mental-health advice
          <br />
          Not affiliated with or endorsed by any individual named above.
        </div>
      </main>
    </div>
  );
}
