import { useState } from "react";
import { S } from "./theme.js";
import { useAdvisor } from "./useAdvisor.js";
import { Masthead } from "./components/Masthead.jsx";
import { CurriculumRail } from "./components/CurriculumRail.jsx";
import { Chat } from "./components/Chat.jsx";
import { Composer } from "./components/Composer.jsx";

export default function App() {
  const [track, setTrack] = useState(null);
  const { messages, streaming, error, send } = useAdvisor();

  return (
    <div style={S.page}>
      <Masthead />
      <CurriculumRail open={track} onToggle={setTrack} />

      <main style={S.chatWrap}>
        <Chat
          messages={messages}
          streaming={streaming}
          error={error}
          onPick={send}
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
