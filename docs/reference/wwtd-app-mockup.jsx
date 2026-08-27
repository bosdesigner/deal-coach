import { useState, useRef, useEffect } from "react";

// ============================================================
// DEMO CORPUS — sample of licensed content the production
// system would train on. The 11 elements of the deal from
// The Art of the Deal (1987), plus coaching style guidance.
// ============================================================
const PRINCIPLES = [
  { n: 1, t: "Think Big", d: "Most people think small because they fear success. Set the target higher than feels comfortable." },
  { n: 2, t: "Protect the Downside", d: "Plan for the worst. If you protect the downside, the upside takes care of itself." },
  { n: 3, t: "Maximize Your Options", d: "Never get too attached to one deal. Keep a lot of balls in the air." },
  { n: 4, t: "Know Your Market", d: "Do your own research. Trust your gut over consultants and committees." },
  { n: 5, t: "Use Your Leverage", d: "The worst thing you can do is seem desperate. Leverage is having what the other side wants — or needs." },
  { n: 6, t: "Enhance Your Location", d: "You don't need the best location. You need the best deal — then improve what you have." },
  { n: 7, t: "Get the Word Out", d: "You can have the best product in the world, but if nobody knows, it's worthless. Promotion is part of the deal." },
  { n: 8, t: "Fight Back", d: "When someone treats you unfairly, fight back hard. People respect strength." },
  { n: 9, t: "Deliver the Goods", d: "Promotion gets attention, but you can't con people for long. You have to deliver." },
  { n: 10, t: "Contain the Costs", d: "Watch the small expenses. Never spend more than you should just to close." },
  { n: 11, t: "Have Fun", d: "Money is a way of keeping score. The real excitement is playing the game." },
];

// Inner-game corpus — the 25 lessons from Trump Your Life
// by Keith Ablow (from the licensed manuscript).
const LESSONS = [
  { n: 1, t: "Refuse 'Not Good Enough'", d: "Never let anyone tell you you're not good enough for a goal. But do the work." },
  { n: 2, t: "Be Your Authentic Self", d: "You are an original. Be courageous enough to be your authentic self." },
  { n: 3, t: "Do What You Love", d: "It's very hard to compete with someone who truly loves the work." },
  { n: 4, t: "Never Be Taken for a Fool", d: "Let no one take you for a weakling, a fool, or a fraud." },
  { n: 5, t: "Expect Resistance", d: "Assume resistance increases as you pursue bigger goals." },
  { n: 6, t: "Speak From the Heart", d: "Among strong people, connections of the heart are very powerful." },
  { n: 7, t: "Rivals Can Become Partners", d: "After hard-fought battles, competitors can become partners." },
  { n: 8, t: "Evolve With the Data", d: "Don't be afraid to let your position evolve with more data." },
  { n: 9, t: "Deals Are Living Documents", d: "Making a deal doesn't mean the deal-making is over." },
  { n: 10, t: "You're the Masterpiece", d: "You're the real masterpiece; the universe has a plan for you." },
  { n: 11, t: "Advisers, Then Instincts", d: "Recruit great advisers, listen — then follow your own instincts." },
  { n: 12, t: "Celebrate, Don't Envy", d: "Don't envy the achievements of others; celebrate them." },
  { n: 13, t: "No False Apologies", d: "Never let yourself be forced into false apologies." },
  { n: 14, t: "Shrug Off Labels", d: "Shrug it off when people unfairly label you." },
  { n: 15, t: "Take Time to Get It Right", d: "Always take the time to get it right." },
  { n: 16, t: "Quality Always Matters", d: "Quality always, always matters." },
  { n: 17, t: "Ignore the Polls", d: "Don't be guided by polls." },
  { n: 18, t: "Own Who You Are", d: "Be comfortable with your masculinity or femininity." },
  { n: 19, t: "Know Your Kryptonite", d: "Know the weaknesses that can drain your strength — and guard them." },
  { n: 20, t: "Chair Your Inner Board", d: "You've got a board of directors in your head; be chairman of the board." },
  { n: 21, t: "Answer Unfair Criticism", d: "Don't take unfair criticism lying down." },
  { n: 22, t: "Use Humor", d: "Don't forget the power of humor." },
  { n: 23, t: "Be Fair to Rivals", d: "Don't trash your rivals when there's no basis for it." },
  { n: 24, t: "Put Your Name on It", d: "Stand behind your work publicly. Own it." },
  { n: 25, t: "Truth Wins", d: "Have faith that the truth always wins." },
];

const SYSTEM_PROMPT = `You are the "What Would Trump Do?" advisor inside The Art of the Deal coaching app — a PRODUCT DEMO of a licensed AI persona. You coach users through real negotiations, business decisions, and the inner game of being a dealmaker.

You have TWO licensed bodies of work:

THE OUTER GAME — the 11 elements of the deal (The Art of the Deal):
${PRINCIPLES.map(p => `${p.n}. ${p.t} — ${p.d}`).join("\n")}

THE INNER GAME — the 25 lessons (Trump Your Life, by Keith Ablow):
${LESSONS.map(l => `${l.n}. ${l.t} — ${l.d}`).join("\n")}

Diagnose which layer the user's problem lives in. Tactical deal problems get outer-game coaching; confidence, criticism, fear, identity, and decision-paralysis problems get inner-game coaching. Most real problems need one principle from each — cite them by name and number (e.g., "Element 5: Use Your Leverage" or "Lesson 13: No False Apologies").

Style: bold, direct, decisive, confident. Short punchy sentences. A tough, seasoned New York dealmaker coaching a protégé — with a sharp psychological eye. Always end with one concrete next move. Keep responses under 150 words. Never give legal, financial, or mental-health advice — this is coaching, not therapy. Do not claim to literally be Donald Trump or Keith Ablow; you are a licensed AI advisor built on their published work.`;

const STARTERS = [
  "The other side just went silent on my deal. What would Trump do?",
  "They lowballed me 30% under asking. How do I respond?",
  "I want to raise my prices but I'm scared of losing clients.",
  "I got torn apart in a meeting and I can't shake it. Reset me.",
  ];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState(null);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setError(null);
    setInput("");
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n") || "…";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      setError("The advisor couldn't respond. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={S.page}>
      <style>{CSS}</style>

      {/* Masthead */}
      <header style={S.masthead}>
        <div style={S.demoBadge}>PRODUCT DEMO</div>
        <div style={S.mastheadRule} />
        <h1 style={S.brand}>THE ART OF THE DEAL</h1>
        <div style={S.tagline}>AI EXECUTIVE COACHING</div>
        <div style={S.byline}>The Deal · The Mindset — with Keith Ablow, author of <em>Trump Your Life</em></div>
        <div style={S.mastheadRule} />
      </header>

      {/* Curriculum tabs */}
      <div style={S.tabRow}>
        <button className="rail-toggle" style={{ ...S.tab, ...(tab === "deal" ? S.tabActive : {}) }}
          onClick={() => setTab(tab === "deal" ? null : "deal")}>
          THE OUTER GAME · 11 Elements
        </button>
        <button className="rail-toggle" style={{ ...S.tab, ...(tab === "mind" ? S.tabActive : {}) }}
          onClick={() => setTab(tab === "mind" ? null : "mind")}>
          THE INNER GAME · 25 Lessons
        </button>
      </div>
      {tab && (
        <div style={S.rail}>
          {(tab === "deal" ? PRINCIPLES : LESSONS).map(p => (
            <div key={p.n} style={S.card}>
              <div style={S.cardNum}>{String(p.n).padStart(2, "0")}</div>
              <div>
                <div style={S.cardTitle}>{p.t}</div>
                <div style={S.cardBody}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat */}
      <main style={S.chatWrap}>
        <div ref={scrollRef} style={S.chat}>
          {messages.length === 0 && (
            <div style={S.empty}>
              <div style={S.emptyHead}>Stuck in a deal?</div>
              <div style={S.emptySub}>Describe your negotiation — or what\u2019s going on in your head. The advisor coaches the deal and the dealmaker, drawing on The Art of the Deal and Trump Your Life.</div>
              <div style={S.starterWrap}>
                {STARTERS.map((s, i) => (
                  <button key={i} className="starter" style={S.starter} onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} style={m.role === "user" ? S.userMsg : S.aiMsg}>
              {m.role === "assistant" && <div style={S.aiLabel}>WWTD ADVISOR — DEMO OUTPUT</div>}
              {m.content}
            </div>
          ))}
          {busy && <div style={S.aiMsg}><div style={S.aiLabel}>WWTD ADVISOR</div><span className="pulse">Working the angles…</span></div>}
          {error && <div style={S.error}>{error}</div>}
        </div>

        {/* Input */}
        <div style={S.inputBar}>
          <textarea
            style={S.textarea}
            rows={1}
            value={input}
            placeholder="Describe your deal…"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <button className="plaque" style={S.plaque} onClick={() => send()} disabled={busy}>
            WHAT WOULD<br />TRUMP DO?
          </button>
        </div>
        <div style={S.footer}>Demo prototype · Sample corpus only · Coaching content, not legal or financial advice</div>
      </main>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Archivo:wght@400;500;600&display=swap');
* { box-sizing: border-box; }
body { margin: 0; }
.plaque { transition: transform .08s ease, box-shadow .08s ease; }
.plaque:active { transform: translateY(2px); box-shadow: 0 1px 0 #4a3a15, 0 2px 6px rgba(0,0,0,.6) !important; }
.plaque:disabled { opacity: .5; }
.starter:hover { border-color: #C9A44C !important; color: #EFE6D2 !important; }
.rail-toggle:hover { color: #EFE6D2; }
.pulse { animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: .4 } 50% { opacity: 1 } }
@media (prefers-reduced-motion: reduce) { .pulse { animation: none } .plaque { transition: none } }
textarea:focus, button:focus-visible { outline: 2px solid #C9A44C; outline-offset: 2px; }
`;

const S = {
  page: { minHeight: "100vh", background: "linear-gradient(180deg,#120E0A 0%,#0D0A07 100%)", color: "#EFE6D2", fontFamily: "'Archivo',sans-serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 24px" },
  masthead: { textAlign: "center", padding: "28px 16px 18px", width: "100%", maxWidth: 720 },
  demoBadge: { display: "inline-block", fontSize: 10, letterSpacing: "0.25em", color: "#8A7D68", border: "1px solid #3A3226", padding: "4px 10px", borderRadius: 2, marginBottom: 14 },
  mastheadRule: { height: 1, background: "linear-gradient(90deg,transparent,#C9A44C,transparent)", margin: "10px auto", maxWidth: 420 },
  brand: { fontFamily: "'Marcellus',serif", fontSize: "clamp(26px,6vw,40px)", letterSpacing: "0.12em", margin: 0, color: "#EFE6D2", fontWeight: 400 },
  tagline: { fontSize: 11, letterSpacing: "0.45em", color: "#C9A44C", marginTop: 6 },
  byline: { fontSize: 11, color: "#8A7D68", marginTop: 8, letterSpacing: "0.04em" },
  tabRow: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", justifyContent: "center", padding: "0 16px" },
  tab: { background: "none", border: "1px solid #3A3226", color: "#8A7D68", fontSize: 11, letterSpacing: "0.12em", cursor: "pointer", padding: "8px 14px", borderRadius: 3, fontFamily: "'Archivo',sans-serif" },
  tabActive: { borderColor: "#C9A44C", color: "#EFE6D2", background: "#1B1510" },
  railToggle: { background: "none", border: "none", color: "#8A7D68", fontSize: 12, letterSpacing: "0.08em", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 4, marginBottom: 8, fontFamily: "'Archivo',sans-serif" },
  rail: { width: "100%", maxWidth: 720, padding: "0 16px 12px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 8 },
  card: { display: "flex", gap: 12, background: "#181310", border: "1px solid #2A231A", borderRadius: 4, padding: "10px 12px" },
  cardNum: { fontFamily: "'Marcellus',serif", color: "#C9A44C", fontSize: 18, lineHeight: 1.2 },
  cardTitle: { fontWeight: 600, fontSize: 13, letterSpacing: "0.04em" },
  cardBody: { fontSize: 12, color: "#A79B85", marginTop: 2, lineHeight: 1.45 },
  chatWrap: { width: "100%", maxWidth: 720, display: "flex", flexDirection: "column", flex: 1, padding: "0 16px" },
  chat: { flex: 1, minHeight: 300, maxHeight: "52vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, padding: "12px 2px" },
  empty: { textAlign: "center", padding: "28px 8px" },
  emptyHead: { fontFamily: "'Marcellus',serif", fontSize: 22, letterSpacing: "0.06em" },
  emptySub: { fontSize: 13, color: "#A79B85", maxWidth: 440, margin: "8px auto 18px", lineHeight: 1.5 },
  starterWrap: { display: "flex", flexDirection: "column", gap: 8, maxWidth: 440, margin: "0 auto" },
  starter: { background: "none", border: "1px solid #3A3226", color: "#A79B85", borderRadius: 4, padding: "10px 14px", fontSize: 13, cursor: "pointer", textAlign: "left", fontFamily: "'Archivo',sans-serif" },
  userMsg: { alignSelf: "flex-end", background: "#26364A", borderRadius: "10px 10px 2px 10px", padding: "10px 14px", maxWidth: "85%", fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" },
  aiMsg: { alignSelf: "flex-start", background: "#1B1510", border: "1px solid #33291C", borderLeft: "3px solid #C9A44C", borderRadius: "2px 10px 10px 10px", padding: "10px 14px", maxWidth: "88%", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" },
  aiLabel: { fontSize: 9, letterSpacing: "0.22em", color: "#C9A44C", marginBottom: 6 },
  error: { color: "#D98C7A", fontSize: 13, textAlign: "center" },
  inputBar: { display: "flex", gap: 10, alignItems: "stretch", marginTop: 8 },
  textarea: { flex: 1, background: "#181310", border: "1px solid #33291C", borderRadius: 4, color: "#EFE6D2", padding: "12px 14px", fontSize: 14, resize: "none", fontFamily: "'Archivo',sans-serif" },
  plaque: { fontFamily: "'Marcellus',serif", fontSize: 12, letterSpacing: "0.1em", lineHeight: 1.35, color: "#241A08", background: "linear-gradient(180deg,#E3C878 0%,#C9A44C 45%,#9C7B2E 100%)", border: "1px solid #71581F", borderRadius: 4, padding: "8px 16px", cursor: "pointer", boxShadow: "0 3px 0 #4A3A15, 0 5px 12px rgba(0,0,0,.55)", whiteSpace: "nowrap" },
  footer: { textAlign: "center", fontSize: 10, color: "#5E5343", marginTop: 12, letterSpacing: "0.06em" },
};
